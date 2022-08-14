-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.users (
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
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
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_number_key UNIQUE (number),
    CONSTRAINT users_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users OWNER to afzal;

-- Index: users_email_index01_like

-- DROP INDEX IF EXISTS public.users_email_index01_like;

CREATE INDEX IF NOT EXISTS users_email_index01_like
    ON public.users USING btree
    (email COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: users_number_index02_like

-- DROP INDEX IF EXISTS users_number_index02_like;

CREATE INDEX IF NOT EXISTS users_number_index02_like
    ON public.users USING btree
    (number COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: users_type_index03

-- DROP INDEX IF EXISTS public.users_type_index03;

CREATE INDEX IF NOT EXISTS users_type_index03
    ON public.users USING btree
    (type COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: user_type_index04_like

-- DROP INDEX IF EXISTS public.user_type_index04_like;

CREATE INDEX IF NOT EXISTS user_type_index04_like
    ON public.users USING btree
    (type COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;

-- Index: users_username_index05_like

-- DROP INDEX IF EXISTS public.users_username_index05_like;

CREATE INDEX IF NOT EXISTS users_username_index05_like
    ON public.users USING btree
    (username COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;


-- Index: users_first_name_index06

-- DROP INDEX IF EXISTS public.users_first_name_index06;

CREATE INDEX IF NOT EXISTS users_first_name_index06
    ON public.users USING btree
    (first_name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: users_first_name_index07_like

-- DROP INDEX IF EXISTS public.users_first_name_index07_like;

CREATE INDEX IF NOT EXISTS users_first_name_index07_like
    ON public.users USING btree
    (first_name COLLATE pg_catalog."default" varchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;



