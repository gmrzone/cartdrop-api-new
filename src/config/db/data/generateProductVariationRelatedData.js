// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { promises: fsPromise } = require('fs');

fsPromise
  .readFile(
    '/Users/zop9896/Projects/cartdrop-api/json_data/products_updated_19-03-2022.json',
    { encoding: 'utf-8' },
  )
  .then((data) => {
    const jsonData = JSON.parse(data);

    const clothingSize = [];
    const fashionVariant = [];
    const juiceVariant = [];
    const refrigeratorVariant = [];
    const tvVariant = [];
    const productVariant = [];

    let fashionVariantCounter = 1;
    let juiceVariantCounter = 1;
    let refrigeratorVariantCounter = 1;
    let tvVariantCounter = 1;
    let productVariantCounter = 1;

    jsonData.forEach((row) => {
      const productVariantTableName = 'product_variant';
      if (row.model === 'products.fashionsize') {
        const fashionVariantTableName = 'product_fashion_variant';
        const clothingSizeTableName = 'product_clothes_size';
        const clothingSizeData = {
          table: clothingSizeTableName,
          fields: {
            pk: row.pk,
            name: row.fields.name,
            code: row.fields.code,
          },
        };
        clothingSize.push(clothingSizeData);
        const fashionVariantdata = {
          table: fashionVariantTableName,
          fields: {
            pk: fashionVariantCounter,
            size_id: row.pk,
          },
        };
        fashionVariant.push(fashionVariantdata);
        const productVariantData = {
          table: productVariantTableName,
          fields: {
            pk: productVariantCounter,
            name: row.fields.name,
            mobile_variant_id: null,
            laptop_variant_id: null,
            fashion_variant_id: fashionVariantCounter,
            air_conditioner_variant_id: null,
            television_variant_id: null,
            refrigerator_variant_id: null,
            juice_variant_id: null,
            book_variant_id: null,
          },
        };
        productVariant.push(productVariantData);
        fashionVariantCounter += 1;
        productVariantCounter += 1;
      } else if (row.model === 'products.productvariation') {
        if (row.fields.juices_quantity) {
          const tableName = 'product_juice_variant';
          const juiceVariantData = {
            table: tableName,
            fields: {
              pk: juiceVariantCounter,
              quantity: row.fields.juices_quantity,
            },
          };
          juiceVariant.push(juiceVariantData);
          const productVariantData = {
            table: productVariantTableName,
            fields: {
              pk: productVariantCounter,
              name: row.fields.juices_quantity,
              mobile_variant_id: null,
              laptop_variant_id: null,
              fashion_variant_id: null,
              air_conditioner_variant_id: null,
              television_variant_id: null,
              refrigerator_variant_id: null,
              juice_variant_id: juiceVariantCounter,
              book_variant_id: null,
            },
          };
          productVariant.push(productVariantData);
          juiceVariantCounter += 1;
          productVariantCounter += 1;
        } else if (row.fields.refrigerator_capacity) {
          const tableName = 'product_refrigerator_variant';
          const refrigeratorVariantData = {
            table: tableName,
            fields: {
              pk: refrigeratorVariantCounter,
              capacity: row.fields.refrigerator_capacity,
            },
          };
          refrigeratorVariant.push(refrigeratorVariantData);
          const productVariantData = {
            table: productVariantTableName,
            fields: {
              pk: productVariantCounter,
              name: row.fields.refrigerator_capacity,
              mobile_variant_id: null,
              laptop_variant_id: null,
              fashion_variant_id: null,
              air_conditioner_variant_id: null,
              television_variant_id: null,
              refrigerator_variant_id: refrigeratorVariantCounter,
              juice_variant_id: null,
              book_variant_id: null,
            },
          };
          productVariant.push(productVariantData);
          refrigeratorVariantCounter += 1;
          productVariantCounter += 1;
        }
      } else if (row.model === 'products.tvvariant') {
        const tableName = 'product_television_variant';
        const tvVariantData = {
          table: tableName,
          fields: {
            pk: tvVariantCounter,
            display_size: row.fields.display_size,
          },
        };
        tvVariant.push(tvVariantData);
        const productVariantData = {
          table: productVariantTableName,
          fields: {
            pk: productVariantCounter,
            name: row.fields.display_size,
            mobile_variant_id: null,
            laptop_variant_id: null,
            fashion_variant_id: null,
            air_conditioner_variant_id: null,
            television_variant_id: tvVariantCounter,
            refrigerator_variant_id: null,
            juice_variant_id: null,
            book_variant_id: null,
          },
        };
        productVariant.push(productVariantData);
        tvVariantCounter += 1;
        productVariantCounter += 1;
      }
    });
    const completeData = clothingSize.concat(
      fashionVariant,
      juiceVariant,
      refrigeratorVariant,
      tvVariant,
      productVariant,
    );
    return fsPromise.writeFile(
      '/Users/zop9896/Projects/cartdrop-api-node/src/config/db/data/productVariationRelated.json',
      JSON.stringify(completeData, null, 2),
      { encoding: 'utf-8' },
    );
  })
  // eslint-disable-next-line no-undef
  .catch((err) => console.log(err));
