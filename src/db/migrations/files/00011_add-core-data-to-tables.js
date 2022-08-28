const { insertCategory, insertCategoryImages } = require('../helpers/category-data-generator')

module.exports.generateSql = () => `${insertCategory} ${insertCategoryImages}`