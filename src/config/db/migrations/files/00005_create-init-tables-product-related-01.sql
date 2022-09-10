
-- PRODUCT RELATED TABLES

-- PRODUCT WASHING MACHINE WASHING METHOD TABLE

CREATE SEQUENCE IF NOT EXISTS public.washing_method_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.washing_method_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.washing_methods (
    id bigint NOT NULL DEFAULT nextval('washing_method_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT products_washingmethod_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.washing_methods
    OWNER TO afzal;

ALTER SEQUENCE public.washing_method_seq
    OWNED BY washing_methods.id;

-- PRODUCT SCREEN TYPE

CREATE SEQUENCE IF NOT EXISTS public.product_screen_type_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_screen_type_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_screen_type (
    id bigint NOT NULL DEFAULT nextval('product_screen_type_seq'::regclass),
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT product_screen_type_pkey PRIMARY KEY(id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_screen__type
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_screen_type_seq
    OWNED by product_screen_type.id;

-- PRODUCT SPEAKER TYPE TABLE

CREATE SEQUENCE IF NOT EXISTS public.speaker_type_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.speaker_type_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.speaker_type (
    id bigint NOT NULL DEFAULT nextval('speaker_type_seq'::regclass),
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT speaker_type_pkey PRIMARY KEY(id),
    CONSTRAINT speaker_type_type_unique UNIQUE (type)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.speaker_type
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.speaker_type_seq
    OWNED by speaker_type.id;

-- PRODUCT REFRIGERATOR TYPE TABLE

CREATE SEQUENCE IF NOT EXISTS public.refrigerator_type_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.refrigerator_type_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.refrigerator_type (
    id bigint NOT NULL DEFAULT nextval('refrigerator_type_seq'::regclass),
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT refrigerator_type_pkey PRIMARY KEY(id),
    CONSTRAINT refrigerator_type_type_unique UNIQUE (type)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.refrigerator_type
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.refrigerator_type_seq
    OWNED by refrigerator_type.id;



-- PRODUCT AIR CONDITIONER TYPE TABLE

CREATE SEQUENCE IF NOT EXISTS public.air_conditioner_type_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.air_conditioner_type_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.air_conditioner_type (
    id bigint NOT NULL DEFAULT nextval('air_conditioner_type_seq'::regclass),
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT air_conditioner_type_pkey PRIMARY KEY(id),
    CONSTRAINT air_conditioner_type_type_unique UNIQUE (type)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.air_conditioner_type
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.air_conditioner_type_seq
    OWNED by air_conditioner_type.id;

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
    slug character varying(100) COLLATE pg_catalog."default" NOT NULL,
    version character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT operating_system_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.operating_system
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.operating_system_id_seq
    OWNED by operating_system.id;

-- OPERATING SYSTEM INDEXES

CREATE INDEX IF NOT EXISTS operating_system_name_index01
    ON public.operating_system USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS operating_system_name_like_index02
    ON public.operating_system USING btree
    (name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS operating_system_slug_index03
    ON public.operating_system USING btree
    (slug COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS operating_system_slug_like_index04
    ON public.operating_system USING btree
    (slug COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

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

