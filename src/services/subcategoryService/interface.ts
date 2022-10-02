interface IIMAGE {
  image: string;
}

interface ICOUPONS {
  code: string;
  discount: number;
}

export interface ISUBCATEGORY {
  name: string;
  slug: string;
  uuid: string;
  created: string;
}

export interface ISUBCATEGORY_WITH_IMAGES extends ISUBCATEGORY {
  subcategory_images: IIMAGE[];
}

export interface ISUBCATEGORY_WITH_COUPONS extends ISUBCATEGORY_WITH_IMAGES {
  coupons: ICOUPONS[];
}
