// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const subcategoryData = require('../../data/productSubcategory.json');

const subcategoryValues = [];
const subcategoryImagesValues = [];

subcategoryData.forEach((row) => {
  if (row.table === 'product_subcategory') {
    const {
      fields: { pk, name, slug, category_id },
    } = row;
    const value = `(${pk}, uuid_generate_v4(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${name}', '${slug}', ${category_id})`;
    subcategoryValues.push(value);
  } else if (row.table === 'product_subcategory_images') {
    const {
      fields: { pk, image, subcategory_id, placeholder },
    } = row;
    const value = `(${pk}, '${image}', ${subcategory_id}, '${placeholder}')`;
    subcategoryImagesValues.push(value);
  }
});

// eslint-disable-next-line no-undef
module.exports.insertSubcategory = `INSERT INTO public.product_subcategory 
(id, uuid, created, updated, name, slug, category_id) 
VALUES ${subcategoryValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertSubcategoryImages = `INSERT INTO public.product_subcategory_images 
(id, image, subcategory_id, placeholder) 
VALUES ${subcategoryImagesValues.join(', ')};`;
