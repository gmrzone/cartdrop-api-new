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

-- INDEX FOR LAPTOP VARIANT ram_id and storage_id

CREATE INDEX IF NOT EXISTS product_laptop_variant_ram_id_index01
    ON public.product_laptop_variant USING btree
    (ram_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_laptop_variant_storage_id_index02
    ON public.product_laptop_variant USING btree
    (storage_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT AIR CONDITIONER VARIANT

CREATE SEQUENCE IF NOT EXISTS public.product_air_conditioner_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_air_conditioner_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_air_conditioner_variant (
    id bigint NOT NULL DEFAULT nextval('product_air_conditioner_variant_id_seq'::regclass),
    capacity_id bigint NOT NULL,
    star_rating_id bigint NOT NULL,

    CONSTRAINT product_air_conditioner_variant_pkey PRIMARY KEY (id),
    CONSTRAINT product_air_conditioner_variant_capacity_id_fk FOREIGN KEY(capacity_id)
        REFERENCES public.product_ac_capacity(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_air_conditioner_variant_starrating_id_fk FOREIGN KEY(star_rating_id)
        REFERENCES public.product_ac_star_rating(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_air_conditioner_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_air_conditioner_variant_id_seq
    OWNED BY product_air_conditioner_variant.id;

-- AIR CONDITONER VARIANT INDEXES

CREATE INDEX IF NOT EXISTS product_air_conditioner_variant_capacity_id_index01
    ON public.product_air_conditioner_variant USING btree
    (capacity_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_air_conditioner_variant_star_rating_id_index02
    ON public.product_air_conditioner_variant USING btree
    (star_rating_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT TV VARIANT

CREATE SEQUENCE IF NOT EXISTS public.product_television_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_television_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_television_variant (
    id bigint NOT NULL DEFAULT nextval('product_television_variant_id_seq'::regclass),
    display_size character varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_television_variant_pkey PRIMARY KEY (id)

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_television_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_television_variant_id_seq
    OWNED BY product_television_variant.id;

-- PRODUCT REFRIGERATOR VARIANT

CREATE SEQUENCE IF NOT EXISTS public.product_refrigerator_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_refrigerator_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_refrigerator_variant (
    id bigint NOT NULL DEFAULT nextval('product_refrigerator_variant_id_seq'::regclass),
    capacity character varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_refrigerator_variant_pkey PRIMARY KEY (id)

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_refrigerator_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_refrigerator_variant_id_seq
    OWNED BY product_refrigerator_variant.id;

-- PRODUCT JUICE VARIANT

CREATE SEQUENCE IF NOT EXISTS public.product_juice_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_juice_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_juice_variant (
    id bigint NOT NULL DEFAULT nextval('product_juice_variant_id_seq'::regclass),
    quantity character varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_juice_variant_pkey PRIMARY KEY (id)

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_juice_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_juice_variant_id_seq
    OWNED BY product_juice_variant.id;

-- PRODUCT BOOK VARIANT TABLE

CREATE SEQUENCE IF NOT EXISTS public.product_book_variant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_book_variant_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_book_variant (
    id bigint NOT NULL DEFAULT nextval('product_book_variant_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT product_book_variant_pkey PRIMARY KEY (id)

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_book_variant
    OWNER TO afzal;

ALTER SEQUENCE public.product_book_variant_id_seq
    OWNED BY product_book_variant.id;


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
    air_conditioner_variant_id bigint NOT NULL,
    television_variant_id bigint NOT NULL,
    refrigerator_variant_id bigint NOT NULL,
    juice_variant_id bigint NOT NULL,
    book_variant_id bigint NOT NULL,

    CONSTRAINT product_variant_pkey PRIMARY KEY(id),
    CONSTRAINT product_fashion_variant_id_unique UNIQUE (fashion_variant_id),
    CONSTRAINT product_mobile_variant_id_unique UNIQUE (mobile_variant_id),
    CONSTRAINT product_laptop_variant_id_unique UNIQUE (laptop_variant_id),
    CONSTRAINT product_air_conditioner_variant_id_unique UNIQUE (air_conditioner_variant_id),
    CONSTRAINT product_television_variant_id_unique UNIQUE (television_variant_id),
    CONSTRAINT product_refrigerator_variant_id_unique UNIQUE (refrigerator_variant_id),
    CONSTRAINT product_juice_variant_id_unique UNIQUE (juice_variant_id),
    CONSTRAINT book_variant_id_unique UNIQUE (book_variant_id),
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
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT air_conditioner_variant_id_fk_air_conditioner_variant_table FOREIGN KEY(air_conditioner_variant_id)
        REFERENCES public.product_air_conditioner_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT television_variant_id_fk_television_variant_table FOREIGN KEY(television_variant_id)
        REFERENCES public.product_television_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT refrigerator_variant_id_fk_refrigerator_variant_table FOREIGN KEY(refrigerator_variant_id)
        REFERENCES public.product_refrigerator_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT juice_variant_id_fk_juice_variant_table FOREIGN KEY(juice_variant_id)
        REFERENCES public.product_juice_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT book_variant_id_fk_book_variant_table FOREIGN KEY(book_variant_id)
        REFERENCES public.product_book_variant(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED

)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_variant
    OWNER to afzal;

ALTER SEQUENCE IF EXISTS public.product_variant_id_seq
    OWNED by product_variant.id;