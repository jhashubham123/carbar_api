CREATE TABLE IF NOT EXISTS public.users
(
    u_id SERIAL PRIMARY KEY,
    u_email character varying(200),
    u_password character varying(200),
    u_first_name character varying(200),
    u_last_name character varying(200),
    u_phone character varying(20),
    u_img_url text,
    u_created_at timestamp with time zone DEFAULT timezone('Asia/Kolkata'::text,now()),
    u_verified boolean DEFAULT false,
    otp character varying(200),
    CONSTRAINT users_u_email_key UNIQUE (u_email)
)