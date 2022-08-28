const subcategoryData = require("../../data/productSubcategory.json");
const {v4: uuid4} = require("uuid");

const subcategoryValues = []
const subcategoryImagesValues = []

subcategoryData.forEach(row => {
    if (row.table === "product_subcategory"){
        const uuid = uuid4()
        const {fields: {pk, name, slug, category_id}} = row
        const value = `(${pk}, '${uuid}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${name}', '${slug}', ${category_id})`
        subcategoryValues.push(value)
    }
    else if (row.table === "product_subcategory_images"){
        const {fields: {pk, image, subcategory_id, placeholder}} = row
        const value = `(${pk}, '${image}', ${subcategory_id}, '${placeholder}')`
        subcategoryImagesValues.push(value)
    }
})

module.exports.insertSubcategory = `INSERT INTO public.product_subcategory 
(id, uuid, created, updated, name, slug, category_id) 
VALUES ${subcategoryValues.join(", ")};`

module.exports.insertSubcategoryImages = `INSERT INTO public.product_subcategory_images 
(id, image, subcategory_id, placeholder) 
VALUES ${subcategoryImagesValues.join(", ")};`

