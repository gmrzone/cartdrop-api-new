// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const categoryData = require('../../data/productCategory.json');

const categoryValues = [];
const categoryImagesValues = [];

categoryData.forEach((row) => {
  if (row.table === 'product_category') {
    const {
      fields: { pk, name, slug },
    } = row;
    const value = `(${pk}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${slug}', uuid_generate_v4(), '${name}')`;
    categoryValues.push(value);
  } else if (row.table === 'product_category_images') {
    const {
      fields: { pk, image, product_category_id },
    } = row;
    const value = `(${pk}, '${image}', ${product_category_id})`;
    categoryImagesValues.push(value);
  }
});

// eslint-disable-next-line no-undef
module.exports.insertCategory = `INSERT INTO public.product_category 
(id, created, updated, slug, uuid, name) 
VALUES ${categoryValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertCategoryImages = `INSERT INTO public.product_category_images 
(id, image, product_category_id) 
VALUES ${categoryImagesValues.join(', ')};`;
