-- TABLE auth_group

CREATE SEQUENCE IF NOT EXISTS public.auth_group_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY auth_group.id;

ALTER SEQUENCE public.auth_group_id_seq
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.auth_group (
    id integer NOT NULL DEFAULT nextval('auth_group_seq_id':regclass),
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_group_pkey PRIMARY KEY (id),
    CONSTRAINT auth_group_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.auth_group
    OWNER to afzal;

-- auth_group INDEXES

CREATE INDEX IF NOT EXISTS public.auth_group_name_index01_like
    ON public.auth_group USING btree
    (name COLLATE pg_catalog."default" varchat_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;


-- TABLE user_group
CREATE SEQUENCE IF NOT EXISTS public.user_groups_seq_id
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY accounts_cartdropuser.id;

ALTER SEQUENCE public.user_groups_seq_id
    OWNER TO afzal;

CREATE TABLE IF NOT EXISTS public.user_groups (
    id bigint NOT NULL DEFAULT nextval('user_groups_seq_id'::regclass),
    user_id bigint NOT NULL,
    group_id integer NOT NULL,
    CONSTRAINT user_groups_pkey PRIMARY KEY (id),
    CONSTRAINT user_groups_userid_groupid_uniq UNIQUE (user_id, group_id),
    CONSTRAINT user_groups_user_id_fk_users_is FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT user_groups_group_id_fk_auth_group_id FOREIGN KEY (group_id)
        REFERENCES public.auth_group (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_groups
    OWNER to afzal;

-- user_groups Indexes

CREATE INDEX IF NOT EXISTS user_groups_user_id_index01
    ON public.user_groups USING btree
    (user_id ASC NULL LAST)
    TABLESPACE pg_default;


CREATE INDEX IF NOT EXISTS user_groups_group_id_index02
    ON public.user_groups USING btree
    (group_id ASC NULL LAST)
    TABLESPACE pg_default;

