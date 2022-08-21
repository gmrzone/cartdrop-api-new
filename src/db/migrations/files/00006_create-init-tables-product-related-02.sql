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
        REFERENCES public.refrigerator_type(id) MATCH SIMPLE
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
        REFERENCES public.speaker_type(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.speakers_features
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.speakers_features_id_seq
    OWNED by speakers_features.id;

CREATE INDEX IF NOT EXISTS speakers_features_type_id_index01
    ON public.speakers_features USING btree
    (type_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT TELEVISION FEATURES

CREATE SEQUENCE IF NOT EXISTS public.television_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.television_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.television_features (
    id bigint NOT NULL DEFAULT nextval('television_features_id_seq'::regclass),
    series_id bigint,
    screen_type_id bigint NOT NULL,
    display_size character varying(100) COLLATE pg_catalog."default" NOT NULL,
    refresh_rate character varying(100) COLLATE pg_catalog."default" NOT NULL,
    usb_count integer NOT NULL,
    is_3d boolean NOT NULL,
    is_curved boolean NOT NULL,
    has_wifi boolean NOT NULL,
    includes_wallmount boolean NOT NULL,

    CONSTRAINT television_features_pkey PRIMARY KEY(id),
    CONSTRAINT television_features_series_id_fk_series_table FOREIGN KEY(series_id)
        REFERENCES public.product_series(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT television_features_screen_type_id_fk_screen_type_tab FOREIGN KEY(screen_type_id)
        REFERENCES public.product_screen_type(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT television_features_usb_count_check CHECK (usb_count >= 0)

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.television_features
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.television_features_id_seq
    OWNED by television_features.id;
    
-- TELEVISION FEATURES INDEXES

CREATE INDEX IF NOT EXISTS television_features_series_id_index01
    ON public.television_features USING btree
    (series_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS television_features_screen_type_id_index02
    ON public.television_features USING btree
    (screen_type_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- WASHING MACHINE FEATURES TABLE

CREATE SEQUENCE IF NOT EXISTS public.washing_machine_features_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.washing_machine_features_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.washing_machine_features (
    id bigint NOT NULL DEFAULT nextval('washing_machine_features_id_seq'::regclass),
    washing_method_id bigint NOT NULL,
    energy_rating integer NOT NULL,
    washing_capacity integer NOT NULL,
    has_inbuilt_heater boolean NOT NULL,

    CONSTRAINT washing_machine_features_pkey PRIMARY KEY(id),
    CONSTRAINT washing_machine_features_washing_method_id_fk_145621 FOREIGN KEY(washing_method_id)
        REFERENCES public.washing_methods(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT washing_machine_features_energy_rating_check CHECK(energy_rating >= 0),
    CONSTRAINT washing_machine_features_washing_capacity_check CHECK (washing_capacity >= 0)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.washing_machine_features
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.washing_machine_features_id_seq
    OWNED by washing_machine_features.id;

-- WASHING MACHINE FEATURES INDEXES

CREATE INDEX IF NOT EXISTS washing_machine_features_washing_method_id_index01
    ON public.washing_machine_features USING btree
    (washing_method_id ASC NULLS LAST)
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
    laptop_id bigint,
    refrigerator_id bigint,
    speaker_id bigint,
    television_id bigint,
    washing_machine_id bigint,
    CONSTRAINT products_features_pkey PRIMARY KEY(id),
    CONSTRAINT product_feature_mobile_id_unique UNIQUE(mobile_id),
    CONSTRAINT product_feature_laptop_id_unique UNIQUE(laptop_id),
    CONSTRAINT product_feature_refrigerator_id_unique UNIQUE(refrigerator_id),
    CONSTRAINT product_feature_speaker_id_unique UNIQUE(speaker_id),
    CONSTRAINT product_feature_television_id_unique UNIQUE(television_id),
    CONSTRAINT product_feature_washing_machine_id_unique UNIQUE(washing_machine_id),
    CONSTRAINT feature_mobile_id_fk_mobile_features FOREIGN KEY(mobile_id)
        REFERENCES public.mobile_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT feature_laptop_id_fk_laptop_features FOREIGN KEY(laptop_id)
        REFERENCES public.laptop_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT feature_refrigerator_id_fk_refrigerator_features FOREIGN KEY(refrigerator_id)
        REFERENCES public.refrigerator_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT feature_speaker_id_fk_speaker_features FOREIGN KEY(speaker_id)
        REFERENCES public.speakers_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT feature_television_id_fk_television_features FOREIGN KEY(television_id)
        REFERENCES public.television_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT feature_washing_machine_id_fk_washing_machine_features FOREIGN KEY(washing_machine_id)
        REFERENCES public.washing_machine_features(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_features
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.products_features_id_seq
    OWNED by products_features.id;