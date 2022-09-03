
-- PRODUCT VARIATION TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_variant (
    id bigint NOT NULL DEFAULT nextval('product_variant_id_seq'::regclass),
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    mobile_variant_id bigint NOT NULL,
    fashion_variant_id bigint NOT NULL,


    CONSTRAINT product_variant_pkey PRIMARY KEY(id),
    CONSTRAINT product_fashion_variant_id_unique UNIQUE (fashion_variant_id),
        CONSTRAINT product_mobile_variant_id_unique UNIQUE (mobile_variant_id),
    CONSTRAINT mobile_variant_id_fk_mobile_variant_table FOREIGN KEY(mobile_variant_id)
        REFERENCES public.product_mobile_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fashion_variant_id_fk_fashion_variant_table FOREIGN KEY(fashion_variant_id)
        REFERENCES public.product_fashion_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_variant
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_variant_id_seq
    OWNED by product_variant.id;