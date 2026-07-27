--
-- PostgreSQL database dump
--

\restrict Irh7L4ENHf9z7tljDoXHwvJ5qKE1BVsEDAewrcgWXCHVI0rBifvAGujT4OWU7uU

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
43	TytoCare	QA Engineer	https://www.linkedin.com/jobs/view/4429908168	Applied		2026-06-17 09:55:03.115902+00	2026-06-17 09:55:03.115902+00
41	cyera	QA Automation Engineer – Agent DLP	https://www.comeet.com/jobs/cyera/17.008/qa-automation-engineer--agent-dlp/45.F54?utm_source=hiremetech&utm_medium=referral&utm_campaign=job_apply	Rejected		2026-06-16 10:48:21.462806+00	2026-06-17 16:22:02.04278+00
44	 comblack	Python Automation Developer 	https://www.linkedin.com/jobs/view/4431698918	Applied		2026-06-23 11:12:15.968325+00	2026-06-23 11:12:15.968325+00
45	 evoke	Backend QA Engineer	https://www.linkedin.com/jobs/view/4431698198	Applied		2026-06-23 11:13:31.379201+00	2026-06-23 11:13:31.379201+00
24	Tenable	Test Automation Engineer - Cloud Security	https://www.linkedin.com/jobs/view/4410241823/	Rejected	reffarel efrat 	2026-05-11 09:31:18.061326+00	2026-05-16 18:53:13.001841+00
33	Ness Technologies | נס טכנולוגיות	Cloud Automation Developer	https://www.linkedin.com/jobs/view/4418666275	Rejected		2026-05-25 10:17:33.860342+00	2026-06-14 09:15:10.64175+00
29	genesys	Software-Engineer--Fixed-Term-Contract	https://genesys.wd1.myworkdayjobs.com/Genesys/job/Tel-Aviv-Israel/Software-Engineer--Fixed-Term-Contract-_JR110799-1	Rejected	Itay Dali thinks you’d be a great fit for Genesys	2026-05-18 08:49:52.152069+00	2026-06-14 09:15:25.329848+00
22	 bolt	Quality Assurance Engineer	https://www.linkedin.com/jobs/view/4410011880/	Rejected	Petah Tikva, Center District, Israel	2026-05-04 14:23:24.532956+00	2026-06-14 09:15:50.583079+00
21	Robotican 	DevOps Engineer	https://app.civi.co.il/promo/id=928655&src=20563	Rejected	Location: Omer, Israel (On-site)	2026-05-04 12:41:00.384041+00	2026-06-14 09:15:55.626164+00
23	Sela	QA Automation Engineer	https://www.linkedin.com/jobs/view/4412543244	Rejected	Ashdod, South District, Israel	2026-05-10 08:23:51.496546+00	2026-06-14 09:15:59.940767+00
28	 Thales	Automation Engineer - Platform Group	https://www.linkedin.com/jobs/view/4392345855	Rejected		2026-05-12 09:02:41.516393+00	2026-06-14 09:16:07.741109+00
27	LAYA	QA Engineer (Manual & Automation)	https://www.linkedin.com/jobs/view/4412798924/	Rejected		2026-05-12 08:59:18.334364+00	2026-06-14 09:16:10.759307+00
26	 Jones Software	Junior Automation Engineer 	https://www.linkedin.com/jobs/view/4412724136/	Rejected		2026-05-11 11:14:38.400656+00	2026-06-14 09:16:15.082407+00
25	scytale	QA Engineer	https://scytale.ai/careers/co/tel-aviv-israel/AC.76E/qa-engineer/all/?coref=1.11.p83_4A1D	Rejected		2026-05-11 09:34:52.093809+00	2026-06-14 09:16:19.054768+00
34	Claroty	QA Automation Engineer	https://www.linkedin.com/jobs/view/4414894510	Rejected		2026-05-25 10:19:28.65096+00	2026-06-14 09:16:24.550484+00
32	matach	Junior DevOps Engineer	https://cet.ac.il/jobs/junior-devops-engineer/?form=1&external=D3.767&coref=1.11.p37_8A1E	Rejected		2026-05-24 11:20:45.763774+00	2026-06-14 09:16:28.527459+00
31	 Remedio	QA Automation Engineer	https://www.linkedin.com/jobs/view/4399145984	Rejected		2026-05-24 11:16:14.732444+00	2026-06-14 09:16:32.555892+00
35	Connecteam	QA Engineer	https://www.linkedin.com/jobs/view/4416042082/	Applied		2026-06-14 09:57:49.649286+00	2026-06-14 09:57:49.649286+00
36	מרטנס | Mertens	Automation QA Developer (36564)	https://www.linkedin.com/jobs/view/4427517317	Applied		2026-06-14 10:02:34.09581+00	2026-06-14 10:02:34.09581+00
37	 Tenable	Software Engineer In Test - Tenable OT 	https://job-boards.greenhouse.io/tenableinc/jobs/5252501008?gh_src=44ze435p8us	Applied		2026-06-14 10:05:58.352229+00	2026-06-14 10:05:58.352229+00
38	 TLVTech	Junior QA Automation	https://www.linkedin.com/jobs/view/4425792022	Applied		2026-06-15 10:46:30.421312+00	2026-06-15 10:46:30.421312+00
39	 Webz.io	Quality Assurance Automation Engineer	https://www.linkedin.com/jobs/view/4425772909	Applied		2026-06-15 11:17:11.295394+00	2026-06-15 11:17:11.295394+00
40	CAREERS AT NVIDIA	Software QA Engineer	https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Israel-Yokneam/Software-QA-Engineer_JR2016538-1?shared_id=fea67872-3cfd-4b35-8b0f-9327f489b523	Applied		2026-06-15 11:48:48.230805+00	2026-06-15 11:48:48.230805+00
42	VAST	QA Automation Engineer	https://www.comeet.com/jobs/vastdata/43.001/qa-automation-engineer/A6.31F?utm_source=hiremetech&utm_medium=referral&utm_campaign=job_apply&coref=1.10.r04_013&t=1764765042311	Applied		2026-06-16 10:50:09.087601+00	2026-06-16 10:50:09.087601+00
46	 NoTraffic	QA Automation Engineer	https://www.linkedin.com/jobs/view/4432212116	Rejected		2026-06-23 11:16:11.758552+00	2026-06-23 13:17:03.677041+00
49	spotower	QA Specialist (Manual & Automation)	https://spotower.com/careers/qa-specialist-manual--automation	Applied		2026-07-07 13:34:33.068514+00	2026-07-07 13:34:33.068514+00
50	nuvei	Junior Salesforce Developer	https://apply.workable.com/nuvei/j/277ED8815A/?utm_source=secrethunter.io&utm_medium=website&utm_campaign=job-updates	Applied		2026-07-15 11:45:48.937323+00	2026-07-15 11:45:48.937323+00
51	ADTRAN	Software Engineer	https://adtran.wd3.myworkdayjobs.com/ADTRAN/job/Raanana-Israel/Software-Engineer_R005641?utm_source=secrethunter.io&utm_medium=website&utm_campaign=job-updates	Applied		2026-07-15 11:51:56.005723+00	2026-07-15 11:51:56.005723+00
52	flexor	AI solutions engineering intern	https://www.comeet.com/jobs/flexor/F9.006/ai-solutions-engineering-intern/55.76A	Applied		2026-07-15 11:54:04.66685+00	2026-07-15 11:54:04.66685+00
53	SolarEdge	Integration Engineer	https://www.comeet.com/jobs/SolarEdge/71.00A/integration-engineer/7D.C65	Applied		2026-07-15 11:57:08.127698+00	2026-07-15 11:57:08.127698+00
54	Surecomp	Junior Full Stuck Engineer	https://www.comeet.com/jobs/Surecomp/24.00E/junior-full-stuck-engineer/37.363	Applied		2026-07-15 11:57:34.166888+00	2026-07-15 11:57:34.166888+00
48	Applied Materials - Israel	Devops	https://www.linkedin.com/jobs/view/4428999760	Rejected		2026-06-23 11:23:21.91781+00	2026-07-15 14:09:46.558532+00
47	Applied Materials - Israel	Validation Engineer (Software QA)	https://www.linkedin.com/jobs/view/4429407802	Rejected		2026-06-23 11:20:10.340108+00	2026-07-15 14:09:50.401196+00
55	AlgoSec	Automation Developer	https://www.algosec.com/position/automation-developer%2C-israel/5b-d60	Applied		2026-07-16 10:53:14.860979+00	2026-07-16 10:53:14.860979+00
56	sentra	Backend Engineer & Deployment	https://www.comeet.com/jobs/sentra/87.00B/backend-engineer--deployment/70.D67?coref=1.10.u88_62B&1784117222674	Applied		2026-07-16 11:58:41.233185+00	2026-07-16 11:58:41.233185+00
57	vdvd	vd	http://192.168.7.17:5173/jobs	Applied		2026-07-26 13:20:17.485917+00	2026-07-26 13:20:17.485917+00
58	svdvdvdv	vdvd	http://localhost:5173/jobs	Applied		2026-07-26 13:42:24.682635+00	2026-07-26 13:42:24.682635+00
59	svdvdvdv	vdvd	http://localhost:5173/jobs	Applied		2026-07-26 13:42:24.693114+00	2026-07-26 13:42:24.693114+00
\.


--
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victor_home
--

SELECT pg_catalog.setval('public.applications_id_seq', 59, true);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: victor_home
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict Irh7L4ENHf9z7tljDoXHwvJ5qKE1BVsEDAewrcgWXCHVI0rBifvAGujT4OWU7uU

