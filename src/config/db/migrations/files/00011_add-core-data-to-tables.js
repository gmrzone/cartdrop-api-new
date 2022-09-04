const { insertCategory, insertCategoryImages } = require('../helpers/category-data-generator');
const { insertSubcategory, insertSubcategoryImages } = require('../helpers/subcategory-data-generator');
const { insertBrands } = require('../helpers/brand-data-generator');
const {
  insertCouponReusable,
  insertCoupon,
  insertCouponSubcategoryIntermidiate,
} = require('../helpers/coupon-data-generator');

const createUUIDextension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';

module.exports.generateSql = () =>
  `${createUUIDextension} ${insertCategory} ${insertCategoryImages} 
  ${insertSubcategory} ${insertSubcategoryImages} ${insertBrands} 
  ${insertCouponReusable} ${insertCoupon} ${insertCouponSubcategoryIntermidiate}`;
