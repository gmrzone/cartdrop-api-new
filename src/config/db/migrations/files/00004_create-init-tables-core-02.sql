-- COUPON CODE AND PRODUCT SUBCATEGORY INTERMEDIATE TABLE

CREATE SEQUENCE IF NOT EXISTS public.coupon_codes_subcategory_intermediate_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.coupon_codes_subcategory_intermediate_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.coupon_codes_subcategory_intermediate (
    id bigint NOT NULL DEFAULT nextval('coupon_codes_subcategory_intermediate_id_seq'::regclass),
    coupon_code_id bigint NOT NULL,
    subcategory_id bigint NOT NULL,
    CONSTRAINT coupon_codes_subcategory_intermediate_pkey PRIMARY KEY(id),
    CONSTRAINT coupon_code_id_subcategory_id_unique UNIQUE(coupon_code_id, subcategory_id),
    CONSTRAINT intermediate_coupon_code_id_fk_coupon_code FOREIGN KEY(coupon_code_id)
        REFERENCES public.coupon_codes(id) MATCH SIMPLE
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coupon_codes_subcategory_intermediate
    OWNER TO afzal;

ALTER SEQUENCE IF EXISTS public.coupon_codes_subcategory_intermediate_id_seq
    OWNED BY coupon_codes_subcategory_intermediate.id;

-- COUPON CODE AND PRODUCT SUBCATEGORY INTERMEDIATE INDEXES

CREATE INDEX IF NOT EXISTS coupon_codes_subcategory_intermediate_coupon_code_id_index01
    ON public.coupon_codes_subcategory_intermediate USING btree
    (coupon_code_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS coupon_codes_subcategory_intermediate_subcategory_id_index02
    ON public.coupon_codes_subcategory_intermediate USING btree
    (subcategory_id ASC NULLS LAST)
    TABLESPACE pg_default; 