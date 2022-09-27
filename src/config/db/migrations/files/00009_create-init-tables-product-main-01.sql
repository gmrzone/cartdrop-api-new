-- PRODUCT MAIN TABLES

-- PRODUCT SPECIFICATION TABLE

CREATE SEQUENCE IF NOT EXISTS public.products_specification_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.products_specification_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.products_specification (
    id bigint NOT NULL DEFAULT nextval('products_specification_id_seq'::regclass),
    launched_date date NOT NULL,
    model_no character varying(100) COLLATE pg_catalog."default" NOT NULL,
    model_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    in_box character varying(600) COLLATE pg_catalog."default" NOT NULL,
    features_id bigint,

    CONSTRAINT products_specification_pkey PRIMARY KEY(id),
    CONSTRAINT products_specification_feature_id_unique UNIQUE(features_id),
    CONSTRAINT product_specification_model_no_unique UNIQUE(model_no),
    CONSTRAINT specification_feature_id_fk_product_features FOREIGN KEY(features_id)
        REFERENCES public.products_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_specification
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.products_specification_id_seq
    OWNED by products_specification.id;

-- PRODUCT TABLE

CREATE SEQUENCE IF NOT EXISTS public.products_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.products_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.products (
    id bigint NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    uuid uuid NOT NULL,
    product_code character varying(3) COLLATE pg_catalog."default" NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    slug character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    brand_id bigint NOT NULL,
    seller_id bigint NOT NULL,
    subcategory_id bigint NOT NULL,
    warranty_id bigint NOT NULL,
    specification_id bigint,
    weight character varying(100) COLLATE pg_catalog."default" NOT NULL,
    replacement_days integer NOT NULL,
    total_rating numeric(2, 1) NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,

    CONSTRAINT products_pkey PRIMARY KEY(id),
    CONSTRAINT products_uuid_unique_159 UNIQUE(uuid),
    CONSTRAINT products_specification_id_unique UNIQUE(specification_id),
    CONSTRAINT products_brand_id_fk_brand_table FOREIGN KEY(brand_id)
        REFERENCES public.brands(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT products_seller_id_fk_user_table FOREIGN KEY(seller_id)
        REFERENCES public.users(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_subcategory_id_fk_subcategory_table FOREIGN KEY(subcategory_id)
        REFERENCES public.product_subcategory(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_warrenty_id_fk_warranty_table FOREIGN KEY(warranty_id)
        REFERENCES public.product_warranty(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT products_specification_id_fk_specificatio FOREIGN KEY(specification_id)
        REFERENCES public.products_specification(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT products_replacement_days_greater_then_zero CHECK (replacement_days >= 0)
)
TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.products_id_seq
    OWNED BY products.id;

-- PRODUCT INDEXES

CREATE INDEX IF NOT EXISTS product_name_index01
    ON public.products USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_name_like_index02
    ON public.products USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_slug_index03
    ON public.products USING btree
    (slug COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_slug_like_index04
    ON public.products USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_brand_id_index05
    ON public.products USING btree
    (brand_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_seller_id_index06
    ON public.products USING btree
    (seller_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_subcategory_id_index07
    ON public.products USING btree
    (subcategory_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_created_index08
    ON public.products USING btree
    (created ASC NULLS LAST)
    TABLESPACE pg_default;


-- PRODUCT VARIATION TABLES

CREATE SEQUENCE IF NOT EXISTS public.product_variations_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_variations_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_variations (
    id bigint NOT NULL DEFAULT nextval('product_variations_id_seq'::regclass),
    uuid uuid NOT NULL,
    pid character varying(40) COLLATE pg_catalog."default" NOT NULL,
    retail_price numeric(10, 2) NOT NULL,
    price numeric(10, 2) NOT NULL,
    available_stock integer NOT NULL,
    product_id bigint NOT NULL,
    color_id bigint,
    variant_id bigint,
    active boolean NOT NULL,

    CONSTRAINT product_variations_pkey PRIMARY KEY(id),
    CONSTRAINT product_variations_uuid_unique UNIQUE(uuid),
    CONSTRAINT product_variations_pid_unique UNIQUE (pid),
    CONSTRAINT product_variations_product_id_fk_product_table FOREIGN KEY (product_id)
        REFERENCES public.products(id) MATCH SIMPLE
        ON DELETE CASCADE
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_variations_color_id_fk_color_table FOREIGN KEY(color_id)
        REFERENCES public.product_colors(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_variations_variant_id_fk_variant_table FOREIGN KEY(variant_id)
        REFERENCES public.product_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_variation_price_check CHECK (price >= 0),
    CONSTRAINT product_variation_retail_price_check CHECK (retail_price >= 0),
    CONSTRAINT product_variations_available_stock_check CHECK (available_stock >= 0)

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_variations
    OWNER TO afzal;

ALTER SEQUENCE public.product_variations_id_seq
    OWNED BY product_variations.id;

-- PRODUCT VARIATION INDEXES

CREATE INDEX IF NOT EXISTS product_variations_color_id_index01
    ON public.product_variations USING btree
    (color_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_variations_product_id_index02
    ON public.product_variations USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

