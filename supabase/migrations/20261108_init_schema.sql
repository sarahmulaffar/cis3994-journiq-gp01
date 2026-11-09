-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Linked with Supabase auth.users)
CREATE TABLE public.users (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  account_status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Notification Preferences
CREATE TABLE public.notification_pref (
  user_id UUID REFERENCES public.users(user_id) ON DELETE CASCADE PRIMARY KEY,
  email_expenses BOOLEAN DEFAULT TRUE,
  email_task_deadlines BOOLEAN DEFAULT TRUE,
  email_itinerary BOOLEAN DEFAULT TRUE,
  email_settlements BOOLEAN DEFAULT TRUE
);

-- 3. Notification Log
CREATE TABLE public.notification_log (
  log_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(user_id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Trip Table
CREATE TABLE public.trips (
  trip_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  visibility TEXT DEFAULT 'private',
  start_date DATE,
  end_date DATE,
  created_by UUID REFERENCES public.users(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Trip Member Junction Table
CREATE TABLE public.trip_members (
  membership_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(user_id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'editor', 'viewer')) DEFAULT 'viewer',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  left_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(trip_id, user_id)
);

-- 6. Itinerary Event Table
CREATE TABLE public.itinerary_events (
  event_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT,
  time_period TEXT,
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Task Table
CREATE TABLE public.tasks (
  task_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.trip_members(membership_id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Message Table
CREATE TABLE public.messages (
  message_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.trip_members(membership_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Document / Media Table
CREATE TABLE public.document_media (
  file_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES public.trip_members(membership_id) ON DELETE SET NULL,
  file_type TEXT,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Expense Table
CREATE TABLE public.expenses (
  expense_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  payer_id UUID REFERENCES public.trip_members(membership_id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  description TEXT,
  expense_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Expense Split Table
CREATE TABLE public.expense_splits (
  split_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expense_id UUID REFERENCES public.expenses(expense_id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.trip_members(membership_id) ON DELETE CASCADE,
  share_amount NUMERIC(10, 2) NOT NULL CHECK (share_amount >= 0),
  UNIQUE(expense_id, member_id)
);

-- 12. Settlement Table
CREATE TABLE public.settlements (
  settlement_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(trip_id) ON DELETE CASCADE,
  payer_id UUID REFERENCES public.trip_members(membership_id) ON DELETE CASCADE,
  payee_id UUID REFERENCES public.trip_members(membership_id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);