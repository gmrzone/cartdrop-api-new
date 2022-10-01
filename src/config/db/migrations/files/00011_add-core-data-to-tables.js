/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  insertCategory,
  insertCategoryImages,
} = require('../helpers/category-data-generator');
const {
  insertSubcategory,
  insertSubcategoryImages,
} = require('../helpers/subcategory-data-generator');
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

const {
  insertProductFeature,
  insertSpecification,
  insertProductWarrenty,
  insertProduct,
} = require('../helpers/product-data-generator');

const {
  insertClothesSize,
  insertFashionVariant,
  insertJuiceVariant,
  insertRefrigeratorVariant,
  insertTvVariant,
  insertProductVariant,
} = require('../helpers/product-variation-related-data-generator');

const {
  insertAcVariant,
  insertRamValues,
  insertStorageValues,
  insertMobileVariant,
  insertLaptopVariant,
  insertProductVariant: insertProductVariantNew,
  insertProductVariation,
  insertProductImages,
  insertProductImageIntermediate,
} = require('../helpers/product-variation-generator');

const createUUIDextension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';
const createSuperUser = `INSERT INTO public.users (
  id, password, is_superuser, number, email, username, type, first_name, 
  last_name, date_joined, photo, is_staff, is_active, is_email_verified, 
  is_number_verified, is_disabled
  ) VALUES (
  1, 'unhashed_password', true, '9220976696', 'saiyedafzalgz@gmail.com', 
  'admin', 'admin', 'Afzal', 'Saiyed', current_timestamp, 'default_profilepic.png', 
  true, true, true, true, false 
  );`;
module.exports.generateSql = () =>
  `${createSuperUser} ${createUUIDextension} ${insertCategory} ${insertCategoryImages} 
  ${insertSubcategory} ${insertSubcategoryImages} ${insertBrands} 
  ${insertCouponReusable} ${insertCoupon} ${insertCouponSubcategoryIntermidiate} 
  ${insertProductColor} ${insertProductScreenType} ${insertAcCapacity} 
  ${insertAcStarRating} ${insertBookVariant} ${insertOperatingSystem} 
  ${insertWashingMethods} ${insertAcTypes} ${insertProductSeries} 
  ${insertRefrigeratorType} ${insertSpeakerType} ${insertSimType} 
  ${insertProcessor} ${insertMobileFeature} ${insertLaptopFeature} 
  ${insertTelivisionFeature} ${insertWashingMachineFeature} 
  ${insertAcFeature} ${insertRefrigeratorFeature} ${insertSpeakerFeature} 
  ${insertProductFeature} ${insertSpecification} ${insertProductWarrenty} 
  ${insertProduct} ${insertClothesSize} ${insertFashionVariant} 
  ${insertJuiceVariant} ${insertRefrigeratorVariant} ${insertTvVariant} 
  ${insertProductVariant} ${insertAcVariant} ${insertRamValues} 
  ${insertStorageValues} ${insertMobileVariant} ${insertLaptopVariant}
  ${insertProductVariantNew} ${insertProductVariation} ${insertProductImages}
  ${insertProductImageIntermediate}`;
