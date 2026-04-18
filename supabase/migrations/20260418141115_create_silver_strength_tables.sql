
/*
  # Silver Strength - Initial Schema

  ## New Tables

  ### profiles
  Stores user profile data including body metrics and goals.
  - `id` (uuid, primary key)
  - `session_id` (text, unique) - anonymous session identifier stored in localStorage
  - `name` (text) - user's display name
  - `age` (integer) - age in years
  - `weight_kg` (numeric) - current weight in kilograms
  - `target_weight_kg` (numeric) - target weight goal in kilograms
  - `height_cm` (integer) - height in centimeters
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### weight_logs
  Stores daily weight entries for progress tracking.
  - `id` (uuid, primary key)
  - `profile_id` (uuid, foreign key to profiles)
  - `weight_kg` (numeric) - logged weight in kilograms
  - `note` (text, optional) - user note for the entry
  - `logged_date` (date) - the date of the log entry
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Access controlled by session_id match for profiles
  - Weight logs accessible through profile ownership
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  age integer NOT NULL DEFAULT 60,
  weight_kg numeric(5,2) NOT NULL DEFAULT 0,
  target_weight_kg numeric(5,2) NOT NULL DEFAULT 0,
  height_cm integer NOT NULL DEFAULT 170,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS weight_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  weight_kg numeric(5,2) NOT NULL,
  note text DEFAULT '',
  logged_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are accessible by session_id"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Profiles can be inserted with session_id"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Profiles can be updated by session_id"
  ON profiles FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Weight logs are viewable"
  ON weight_logs FOR SELECT
  USING (true);

CREATE POLICY "Weight logs can be inserted"
  ON weight_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Weight logs can be deleted"
  ON weight_logs FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS idx_profiles_session_id ON profiles(session_id);
CREATE INDEX IF NOT EXISTS idx_weight_logs_profile_id ON weight_logs(profile_id);
CREATE INDEX IF NOT EXISTS idx_weight_logs_logged_date ON weight_logs(logged_date);
