const poolQueryMock = jest.fn();
const poolConnectMock = jest.fn();
const poolReleaseMock = jest.fn();

const getPoolInstanceMock = jest.fn(() => {
  poolConnectMock.mockResolvedValue({
    query: poolQueryMock,
    release: poolReleaseMock,
  });
  return { connect: poolConnectMock, query: poolQueryMock };
});

import { PoolClient, QueryResult } from 'pg';
import { query, executeQueryWithClient } from './index';

jest.mock('../constants', () => ({
  __esModule: true,
  POOL_CONFIG: { PORT: 5432 },
}));

jest.mock('../helpers/getPool', () => {
  return {
    __esModule: true,
    pgPoolFactory: {
      getInstance: getPoolInstanceMock,
    },
  };
});

describe('Database util function test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('database query function should call poolInstance query with proper params', async () => {
    poolQueryMock.mockResolvedValueOnce({ data: 'test_data' });
    const data = await query('SELECT * FROM table where id = $1;', [1]);
    expect(getPoolInstanceMock).toHaveBeenCalledTimes(1);
    expect(poolQueryMock).toHaveBeenCalledTimes(1);
    expect(getPoolInstanceMock).toHaveBeenCalledWith({ PORT: 5432 });
    expect(poolQueryMock).toHaveBeenLastCalledWith(
      'SELECT * FROM table where id = $1;',
      [1],
    );
    expect(data).toEqual({ data: 'test_data' });
  });

  test('database query function error handling', async () => {
    poolQueryMock.mockRejectedValueOnce(new Error('sql Error'));
    let error;
    try {
      await query('SELECT * FROM table where id = $1;', [1]);
    } catch (err) {
      if (err instanceof Error) {
        error = err;
      }
      expect(poolQueryMock).toHaveBeenCalledTimes(1);
      expect(poolQueryMock).toHaveBeenLastCalledWith(
        'SELECT * FROM table where id = $1;',
        [1],
      );
      expect(error).toBeDefined();
      expect(error?.message).toBe('sql Error');
    }
  });
  describe('executeQueryWithClient tests', () => {
    const callback = async (client: PoolClient) => {
      const data: QueryResult<{ id: number; name: string }> =
        await client.query('SELECT * from test_table;');
      return data;
    };

    test('database executeQueryWithClient should make proper call to db pool and release', async () => {
      poolQueryMock.mockResolvedValueOnce({ id: 1, name: 'test' });
      const data = await executeQueryWithClient(callback);
      expect(poolConnectMock).toHaveBeenCalledTimes(1);
      expect(poolQueryMock).toHaveBeenCalledTimes(1);
      expect(poolReleaseMock).toHaveBeenCalledTimes(1);
      expect(poolQueryMock).toHaveBeenCalledWith('SELECT * from test_table;');
      expect(data).toEqual({ id: 1, name: 'test' });
    });

    test('database executeQueryWithClient proper error handling and should release client on error', async () => {
      let error;
      poolQueryMock.mockRejectedValueOnce(new Error('SQL ERROR'));
      try {
        await executeQueryWithClient(callback);
      } catch (err) {
        if (err instanceof Error) {
          error = err;
        }
        expect(poolConnectMock).toHaveBeenCalledTimes(1);
        expect(poolQueryMock).toHaveBeenCalledTimes(1);
        expect(poolReleaseMock).toHaveBeenCalledTimes(1);
        expect(poolQueryMock).toHaveBeenCalledWith('SELECT * from test_table;');
        expect(error).toBeDefined();
        expect(error?.message).toBe('SQL ERROR');
      }
    });
  });
});
