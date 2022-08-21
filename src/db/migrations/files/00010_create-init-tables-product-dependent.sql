-- TABLES THATE ARE DEPENDENT OF PRODUCT AND PRODUCT VARIATION
-- PRODUCT REVIEW TABLES

CREATE SEQUENCE IF NOT EXISTS public.product_reviews_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_reviews_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_reviews (
    id bigint NOT NULL DEFAULT nextval('product_reviews_id_seq'::regclass),
    uuid uuid NOT NULL,
    user_id bigint NOT NULL,
    product_id bigint NOT NULL,
    parent_id bigint,
    review text COLLATE pg_catalog."default" NOT NULL,
    active boolean NOT NULL,
    is_certified_buyer boolean NOT NULL,
    likes bigint NOT NULL,
    dislikes bigint NOT NULL,
    stars integer NOT NULL,
    created timestamp with time zone NOT NULL,
    updated timestamp with time zone NOT NULL,

    CONSTRAINT product_reviews_pkey PRIMARY KEY(id),
    CONSTRAINT product_reviews_uuid_unique UNIQUE (uuid),
    CONSTRAINT product_reviews_user_id_fk_user_table FOREIGN KEY(user_id)
        REFERENCES public.users(id) MATCH SIMPLE
        ON DELETE CASCADE
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_reviews_product_id_fk_product_table FOREIGN KEY(product_id)
        REFERENCES public.products(id) MATCH SIMPLE
        ON DELETE CASCADE
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_reviews_parent_id_fk_self FOREIGN KEY(parent_id)
        REFERENCES public.product_reviews(id) MATCH SIMPLE
        ON DELETE CASCADE
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT product_reviews_stars_check CHECK(stars > 0 and stars <= 5),
    CONSTRAINT product_reviews_likes_check CHECK (likes >= 0),
    CONSTRAINT product_reviews_dislikes_check CHECK(dislikes >= 0)
    
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_reviews
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS product_reviews_id_seq
    OWNED BY product_reviews.id;

-- PRODUCT REVIEWS INDEXES

CREATE INDEX IF NOT EXISTS product_reviews_user_id_index01
    ON public.product_reviews USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_reviews_product_id_index02
    ON public.product_reviews USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_reviews_parent_id_index03
    ON public.product_reviews USING btree
    (parent_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS product_reviews_created_index04
    ON public.product_reviews USING btree
    (created ASC NULLS LAST)
    TABLESPACE pg_default;

-- PRODUCT REVIEW IMAGES

CREATE SEQUENCE IF NOT EXISTS public.product_reviews_images_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.product_reviews_images_id_seq
    OWNER to afzal;

CREATE TABLE IF NOT EXISTS public.product_reviews_images (
    id bigint NOT NULL DEFAULT nextval('product_reviews_images_id_seq'::regclass),
    image character varying(100) COLLATE pg_catalog."default" NOT NULL,
    review_id bigint NOT NULL,

    CONSTRAINT product_reviews_images_pkey PRIMARY KEY(id),
    CONSTRAINT product_reviews_images_review_id_fk_review FOREIGN KEY(review_id)
        REFERENCES public.product_reviews(id) MATCH SIMPLE
        ON DELETE CASCADE
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_reviews_images
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.product_reviews_images_id_seq
    OWNED BY product_reviews_images.id;

CREATE INDEX IF NOT EXISTS product_reviews_images_review_id_index01
    ON public.product_reviews_images USING btree
    (review_id ASC NULLS LAST)
    TABLESPACE pg_default;
