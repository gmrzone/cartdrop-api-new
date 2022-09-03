-- LAPTOP VARIANT TABLE


CREATE SEQUENCE IF NOT EXISTS public.product_laptop_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_laptop_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_laptop_variant (
    id bigint NOT NULL DEFAULT nextval('product_laptop_variant_id_seq'::regclass),
    display_size character varying(100) COLLATE pg_catalog."default" NOT NULL,
    ram_id bigint NOT NULL,
    storage_id bigint NOT NULL,

    CONSTRAINT product_laptop_variant_pkey PRIMARY KEY (id),
    CONSTRAINT product_laptop_variant_ram_id_fk_ram FOREIGN KEY(ram_id)
        REFERENCES public.products_ram(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_laptop_variant_storage_id_fk_storage FOREIGN KEY(storage_id)
        REFERENCES public.products_storage(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_laptop_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_laptop_variant_id_seq
    OWNED BY product_laptop_variant.id;

-- INDEX FOR MOBILE VARIANT ram_id and storage_id

CREATE INDEX IF NOT EXISTS product_laptop_variant_ram_id_index01
    ON public.product_laptop_variant USING btree
    (ram_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_laptop_variant_storage_id_index02
    ON public.product_laptop_variant USING btree
    (storage_id ASC NULLS LAST)
    TABLESPACE pg_default;

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
    laptop_variant_id bigint NOT NULL,
    fashion_variant_id bigint NOT NULL,


    CONSTRAINT product_variant_pkey PRIMARY KEY(id),
    CONSTRAINT product_fashion_variant_id_unique UNIQUE (fashion_variant_id),
    CONSTRAINT product_mobile_variant_id_unique UNIQUE (mobile_variant_id),
    CONSTRAINT product_laptop_variant_id_unique UNIQUE (laptop_variant_id),
    CONSTRAINT mobile_variant_id_fk_mobile_variant_table FOREIGN KEY(mobile_variant_id)
        REFERENCES public.product_mobile_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT laptop_variant_id_fk_laptop_variant_table FOREIGN KEY(laptop_variant_id)
        REFERENCES public.product_laptop_variant(id) MATCH SIMPLE
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