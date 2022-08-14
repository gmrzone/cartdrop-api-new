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

-- Coupon Table

CREATE SEQUENCE IF NOT EXISTS coupon_codes_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE coupon_codes_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.coupon_codes (
    id bigint NOT NULL DEFAULT nextval('coupon_codes_id_seq'::regclass),
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,
    uuid uuid NOT NULL,
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    discount integer NOT NULL,
    valid_from  timestamp with time zone NOT NULL,
    valid_to  timestamp with time zone NOT NULL,
    active boolean NOT NULL,
    reusable_type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    summary character varying(200) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT coupon_code_pkey PRIMARY KEY(id),
    CONSTRAINT coupon_code_uuid_unique UNIQUE(uuid),
    CONSTRAINT coupon_code_discount_check CHECK (discount >=0 and discount <= 100)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coupon_code
    OWNER TO afzal;

ALTER SEQUENCE coupon_codes_id_seq
    OWNED BY coupon_codes.id;

-- COUPON INDEXES

CREATE INDEX IF NOT EXISTS coupon_codes_code_index01
    ON public.coupon_codes USING btree
    (code COLLATE pg_catalog."default" ASC NULLS LAST) 
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_code_index02_like
    ON public.coupon_codes USING btree
    (code COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_created_index03
    ON public.coupon_codes USING btree
    (created ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_valid_from_index03
    ON public.coupon_codes USING btree
    (valid_from ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_code_valid_to_index03
    ON public.coupon_codes USING btree
    (valid_to ASC NULLS LAST)
    TABLESPACE pg_default;

-- CATEGORY TABLES






