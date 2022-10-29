import { query } from '../../config/db';
import { IPRODUCT_RESPONSE } from './interfaces';

interface IPRODUCT_SERVICE {
  getFeaturedProducts: (
    baseImageUrl: string,
  ) => Promise<{ rows: IPRODUCT_RESPONSE[]; rowCount: number }>;
}

class ProductService implements IPRODUCT_SERVICE {
  // TODO:  CURRENTLY THIS SQL WILL RETURN ALL PRODUCT VARIATION IN DISCOUNT ORDER
  // LATER MODIFY THIS TO RETURN DATA ORDERED BY OVERALL RATING
  // ALSO CURRENTLY IT RETURNS ALL PRODUCT VARIATION WE NEED TO RETURN DISTINCT PRODUCT VARIATION
  getFeaturedProducts = async (baseImageUrl: string) => {
    // TODO : Optimize this query
    const SQL = `select  
    pv.uuid,
    case
      when pv2.mobile_variant_id is not null then
      concat(p.name, ' ', '(', pc.name, ', ',pr.capacity, '/', ps2.capacity, ')') 
      when pv2.laptop_variant_id is not null then 
      concat(p.name, ' ', '(', pc.name, ', ',pr2.capacity, '/', ps3.capacity, ')') 
      when pv2.television_variant_id is not null then 
      concat(p.name, ' ', '(', pc.name, ', ', ptv.display_size, ')') 
      when pv2.air_conditioner_variant_id is not null then 
      concat(p.name, ' ', '(', pc.name, ', ', pasr.star, '/', pac.capacity, ')') 
      when pv2.refrigerator_variant_id is not null then 
      concat(p.name, ' ', '(', pc.name, ', ', prv.capacity, ')') 
      when pv2.juice_variant_id is not null then 
      concat(p.name, ' ', '(', pjv.quantity, ')') 
      when pv2.book_variant_id is not null then 
      concat(p.name, ' ', '(', pbv.name, ')') 
      when pv2.fashion_variant_id is not null then 
      concat(p.name, ' ', '(', pcs.name, ')') 
      else p.name
    end AS full_name,
    pv.pid,
    pv.retail_price,
    ROUND((pv.retail_price - pv.price) * 100 / pv.retail_price,
    2) AS discount,
    pv.price ,
    pv.available_stock,
    jsonb_build_object('uuid',
    p.uuid,
    'name',
    p.name,
    'slug',
    p.slug,
    'overall_rating',
    p.total_rating, 
    'subcategory',
    jsonb_build_object('name',
    ps.name,
    'slug',
    ps.slug)) AS product,
    json_build_object('name',
    pc.name,
    'slug',
    pc.slug) AS color,
    jsonb_build_object('name',
    pv2.name, 
    'mobile_variant',
    CASE
      WHEN pv2.mobile_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('display_size',
      pmv.display_size,
      'ram',
      jsonb_build_object('capacity',
      pr.capacity,
      'type',
      pr.type),
      'storage',
      jsonb_build_object('capacity',
      ps2.capacity,
      'type',
      ps2.type))
    END,
    'laptop_variant',
    CASE
      WHEN pv2.laptop_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('display_size',
      plv.display_size,
      'ram',
      jsonb_build_object('capacity',
      pr2.capacity,
      'type',
      pr2.type),
      'storage',
      jsonb_build_object('capacity',
      ps3.capacity,
      'type',
      ps3.type))
    END,
    'tv_variant',
    CASE
      WHEN pv2.television_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('display_size',
      ptv.display_size)
    END,
    'ac_variant',
    CASE
      WHEN pv2.air_conditioner_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('capacity',
      pac.capacity,
      'star_rating',
      pasr.star)
    END,
    'refrigerator_variant',
    CASE
      WHEN pv2.refrigerator_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('capacity',
      prv.capacity)
    END, 
    'juice_variant',
    CASE
      WHEN pv2.juice_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('quantity',
      pjv.quantity)
    END,
    'book_variant',
    CASE
      WHEN pv2.book_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('name',
      pbv.name)
    END,
    'fashion_variant',
    CASE
      WHEN pv2.fashion_variant_id IS NULL THEN NULL
      ELSE jsonb_build_object('size',
      pcs.name)
    END) AS variant,
    
  images.image
  FROM
    public.product_variations pv
  INNER JOIN 
  public.products p ON
    pv.product_id = p.id
  INNER JOIN public.product_subcategory ps ON
    p.subcategory_id = ps.id
  INNER JOIN public.product_colors pc ON
    pv.color_id = pc.id
  JOIN (
    SELECT
      pvii.product_variation_id AS vi,
      jsonb_agg(jsonb_build_object('id',
      pvi.id,
      'image',
      concat($1::text, pvi.image),
      'primary',
      pvi.is_primary)) AS image
    FROM
      public.product_variation_images_intermidiate pvii
    JOIN public.product_variation_images pvi ON
      pvi.id = pvii.product_variation_images_id
    GROUP BY
      pvii.product_variation_id) AS images ON
    pv.id = images.vi
  LEFT JOIN public.product_variant pv2 ON
    pv.variant_id = pv2.id
  LEFT JOIN public.product_mobile_variant pmv ON
    pv2.mobile_variant_id = pmv.id
  LEFT JOIN public.product_laptop_variant plv ON
    pv2.laptop_variant_id = plv.id
  LEFT JOIN public.product_television_variant ptv ON
    pv2.television_variant_id = ptv.id
  LEFT JOIN public.product_air_conditioner_variant pacv ON
    pv2.air_conditioner_variant_id = pacv.id
  LEFT JOIN public.product_refrigerator_variant prv ON
    pv2.refrigerator_variant_id = prv.id
  LEFT JOIN public.product_juice_variant pjv ON
    pv2.juice_variant_id = pjv.id
  LEFT JOIN public.product_book_variant pbv ON
    pv2.book_variant_id = pbv.id
  LEFT JOIN public.product_fashion_variant pfv ON
    pv2.fashion_variant_id = pfv.id
  LEFT JOIN public.products_ram pr ON
    pmv.ram_id = pr.id
  LEFT JOIN public.products_storage ps2 ON
    pmv.storage_id = ps2.id
  LEFT JOIN public.products_ram pr2 ON
    plv.ram_id = pr2.id
  LEFT JOIN public.products_storage ps3 ON
    plv.storage_id = ps3.id
  LEFT JOIN public.product_ac_capacity pac ON
    pacv.capacity_id = pac.id
  LEFT JOIN public.product_ac_star_rating pasr ON
    pacv.star_rating_id = pasr.id
  LEFT JOIN public.product_clothes_size pcs ON
    pfv.size_id = pcs.id ORDER BY discount DESC;`;
    const { rows, rowCount } = await query<IPRODUCT_RESPONSE>(SQL, [
      baseImageUrl,
    ]);
    return { rows, rowCount };
  };
}

export default new ProductService();
