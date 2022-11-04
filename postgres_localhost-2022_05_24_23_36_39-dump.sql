--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 14.2

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
-- Name: food_entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_entries (
    food_entry_id integer NOT NULL,
    user_id integer,
    food_name character varying NOT NULL,
    calorie double precision NOT NULL,
    took_at timestamp without time zone NOT NULL,
    price integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.food_entries OWNER TO postgres;

--
-- Name: food_entries_food_entry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_entries_food_entry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.food_entries_food_entry_id_seq OWNER TO postgres;

--
-- Name: food_entries_food_entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_entries_food_entry_id_seq OWNED BY public.food_entries.food_entry_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    is_admin integer DEFAULT 0 NOT NULL,
    token character varying,
    daily_limit integer DEFAULT 2100
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: food_entries food_entry_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_entries ALTER COLUMN food_entry_id SET DEFAULT nextval('public.food_entries_food_entry_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: food_entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (3, 2, 'banana', 100, '2022-05-13 12:00:00', 110);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (16, 2, 'pear', 300, '2022-01-03 12:00:00', 210);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (19, 2, 'test food', 1111, '2022-05-03 04:00:00', 0);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (20, 2, 'test food', 11, '2022-05-12 04:00:00', 0);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (8, 2, 'pear', 3000, '2022-05-22 16:00:00', 210);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (27, 3, 'pear', 300.22, '2022-01-03 12:00:00', 0);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (26, 3, 'pear', 300.22, '2022-01-03 12:00:00', 0);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (18, 1, 'pear', 2300, '2022-01-04 03:00:00', 210000);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (25, 3, 'Apple', 120, '2022-05-19 08:00:00', 2200);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (32, 2, 'Apple', 100, '2022-05-23 04:00:00', 0);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (21, 2, 'test food', 1234, '2022-05-11 04:00:00', 0);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (4, 1, 'Banana', 900, '2022-05-14 04:00:00', 911);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (33, 1, 'Pizza', 350, '2022-05-23 08:00:00', 1200);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (34, 1, 'Cheese', 450, '2022-05-22 08:00:00', 3000);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (35, 1, 'Noodle', 500, '2022-05-21 08:00:00', 500);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (36, 1, 'Egg', 700, '2022-05-20 08:00:00', 360);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (11, 1, 'New food', 300, '2022-05-11 12:00:00', 1000);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (31, 1, 'Apple', 1000.23, '2022-01-03 17:00:00', 10000);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (17, 1, 'Pear', 200, '2022-01-03 22:00:00', 210);
INSERT INTO public.food_entries (food_entry_id, user_id, food_name, calorie, took_at, price) VALUES (7, 1, 'Apple', 500, '2022-05-14 00:00:00', 100000);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, username, first_name, last_name, is_admin, token, daily_limit) VALUES (3, 'daniel', 'Daniel', 'Schooler', 0, '333333', 2100);
INSERT INTO public.users (user_id, username, first_name, last_name, is_admin, token, daily_limit) VALUES (2, 'admin', 'Bill', 'Jack', 1, '222222', 2100);
INSERT INTO public.users (user_id, username, first_name, last_name, is_admin, token, daily_limit) VALUES (1, 'tomasrinta', 'Tomas', 'Rinta', 0, '111111', 2100);


--
-- Name: food_entries_food_entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_entries_food_entry_id_seq', 36, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: food_entries food_entries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_entries
    ADD CONSTRAINT food_entries_pk PRIMARY KEY (food_entry_id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: users_token_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_token_uindex ON public.users USING btree (token);


--
-- Name: users_username_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_uindex ON public.users USING btree (username);


--
-- Name: food_entries food_entries_users_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_entries
    ADD CONSTRAINT food_entries_users_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

