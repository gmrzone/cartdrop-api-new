/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { insertCategory, insertCategoryImages } = require('../helpers/category-data-generator');
const { insertSubcategory, insertSubcategoryImages } = require('../helpers/subcategory-data-generator');
const { insertBrands } = require('../helpers/brand-data-generator');
const {
  insertCouponReusable,
  insertCoupon,
  insertCouponSubcategoryIntermidiate,
} = require('../helpers/coupon-data-generator');
const {
  insertProductColor,
  insertProductScreenType,
  insertAcCapacity,
  insertAcStarRating,
  insertBookVariant,
  insertOperatingSystem,
  insertWashingMethods,
  insertAcTypes,
  insertProductSeries,
  insertRefrigeratorType,
  insertSpeakerType,
  insertSimType,
} = require('../helpers/product-related-data-generator');

const {
  insertProcessor,
  insertMobileFeature,
  insertLaptopFeature,
  insertTelivisionFeature,
  insertWashingMachineFeature,
  insertAcFeature,
  insertRefrigeratorFeature,
  insertSpeakerFeature,
} = require('../helpers/product-feature-data-generator');

const createUUIDextension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';

module.exports.generateSql = () =>
  `${createUUIDextension} ${insertCategory} ${insertCategoryImages} 
  ${insertSubcategory} ${insertSubcategoryImages} ${insertBrands} 
  ${insertCouponReusable} ${insertCoupon} ${insertCouponSubcategoryIntermidiate} 
  ${insertProductColor} ${insertProductScreenType} ${insertAcCapacity} 
  ${insertAcStarRating} ${insertBookVariant} ${insertOperatingSystem} 
  ${insertWashingMethods} ${insertAcTypes} ${insertProductSeries} 
  ${insertRefrigeratorType} ${insertSpeakerType} ${insertSimType} 
  ${insertProcessor} ${insertMobileFeature} ${insertLaptopFeature} 
  ${insertTelivisionFeature} ${insertWashingMachineFeature} 
  ${insertAcFeature} ${insertRefrigeratorFeature} ${insertSpeakerFeature}`;
