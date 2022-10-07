import { Request, Response } from 'express';
const getCategoriesWithImages = jest.fn();
import { getCategories } from '.';

jest.mock('../../services/categoryService', () => {
  return {
    getCategoriesWithImages: getCategoriesWithImages,
  };
});

jest.mock('../../config/constants', () => ({
  __esModule: true,
  ROW_COUNT_HEADER_NAME: 'x-row-count',
}));

const mockRequest = {
  protocol: 'http',
  get: jest.fn(() => 'localhost:8080'),
};

const mockResponse = {
  setHeader: jest.fn(),
  status: jest.fn(() => this),
  json: jest.fn(),
};

describe('category controllers tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCategory should return a success response if there is no error', async () => {
    const categoriesWithImages = {
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
    getCategoriesWithImages.mockResolvedValueOnce(categoriesWithImages);
    await getCategories(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getCategoriesWithImages).toHaveBeenCalledWith(
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      'x-row-count',
      categoriesWithImages.rowCount,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(categoriesWithImages.rows);
  });

  test('getCategory should return a error response if there is an error', async () => {
    getCategoriesWithImages.mockRejectedValueOnce(
      new Error('CATEGORY SERVICE ERROR'),
    );
    await getCategories(
      mockRequest as unknown as Request,
      mockResponse as unknown as Response,
    );
    expect(getCategoriesWithImages).toHaveBeenCalledWith(
      'http://localhost:8080/static/',
    );
    expect(mockResponse.setHeader).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        currentDate: expect.any(String),
        message: 'CATEGORY SERVICE ERROR',
        statusCode: 500,
      }),
    );
  });
});
