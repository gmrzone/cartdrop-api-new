export const CATEGORY_SERVICE_SQL = {
  GET_CATEGORY: () => 'SELECT id, name, slug, uuid, created FROM public.product_category;',
  GET_CATEGORY_IMAGES_BY_IDS: () =>
    `SELECT id, product_category_id, image FROM public.product_category_images 
     WHERE product_category_id = ANY($1::int[])`,
  GET_CATEGORY_WITH_IMAGES: () =>
    `SELECT name, slug, uuid, created, json_agg(json_build_object('image', concat($1::text, product_category_images.image))) 
     as category_images FROM public.product_category JOIN public.product_category_images ON 
     product_category_images.product_category_id = product_category.id GROUP  BY product_category.id ORDER BY product_category.id;`,
};
