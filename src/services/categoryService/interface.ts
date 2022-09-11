export interface ICATEGORY {
  id: string;
  name: string;
  slug: string;
  uuid: string;
  created: string;
}

export interface ICATEGORY_IMAGE {
  id: string;
  product_category_id: string;
  image: string;
}

interface IMAGE_MAP {
  image: string;
}
export type CATEGPORY_IMAGE_MAP = {
  [key: string]: IMAGE_MAP[];
};

export interface ICATEGORY_RESPONSE {
  name: string;
  slug: string;
  uuid: string;
  created: string;
  category_images: IMAGE_MAP[]
}
