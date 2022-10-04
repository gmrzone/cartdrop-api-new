export const SUBCATEGORY_SERVICE_SQL = {
  GET_SUBCATEGORIES: `SELECT name, slug, uuid, created FROM public.product_subcategory ORDER BY id ASC;`,
  GET_SUBCATEGORIES_WITH_IMAGES: `SELECT name, slug, uuid, created, 
    json_agg(json_build_object('image', concat($1::text, product_subcategory_images.image))) 
    as subcategory_images FROM public.product_subcategory JOIN public.product_subcategory_images ON 
    product_subcategory_images.subcategory_id = product_subcategory.id GROUP BY 
    product_subcategory.id ORDER BY product_subcategory.id;`,
  GET_SUBCATEGORIES_FOR_CATEGORY: `SELECT ps.name, ps.slug, ps.uuid, ps.created, 
  json_agg(json_build_object('image', concat($1::text, psi.image))) 
  as subcategory_images FROM public.product_subcategory ps JOIN public.product_subcategory_images psi ON 
  psi.subcategory_id = ps.id JOIN public.product_category pc ON 
  pc.id = ps.category_id WHERE pc.slug = $2::text 
  GROUP BY ps.id ORDER BY ps.id;`,
  GET_SUBCATEGORIES_WITH_COUPONS: `SELECT name, slug, product_subcategory.uuid, product_subcategory.created, 
    array_agg(jsonb_build_object('image', concat($1::text, product_subcategory_images.image))) as subcategory_images ,
    array_agg(jsonb_build_object('code', coupon_codes.code, 'discount', coupon_codes.discount)) as coupons 
    FROM public.product_subcategory JOIN public.product_subcategory_images ON 
    product_subcategory.id = product_subcategory_images.subcategory_id JOIN public.coupon_codes_subcategory_intermediate 
    ON product_subcategory.id = coupon_codes_subcategory_intermediate.subcategory_id JOIN public.coupon_codes ON 
    coupon_codes_subcategory_intermediate.coupon_code_id = coupon_codes.id GROUP BY product_subcategory.id ORDER BY
    product_subcategory.id;`,
  GET_SUBCATEGORIES_WITH_COUPONS_NEW: `SELECT name, slug, product_subcategory.uuid, product_subcategory.created, 
    array_agg(json_build_object('code', coupon_codes.code, 'discount', coupon_codes.discount)) as coupons, si.image as subcategory_images
    FROM public.product_subcategory JOIN public.coupon_codes_subcategory_intermediate 
    ON product_subcategory.id = coupon_codes_subcategory_intermediate.subcategory_id JOIN public.coupon_codes ON 
    coupon_codes_subcategory_intermediate.coupon_code_id = coupon_codes.id JOIN (SELECT subcategory_id, 
    array_agg(jsonb_build_object('image', concat($1::text, product_subcategory_images.image))) as image FROM 
    public.product_subcategory_images GROUP BY product_subcategory_images.subcategory_id) si ON 
    si.subcategory_id = product_subcategory.id GROUP BY product_subcategory.id, si.image;`,
};
