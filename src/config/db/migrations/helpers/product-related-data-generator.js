// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const productRelatedData = require('../../data/productRelated.json');

const productColorValues = [];
const productScreenTypeValues = [];
const productAcCapacityValues = [];
const acStarRatingValues = [];
const productBookVariationValues = [];
const productOperatingSystemValues = [];
const washingMethodsValues = [];
const acTypeValues = [];
const productSeriesValues = [];
const refrigeratorTypeValues = [];
const speakerTypeValues = [];
const simTypeValues = [];

productRelatedData.forEach((row) => {
  if (row.table === 'product_colors') {
    const value = `(${row.fields.pk}, '${row.fields.name}', '${row.fields.slug}')`;
    productColorValues.push(value);
  } else if (row.table === 'product_screen_type') {
    const value = `(${row.fields.pk}, '${row.fields.type}')`;
    productScreenTypeValues.push(value);
  } else if (row.table === 'product_ac_capacity') {
    const value = `(${row.fields.pk}, '${row.fields.capacity}')`;
    productAcCapacityValues.push(value);
  } else if (row.table === 'product_ac_star_rating') {
    const value = `(${row.fields.pk}, '${row.fields.star}')`;
    acStarRatingValues.push(value);
  } else if (row.table === 'product_book_variant') {
    const value = `(${row.fields.pk}, '${row.fields.name}')`;
    productBookVariationValues.push(value);
  } else if (row.table === 'operating_system') {
    const value = `(${row.fields.pk}, '${row.fields.name}', '${row.fields.slug}', '')`;
    productOperatingSystemValues.push(value);
  } else if (row.table === 'washing_methods') {
    const value = `(${row.fields.pk}, '${row.fields.name}')`;
    washingMethodsValues.push(value);
  } else if (row.table === 'air_conditioner_type') {
    const value = `(${row.fields.pk}, '${row.fields.type}')`;
    acTypeValues.push(value);
  } else if (row.table === 'product_series') {
    const value = `(${row.fields.pk}, '${row.fields.name}')`;
    productSeriesValues.push(value);
  } else if (row.table === 'refrigerator_type') {
    const value = `(${row.fields.pk}, '${row.fields.type}')`;
    refrigeratorTypeValues.push(value);
  } else if (row.table === 'speaker_type') {
    const value = `(${row.fields.pk}, '${row.fields.type}')`;
    speakerTypeValues.push(value);
  } else if (row.table === 'product_sim_type') {
    const value = `(${row.fields.pk}, '${row.fields.name}')`;
    simTypeValues.push(value);
  }
});

// eslint-disable-next-line no-undef
module.exports.insertProductColor = `INSERT INTO public.product_colors 
(id, name, slug) VALUES ${productColorValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertProductScreenType = `INSERT INTO public.product_screen_type 
(id, type) VALUES ${productScreenTypeValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertAcCapacity = `INSERT INTO public.product_ac_capacity 
(id, capacity) VALUES ${productAcCapacityValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertAcStarRating = `INSERT INTO public.product_ac_star_rating 
(id, star) VALUES ${acStarRatingValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertBookVariant = `INSERT INTO public.product_book_variant 
(id, name) VALUES ${productBookVariationValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertOperatingSystem = `INSERT INTO public.operating_system 
(id, name, slug, version) VALUES ${productOperatingSystemValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertWashingMethods = `INSERT INTO public.washing_methods 
(id, name) VALUES ${washingMethodsValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertAcTypes = `INSERT INTO public.air_conditioner_type 
(id, type) VALUES ${acTypeValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertProductSeries = `INSERT INTO public.product_series 
(id, name) VALUES ${productSeriesValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertRefrigeratorType = `INSERT INTO public.refrigerator_type 
(id, type) VALUES ${refrigeratorTypeValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertSpeakerType = `INSERT INTO public.speaker_type 
(id, type) VALUES ${speakerTypeValues.join(', ')};`;

// eslint-disable-next-line no-undef
module.exports.insertSimType = `INSERT INTO public.product_sim_type 
(id, name) VALUES ${simTypeValues.join(', ')};`;
