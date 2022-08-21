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