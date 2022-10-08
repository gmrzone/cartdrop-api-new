const queryMock = jest.fn();

import { SUBCATEGORY_SERVICE_SQL } from './constants';
import SubcategoryServices from './index';

jest.mock('../../config/db', () => {
  return {
    __esModule: true,
    query: queryMock,
  };
});

describe('Subcategory Service Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const queryResponse = {
    rows: [
      {
        name: 'Mobiles',
        slug: 'mobiles',
        uuid: 'temp_uuid',
        created: 'current_date',
      },
    ],
    rowCount: 1,
  };
  describe('getSubcategory Tests', () => {
    test('getSubcategory without any errors should match response', async () => {
      queryMock.mockResolvedValue(queryResponse);
      const data = await SubcategoryServices.getSubcategories();
      expect(data).toEqual(queryResponse);
      expect(queryMock).toHaveBeenCalledTimes(1);
      expect(queryMock).toHaveBeenCalledWith(
        SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES,
        [],
      );
    });
  });

  test('getSubcategory with errors should raise proper errors', async () => {
    let error;
    queryMock.mockRejectedValueOnce(new Error('SQL ERROR'));
    try {
      await SubcategoryServices.getSubcategories();
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
        SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES,
        [],
      );
    }
  });

  describe('getSubcategoryWithImages Tests', () => {
    const baseURL = 'http://localhost:5000/static';
    test('getSubcategoryWithImages without errors should return proper response', async () => {
      const queryResponseWithImages = {
        rows: [
          {
            ...queryResponse.rows[0],
            subcategory_images: [
              {
                image:
                  'http://localhost:5000/static/Subcategory_Media/mobiles/mobiles/mobile_4-nobg.png',
              },
            ],
          },
        ],
        rowCount: 1,
      };

      queryMock.mockResolvedValueOnce(queryResponseWithImages);

      const data = await SubcategoryServices.getSubcategoriesWithImages(
        baseURL,
      );
      expect(data).toEqual(queryResponseWithImages);
      expect(queryMock).toHaveBeenCalledTimes(1);
      expect(queryMock).toHaveBeenCalledWith(
        SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_WITH_IMAGES,
        [baseURL],
      );
    });

    test('getSubcategoryWithImages with error should raise proper errors', async () => {
      let error;
      queryMock.mockRejectedValueOnce(new Error('SQL ERROR'));
      try {
        await SubcategoryServices.getSubcategoriesWithImages(baseURL);
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
          SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_WITH_IMAGES,
          [baseURL],
        );
      }
    });
  });

  describe('getSubcategoriesForCategory TEsts', () => {
    const baseURL = 'http://localhost:5000/static';
    const category = 'electronics';

    test('getSubcategoriesForCategory without error should return proper response', async () => {
      const queryResponseWithImages = {
        rows: [
          {
            ...queryResponse.rows[0],
            subcategory_images: [
              {
                image:
                  'http://localhost:5000/static/Subcategory_Media/mobiles/mobiles/mobile_4-nobg.png',
              },
            ],
          },
        ],
        rowCount: 1,
      };
      queryMock.mockResolvedValue(queryResponseWithImages);
      const data = await SubcategoryServices.getSubcategoriesForCategory(
        baseURL,
        category,
      );
      expect(data).toEqual(queryResponseWithImages);
      expect(queryMock).toHaveBeenCalledTimes(1);
      expect(queryMock).toHaveBeenCalledWith(
        SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_FOR_CATEGORY,
        [baseURL, category],
      );
    });

    test('getSubcategoriesForCategory with error should raise proper errors', async () => {
      let error;
      queryMock.mockRejectedValueOnce(new Error('SQL ERROR'));
      try {
        await SubcategoryServices.getSubcategoriesForCategory(
          baseURL,
          category,
        );
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
          SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_FOR_CATEGORY,
          [baseURL, category],
        );
      }
    });
  });

  describe('getSubcategoryWIthCoupons Tests', () => {
    const baseURL = 'http://localhost:5000/static';

    test('getSubcategoryWIthCoupons without error should return proper response', async () => {
      const queryResponseWithCoupon = {
        rows: [
          {
            ...queryResponse.rows[0],
            subcategory_images: [
              {
                image:
                  'http://localhost:5000/static/Subcategory_Media/mobiles/mobiles/mobile_4-nobg.png',
              },
            ],
            coupons: [
              {
                code: 'MOBILE_10',
                discount: 10,
              },
            ],
          },
        ],
        rowCount: 1,
      };
      queryMock.mockResolvedValueOnce(queryResponseWithCoupon);
      const data = await SubcategoryServices.getSubcategoriesWithCoupons(
        baseURL,
      );
      expect(data).toEqual(queryResponseWithCoupon);
      expect(queryMock).toHaveBeenCalledTimes(1);
      expect(queryMock).toHaveBeenCalledWith(
        SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_WITH_COUPONS_NEW,
        [baseURL],
      );
    });

    test('getSubcategoryWIthCoupons with error should raise an error', async () => {
      let error;
      queryMock.mockRejectedValueOnce(new Error('SQL ERROR'));
      try {
        await SubcategoryServices.getSubcategoriesWithCoupons(baseURL);
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
          SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_WITH_COUPONS_NEW,
          [baseURL],
        );
      }
    });
  });
});
