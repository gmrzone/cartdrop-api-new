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