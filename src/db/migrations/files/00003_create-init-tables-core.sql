-- Brands Table

CREATE SEQUENCE IF NOT EXISTS public.brand_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE IF EXISTS public.brand_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.brands (
    id bigint NOT NULL DEFAULT nextval('brand_id_seq'::regclass),
    uuid uuid NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    slug character varying(100) COLLATE pg_catalog."default" NOT NULL,
    photo character varying(100) COLLATE pg_catalog."default" NOT NULL,
    placeholder character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT brand_pkey PRIMARY KEY (id),
    CONSTRAINT brand_uuid_unique UNIQUE (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.brands
    OWNER TO afzal;


ALTER SEQUENCE IF EXISTS public.brand_id_seq
    OWNED BY brands.id;

-- Brand Indexes

CREATE INDEX IF NOT EXISTS brand_slug_index01
    ON public.brands USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS brands_slug_index02_like
    ON public.brands USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Coupon Table

CREATE SEQUENCE IF NOT EXISTS coupon_codes_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE coupon_codes_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.coupon_codes (
    id bigint NOT NULL DEFAULT nextval('coupon_codes_id_seq'::regclass),
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    uuid uuid NOT NULL,
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    discount integer NOT NULL,
    valid_from  timestamp with time zone NOT NULL,
    valid_to  timestamp with time zone NOT NULL,
    active boolean NOT NULL,
    reusable_type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    summary character varying(200) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT coupon_code_pkey PRIMARY KEY(id),
    CONSTRAINT coupon_code_uuid_unique UNIQUE(uuid),
    CONSTRAINT coupon_code_discount_check CHECK (discount >=0 and discount <= 100)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coupon_code
    OWNER TO afzal;

ALTER SEQUENCE coupon_codes_id_seq
    OWNED BY coupon_codes.id;

-- COUPON INDEXES

CREATE INDEX IF NOT EXISTS coupon_codes_code_index01
    ON public.coupon_codes USING btree
    (code COLLATE pg_catalog."default" ASC NULLS LAST) 
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_code_index02_like
    ON public.coupon_codes USING btree
    (code COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_created_index03
    ON public.coupon_codes USING btree
    (created ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_valid_from_index03
    ON public.coupon_codes USING btree
    (valid_from ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_valid_to_index03
    ON public.coupon_codes USING btree
    (valid_to ASC NULLS LAST)
    TABLESPACE pg_default;

-- CATEGORY TABLES

CREATE SEQUENCE IF NOT EXISTS public.product_category_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_category_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_category (
    id bigint NOT NULL DEFAULT nextval('product_category_id_seq'::regclass),
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    slug character varying(100) COLLATE pg_catalog."default" NOT NULL,
    uuid uuid NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_category_pkey PRIMARY KEY(id),
    CONSTRAINT product_category_name_unique UNIQUE(name),
    CONSTRAINT product_category_uuid_unique_key UNIQUE(name)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_category
    OWNER TO afzal;

ALTER SEQUENCE public.product_category_id_seq
    OWNED BY product_category.id;

-- product_category INDEXES

CREATE INDEX IF NOT EXISTS product_category_created_index01
    ON public.product_category USING btree
    (created ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_category_name_index02
    ON public.product_category USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_category_name_like_index03
    ON public.product_category USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_category_slug_index04
    ON public.product_category USING btree
    (slug COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_category_slug_like_index04
    ON public.product_category USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Product Category images table

CREATE SEQUENCE IF NOT EXISTS product_category_images_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE IF EXISTS product_category_images_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.product_category_images (
    id bigint NOT NULL DEFAULT nextval('product_category_images_id_seq'::regclass),
    image character varying(100) COLLATE pg_catalog."default" NOT NULL,
    product_category_id bigint NOT NULL,
    CONSTRAINT product_category_images_pkey PRIMARY KEY(id),
    CONSTRAINT prioduct_category_id_fk_product_category FOREIGN KEY(product_category_id)
        REFERENCES public.product_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_category_images
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS product_category_images_id_seq
    OWNED by product_category_images.id;

-- product_category_images INDEXES
CREATE INDEX IF NOT EXISTS product_Category_images_category_id_index01
    ON public.product_category_images USING btree
    (product_category_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- product subcategory table

CREATE SEQUENCE IF NOT EXISTS public.product_subcategory_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_subcategory_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_subcategory (
    id bigint NOT NULL DEFAULT nextval('product_subcategory_id_seq'::regclass),
    uuid uuid NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    slug character varying(100) COLLATE pg_catalog."default" NOT NULL,
    category_id bigint NOT NULL,
    CONSTRAINT product_subcategory_pkey PRIMARY KEY(id),
    CONSTRAINT product_subcategory_uuid_unique_key UNIQUE(uuid),
    CONSTRAINT product_subcategory_name_unique UNIQUE(name),
    CONSTRAINT product_category_id_fk_product_category FOREIGN KEY(category_id)
        REFERENCES public.product_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_subcategory
    OWNER TO afzal;

ALTER SEQUENCE public.product_subcategory_id_seq
    OWNED BY product_subcategory.id;

-- product subcategory indexes

CREATE INDEX IF NOT EXISTS product_subcategory_category_id_index01
    ON public.product_subcategory USING btree
    (category_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_subcategory_created_index02
    ON public.product_subcategory USING btree
    (created ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_subcategory_name_like_index03
    ON public.product_subcategory USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_subcategory_slug_like_index04
    ON public.product_subcategory USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_subcategory_slug_index05
    ON public.product_subcategory USING btree
    (slug COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


-- product subcategory image table

CREATE SEQUENCE IF NOT EXISTS public.product_subcategory_images_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.product_subcategory_images (
    id bigint NOT NULL DEFAULT nextval('product_subcategory_images_id_seq'::regclass),
    image character varying(100) COLLATE pg_catalog."default" NOT NULL,
    subcategory_id bigint NOT NULL,
    placeholder character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_subcategory_image_pkey PRIMARY KEY(id),
    CONSTRAINT subcategory_id_fk_subcategory FOREIGN KEY(subcategory_id)
        REFERENCES public.product_subcategory(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_subcategory_images
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.product_subcategory_images_id_seq
    OWNED by product_subcategory_images.id;

-- CATEGORY IMAGE INMDEXED

CREATE INDEX IF NOT EXISTS product_subcategory_id_index01
    ON public.product_subcategory_images USING btree
    (subcategory_id ASC NULLS LAST)
    TABLESPACE pg_default;






