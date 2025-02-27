-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.admins
(
    admin_id serial NOT NULL,
    prison_id integer,
    admin_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    access_level integer NOT NULL,
    CONSTRAINT admins_pkey PRIMARY KEY (admin_id),
    CONSTRAINT admins_admin_email_key UNIQUE (admin_email),
    CONSTRAINT admins_prison_id_key UNIQUE (prison_id)
);

CREATE TABLE IF NOT EXISTS public.guard_shifts
(
    shift_id serial NOT NULL,
    guard_id integer,
    shift_date date,
    shift_start time without time zone,
    shift_end time without time zone,
    shift_description text COLLATE pg_catalog."default",
    CONSTRAINT guard_shifts_pkey PRIMARY KEY (shift_id)
);

CREATE TABLE IF NOT EXISTS public.guards
(
    guard_id serial NOT NULL,
    prison_id integer,
    person_id integer,
    joining_date date,
    shift character varying(50) COLLATE pg_catalog."default",
    qr_code integer,
    CONSTRAINT guards_pkey PRIMARY KEY (guard_id)
);

CREATE TABLE IF NOT EXISTS public.incident_reports
(
    incident_id serial NOT NULL,
    reported_by_guard_id integer,
    prisoner_involved_id integer,
    incident_date date,
    incident_time time without time zone,
    incident_description text COLLATE pg_catalog."default",
    action_taken text COLLATE pg_catalog."default",
    resolution_date date,
    additional_notes text COLLATE pg_catalog."default",
    CONSTRAINT incident_reports_pkey PRIMARY KEY (incident_id)
);

CREATE TABLE IF NOT EXISTS public.person
(
    person_id serial NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    dob date,
    age integer,
    nationality character varying(100) COLLATE pg_catalog."default",
    gender character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT person_pkey PRIMARY KEY (person_id)
);

CREATE TABLE IF NOT EXISTS public.prisoner_medical_records
(
    record_id serial NOT NULL,
    prisoner_id integer,
    checkup_date date,
    diagnosis text COLLATE pg_catalog."default",
    treatment text COLLATE pg_catalog."default",
    doctor_name character varying(100) COLLATE pg_catalog."default",
    follow_up_date date,
    special_care_required boolean,
    CONSTRAINT prisoner_medical_records_pkey PRIMARY KEY (record_id)
);

CREATE TABLE IF NOT EXISTS public.prisoners
(
    prisoner_id serial NOT NULL,
    prison_id integer,
    person_id integer,
    sentence_start_date date,
    sentence_end_date date,
    status character varying(50) COLLATE pg_catalog."default",
    sentence text COLLATE pg_catalog."default",
    crime text COLLATE pg_catalog."default",
    visitor_id integer,
    CONSTRAINT prisoners_pkey PRIMARY KEY (prisoner_id)
);

CREATE TABLE IF NOT EXISTS public.prisons
(
    prison_id serial NOT NULL,
    prison_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    prison_location character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT prisons_pkey PRIMARY KEY (prison_id)
);

CREATE TABLE IF NOT EXISTS public.visitingdetails
(
    visiting_id serial NOT NULL,
    prison_id integer,
    day_of_week character varying(20) COLLATE pg_catalog."default",
    start_time time without time zone,
    end_time time without time zone,
    CONSTRAINT visitingdetails_pkey PRIMARY KEY (visiting_id)
);

CREATE TABLE IF NOT EXISTS public.visitingreservations
(
    reservation_id serial NOT NULL,
    slot_id integer,
    prisoner_id integer,
    visitor_id integer,
    reservation_time time without time zone,
    CONSTRAINT visitingreservations_pkey PRIMARY KEY (reservation_id)
);

CREATE TABLE IF NOT EXISTS public.visitingslots
(
    slot_id serial NOT NULL,
    visiting_id integer,
    slot_time time without time zone,
    capacity integer,
    current_visitor integer DEFAULT 0,
    CONSTRAINT visitingslots_pkey PRIMARY KEY (slot_id)
);

CREATE TABLE IF NOT EXISTS public.visitors
(
    visitor_id serial NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default",
    last_name character varying(100) COLLATE pg_catalog."default",
    relationship_to_prisoner character varying(100) COLLATE pg_catalog."default",
    contact_number character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT visitors_pkey PRIMARY KEY (visitor_id)
);

ALTER TABLE IF EXISTS public.admins
    ADD CONSTRAINT admins_prison_id_fkey FOREIGN KEY (prison_id)
    REFERENCES public.prisons (prison_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS admins_prison_id_key
    ON public.admins(prison_id);


ALTER TABLE IF EXISTS public.guard_shifts
    ADD CONSTRAINT guard_shifts_guard_id_fkey FOREIGN KEY (guard_id)
    REFERENCES public.guards (guard_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.guards
    ADD CONSTRAINT guards_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.guards
    ADD CONSTRAINT guards_prison_id_fkey FOREIGN KEY (prison_id)
    REFERENCES public.prisons (prison_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.incident_reports
    ADD CONSTRAINT incident_reports_prisoner_involved_id_fkey FOREIGN KEY (prisoner_involved_id)
    REFERENCES public.prisoners (prisoner_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.incident_reports
    ADD CONSTRAINT incident_reports_reported_by_guard_id_fkey FOREIGN KEY (reported_by_guard_id)
    REFERENCES public.guards (guard_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.prisoner_medical_records
    ADD CONSTRAINT prisoner_medical_records_prisoner_id_fkey FOREIGN KEY (prisoner_id)
    REFERENCES public.prisoners (prisoner_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.prisoners
    ADD CONSTRAINT prisoners_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.prisoners
    ADD CONSTRAINT prisoners_prison_id_fkey FOREIGN KEY (prison_id)
    REFERENCES public.prisons (prison_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.prisoners
    ADD CONSTRAINT prisoners_visitor_id_fkey FOREIGN KEY (visitor_id)
    REFERENCES public.visitors (visitor_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.visitingdetails
    ADD CONSTRAINT visitingdetails_prison_id_fkey FOREIGN KEY (prison_id)
    REFERENCES public.prisons (prison_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.visitingreservations
    ADD CONSTRAINT visitingreservations_prisoner_id_fkey FOREIGN KEY (prisoner_id)
    REFERENCES public.prisoners (prisoner_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.visitingreservations
    ADD CONSTRAINT visitingreservations_slot_id_fkey FOREIGN KEY (slot_id)
    REFERENCES public.visitingslots (slot_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.visitingreservations
    ADD CONSTRAINT visitingreservations_visitor_id_fkey FOREIGN KEY (visitor_id)
    REFERENCES public.visitors (visitor_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.visitingslots
    ADD CONSTRAINT visitingslots_visiting_id_fkey FOREIGN KEY (visiting_id)
    REFERENCES public.visitingdetails (visiting_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

END;