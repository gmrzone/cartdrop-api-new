-- PRODUCT MAIN TABLES

-- PRODUCT SPECIFICATION TABLE

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
    weight character varying(100) COLLATE pg_catalog."default" NOT NULL,
    replacement_days integer NOT NULL,
    total_rating numeric(2, 1) NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,

    CONSTRAINT products_pkey PRIMARY KEY(id),
    CONSTRAINT products_uuid_unique_159 UNIQUE(uuid),
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
    CONSTRAINT product_replacement_days_greater_then_zero CHECK (replacement_days >= 0)
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
