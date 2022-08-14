-- Table: public.accounts_cartdrop_users

-- DROP TABLE IF EXISTS public.accounts_cartdrop_users;

CREATE SEQUENCE public.accounts_cartdrop_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.accounts_cartdrop_users (
    id bigint NOT NULL DEFAULT nextval('accounts_cartdrop_users_id_seq'::regclass),
    password character varying(128) COLLATE pg_catalog."default" NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    number character varying(10) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    photo character varying(100) COLLATE pg_catalog."default" NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    is_email_verified boolean NOT NULL,
    is_number_verified boolean NOT NULL,
    is_disabled boolean NOT NULL,
    CONSTRAINT accounts_cartdrop_users_pkey PRIMARY KEY (id),
    CONSTRAINT accounts_cartdrop_users_email_key UNIQUE (email),
    CONSTRAINT accounts_cartdrop_users_number_key UNIQUE (number),
    CONSTRAINT accounts_cartdrop_users_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.accounts_cartdrop_users OWNER to afzal;

-- Index: accounts_cartdrop_users_email_index01_like

-- DROP INDEX IF EXISTS public.accounts_cartdrop_users_email_index01_like;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_users_email_index01_like
    ON public.accounts_cartdrop_users USING btree
    (email COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: accounts_cartdrop_users_number_index02_like

-- DROP INDEX IF EXISTS accounts_cartdrop_users_number_index02_like;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_users_number_index02_like
    ON public.accounts_cartdrop_users USING btree
    (number COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: accounts_cartdrop_users_type_index03

-- DROP INDEX IF EXISTS public.accounts_cartdrop_users_type_index03;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_users_type_index03
    ON public.accounts_cartdrop_users USING btree
    (type COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: accounts_cartdrop_user_type_index04_like

-- DROP INDEX IF EXISTS public.accounts_cartdrop_user_type_index04_like;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_user_type_index04_like
    ON public.accounts_cartdrop_users USING btree
    (type COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: accounts_cartdrop_users_username_index05_like

-- DROP INDEX IF EXISTS public.accounts_cartdrop_users_username_index05_like;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_users_username_index05_like
    ON public.accounts_cartdrop_users USING btree
    (username COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;


-- Index: accounts_cartdrop_users_first_name_index06

-- DROP INDEX IF EXISTS public.accounts_cartdrop_users_first_name_index06;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_users_first_name_index06
    ON public.accounts_cartdrop_users USING btree
    (first_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: accounts_cartdrop_users_first_name_index07_like

-- DROP INDEX IF EXISTS public.accounts_cartdrop_users_first_name_index07_like;

CREATE INDEX IF NOT EXISTS accounts_cartdrop_users_first_name_index07_like
    ON public.accounts_cartdrop_users USING btree
    (first_name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;



