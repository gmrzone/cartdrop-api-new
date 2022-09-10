// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { promises: fsPromise } = require('fs');

fsPromise
  .readFile('/Users/zop9896/Projects/cartdrop-api/json_data/products_updated_19-03-2022.json', { encoding: 'utf-8' })
  .then((data) => {
    if (data) {
      const jsonData = JSON.parse(data);
      const displayTypeMap = {};

      const productMobileFeatureData = [];
      const productLaptopFeature = [];
      const productTvFeature = [];
      const productWashingMachineFeature = [];
      const productAcFeature = [];
      const productRefrigeratorFeature = [];
      const productSpeakerFeature = [];

      let mobileFeatureCounter = 1;
      let laptopFeatureCounter = 1;
      let tvFeatureCounter = 1;
      let washingMachineCounter = 1;
      let acCounter = 1;
      let refrigeratorCounter = 1;
      let speakerCounter = 1;

      // GEt Display Type Data
      jsonData.forEach((x) => {
        if (x.model === 'products.displaytype') {
          displayTypeMap[x.fields.name.toString()] = x.fields.name;
        }
      });
      jsonData.forEach((row) => {
        if (row.model === 'products.productmobilefeatures') {
          const tableName = 'mobile_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: mobileFeatureCounter,
              display_type: displayTypeMap[row.fields.display_type.toString()],
              display_size: row.fields.display_size,
              resolution: row.fields.resolution,
              battery_capacity: row.fields.battery_capicity,
              touchscreen: true,
              smart_phone: true,
              operating_system_id: row.fields.os,
              series_id: row.fields.series,
              sim_type_id: row.fields.sim_type,
              processor_id: 1,
            },
          };
          productMobileFeatureData.push(newItem);
          mobileFeatureCounter += 1;
        } else if (row.model === 'products.productlaptopfeatures') {
          const tableName = 'laptop_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: laptopFeatureCounter,
              display_type: displayTypeMap[row.fields.display_type.toString()],
              display_size: row.fields.display_size,
              resolution: row.fields.resolution,
              battery_capacity: row.fields.battery_capicity,
              touchscreen: row.fields.touchscreen,
              operating_system_id: row.fields.os,
              series_id: row.fields.series,
              processor_id: 3,
            },
          };
          productLaptopFeature.push(newItem);
          laptopFeatureCounter += 1;
        } else if (row.model === 'products.producttelivisionfeatures') {
          const tableName = 'television_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: tvFeatureCounter,
              series_id: row.fields.series,
              screen_type_id: row.fields.screen_type,
              display_size: row.fields.display_size,
              refresh_rate: row.fields.refresh_rate,
              usb_count: row.fields.usb_count,
              is_3d: row.fields.is_3d,
              is_curved: row.fields.is_curved,
              has_wifi: row.fields.has_wify,
              includes_wallmount: row.fields.includes_wallmount,
            },
          };
          tvFeatureCounter += 1;
          productTvFeature.push(newItem);
        } else if (row.model === 'products.productwashingmachinefeatures') {
          const tableName = 'washing_machine_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: washingMachineCounter,
              washing_method_id: row.fields.washing_method,
              energy_rating: row.fields.energy_rating,
              washing_capacity: row.fields.washing_capicity,
              has_inbuilt_heater: row.fields.has_inbuilt_heater,
            },
          };
          productWashingMachineFeature.push(newItem);
          washingMachineCounter += 1;
        } else if (row.model === 'products.productairconditionerfeature') {
          const tableName = 'air_conditioner_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: acCounter,
              compressor: row.fields.compressor,
              cooling_capacity: row.fields.cooling_capacity,
              cooling_coverage_area: row.fields.cooling_coverage_area,
              series_id: row.fields.series,
              type_id: row.fields.type,
            },
          };
          productAcFeature.push(newItem);
          acCounter += 1;
        } else if (row.model === 'products.productrefrigeratorfeature') {
          const tableName = 'refrigerator_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: refrigeratorCounter,
              type_id: row.fields.type,
              capacity: row.fields.capacity,
              energy_rating: row.fields.energy_rating,
              compressor_type: row.fields.compressor_type,
              stabilizer_required: row.fields.stabilizer_required,
            },
          };
          productRefrigeratorFeature.push(newItem);
          refrigeratorCounter += 1;
        } else if (row.model === 'products.productspeakersfeatures') {
          const tableName = 'speakers_features';
          const newItem = {
            table: tableName,
            fields: {
              pk: speakerCounter,
              type_id: row.fields.type,
              power_output: row.fields.power_output,
              frequency_response: row.fields.frequency_response,
              has_bluetooth: row.fields.has_bluetooth,
            },
          };
          productSpeakerFeature.push(newItem);
          speakerCounter += 1;
        }
      });
      const completeData = productMobileFeatureData.concat(
        productLaptopFeature,
        productTvFeature,
        productWashingMachineFeature,
        productAcFeature,
        productRefrigeratorFeature,
        productSpeakerFeature,
      );
      return fsPromise.writeFile(
        '/Users/zop9896/Projects/cartdrop-api-node/src/config/db/data/productFeatures.json',
        JSON.stringify(completeData, null, 2),
        { encoding: 'utf-8' },
      );
    }
  })
  // eslint-disable-next-line no-undef
  .catch((err) => console.log(err));

// module.exports.insertProcessor = `INSERT INTO public.product_processor
//   (name) VALUES ('NOT AVAILABLE'), ('Ryzen 5 Hexa Core'), ('Intel Core i3 10th Gen')`;
