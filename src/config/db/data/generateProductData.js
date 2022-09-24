// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { promises: fsPromise } = require('fs');

fsPromise
  .readFile(
    '/Users/zop9896/Projects/cartdrop-api/json_data/products_updated_19-03-2022.json',
    { encoding: 'utf-8' },
  )
  .then((data) => {
    if (data) {
      const productFeatureData = [];
      const productSpecificationData = [];
      const productWarrentyData = [];
      const productData = [];

      let featureCounter = 1;
      let productWarrentyCounter = 1;
      const jsonData = JSON.parse(data);

      jsonData.forEach((row) => {
        if (row.model === 'products.productspecification') {
          const featureTableName = 'products_features';
          const specificationTableName = 'products_specification';
          const featureData = {
            table: featureTableName,
            fields: {
              pk: featureCounter,
              mobile_id: row.fields.mobile || null,
              laptop_id: row.fields.laptop || null,
              refrigerator_id: row.fields.refrigerator || null,
              speaker_id: row.fields.speaker || null,
              television_id: row.fields.tv || null,
              washing_machine_id: row.fields.washing_machine || null,
              air_conditioner_id: row.fields.ac || null,
            },
          };
          productFeatureData.push(featureData);

          const specificationData = {
            table: specificationTableName,
            fields: {
              pk: row.pk,
              launched_date: row.fields.launched_date,
              model_no: row.fields.model_no,
              model_name: row.fields.model_name,
              in_box: row.fields.in_box,
              feature_id: featureCounter,
            },
          };

          productSpecificationData.push(specificationData);
          featureCounter += 1;
        } else if (row.model === 'products.productwarranty') {
          const tableName = 'product_warranty';
          const value = {
            table: tableName,
            fields: {
              pk: productWarrentyCounter,
              summary: row.fields.summary,
              covered: row.fields.covered,
              not_covered: row.fields.not_covered,
            },
          };
          productWarrentyData.push(value);
          productWarrentyCounter += 1;
        } else if (row.model === 'products.product') {
          const tableName = 'products';
          const value = {
            table: tableName,
            fields: {
              id: row.pk,
              product_code: row.fields.product_code,
              name: row.fields.name,
              slug: row.fields.slug,
              description: row.fields.description,
              brand_id: row.fields.brand,
              subcategory_id:
                row.fields.subcategory < 8
                  ? row.fields.subcategory
                  : row.fields.subcategory < 19
                  ? row.fields.subcategory - 1
                  : row.fields.subcategory - 2,
              warrenty_id: row.fields.warranty,
              specification_id: row.fields.specification,
              weight: row.fields.weight,
              replacement_days: row.fields.replacement_days,
              total_rating: 0,
            },
          };
          productData.push(value);
        }
      });
      const completeData = productFeatureData.concat(productSpecificationData, productWarrentyData, productData)
      return fsPromise.writeFile('/Users/zop9896/Projects/cartdrop-api-node/src/config/db/data/productData.json', JSON.stringify(completeData, null, 2), {encoding: "utf8"})
    }
  })
  // eslint-disable-next-line no-undef
  .catch((err => console.log(err)))
