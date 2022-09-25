/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const productData = require('../../data/productData.json');

const productFeatureValues = [];
const productSpecificationValues = [];
const productWarrentyValue = [];
const productDataValue = [];

productData.forEach((row) => {
  if (row.table === 'products_features') {
    const value = `(${row.fields.pk}, ${row.fields.mobile_id}, ${row.fields.laptop_id}, 
        ${row.fields.refrigerator_id}, ${row.fields.speaker_id}, ${row.fields.television_id}, 
        ${row.fields.washing_machine_id}, ${row.fields.air_conditioner_id})`;
    productFeatureValues.push(value);
  } else if (row.table === 'products_specification') {
    const value = `(${row.fields.pk}, '${row.fields.launched_date}', '${row.fields.model_no}', 
    '${row.fields.model_name}', '${row.fields.in_box}', ${row.fields.feature_id})`
    productSpecificationValues.push(value)
  } else if (row.table === 'product_warranty') {
    const value = `(${row.fields.pk}, '${row.fields.summary}', '${row.fields.covered}', 
    '${row.fields.not_covered}')`
    productWarrentyValue.push(value)
  } else if (row.table === 'products') {
    const value = `(${row.fields.pk}, uuid_generate_v4(), '${row.fields.product_code}', 
    '${row.fields.name}', '${row.fields.slug}', '${row.fields.description}', 
    ${row.fields.brand_id}, 1, ${row.fields.subcategory_id}, ${row.fields.warrenty_id}, 
    ${row.fields.specification_id}, '${row.fields.weight}', ${row.fields.replacement_days}, 
    ${row.fields.total_rating}, current_timestamp, current_timestamp)`
    productDataValue.push(value)
  }
});


module.exports.insertProductFeature = `INSERT INTO public.products_features 
(id, mobile_id, laptop_id, refrigerator_id, speaker_id, television_id, washing_machine_id, air_conditioner_id) 
VALUES ${productFeatureValues.join(", ")};`

module.exports.insertSpecification = `INSERT INTO public.products_specification (
    id, launched_date, model_no, model_name, in_box, features_id
) VALUES ${productSpecificationValues.join(", ")};`

module.exports.insertProductWarrenty = `INSERT INTO public.product_warranty (
    id, summary, covered, not_covered
) VALUES ${productWarrentyValue.join(", ")};`

module.exports.insertProduct = `INSERT INTO public.products (
    id, uuid, product_code, name, slug, description, brand_id, seller_id, 
    subcategory_id, warranty_id, specification_id, weight, replacement_days, 
    total_rating, created, updated
) VALUES ${productDataValue.join(", ")};`
