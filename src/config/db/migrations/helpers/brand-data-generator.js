// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const brandData = require('../../data/productBrands.json');

const brandValues = [];

brandData.forEach((row) => {
  if (row.table === 'brands') {
    const {
      fields: { pk, name, slug, photo, placeholder },
    } = row;
    const value = `(${pk}, uuid_generate_v4(), '${name}', '${slug}', '${photo}', '${placeholder}')`;
    brandValues.push(value);
  }
});

// eslint-disable-next-line no-undef
module.exports.insertBrands = `INSERT INTO public.brands 
(id, uuid, name, slug, photo, placeholder) 
VALUES ${brandValues.join(', ')};`;
