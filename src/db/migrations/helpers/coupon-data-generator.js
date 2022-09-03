const couponData = require("../../data/productCoupons.json");
const couponReusableValues = []
const couponValues = []
const couponSubcategoryIntermidiate = []

couponData.forEach(row => {
    if (row.table === "coupon_reusable"){
        const {fields: {pk, type}} = row;
        const value = `(${pk}, '${type}')`
        couponReusableValues.push(value)
    }
    else if (row.table === "coupon_codes"){
        const {fields: {pk, code, discount, valid_from, valid_to, active, summary, reusable_id}} = row;
        const value = `(${pk}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, uuid_generate_v4(), '${code}', ${discount}, '${valid_from}', '${valid_to}', ${active}, ${reusable_id}, '${summary}')`
        couponValues.push(value)
    }
    else if (row.table === "coupon_codes_subcategory_intermediate"){
        const {fields: {pk, coupon_code_id, subcategory_id}} = row
        const value = `(${pk}, ${coupon_code_id}, ${subcategory_id})`
        couponSubcategoryIntermidiate.push(value)
    }
})

module.exports.insertCouponReusable = `INSERT INTO public.coupon_reusable 
(id, type) VALUES 
${couponReusableValues.join(", ")};`;

module.exports.insertCoupon = `INSERT INTO public.coupon_codes 
(id, created, updated, uuid, code, discount, valid_from, valid_to, active, reusable_id, summary) 
VALUES ${couponValues.join(", ")};`;

module.exports.insertCouponSubcategoryIntermidiate = `INSERT INTO public.coupon_codes_subcategory_intermediate 
(id, coupon_code_id, subcategory_id) 
VALUES ${couponSubcategoryIntermidiate.join(", ")};`;

