import { Request, Response } from 'express';
const getSubcategoryWithImagesMock = jest.fn();
const getSubcategoriesForCategoryMock = jest.fn();
const getSubcategoriesWithCouponsMock = jest.fn();
import {
  getSubCategories,
  getSubcategoriesWithOffers,
  getSubcategoriesForCategory,
} from '.';

jest.mock('../../services/subcategoryService', () => ({
  getSubcategoriesWithImages: getSubcategoryWithImagesMock,
  getSubcategoriesWithCoupons: getSubcategoriesWithCouponsMock,
  getSubcategoriesForCategory: getSubcategoriesForCategoryMock,
}));

jest.mock('../../config/constants', () => ({
  __esModule: true,
  ROW_COUNT_HEADER_NAME: 'x-row-count',
}));

const mockRequest = {
  protocol: 'http',
  get: jest.fn(() => 'localhost:8080'),
  params: { category: 'electronics' },
};

const mockResponse = {
  setHeader: jest.fn(),
  status: jest.fn(),
  json: jest.fn(),
};

describe('subcategory controllers tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getSubcategory should return success response if there is no error', async () => {
    const subcategoryWithImages = {
      rows: [
        {
          name: 'Mobiles',
          slug: 'mobiles',
          uuid: 'temp_uuid',
          created: 'current_date',
          subcategory_images: [
            {
              image: 'test_image',
            },
          ],
        },
      ],
      rowCount: 1,
    };
    getSubcategoryWithImagesMock.mockResolvedValueOnce(subcategoryWithImages);
    await getSubCategories(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoryWithImagesMock).toHaveBeenCalledWith(
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'x-row-count',
      subcategoryWithImages.rowCount,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(subcategoryWithImages.rows);
  });

  test('getSubcategory should return a proper error response if there is na error', async () => {
    getSubcategoryWithImagesMock.mockRejectedValueOnce(
      new Error('SUBCATEGORY SERVICE ERROR'),
    );
    await getSubCategories(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoryWithImagesMock).toHaveBeenCalledWith(
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        currentDate: expect.any(String),
        message: 'SUBCATEGORY SERVICE ERROR',
        statusCode: 500,
      }),
    );
  });

  test('getSubcategoriesForCategory should return proper success response if there is no error', async () => {
    const subcategoryWithImages = {
      rows: [
        {
          name: 'Mobiles',
          slug: 'mobiles',
          uuid: 'temp_uuid',
          created: 'current_date',
          subcategory_images: [
            {
              image: 'test_image',
            },
          ],
        },
      ],
      rowCount: 1,
    };
    getSubcategoriesForCategoryMock.mockResolvedValueOnce(
      subcategoryWithImages,
    );
    await getSubcategoriesForCategory(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoriesForCategoryMock).toHaveBeenCalledWith(
      'electronics',
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'x-row-count',
      subcategoryWithImages.rowCount,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(subcategoryWithImages.rows);
  });

  test('getSubcategoriesForCategory should return 404 response to data is not found', async () => {
    getSubcategoriesForCategoryMock.mockResolvedValueOnce({
      rows: [],
      rowCount: 0,
    });
    await getSubcategoriesForCategory(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoriesForCategoryMock).toHaveBeenCalledWith(
      'electronics',
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith('x-row-count', 0);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        currentDate: expect.any(String),
        message: 'There is no subcategories for category electronics',
        statusCode: 404,
      }),
    );
  });

  test('getSubcategoriesForCategory should return proper error response in there is error', async () => {
    getSubcategoriesForCategoryMock.mockRejectedValueOnce(
      new Error('SUBCATEGORY SERVICE ERROR'),
    );
    await getSubcategoriesForCategory(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoriesForCategoryMock).toHaveBeenCalledWith(
      'electronics',
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        currentDate: expect.any(String),
        message: 'SUBCATEGORY SERVICE ERROR',
        statusCode: 500,
      }),
    );
  });

  test('getSubcategoryWithOffers should return a success response if there is no error', async () => {
    const subcategoryWithOffers = {
      rows: [
        {
          name: 'Mobiles',
          slug: 'mobiles',
          uuid: 'temp_uuid',
          created: 'current_date',
          coupons: [
            {
              code: 'MOBILE_10',
              discount: 10,
            },
          ],
          subcategory_images: [
            {
              image: 'test_image',
            },
          ],
        },
      ],
      rowCount: 1,
    };
    getSubcategoriesWithCouponsMock.mockResolvedValueOnce(
      subcategoryWithOffers,
    );
    await getSubcategoriesWithOffers(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoriesWithCouponsMock).toHaveBeenCalledWith(
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'x-row-count',
      subcategoryWithOffers.rowCount,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(subcategoryWithOffers.rows);
  });

  test('getSubcategoryWithOffers should return a error response if there is an error', async () => {
    getSubcategoriesWithCouponsMock.mockRejectedValueOnce(
      new Error('SUBCATEGORY SERVICE ERROR'),
    );
    await getSubcategoriesWithOffers(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getSubcategoriesWithCouponsMock).toHaveBeenCalledWith(
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        currentDate: expect.any(String),
        message: 'SUBCATEGORY SERVICE ERROR',
        statusCode: 500,
      }),
    );
  });
});
