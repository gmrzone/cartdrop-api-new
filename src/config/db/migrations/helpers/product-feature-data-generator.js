/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const productFeatureData = require('../../data/productFeatures.json');

const mobileFeatureValues = [];
const laptopFeatureValues = [];
const tvFeatureValues = [];
const washingMachineFeatureValues = [];
const acFeatureValues = [];
const refrigeratorFeatureValues = [];
const speakerFeatureValues = [];

productFeatureData.forEach((row) => {
  if (row.table === 'mobile_features') {
    const value = `(${row.fields.pk}, '${row.fields.display_type}', '${row.fields.display_size}', '${row.fields.resolution}', '${row.fields.battery_capacity}', ${row.fields.touchscreen}, ${row.fields.smart_phone}, ${row.fields.operating_system_id}, ${row.fields.series_id}, ${row.fields.sim_type_id}, ${row.fields.processor_id})`;
    mobileFeatureValues.push(value);
  } else if (row.table === 'laptop_features') {
    const value = `(${row.fields.pk}, '${row.fields.display_type}', '${row.fields.display_size}', '${row.fields.resolution}', '', '${row.fields.touchscreen}', ${row.fields.operating_system_id}, ${row.fields.series_id}, ${row.fields.processor_id})`;
    laptopFeatureValues.push(value);
  } else if (row.table === 'television_features') {
    const value = `(${row.fields.pk}, ${row.fields.series_id}, ${row.fields.screen_type_id}, '${row.fields.display_size}', '${row.fields.refresh_rate}', ${row.fields.usb_count}, ${row.fields.is_3d}, ${row.fields.is_curved}, ${row.fields.has_wifi}, ${row.fields.includes_wallmount})`;
    tvFeatureValues.push(value);
  } else if (row.table === 'washing_machine_features') {
    const value = `(${row.fields.pk}, ${row.fields.washing_method_id}, ${row.fields.energy_rating}, ${row.fields.washing_capacity}, ${row.fields.has_inbuilt_heater})`;
    washingMachineFeatureValues.push(value);
  } else if (row.table === 'air_conditioner_features') {
    const value = `(${row.fields.pk}, '${row.fields.compressor}', ${row.fields.cooling_capacity}, '${row.fields.cooling_coverage_area}', ${row.fields.series_id}, ${row.fields.type_id})`;
    acFeatureValues.push(value);
  } else if (row.table === 'refrigerator_features') {
    const value = `(${row.fields.pk}, ${row.fields.type_id}, '${row.fields.capacity}', ${row.fields.energy_rating}, '${row.fields.compressor_type}', ${row.fields.stabilizer_required})`;
    refrigeratorFeatureValues.push(value);
  } else if (row.table === 'speakers_features') {
    const value = `(${row.fields.pk}, ${row.fields.type_id}, '${row.fields.power_output}', '', ${row.fields.has_bluetooth})`;
    speakerFeatureValues.push(value);
  }
});

module.exports.insertProcessor = `INSERT INTO public.product_processor 
(name) VALUES ('NOT AVAILABLE'), ('Ryzen 5 Hexa Core'), ('Intel Core i3 10th Gen');`;

module.exports.insertMobileFeature = `INSERT INTO public.mobile_features 
(id, display_type, display_size, resolution, battery_capacity, touchscreen, smart_phone, operating_system_id, series_id, sim_type_id, processor_id) 
VALUES ${mobileFeatureValues.join(', ')};`;

module.exports.insertLaptopFeature = `INSERT INTO public.laptop_features( 
	id, display_type, display_size, resolution, battery_capacity, touchscreen, operating_system_id, series_id, processor_id)
	VALUES ${laptopFeatureValues.join(', ')};`;

module.exports.insertTelivisionFeature = `INSERT INTO public.television_features(
	id, series_id, screen_type_id, display_size, refresh_rate, usb_count, is_3d, is_curved, has_wifi, includes_wallmount)
	VALUES ${tvFeatureValues.join(', ')};`;

module.exports.insertWashingMachineFeature = `INSERT INTO public.washing_machine_features(
	id, washing_method_id, energy_rating, washing_capacity, has_inbuilt_heater)
	VALUES ${washingMachineFeatureValues.join(', ')};`;

module.exports.insertAcFeature = `INSERT INTO public.air_conditioner_features(
	id, compressor, cooling_capacity, cooling_coverage_area, series_id, type_id)
	VALUES ${acFeatureValues.join(', ')};`;

module.exports.insertRefrigeratorFeature = `INSERT INTO public.refrigerator_features(
	id, type_id, capacity, energy_rating, compressor_type, stabilizer_required)
	VALUES ${refrigeratorFeatureValues.join(', ')};`;

module.exports.insertSpeakerFeature = `INSERT INTO public.speakers_features(
	id, type_id, power_output, frequency_response, has_bluetooth)
	VALUES ${speakerFeatureValues.join(', ')};`;
