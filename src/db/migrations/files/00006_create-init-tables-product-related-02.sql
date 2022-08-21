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

-- PRODUCT REFRIGERATOR FEATURE

CREATE SEQUENCE IF NOT EXISTS public.refrigerator_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.refrigerator_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.refrigerator_features (
    id bigint NOT NULL DEFAULT nextval('refrigerator_features_id_seq'::regclass),
    type_id bigint NOT NULL,
    capacity character varying(100) COLLATE pg_catalog."default" NOT NULL,
    energy_rating integer NOT NULL,
    compressor_type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    stabilizer_required boolean NOT NULL,

    CONSTRAINT refrigeratorfeature_features_pkey PRIMARY KEY(id),
    CONSTRAINT refrigeratorfeature_features_type_id_fk_type FOREIGN KEY (type_id)
        REFERENCES public.product_type(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT refrigeratorfeature_features_energy_rating_check CHECK (energy_rating >= 0 and energy_rating <= 5)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.refrigerator_features
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.refrigerator_features_id_seq
    OWNED BY refrigerator_features.id;

CREATE INDEX IF NOT EXISTS refrigerator_features_type_id_index01
    ON public.refrigerator_features USING btree
    (type_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT SPEAKER FEATURE

CREATE SEQUENCE IF NOT EXISTS public.speakers_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.speakers_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.speakers_features (
    id bigint NOT NULL DEFAULT nextval('speakers_features_id_seq'::regclass),
    type_id bigint NOT NULL,
    power_output character varying(20) COLLATE pg_catalog."default" NOT NULL,
    frequency_response character varying(100) COLLATE pg_catalog."default" NOT NULL,
    has_bluetooth boolean NOT NULL,

    CONSTRAINT speakers_features_pkey PRIMARY KEY(id),
    CONSTRAINT speakers_features_type_id_fk_type_table FOREIGN KEY(type_id)
        REFERENCES public.product_type(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.speakers_features
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.speakers_features_id_seq
    OWNED by speakers_features.id;

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