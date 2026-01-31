CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE public.delegate_registrations
  ADD COLUMN IF NOT EXISTS password_hash TEXT;

CREATE TABLE IF NOT EXISTS public.delegate_password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_delegate_password_resets_token_hash
  ON public.delegate_password_resets(token_hash);

CREATE OR REPLACE FUNCTION public.register_delegate(
  _first_name TEXT,
  _last_name TEXT,
  _email TEXT,
  _password TEXT,
  _delegation_type TEXT,
  _preferred_country TEXT,
  _preferred_institution TEXT,
  _committee_preference TEXT,
  _notes TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.delegate_registrations (
    first_name,
    last_name,
    email,
    password_hash,
    delegation_type,
    preferred_country,
    preferred_institution,
    committee_preference,
    notes
  )
  VALUES (
    _first_name,
    _last_name,
    _email,
    crypt(_password, gen_salt('bf')),
    _delegation_type,
    _preferred_country,
    _preferred_institution,
    _committee_preference,
    _notes
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.authenticate_delegate(
  _email TEXT,
  _password TEXT
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, email, first_name, last_name
  FROM public.delegate_registrations
  WHERE email = _email
    AND password_hash = crypt(_password, password_hash)
$$;

CREATE OR REPLACE FUNCTION public.consume_delegate_password_reset(
  _token TEXT,
  _new_password TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  reset_record public.delegate_password_resets%ROWTYPE;
BEGIN
  SELECT *
  INTO reset_record
  FROM public.delegate_password_resets
  WHERE token_hash = encode(digest(_token, 'sha256'), 'hex')
    AND expires_at > now()
    AND used_at IS NULL;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  UPDATE public.delegate_registrations
  SET password_hash = crypt(_new_password, gen_salt('bf'))
  WHERE email = reset_record.email;

  UPDATE public.delegate_password_resets
  SET used_at = now()
  WHERE id = reset_record.id;

  RETURN TRUE;
END;
$$;
