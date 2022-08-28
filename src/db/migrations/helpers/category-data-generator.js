const categoryData = require("../../data/productCategory.json");
const { v4: uuid4 } = require("uuid");

const categoryValues = [];
const categoryImagesValues = [];

categoryData.forEach((row) => {
  const currentISODate = new Date().toISOString();
  const uuid = uuid4();
  if (row.table === "product_category") {
    const {
      fields: { pk, name, slug },
    } = row;
    const value = `(${pk}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${slug}', '${uuid}', '${name}')`;
    categoryValues.push(value);
  } else if (row.table === "product_category_images") {
    const {
      fields: { pk, image, product_category_id },
    } = row;
    const value = `(${pk}, '${image}', ${product_category_id})`;
    categoryImagesValues.push(value);
  }
});

module.exports.insertCategory = `INSERT INTO public.product_category 
(id, created, updated, slug, uuid, name) 
VALUES ${categoryValues.join(", ")};`;

module.exports.insertCategoryImages = `INSERT INTO public.product_category_images 
(id, image, product_category_id) VALUES 
${categoryImagesValues.join(", ")};`;
