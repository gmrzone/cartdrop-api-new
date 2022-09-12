// getCategory Mocks
const getQueryMock = jest.fn();
const poolQueryMock = jest.fn();
// getCategoryImages Mocks
const getPoolClientMock = jest.fn();
const poolClientQueryMock = jest.fn();
const poolClientReleaseMock = jest.fn();

import { CATEGORY_SERVICE_SQL } from './constant';
import categoryService from './index';

jest.mock('../../config/db', () => {
  getQueryMock.mockReturnValue({ query: poolQueryMock });
  getPoolClientMock.mockResolvedValue({ query: poolClientQueryMock, release: poolClientReleaseMock });
  return {
    getQuery: getQueryMock,
    getPoolClient: getPoolClientMock,
  };
});

describe('Category Service Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategory tests', () => {
    test('getCategory without SQL errors should match response', async () => {
      const queryResponse = [
        {
          id: 1,
          name: 'Electronics',
          slug: 'electronics',
          uuid: 'temp_uuid',
          created: 'current_date',
        },
      ];
      const queryRowcount = 1;

      poolQueryMock.mockResolvedValue({ rows: queryResponse, rowCount: queryRowcount });
      const data = await categoryService.getCategory();
      expect(data).toEqual({ rows: queryResponse, rowCount: queryRowcount });
      expect(getQueryMock).toHaveBeenCalledTimes(1);
      expect(poolQueryMock).toHaveBeenCalledTimes(1);
      expect(poolQueryMock).toHaveBeenCalledWith(CATEGORY_SERVICE_SQL.GET_CATEGORY());
    });

    test('getCategory With SQL Errors should throw an error', async () => {
      let error;
      poolQueryMock.mockReturnValue(Promise.reject(new Error('SQL ERROR')));
      try {
        await categoryService.getCategory();
      } catch (err) {
        if (err instanceof Error) {
          error = err;
        }
      } finally {
        expect(error).toBeDefined();
        expect(error?.name).toBe('Error');
        expect(error?.message).toBe('SQL ERROR');
        expect(getQueryMock).toHaveBeenCalledTimes(1);
        expect(poolQueryMock).toHaveBeenCalledTimes(1);
        expect(poolQueryMock).toHaveBeenCalledWith(CATEGORY_SERVICE_SQL.GET_CATEGORY());
      }
    });
  });

  describe('get Category With Images Test', () => {
    const baseStaticUrl = 'http://localhost:5000/static/';
    test('getCategoryWithImages with out sql error should match response', async () => {
      const queryResponse = {
        rows: [
          {
            id: 1,
            name: 'Electronics',
            slug: 'electronics',
            uuid: 'temp_uuid',
            created: 'current_date',
            category_images: [
              {
                image: 'temp_image',
              },
            ],
          },
        ],
        rowCount: 1,
      };
      poolClientQueryMock.mockResolvedValue(queryResponse);
      const serviceResponse = await categoryService.getCategoriesWithImages(baseStaticUrl);
      expect(serviceResponse).toEqual(serviceResponse);
      expect(getPoolClientMock).toHaveBeenCalledTimes(1);
      expect(poolClientQueryMock).toHaveBeenCalledTimes(1);
      expect(poolClientQueryMock).toHaveBeenCalledWith(CATEGORY_SERVICE_SQL.GET_CATEGORY_WITH_IMAGES(baseStaticUrl));
      expect(poolClientReleaseMock).toHaveBeenCalledTimes(1);
    });

    test('getCategoryWithImages with sql error should throw error', async () => {
      let error;
      poolClientQueryMock.mockReturnValue(Promise.reject(new Error('SQL ERROR')));
      try {
        await categoryService.getCategoriesWithImages(baseStaticUrl);
      } catch (err) {
        if (err instanceof Error) {
          error = err;
        }
      } finally {
        expect(error).toBeDefined();
        expect(error?.message).toBe('SQL ERROR');
        expect(error?.name).toBe('Error');
        expect(getPoolClientMock).toHaveBeenCalledTimes(1);
        expect(poolClientQueryMock).toHaveBeenCalledTimes(1);
        expect(poolClientQueryMock).toHaveBeenCalledWith(CATEGORY_SERVICE_SQL.GET_CATEGORY_WITH_IMAGES(baseStaticUrl));
        expect(poolClientReleaseMock).toHaveBeenCalledTimes(1);
      }
    });
  });
});
