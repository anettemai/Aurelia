--
-- PostgreSQL database dump
--

\restrict vvtpCPcX2ua839DHqbDndtFXSanGl1NMsflVoNadnn8Gax8ANs1FvVeXxQXhdVb

-- Dumped from database version 15.17 (Homebrew)
-- Dumped by pg_dump version 15.17 (Homebrew)

-- Started on 2026-06-02 10:10:19 EEST

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
-- TOC entry 5 (class 2615 OID 16572)
-- Name: public; Type: SCHEMA; Schema: -; Owner: anettesamolberg
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO anettesamolberg;

--
-- TOC entry 3889 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: anettesamolberg
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16654)
-- Name: collections; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.collections (
    collection_id integer NOT NULL,
    collection_name character varying(100) NOT NULL,
    collection_description text,
    collection_banner_url character varying(255)
);


ALTER TABLE public.collections OWNER TO anettesamolberg;

--
-- TOC entry 224 (class 1259 OID 16653)
-- Name: collections_collection_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.collections_collection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collections_collection_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3891 (class 0 OID 0)
-- Dependencies: 224
-- Name: collections_collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.collections_collection_id_seq OWNED BY public.collections.collection_id;


--
-- TOC entry 219 (class 1259 OID 16603)
-- Name: customers; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    customer_first_name text,
    customer_last_name text,
    customer_email text NOT NULL,
    customer_phone_number text,
    customer_shipping_address text
);


ALTER TABLE public.customers OWNER TO anettesamolberg;

--
-- TOC entry 218 (class 1259 OID 16602)
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_customer_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3892 (class 0 OID 0)
-- Dependencies: 218
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customers.customer_id;


--
-- TOC entry 223 (class 1259 OID 16631)
-- Name: order_item; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.order_item (
    orderitem_id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    selected_size text NOT NULL,
    quantity integer NOT NULL,
    price_per_item numeric(10,2) NOT NULL,
    CONSTRAINT order_item_price_per_item_check CHECK ((price_per_item >= (0)::numeric)),
    CONSTRAINT order_item_quantity_check CHECK ((quantity > 0)),
    CONSTRAINT order_item_selected_size_check CHECK ((selected_size = ANY (ARRAY['XXS'::text, 'XS'::text, 'S'::text, 'M'::text, 'L'::text, 'XL'::text, 'XXL'::text, '36'::text, '37'::text, '38'::text, '39'::text, '40'::text, '41'::text, '42'::text, '43'::text, '44'::text, '45'::text, '46'::text])))
);


ALTER TABLE public.order_item OWNER TO anettesamolberg;

--
-- TOC entry 222 (class 1259 OID 16630)
-- Name: order_item_orderitem_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.order_item_orderitem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_item_orderitem_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3893 (class 0 OID 0)
-- Dependencies: 222
-- Name: order_item_orderitem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.order_item_orderitem_id_seq OWNED BY public.order_item.orderitem_id;


--
-- TOC entry 221 (class 1259 OID 16614)
-- Name: orders; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    customer_id integer,
    order_date timestamp with time zone DEFAULT now(),
    total_price numeric(12,2) NOT NULL,
    order_status text NOT NULL,
    CONSTRAINT order_order_status_check CHECK ((order_status = ANY (ARRAY['waiting_payment'::text, 'pending'::text, 'confirmed'::text, 'shipped'::text, 'in_transit'::text, 'waiting_pickup'::text, 'completed'::text]))),
    CONSTRAINT order_total_price_check CHECK ((total_price >= (0)::numeric))
);


ALTER TABLE public.orders OWNER TO anettesamolberg;

--
-- TOC entry 220 (class 1259 OID 16613)
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.order_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_order_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3894 (class 0 OID 0)
-- Dependencies: 220
-- Name: order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.order_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 227 (class 1259 OID 16669)
-- Name: product_images; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.product_images (
    image_id integer NOT NULL,
    product_id integer,
    image_url text NOT NULL,
    is_primary boolean DEFAULT false
);


ALTER TABLE public.product_images OWNER TO anettesamolberg;

--
-- TOC entry 226 (class 1259 OID 16668)
-- Name: product_images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.product_images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_images_image_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3895 (class 0 OID 0)
-- Dependencies: 226
-- Name: product_images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.product_images_image_id_seq OWNED BY public.product_images.image_id;


--
-- TOC entry 215 (class 1259 OID 16574)
-- Name: products; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_description text,
    price numeric(10,2) NOT NULL,
    material text,
    product_image_url text,
    category text NOT NULL,
    collection_id integer,
    keyword text DEFAULT 'general'::text,
    CONSTRAINT product_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.products OWNER TO anettesamolberg;

--
-- TOC entry 214 (class 1259 OID 16573)
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 214
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 217 (class 1259 OID 16584)
-- Name: product_variants; Type: TABLE; Schema: public; Owner: anettesamolberg
--

CREATE TABLE public.product_variants (
    variant_id integer NOT NULL,
    product_id integer NOT NULL,
    size text NOT NULL,
    stock_quantity integer DEFAULT 0 NOT NULL,
    CONSTRAINT product_variant_size_check CHECK ((size = ANY (ARRAY['XXS'::text, 'XS'::text, 'S'::text, 'M'::text, 'L'::text, 'XL'::text, 'XXL'::text, 'One Size'::text, '36'::text, '37'::text, '38'::text, '39'::text, '40'::text, '41'::text, '42'::text, '43'::text, '44'::text, '45'::text, '46'::text]))),
    CONSTRAINT product_variant_stock_quantity_check CHECK ((stock_quantity >= 0))
);


ALTER TABLE public.product_variants OWNER TO anettesamolberg;

--
-- TOC entry 216 (class 1259 OID 16583)
-- Name: product_variant_variant_id_seq; Type: SEQUENCE; Schema: public; Owner: anettesamolberg
--

CREATE SEQUENCE public.product_variant_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_variant_variant_id_seq OWNER TO anettesamolberg;

--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 216
-- Name: product_variant_variant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anettesamolberg
--

ALTER SEQUENCE public.product_variant_variant_id_seq OWNED BY public.product_variants.variant_id;


--
-- TOC entry 3707 (class 2604 OID 16657)
-- Name: collections collection_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.collections ALTER COLUMN collection_id SET DEFAULT nextval('public.collections_collection_id_seq'::regclass);


--
-- TOC entry 3703 (class 2604 OID 16606)
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- TOC entry 3706 (class 2604 OID 16634)
-- Name: order_item orderitem_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.order_item ALTER COLUMN orderitem_id SET DEFAULT nextval('public.order_item_orderitem_id_seq'::regclass);


--
-- TOC entry 3704 (class 2604 OID 16617)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.order_order_id_seq'::regclass);


--
-- TOC entry 3708 (class 2604 OID 16672)
-- Name: product_images image_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_images ALTER COLUMN image_id SET DEFAULT nextval('public.product_images_image_id_seq'::regclass);


--
-- TOC entry 3701 (class 2604 OID 16587)
-- Name: product_variants variant_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_variants ALTER COLUMN variant_id SET DEFAULT nextval('public.product_variant_variant_id_seq'::regclass);


--
-- TOC entry 3699 (class 2604 OID 16577)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- TOC entry 3733 (class 2606 OID 16661)
-- Name: collections collections_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (collection_id);


--
-- TOC entry 3725 (class 2606 OID 16612)
-- Name: customers customer_customer_email_key; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customer_customer_email_key UNIQUE (customer_email);


--
-- TOC entry 3727 (class 2606 OID 16610)
-- Name: customers customer_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 3731 (class 2606 OID 16641)
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (orderitem_id);


--
-- TOC entry 3729 (class 2606 OID 16624)
-- Name: orders order_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);


--
-- TOC entry 3735 (class 2606 OID 16677)
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (image_id);


--
-- TOC entry 3719 (class 2606 OID 16582)
-- Name: products product_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- TOC entry 3721 (class 2606 OID 16594)
-- Name: product_variants product_variant_pkey; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variant_pkey PRIMARY KEY (variant_id);


--
-- TOC entry 3723 (class 2606 OID 16596)
-- Name: product_variants product_variant_product_id_size_key; Type: CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variant_product_id_size_key UNIQUE (product_id, size);


--
-- TOC entry 3738 (class 2606 OID 16625)
-- Name: orders order_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);


--
-- TOC entry 3739 (class 2606 OID 16642)
-- Name: order_item order_item_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- TOC entry 3740 (class 2606 OID 16647)
-- Name: order_item order_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 3736 (class 2606 OID 16662)
-- Name: products product_collection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.collections(collection_id);


--
-- TOC entry 3741 (class 2606 OID 16678)
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- TOC entry 3737 (class 2606 OID 16597)
-- Name: product_variants product_variant_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anettesamolberg
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variant_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- TOC entry 3890 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: anettesamolberg
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-06-02 10:10:19 EEST

--
-- PostgreSQL database dump complete
--

\unrestrict vvtpCPcX2ua839DHqbDndtFXSanGl1NMsflVoNadnn8Gax8ANs1FvVeXxQXhdVb

