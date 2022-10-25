import { query } from '../../config/db';
import { IPRODUCT_RESPONSE } from './interfaces';

interface IPRODUCT_SERVICE {
  getFeaturedProducts: (
    baseImageUrl: string,
  ) => Promise<{ rows: IPRODUCT_RESPONSE[]; rowCount: number }>;
}

class ProductService implements IPRODUCT_SERVICE {
  getFeaturedProducts = async (baseImageUrl: string) => {
    // TODO : Optimize this query
    const SQL = `
    select pv.uuid, p.name as full_name, pv.pid, pv.retail_price, ROUND((pv.retail_price - pv.price) * 100 / pv.retail_price, 2) as discount, 
    pv.price , pv.available_stock, 
    jsonb_build_object('uuid', p.uuid, 'name', p.name, 'slug', p.slug, 'overall_rating', p.total_rating, 
        'subcategory', jsonb_build_object('name', ps.name, 'slug', ps.slug)) as product, 
    json_build_object('name', pc.name, 'slug', pc.slug) as color,
    jsonb_build_object('name', pv2.name, 
        'mobile_variant', case when pv2.mobile_variant_id is null then null else jsonb_build_object('display_size', pmv.display_size, 'ram', jsonb_build_object('capacity', pr.capacity, 'type', pr.type), 'storage', jsonb_build_object('capacity', ps2.capacity, 'type', ps2.type)) end,
        'laptop_variant', case when pv2.laptop_variant_id is null then null else jsonb_build_object('display_size', plv.display_size, 'ram', jsonb_build_object('capacity', pr2.capacity, 'type', pr2.type), 'storage', jsonb_build_object('capacity', ps3.capacity, 'type', ps3.type)) end,
        'tv_variant', case when pv2.television_variant_id  is null then null else jsonb_build_object('display_size', ptv.display_size) end,
        'ac_variant', case when pv2.air_conditioner_variant_id is null then null else jsonb_build_object('capacity', pac.capacity, 'star_rating', pasr.star) end,
        'refrigerator_variant', case when pv2.refrigerator_variant_id is null then null else jsonb_build_object('capacity', prv.capacity) end, 
        'juice_variant', case when pv2.juice_variant_id is null then null else jsonb_build_object('quantity', pjv.quantity) end,
        'book_variant', case when pv2.book_variant_id is null then null else jsonb_build_object('name', pbv.name) end,
        'fashion_variant', case when pv2.fashion_variant_id is null then null else jsonb_build_object('size', pcs.name) end) as variant,
        
    images.image
    from public.product_variations pv inner join 
    public.products p on pv.product_id = p.id inner join public.product_subcategory ps on p.subcategory_id = ps.id 
    inner join public.product_colors pc on pv.color_id = pc.id 
    join (select pvii.product_variation_id as vi, 
    jsonb_agg(jsonb_build_object('id', pvi.id, 'image', pvi.image, 'primary', pvi.is_primary)) as image
    from public.product_variation_images_intermidiate pvii 
    join public.product_variation_images pvi on 
    pvi.id = pvii.product_variation_images_id group by pvii.product_variation_id) as images on pv.id = images.vi
    left join public.product_variant pv2 on pv.variant_id = pv2.id 
    left join public.product_mobile_variant pmv on pv2.mobile_variant_id = pmv.id 
    left join public.product_laptop_variant plv on pv2.laptop_variant_id = plv.id 
    left join public.product_television_variant ptv on pv2.television_variant_id = ptv.id 
    left join public.product_air_conditioner_variant pacv on pv2.air_conditioner_variant_id = pacv.id 
    left join public.product_refrigerator_variant prv on pv2.refrigerator_variant_id = prv.id 
    left join public.product_juice_variant pjv on pv2.juice_variant_id = pjv.id 
    left join public.product_book_variant pbv on pv2.book_variant_id = pbv.id 
    left join public.product_fashion_variant pfv on pv2.fashion_variant_id = pfv.id 
    left join public.products_ram pr on pmv.ram_id = pr.id
    left join public.products_storage ps2 on pmv.storage_id = ps2.id 
    left join public.products_ram pr2 on plv.ram_id = pr2.id
    left join public.products_storage ps3 on plv.storage_id = ps3.id
    left join public.product_ac_capacity pac on pacv.capacity_id = pac.id 
    left join public.product_ac_star_rating pasr on pacv.star_rating_id = pasr.id
    left join public.product_clothes_size pcs on pfv.size_id = pcs.id;`;
    const { rows, rowCount } = await query<IPRODUCT_RESPONSE>(SQL, []);
    return { rows, rowCount };
  };
}

export default new ProductService();
