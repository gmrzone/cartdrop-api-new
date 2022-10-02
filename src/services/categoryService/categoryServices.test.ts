const queryMock = jest.fn();
const executeQueryWithClientMock = jest.fn();

import { CATEGORY_SERVICE_SQL } from './constant';
import categoryService from './index';

jest.mock('../../config/db', () => {
  return {
    __esModule: true,
    query: queryMock,
    executeQueryWithClient: executeQueryWithClientMock,
  };
});

describe('Category Service Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategory tests', () => {
    test('getCategory with SQL errors should match response', async () => {
      const queryResponse = {
        rows: [
          {
            id: 1,
            name: 'Electronics',
            slug: 'electronics',
            uuid: 'temp_uuid',
            created: 'current_date',
          },
        ],
        rowCount: 1,
      };
      queryMock.mockResolvedValue(queryResponse);
      const data = await categoryService.getCategories();
      expect(queryMock).toHaveBeenCalledTimes(1);
      expect(queryMock).toHaveBeenCalledWith(
        CATEGORY_SERVICE_SQL.GET_CATEGORIES,
        [],
      );
      expect(data).toEqual(queryResponse);
    });

    test('getCategory Without SQL Errors should throw an error', async () => {
      let error;
      queryMock.mockReturnValue(Promise.reject(new Error('SQL ERROR')));
      try {
        await categoryService.getCategories();
      } catch (err) {
        if (err instanceof Error) {
          error = err;
        }
      } finally {
        expect(error).toBeDefined();
        expect(error?.name).toBe('Error');
        expect(error?.message).toBe('SQL ERROR');
        expect(queryMock).toHaveBeenCalledTimes(1);
        expect(queryMock).toHaveBeenCalledWith(
          CATEGORY_SERVICE_SQL.GET_CATEGORIES,
          [],
        );
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
      executeQueryWithClientMock.mockResolvedValue(queryResponse);
      const serviceResponse = await categoryService.getCategoriesWithImages(
        baseStaticUrl,
      );
      expect(serviceResponse).toEqual(serviceResponse);
      expect(executeQueryWithClientMock).toHaveBeenCalledTimes(1);
    });

    test('getCategoryWithImages with sql error should throw error', async () => {
      let error;
      executeQueryWithClientMock.mockReturnValue(
        Promise.reject(new Error('SQL ERROR')),
      );
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
        expect(executeQueryWithClientMock).toHaveBeenCalledTimes(1);
      }
    });
  });
});
