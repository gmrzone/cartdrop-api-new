
-- PRODUCT RELATED TABLES

-- PRODUCT OPERATING SYSTEM TABLE (for Mobile/laptop ETC)

CREATE SEQUENCE IF NOT EXISTS public.operating_system_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.operating_system_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.operating_system (
    id bigint NOT NULL DEFAULT nextval('operating_system_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    version character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT operating_system_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.operating_system
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.operating_system_id_seq
    OWNED by operating_system.id;

-- PRODUCT MOBILE FEATURE TABLE

CREATE SEQUENCE IF NOT EXISTS public.mobile_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.mobile_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.mobile_features (
    id bigint NOT NULL DEFAULT nextval('mobile_features_id_seq'::regclass),
    display_type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    display_size character varying(100) COLLATE pg_catalog."default" NOT NULL,
    resolution character varying(100) COLLATE pg_catalog."default" NOT NULL,
    battery_capacity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    touchscreen boolean NOT NULL,
    smart_phone boolean NOT NULL,
    operating_system_id bigint NOT NULL,

    CONSTRAINT mobile_features_pkey PRIMARY KEY(id),
    CONSTRAINT mobile_features_operating_system_fkey FOREIGN KEY(operating_system_id)
        REFERENCES public.operating_system(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
) 
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.mobile_features
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.mobile_features_id_seq
    OWNED by mobile_features.id;

CREATE INDEX IF NOT EXISTS mobile_features_operating_system_id_index01
    ON public.mobile_features USING btree
    (operating_system_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT FEATURE TABLE

CREATE SEQUENCE IF NOT EXISTS public.products_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.products_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.products_features (
    id bigint NOT NULL DEFAULT nextval('products_features_id_seq'::regclass),
    mobile_id bigint,

    CONSTRAINT products_features_pkey PRIMARY KEY(id),
    CONSTRAINT product_feature_mobile_id_unique UNIQUE(mobile_id),
    CONSTRAINT feature_mobile_id_fk_mobile_features FOREIGN KEY(mobile_id)
        REFERENCES public.mobile_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_features
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.products_features_id_seq
    OWNED by products_features.id;



-- PRODUCT VARIATION RELATED TABLES

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
    capactiy character varying(100) COLLATE pg_catalog."default" NOT NULL,
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ram_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_ram
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.products_ram_id_seq
    OWNED by products_ram.id;

-- PRODUCT WARRENTY TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_warranty_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_warranty_id_seq
    OWNER TO afzal;


CREATE TABLE IF NOT EXISTS public.product_warranty (
    id bigint NOT NULL DEFAULT nextval('product_warranty_id_seq'::regclass),
    summary text COLLATE pg_catalog."default" NOT NULL,
    covered character varying(200) COLLATE pg_catalog."default" NOT NULL,
    not_covered character varying(200) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_warranty_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_warranty
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_warranty_id_seq
    OWNED by product_warranty.id;


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
    capicity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_ac_capacity_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_ac_capacity
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_ac_capacity_id_seq
    OWNED by product_ac_capacity.id;

