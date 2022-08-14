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


