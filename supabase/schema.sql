-- Initial schema for a Supabase project without these tables.
-- Apply once through the Supabase SQL Editor.
begin;

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.claims (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id),
  wallet text not null,
  signature text not null,
  created_at timestamptz not null default now(),
  constraint claims_event_id_wallet_key unique (event_id, wallet)
);

alter table public.events enable row level security;
alter table public.claims enable row level security;

-- No public policies: anon and authenticated have no row access.
-- The server service_role bypasses RLS and needs table privileges.
grant select, insert, update, delete on public.events, public.claims to service_role;

commit;
