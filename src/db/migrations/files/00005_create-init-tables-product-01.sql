-- PRODUCT AC CAPACITY VARIANT

CREATE SEQUENCE IF NOT EXISTS product_ac_capacity_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 1
    CACHE 1;

ALTER SEQUENCE IF NOT EXISTS product_ac_capacity_id_seq
    OWNER to afzal;


CREATE TABLE IF NOT EXISTS public.product_ac_capacity (
    id bigint NOT NULL DEFAULT nextval('product_ac_capacity_id_seq'::regclass),
    capicity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_ac_capacity_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_ac_capacity
    OWNER to afzal;

ALTER SEQUENCE IF NOT EXISTS product_ac_capacity_id_seq
    OWNED by product_ac_capacity.id;