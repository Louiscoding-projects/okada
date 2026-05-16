-- 1. PROFILES TABLE
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  role text check (role in ('passenger', 'rider')) default 'passenger',
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. RIDERS TABLE
create table public.riders (
  id uuid references public.profiles(id) on delete cascade primary key,
  is_online boolean default false,
  rating numeric(3,2) default 0.0,
  total_rides integer default 0,
  vehicle_type text,
  vehicle_number text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 3. TRIPS TABLE
create table public.trips (
  id uuid default gen_random_uuid() primary key,
  passenger_id uuid references public.profiles(id) on delete cascade,
  rider_id uuid references public.profiles(id) on delete set null,
  pickup_address text,
  dropoff_address text,
  pickup_lat float,
  pickup_lng float,
  dropoff_lat float,
  dropoff_lng float,
  status text check (status in ('requested','accepted','in_progress','completed','cancelled')) default 'requested',
  fare numeric(10,2),
  created_at timestamp with time zone default timezone('utc', now())
);

-- 4. PAYMENTS TABLE
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  trip_id uuid references public.trips(id) on delete cascade,
  amount numeric(10,2),
  method text check (method in ('momo', 'cash')),
  status text check (status in ('pending', 'completed', 'failed')) default 'pending',
  created_at timestamp with time zone default timezone('utc', now())
);

-- 5. ENABLE RLS ON ALL TABLES
alter table public.profiles enable row level security;
alter table public.riders enable row level security;
alter table public.trips enable row level security;
alter table public.payments enable row level security;

-- 6. RLS POLICIES

-- Profiles: users can read and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Riders: riders can update their own record, all can view
create policy "Anyone can view riders"
  on public.riders for select
  using (true);

create policy "Riders can update own record"
  on public.riders for update
  using (auth.uid() = id);

create policy "Riders can insert own record"
  on public.riders for insert
  with check (auth.uid() = id);

-- Trips: passengers see their trips, riders see assigned trips
create policy "Passengers can view own trips"
  on public.trips for select
  using (auth.uid() = passenger_id or auth.uid() = rider_id);

create policy "Passengers can create trips"
  on public.trips for insert
  with check (auth.uid() = passenger_id);

create policy "Riders can update trip status"
  on public.trips for update
  using (auth.uid() = rider_id or auth.uid() = passenger_id);

-- Payments: users can only see their own payments
create policy "Users can view own payments"
  on public.payments for select
  using (
    auth.uid() = (
      select passenger_id from public.trips where id = trip_id
    )
  );

-- 7. AUTO CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
