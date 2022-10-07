/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const productVariationRelatedData = require('../../data/productVariationRelated.json');

const clothingSizeValues = [];
const fashionVariantValues = [];
const juiceVariantValues = [];
const refrigeratorVariantValues = [];
const tvVariantValues = [];
const productVariantValues = [];

productVariationRelatedData.forEach((row) => {
  if (row.table === 'product_fashion_variant') {
    const value = `(${row.fields.pk}, ${row.fields.size_id})`;
    fashionVariantValues.push(value);
  } else if (row.table === 'product_clothes_size') {
    const value = `(${row.fields.pk}, '${row.fields.name}', '${row.fields.code}')`;
    clothingSizeValues.push(value);
  } else if (row.table === 'product_juice_variant') {
    const value = `(${row.fields.pk}, '${row.fields.quantity}')`;
    juiceVariantValues.push(value);
  } else if (row.table === 'product_refrigerator_variant') {
    const value = `(${row.fields.pk}, '${row.fields.capacity}')`;
    refrigeratorVariantValues.push(value);
  } else if (row.table === 'product_television_variant') {
    const value = `(${row.fields.pk}, '${row.fields.display_size}')`;
    tvVariantValues.push(value);
  } else if (row.table === 'product_variant') {
    const value = `(${row.fields.pk}, '${row.fields.name}', ${row.fields.mobile_variant_id}, ${row.fields.laptop_variant_id}, 
            ${row.fields.fashion_variant_id}, ${row.fields.air_conditioner_variant_id}, ${row.fields.television_variant_id}, 
            ${row.fields.refrigerator_variant_id}, ${row.fields.juice_variant_id}, ${row.fields.book_variant_id})`;
    productVariantValues.push(value);
  }
});

module.exports.insertClothesSize = `INSERT INTO public.product_clothes_size (
    id, name, code
) VALUES ${clothingSizeValues.join(', ')};`;

module.exports.insertFashionVariant = `INSERT INTO public.product_fashion_variant (
    id, size_id
) VALUES ${fashionVariantValues.join(', ')};`;

module.exports.insertJuiceVariant = `INSERT INTO public.product_juice_variant (
    id, quantity
) VALUES ${juiceVariantValues.join(', ')};`;

module.exports.insertRefrigeratorVariant = `INSERT INTO public.product_refrigerator_variant (
    id, capacity
) VALUES ${refrigeratorVariantValues.join(', ')};`;

module.exports.insertTvVariant = `INSERT INTO public.product_television_variant (
    id, display_size
) VALUES ${tvVariantValues.join(', ')};`;

module.exports.insertProductVariant = `INSERT INTO public.product_variant (
    id, name, mobile_variant_id, laptop_variant_id, fashion_variant_id, 
    air_conditioner_variant_id, television_variant_id, refrigerator_variant_id, 
    juice_variant_id, book_variant_id
) VALUES ${productVariantValues.join(', ')};`;
