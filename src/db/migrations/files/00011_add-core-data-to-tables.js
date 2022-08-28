const {
  insertCategory,
  insertCategoryImages,
} = require("../helpers/category-data-generator");
const {
  insertSubcategory,
  insertSubcategoryImages,
} = require("../helpers/subcategory-data-generator");
module.exports.generateSql = () =>
  `${insertCategory} ${insertCategoryImages} ${insertSubcategory} ${insertSubcategoryImages}`;
