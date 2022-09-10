const { promises: fsPromise } = require('fs');

fsPromise
  .readFile('/Users/zop9896/Projects/cartdrop-api/json_data/products_updated_19-03-2022.json', { encoding: 'utf-8' })
  .then((data) => {
    if (data) {
      const jsonData = JSON.parse(data);

      const productColorData = [];
      const productScreenTypeData = [];
      const productAcCapacityData = [];
      const acStarRatingData = [];
      const productBookVariantData = [];
      const productOperatingSystemData = [];
      const washingMethodsData = [];
      const acTypeData = [];
      const productSeriesData = [];
      const refrigeratorTypeData = [];
      const speakerTypeData = [];
      const simtypeData = [];

      let colorCounter = 1;
      let productScreenCounter = 1;
      let acCapacityCounter = 1;
      let acStarRatingCounter = 1;
      let bookVariantCounter = 1;
      let operatingSystemCounter = 1;
      let washingMethodCounter = 1;
      let acTypeCounter = 1;
      let productSeriesCounter = 1;
      let refrigeratorTypeCounter = 1;
      let speakerTypeCounter = 1;
      let simTypeCounter = 1;

      jsonData.forEach((item) => {
        if (item.model === 'products.productcolor') {
          const tableName = 'product_colors';
          const newItem = {
            table: tableName,
            fields: {
              pk: colorCounter,
              name: item.fields.name,
              slug: item.fields.slau,
            },
          };
          productColorData.push(newItem);
          colorCounter += 1;
        } else if (item.model === 'products.screentype') {
          const tableName = 'product_screen_type';
          const newItem = {
            table: tableName,
            fields: {
              pk: productScreenCounter,
              type: item.fields.name,
            },
          };
          productScreenTypeData.push(newItem);
          productScreenCounter += 1;
        } else if (item.model === 'products.accapacityvariant') {
          const tableName = 'product_ac_capacity';
          const newItem = {
            table: tableName,
            fields: {
              pk: acCapacityCounter,
              capacity: item.fields.capacity,
            },
          };
          productAcCapacityData.push(newItem);
          acCapacityCounter += 1;
        } else if (item.model === 'products.acstarratingvariant') {
          const tableName = 'product_ac_star_rating';
          const newItem = {
            table: tableName,
            fields: {
              pk: acStarRatingCounter,
              star: item.fields.star,
            },
          };
          acStarRatingData.push(newItem);
          acStarRatingCounter += 1;
        } else if (item.model === 'products.bookvariant') {
          const tableName = 'product_book_variant';
          const newItem = {
            table: tableName,
            fields: {
              pk: bookVariantCounter,
              name: item.fields.name,
            },
          };
          productBookVariantData.push(newItem);
          bookVariantCounter += 1;
        } else if (item.model === 'products.operatingsystem') {
          const tableName = 'operating_system';
          const newItem = {
            table: tableName,
            fields: {
              pk: operatingSystemCounter,
              name: item.fields.name,
              slug: item.fields.slug,
            },
          };
          productOperatingSystemData.push(newItem);
          operatingSystemCounter += 1;
        } else if (item.model === 'products.washingmethod') {
          const tableName = 'washing_methods';
          const newItem = {
            table: tableName,
            fields: {
              pk: washingMethodCounter,
              name: item.fields.name,
            },
          };
          washingMethodsData.push(newItem);
          washingMethodCounter += 1;
        } else if (item.model === 'products.actype') {
          const tableName = 'air_conditioner_type';
          const newItem = {
            table: tableName,
            fields: {
              pk: acTypeCounter,
              type: item.fields.name,
            },
          };
          acTypeData.push(newItem);
          acTypeCounter += 1;
        } else if (item.model === 'products.productseries') {
          const tableName = 'product_series';
          const newItem = {
            table: tableName,
            fields: {
              pk: productSeriesCounter,
              name: item.fields.name,
            },
          };
          productSeriesData.push(newItem);
          productSeriesCounter += 1;
        } else if (item.model === 'products.refrigeratortype') {
          const tableName = 'refrigerator_type';
          const newItem = {
            table: tableName,
            fields: {
              pk: refrigeratorTypeCounter,
              type: item.fields.name,
            },
          };
          refrigeratorTypeData.push(newItem);
          refrigeratorTypeCounter += 1;
        } else if (item.model === 'products.speakertype') {
          const tableName = 'speaker_type';
          const newItem = {
            table: tableName,
            fields: {
              pk: speakerTypeCounter,
              type: item.fields.name,
            },
          };
          speakerTypeData.push(newItem);
          speakerTypeCounter += 1;
        } else if (item.model === 'products.simtype') {
          const tableName = 'product_sim_type';
          const newItem = {
            table: tableName,
            fields: {
              pk: simTypeCounter,
              name: item.fields.name,
            },
          };
          simtypeData.push(newItem);
          simTypeCounter += 1;
        }
      });
      const completeData = productColorData.concat(
        productScreenTypeData,
        productAcCapacityData,
        acStarRatingData,
        productBookVariantData,
        productOperatingSystemData,
        washingMethodsData,
        acTypeData,
        productSeriesData,
        refrigeratorTypeData,
        speakerTypeData,
        simtypeData,
      );
      return fsPromise.writeFile(
        '/Users/zop9896/Projects/cartdrop-api-node/src/config/db/data/productRelated.json',
        JSON.stringify(completeData, null, 2),
        { encoding: 'utf-8' },
      );
    }
  })
  .catch((err) => console.log(err));
