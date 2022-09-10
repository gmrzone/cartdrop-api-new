// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { promises: fsPromise } = require('fs');

const subcategoryMap = {
  1: '1', // mobile
  2: '2', // mobile accessories
  3: '3', // laptop
  4: '4', // laptop accessories
  5: '5', // Telivision
  6: '6', // paints
  7: '7', // accessories
  9: '8', // backpack
  10: '9', // hand-bags
  11: '10', // shoes
  12: '11', // air-conditioner
  13: '12', // refrigerators
  14: '13', // washing-machines
  15: '14', // speakers
  16: '15', // programming
  17: '16', // juices
  18: '17', // chocolates
  20: '18', // mens-t-shirts
  21: '19', // womens-t-shirts
};
fsPromise
  .readFile('/Users/zop9896/Projects/cartdrop-api/json_data/core_latest.json', {
    encoding: 'utf-8',
  })
  .then((data) => {
    if (data) {
      const jsonData = JSON.parse(data);
      const couponData = [];
      const couponSubcategoryIntermidiate = [];
      const couponReusableData = [];
      const reusableUnique = new Set();
      let pkCounter = 1;
      let subcategoryPkCounter = 1;
      let couponReusableCounter = 1;
      jsonData.forEach((item) => {
        if (item.model === 'core.couponcode') {
          const tableName = 'coupon_codes';
          const reusableTableName = 'coupon_reusable';
          const subcategoryIntermidiateTableName = 'coupon_codes_subcategory_intermediate';
          const newItem = {
            table: tableName,
            fields: {
              pk: pkCounter,
              code: item.fields.code,
              discount: item.fields.discount,
              valid_from: '2022-08-01T05:50:50Z',
              valid_to: '2024-09-01T05:50:55Z',
              active: item.fields.active,
              summary: item.fields.summary,
              reusable_id: item.fields.reusable_type === 'SINGLE' ? 1 : 2,
            },
          };
          if (item.fields.subcategory) {
            const intermidiaryNewItems = {
              table: subcategoryIntermidiateTableName,
              fields: {
                pk: subcategoryPkCounter,
                coupon_code_id: pkCounter,
                subcategory_id: +subcategoryMap[item.fields.subcategory.toString()],
              },
            };
            couponSubcategoryIntermidiate.push(intermidiaryNewItems);
            subcategoryPkCounter += 1;
          }
          if (item.fields.reusable_type) {
            if (!reusableUnique.has(item.fields.reusable_type)) {
              const reusableNewItem = {
                table: reusableTableName,
                fields: {
                  pk: couponReusableCounter,
                  type: item.fields.reusable_type,
                },
              };
              couponReusableData.push(reusableNewItem);
              reusableUnique.add(item.fields.reusable_type);
              couponReusableCounter += 1;
            }
          }
          couponData.push(newItem);
          pkCounter += 1;
        }
      });
      const completeData = couponReusableData.concat(couponData, couponSubcategoryIntermidiate);
      fsPromise.writeFile(
        '/Users/zop9896/Projects/cartdrop-api-node/src/config/db/data/productCoupons.json',
        JSON.stringify(completeData, null, 2),
        { encoding: 'utf-8' },
      );
    }
  })
  // eslint-disable-next-line no-undef
  .catch((err) => console.log(err));
