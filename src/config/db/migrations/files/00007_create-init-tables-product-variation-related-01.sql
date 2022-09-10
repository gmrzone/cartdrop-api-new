-- PRODUCT VARIATION RELATED TABLES
-- PRODUCT AC CAPACITY VARIANT

CREATE SEQUENCE IF NOT EXISTS public.product_ac_capacity_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_ac_capacity_id_seq
    OWNER to afzal;


CREATE TABLE IF NOT EXISTS public.product_ac_capacity (
    id bigint NOT NULL DEFAULT nextval('product_ac_capacity_id_seq'::regclass),
    capacity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_ac_capacity_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_ac_capacity
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_ac_capacity_id_seq
    OWNED by product_ac_capacity.id;

-- AC CAPACITY INDEXES

CREATE INDEX IF NOT EXISTS product_ac_capacity_capacity_like_index01
    ON public.product_ac_capacity USING btree
    (capacity COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_ac_capacity_capacity_index02
    ON public.product_ac_capacity USING btree
    (capacity COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- AC STAR RATING TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_ac_star_rating_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_ac_star_rating_id_seq
    OWNER to afzal;


CREATE TABLE IF NOT EXISTS public.product_ac_star_rating (
    id bigint NOT NULL DEFAULT nextval('product_ac_star_rating_id_seq'::regclass),
    star character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_ac_star_rating_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_ac_star_rating
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_ac_star_rating_id_seq
    OWNED by product_ac_star_rating.id;

-- AC STAR RATING INDEXES


CREATE INDEX IF NOT EXISTS product_product_ac_star_rating_like_index01
    ON public.product_ac_star_rating USING btree
    (star COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_ac_star_rating_index02
    ON public.product_ac_star_rating USING btree
    (star COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT COLOR TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_colors_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_colors_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_colors (
    id bigint NOT NULL DEFAULT nextval('product_colors_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    slug character varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_colors_pkey PRIMARY KEY(id),
    CONSTRAINT product_colors_name_unique UNIQUE(name),
    CONSTRAINT product_colors_slug_unique UNIQUE(slug)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_colors
    OWNER TO afzal;

ALTER SEQUENCE public.product_colors_id_seq
    OWNED BY product_colors.id;

-- PRODUCT COLORS INDEXES

CREATE INDEX IF NOT EXISTS product_colors_name_index01
    ON public.product_colors USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_colors_name_like_index02
    ON public.product_colors USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_colors_slug_index03
    ON public.product_colors USING btree
    (slug COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_colors_slug_like_index04
    ON public.product_colors USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT RAM (FOR MOBILE AND LAPTOPS ETC)

CREATE SEQUENCE IF NOT EXISTS public.products_ram_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.products_ram_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.products_ram (
    id bigint NOT NULL DEFAULT nextval('products_ram_id_seq'::regclass),
    capactity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_ram_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_ram
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.products_ram_id_seq
    OWNED by products_ram.id;


-- PRODUCT STORAGE TABLE

CREATE SEQUENCE IF NOT EXISTS public.products_storage_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.products_storage_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.products_storage (
    id bigint NOT NULL DEFAULT nextval('products_storage_id_seq'::regclass),
    capacity CHARACTER varying(100) COLLATE pg_catalog."default" NOT NULL,
    type CHARACTER varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_storage_pkey PRIMARY KEY(id),
    CONSTRAINT product_storage_capacity_unique UNIQUE(capacity)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_storage
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.products_storage_id_seq
    OWNED by products_storage.id;

-- FASHION CLothes SIZE TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_clothes_size_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_clothes_size_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_clothes_size (
    id bigint NOT NULL DEFAULT nextval('product_clothes_size_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    code character varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_clothes_size_pkey PRIMARY KEY(id),
    CONSTRAINT product_clothes_code_unique UNIQUE (code)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_clothes_size
    OWNER TO afzal;

ALTER SEQUENCE public.product_clothes_size_id_seq
    OWNED BY product_clothes_size.id;


-- PRODUCT FASHION VARIANT TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_fashion_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_fashion_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_fashion_variant (
    id bigint NOT NULL DEFAULT nextval('product_fashion_variant_id_seq'::regclass),
    size_id bigint NOT NULL,

    CONSTRAINT product_fashion_variant_pkey PRIMARY KEY (id),
    CONSTRAINT product_fashion_variant_size_id_fk_size FOREIGN KEY(size_id)
        REFERENCES public.product_clothes_size(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_fashion_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_fashion_variant_id_seq
    OWNED BY product_fashion_variant.id;

-- INDEX FOR FASHION VARIANT SIZE ID

CREATE INDEX IF NOT EXISTS product_fashion_variant_size_id_index01
    ON public.product_fashion_variant USING btree
    (size_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- MOBILE VARIANT TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_mobile_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_mobile_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_mobile_variant (
    id bigint NOT NULL DEFAULT nextval('product_mobile_variant_id_seq'::regclass),
    display_size character varying(100) COLLATE pg_catalog."default" NOT NULL,
    ram_id bigint NOT NULL,
    storage_id bigint NOT NULL,

    CONSTRAINT product_mobile_variant_pkey PRIMARY KEY (id),
    CONSTRAINT product_mobile_variant_ram_id_fk_ram FOREIGN KEY(ram_id)
        REFERENCES public.products_ram(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_mobile_variant_storage_id_fk_storage FOREIGN KEY(storage_id)
        REFERENCES public.products_storage(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_mobile_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_mobile_variant_id_seq
    OWNED BY product_fashion_variant.id;

-- INDEX FOR MOBILE VARIANT ram_id and storage_id

CREATE INDEX IF NOT EXISTS product_mobile_variant_ram_id_index01
    ON public.product_mobile_variant USING btree
    (ram_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_mobile_variant_storage_id_index02
    ON public.product_mobile_variant USING btree
    (storage_id ASC NULLS LAST)
    TABLESPACE pg_default;