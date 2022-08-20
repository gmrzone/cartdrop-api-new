
-- PRODUCT RELATED TABLES

-- PRODUCT PROCESSOR table (mobile/laptop)

CREATE SEQUENCE IF NOT EXISTS public.product_processor_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_processor_seq
    OWNER to afzal;


CREATE TABLE IF NOT EXISTS public.product_processor (
    id bigint NOT NULL DEFAULT nextval('product_processor_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_processor_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_processor
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_processor_seq
    OWNED by product_processor.id;

CREATE INDEX IF NOT EXISTS product_processor_name_like_index01
    ON public.product_processor USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_processor_name_index02
    ON public.product_processor USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


-- PRODUCT MOBILE SIM TYPE TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_sim_type_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_sim_type_id_seq
    OWNER to afzal;


CREATE TABLE IF NOT EXISTS public.product_sim_type (
    id bigint NOT NULL DEFAULT nextval('product_sim_type_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_sim_type_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_sim_type
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_sim_type_id_seq
    OWNED by product_sim_type.id;


-- PRODUCT SERIES TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_series_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_series_id_seq
    OWNER to afzal;


CREATE TABLE IF NOT EXISTS public.product_series (
    id bigint NOT NULL DEFAULT nextval('product_series_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_series_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_series
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_series_id_seq
    OWNED by product_series.id;

CREATE INDEX IF NOT EXISTS product_series_name_like_index01
    ON public.product_series USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_series_name_index02
    ON public.product_series USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


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
    series_id bigint,
    sim_type_id bigint NOT NULL,
    processor_id bigint,

    CONSTRAINT mobile_features_pkey PRIMARY KEY(id),
    CONSTRAINT mobile_features_operating_system_fkey FOREIGN KEY(operating_system_id)
        REFERENCES public.operating_system(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT mobile_features_series_id_fk_series_table FOREIGN KEY(series_id)
        REFERENCES public.product_series(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT mobile_feature_sim_type_id_fk_sim_type FOREIGN KEY(sim_type_id)
        REFERENCES public.product_sim_type(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT mobile_feature_processor_id_fk_processor_table FOREIGN KEY(processor_id)
        REFERENCES public.product_processor(id) MATCH SIMPLE
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

CREATE INDEX IF NOT EXISTS mobile_features_processor_id_index02
    ON public.mobile_features USING btree
    (processor_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT LAPTOP FEATURE TABLE

CREATE SEQUENCE IF NOT EXISTS public.laptop_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.laptop_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.laptop_features (
    id bigint NOT NULL DEFAULT nextval('laptop_features_id_seq'::regclass),
    display_type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    display_size character varying(100) COLLATE pg_catalog."default" NOT NULL,
    resolution character varying(100) COLLATE pg_catalog."default" NOT NULL,
    battery_capacity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    touchscreen boolean NOT NULL,
    operating_system_id bigint NOT NULL,
    series_id bigint,
    processor_id bigint,

    CONSTRAINT laptop_features_pkey PRIMARY KEY(id),
    CONSTRAINT laptop_features_operating_system_fkey FOREIGN KEY(operating_system_id)
        REFERENCES public.operating_system(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT laptop_features_series_id_fk_series_table FOREIGN KEY(series_id)
        REFERENCES public.product_series(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT laptop_feature_processor_id_fk_processor_table FOREIGN KEY(processor_id)
        REFERENCES public.product_processor(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
) 
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.laptop_features
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.laptop_features_id_seq
    OWNED by laptop_features.id;

CREATE INDEX IF NOT EXISTS laptop_features_operating_system_id_index01
    ON public.laptop_features USING btree
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



