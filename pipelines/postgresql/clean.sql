--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.0

-- Started on 2021-01-30 00:25:34

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16385)
-- Name: organisations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations (
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id character varying(32) NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.organisations OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16390)
-- Name: organisations_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations_users (
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id character varying(32) NOT NULL,
    organisation_id character varying(32) NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.organisations_users OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16395)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16398)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id character varying(32) NOT NULL,
    email character varying(160) NOT NULL,
    password character varying(60) NOT NULL,
    name character varying(100),
    image text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2935 (class 0 OID 16385)
-- Dependencies: 202
-- Data for Name: organisations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations ("createdAt", "updatedAt", id, name) FROM stdin;
\.


--
-- TOC entry 2936 (class 0 OID 16390)
-- Dependencies: 203
-- Data for Name: organisations_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations_users ("createdAt", "updatedAt", user_id, organisation_id, role_id) FROM stdin;
\.


--
-- TOC entry 2937 (class 0 OID 16395)
-- Dependencies: 204
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, name) FROM stdin;
1	Admin
5	Publisher
10	Editor
15	Viewer
\.


--
-- TOC entry 2938 (class 0 OID 16398)
-- Dependencies: 205
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("createdAt", "updatedAt", id, email, password, name, image) FROM stdin;
\.


--
-- TOC entry 2799 (class 2606 OID 16407)
-- Name: organisations_users PK_57cf1c88412843c978ea1ee7b8d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users
    ADD CONSTRAINT "PK_57cf1c88412843c978ea1ee7b8d" PRIMARY KEY (user_id, organisation_id);


--
-- TOC entry 2795 (class 2606 OID 16409)
-- Name: organisations PK_7bf54cba378d5b2f1d4c10ef4df; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations
    ADD CONSTRAINT "PK_7bf54cba378d5b2f1d4c10ef4df" PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 16411)
-- Name: user_roles PK_8acd5cf26ebd158416f477de799; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY (id);


--
-- TOC entry 2803 (class 2606 OID 16413)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 2797 (class 2606 OID 16415)
-- Name: organisations UQ_4a3dcb66f1630f551b81bca1b34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations
    ADD CONSTRAINT "UQ_4a3dcb66f1630f551b81bca1b34" UNIQUE (name);


--
-- TOC entry 2805 (class 2606 OID 16417)
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- TOC entry 2806 (class 2606 OID 16418)
-- Name: organisations_users FK_a077f9296ec5afa8fed3ad9db4b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users
    ADD CONSTRAINT "FK_a077f9296ec5afa8fed3ad9db4b" FOREIGN KEY (role_id) REFERENCES public.user_roles(id);


--
-- TOC entry 2807 (class 2606 OID 16423)
-- Name: organisations_users FK_b06f267877d8b5a6a98a9510295; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users
    ADD CONSTRAINT "FK_b06f267877d8b5a6a98a9510295" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 2808 (class 2606 OID 16428)
-- Name: organisations_users FK_cd6d03f766a8372c5a0dc7c23bd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users
    ADD CONSTRAINT "FK_cd6d03f766a8372c5a0dc7c23bd" FOREIGN KEY (organisation_id) REFERENCES public.organisations(id) ON DELETE CASCADE;


-- Completed on 2021-01-30 00:25:34

--
-- PostgreSQL database dump complete
--

