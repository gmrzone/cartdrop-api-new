interface IPRODUCT_IMAGES {
  id: number;
  image: string;
  primary: boolean;
}

export interface IPRODUCT_RESPONSE {
  uuid: string;
  pid: string;
  product: {
    uuid: string;
    name: string;
    slug: string;
    overall_rating: string;
    subcategory: {
      name: string;
      slug: string;
    };
  };
  full_name: string;
  retail_price: string;
  discount: string;
  price: string;
  color: {
    name: string;
    slug: string;
  };
  available_stock: number;
  images: IPRODUCT_IMAGES[];
}
