
CREATE TABLE public.poker_lobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'lobby',
  use_chips boolean NOT NULL DEFAULT true,
  starting_chips integer NOT NULL DEFAULT 1000,
  small_blind integer NOT NULL DEFAULT 10,
  big_blind integer NOT NULL DEFAULT 20,
  deck jsonb NOT NULL DEFAULT '[]'::jsonb,
  community jsonb NOT NULL DEFAULT '[]'::jsonb,
  pot integer NOT NULL DEFAULT 0,
  button_seat integer NOT NULL DEFAULT 0,
  hand_number integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.poker_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_id uuid NOT NULL REFERENCES public.poker_lobbies(id) ON DELETE CASCADE,
  name text NOT NULL,
  seat integer NOT NULL DEFAULT 0,
  chips integer NOT NULL DEFAULT 0,
  hole_cards jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_bet integer NOT NULL DEFAULT 0,
  folded boolean NOT NULL DEFAULT false,
  is_host boolean NOT NULL DEFAULT false,
  joined_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.poker_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poker_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read poker lobbies" ON public.poker_lobbies FOR SELECT USING (true);
CREATE POLICY "public insert poker lobbies" ON public.poker_lobbies FOR INSERT WITH CHECK (true);
CREATE POLICY "public update poker lobbies" ON public.poker_lobbies FOR UPDATE USING (true);
CREATE POLICY "public delete poker lobbies" ON public.poker_lobbies FOR DELETE USING (true);

CREATE POLICY "public read poker players" ON public.poker_players FOR SELECT USING (true);
CREATE POLICY "public insert poker players" ON public.poker_players FOR INSERT WITH CHECK (true);
CREATE POLICY "public update poker players" ON public.poker_players FOR UPDATE USING (true);
CREATE POLICY "public delete poker players" ON public.poker_players FOR DELETE USING (true);

ALTER TABLE public.poker_lobbies REPLICA IDENTITY FULL;
ALTER TABLE public.poker_players REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.poker_lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.poker_players;
