-- Table: public.teachers

-- DROP TABLE public.teachers;

CREATE TABLE public.teachers
(
    id integer NOT NULL DEFAULT nextval('teachers_id_seq'::regclass),
    avatar_url text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    birth_date timestamp without time zone,
    education_level text COLLATE pg_catalog."default",
    class_type text COLLATE pg_catalog."default",
    subjects_taught text COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    CONSTRAINT teachers_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.teachers
    OWNER to postgres;


-- Table: public.students

-- DROP TABLE public.students;

CREATE TABLE public.students
(
    id integer NOT NULL DEFAULT nextval('students_id_seq'::regclass),
    avatar_url text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    birth timestamp without time zone,
    grade text COLLATE pg_catalog."default",
    workload integer,
    teacher_id integer,
    CONSTRAINT students_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.students
    OWNER to postgres;