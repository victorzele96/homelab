--
-- PostgreSQL database dump
--

\restrict Q9L5JHixZ0QMiIngyr94Q06niVo42lD0ldFHqqy5v5X0qqR3IhpoQgEY35JbM84

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13 (Debian 16.13-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_last_updated_column(); Type: FUNCTION; Schema: public; Owner: victor_home
--

CREATE FUNCTION public.update_last_updated_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_last_updated_column() OWNER TO victor_home;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: victor_home
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    job_title character varying(255) NOT NULL,
    job_link character varying(255) NOT NULL,
    status character varying(50) DEFAULT 'Applied'::character varying,
    notes text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.applications OWNER TO victor_home;

--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: victor_home
--

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.applications_id_seq OWNER TO victor_home;

--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victor_home
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: victor_home
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: victor_home
--

COPY public.applications (id, company_name, job_title, job_link, status, notes, created_at, last_updated) FROM stdin;
22	 bolt	Quality Assurance Engineer	https://www.linkedin.com/jobs/view/4410011880/	Applied	Petah Tikva, Center District, Israel	2026-05-04 14:23:24.532956+00	2026-05-04 15:21:50.18123+00
23	Sela	QA Automation Engineer	https://www.linkedin.com/jobs/view/4412543244	Applied	Ashdod, South District, Israel	2026-05-10 08:23:51.496546+00	2026-05-10 08:24:52.938333+00
25	scytale	QA Engineer	https://scytale.ai/careers/co/tel-aviv-israel/AC.76E/qa-engineer/all/?coref=1.11.p83_4A1D	Applied		2026-05-11 09:34:52.093809+00	2026-05-11 09:34:52.093809+00
26	 Jones Software	Junior Automation Engineer 	https://www.linkedin.com/jobs/view/4412724136/	Applied		2026-05-11 11:14:38.400656+00	2026-05-11 11:14:38.400656+00
27	LAYA	QA Engineer (Manual & Automation)	https://www.linkedin.com/jobs/view/4412798924/	Applied		2026-05-12 08:59:18.334364+00	2026-05-12 08:59:18.334364+00
28	 Thales	Automation Engineer - Platform Group	https://www.linkedin.com/jobs/view/4392345855	Applied		2026-05-12 09:02:41.516393+00	2026-05-12 09:02:41.516393+00
21	Robotican 	DevOps Engineer	https://app.civi.co.il/promo/id=928655&src=20563	Interviewing	Location: Omer, Israel (On-site)	2026-05-04 12:41:00.384041+00	2026-05-13 16:58:30.880857+00
24	Tenable	Test Automation Engineer - Cloud Security	https://www.linkedin.com/jobs/view/4410241823/	Rejected	reffarel efrat 	2026-05-11 09:31:18.061326+00	2026-05-16 18:53:13.001841+00
29	genesys	Software-Engineer--Fixed-Term-Contract	https://genesys.wd1.myworkdayjobs.com/Genesys/job/Tel-Aviv-Israel/Software-Engineer--Fixed-Term-Contract-_JR110799-1	Applied	Itay Dali thinks you’d be a great fit for Genesys	2026-05-18 08:49:52.152069+00	2026-05-18 08:49:52.152069+00
\.


--
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victor_home
--

SELECT pg_catalog.setval('public.applications_id_seq', 29, true);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: victor_home
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict Q9L5JHixZ0QMiIngyr94Q06niVo42lD0ldFHqqy5v5X0qqR3IhpoQgEY35JbM84

