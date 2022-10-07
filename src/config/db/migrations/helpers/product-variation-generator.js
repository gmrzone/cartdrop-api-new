/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const productVariationData = require('../../data/productVariation.json');

const acVariantValues = [];
const ramValues = [];
const storageValues = [];
const mobileVariantValues = [];
const laptopVariantValues = [];
const productVariant = [];
const productVariation = [];
const productVariationImages = [];
const productVariationImageIntermidiate = [];

productVariationData.forEach((row) => {
  if (row.table === 'product_air_conditioner_variant') {
    const value = `(${row.fields.pk}, ${row.fields.capacity_id}, ${row.fields.star_rating_id})`;
    acVariantValues.push(value);
  } else if (row.table === 'products_ram') {
    const value = `(${row.fields.pk}, '${row.fields.capacity}', '${row.fields.type}')`;
    ramValues.push(value);
  } else if (row.table === 'products_storage') {
    const value = `(${row.fields.pk}, '${row.fields.capacity}', '${row.fields.type}')`;
    storageValues.push(value);
  } else if (row.table === 'product_mobile_variant') {
    const value = `(${row.fields.pk}, '${row.fields.display_size}', ${row.fields.ram_id}, ${row.fields.storage_id})`;
    mobileVariantValues.push(value);
  } else if (row.table === 'product_laptop_variant') {
    const value = `(${row.fields.pk}, '${row.fields.display_size}', ${row.fields.ram_id}, ${row.fields.storage_id})`;
    laptopVariantValues.push(value);
  } else if (row.table === 'product_variant') {
    const value = `(${row.fields.pk}, '${row.fields.name}', ${row.fields.mobile_variant_id}, ${row.fields.laptop_variant_id}, 
            ${row.fields.fashion_variant_id}, ${row.fields.air_conditioner_variant_id}, ${row.fields.television_variant_id}, 
            ${row.fields.refrigerator_variant_id}, ${row.fields.juice_variant_id}, ${row.fields.book_variant_id})`;
    productVariant.push(value);
  } else if (row.table === 'product_variations') {
    const productVariationvalue = `(${row.fields.pk}, uuid_generate_v4(), '${
      row.fields.pid
    }', ${parseFloat(row.fields.retail_price)}, ${parseFloat(
      row.fields.price,
    )}, ${row.fields.available_stock}, ${row.fields.product_id}, ${
      row.fields.color_id
    }, ${row.fields.variant_id}, ${row.fields.active})`;
    productVariation.push(productVariationvalue);
    row.fields.images.forEach((image_id) => {
      const productImageIntermidiateValue = `(${row.fields.pk}, ${image_id})`;
      productVariationImageIntermidiate.push(productImageIntermidiateValue);
    });
  } else if (row.table === 'product_variation_images') {
    const value = `(${row.fields.pk}, '${row.fields.image_summary}', '${row.fields.image}', ${row.fields.is_primary}, '${row.fields.placeholder}')`;
    productVariationImages.push(value);
  }
});

module.exports.insertAcVariant = `INSERT INTO public.product_air_conditioner_variant (
    id, capacity_id, star_rating_id 
) VALUES ${acVariantValues.join(', ')};`;

module.exports.insertRamValues = `INSERT INTO public.products_ram (
    id, capacity, type
) VALUES ${ramValues.join(', ')};`;

module.exports.insertStorageValues = `INSERT INTO public.products_storage (
    id, capacity, type
) VALUES ${storageValues.join(', ')};`;

module.exports.insertMobileVariant = `INSERT INTO public.product_mobile_variant (
    id, display_size, ram_id, storage_id
) VALUES ${mobileVariantValues.join(', ')};`;

module.exports.insertLaptopVariant = `INSERT INTO public.product_laptop_variant (
    id, display_size, ram_id, storage_id
) VALUES ${laptopVariantValues.join(', ')};`;

module.exports.insertProductVariant = `INSERT INTO public.product_variant (
    id, name, mobile_variant_id, laptop_variant_id, fashion_variant_id, air_conditioner_variant_id, 
    television_variant_id, refrigerator_variant_id, juice_variant_id, book_variant_id
) VALUES ${productVariant.join(', ')};`;

module.exports.insertProductVariation = `INSERT INTO public.product_variations (
    id, uuid, pid, retail_price, price, available_stock, product_id, color_id, variant_id, active
) VALUES ${productVariation.join(', ')};`;

module.exports.insertProductImages = `INSERT INTO public.product_variation_images (
    id, image_summary, image, is_primary, placeholder
) VALUES ${productVariationImages.join(', ')};`;

module.exports.insertProductImageIntermediate = `INSERT INTO public.product_variation_images_intermidiate (
    product_variation_id, product_variation_images_id
) VALUES ${productVariationImageIntermidiate.join(', ')};`;
