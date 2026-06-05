-- ── Lügnerjagd lobbies ─────────────────────────────────────────────────────
CREATE TABLE public.luegnerjagd_lobbies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting',
    -- waiting | answering | reveal | vote | round_end | finished
  categories TEXT[] NOT NULL DEFAULT ARRAY['filme','musik','alltag'],
  rounds INTEGER NOT NULL DEFAULT 5,
  sips_liar INTEGER NOT NULL DEFAULT 3,
  sips_wrong INTEGER NOT NULL DEFAULT 2,
  current_question_id INTEGER,
  liar_player_id UUID,
  round_number INTEGER NOT NULL DEFAULT 1,
  host_player_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.luegnerjagd_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_id UUID NOT NULL REFERENCES public.luegnerjagd_lobbies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  answer TEXT,
  has_answered BOOLEAN NOT NULL DEFAULT false,
  is_host BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_luegnerjagd_players_lobby ON public.luegnerjagd_players(lobby_id);
CREATE INDEX idx_luegnerjagd_lobbies_code ON public.luegnerjagd_lobbies(code);

ALTER TABLE public.luegnerjagd_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.luegnerjagd_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read luegnerjagd lobbies"  ON public.luegnerjagd_lobbies FOR SELECT USING (true);
CREATE POLICY "public insert luegnerjagd lobbies" ON public.luegnerjagd_lobbies FOR INSERT WITH CHECK (true);
CREATE POLICY "public update luegnerjagd lobbies" ON public.luegnerjagd_lobbies FOR UPDATE USING (true);
CREATE POLICY "public delete luegnerjagd lobbies" ON public.luegnerjagd_lobbies FOR DELETE USING (true);

CREATE POLICY "public read luegnerjagd players"  ON public.luegnerjagd_players FOR SELECT USING (true);
CREATE POLICY "public insert luegnerjagd players" ON public.luegnerjagd_players FOR INSERT WITH CHECK (true);
CREATE POLICY "public update luegnerjagd players" ON public.luegnerjagd_players FOR UPDATE USING (true);
CREATE POLICY "public delete luegnerjagd players" ON public.luegnerjagd_players FOR DELETE USING (true);

ALTER TABLE public.luegnerjagd_lobbies REPLICA IDENTITY FULL;
ALTER TABLE public.luegnerjagd_players REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.luegnerjagd_lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.luegnerjagd_players;

-- ── Dark Cases lobbies ─────────────────────────────────────────────────────
CREATE TABLE public.darkcases_lobbies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting',
    -- waiting | playing | round_end | finished
  difficulties TEXT[] NOT NULL DEFAULT ARRAY['leicht','mittel'],
  points_correct INTEGER NOT NULL DEFAULT 3,
  sips_wrong INTEGER NOT NULL DEFAULT 1,
  current_story_id INTEGER,
  host_player_id UUID,
  narrator_player_id UUID,
  no_count INTEGER NOT NULL DEFAULT 0,
  yes_count INTEGER NOT NULL DEFAULT 0,
  round_number INTEGER NOT NULL DEFAULT 1,
  solution_visible BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.darkcases_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_id UUID NOT NULL REFERENCES public.darkcases_lobbies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  is_host BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_darkcases_players_lobby ON public.darkcases_players(lobby_id);
CREATE INDEX idx_darkcases_lobbies_code ON public.darkcases_lobbies(code);

ALTER TABLE public.darkcases_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.darkcases_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read darkcases lobbies"  ON public.darkcases_lobbies FOR SELECT USING (true);
CREATE POLICY "public insert darkcases lobbies" ON public.darkcases_lobbies FOR INSERT WITH CHECK (true);
CREATE POLICY "public update darkcases lobbies" ON public.darkcases_lobbies FOR UPDATE USING (true);
CREATE POLICY "public delete darkcases lobbies" ON public.darkcases_lobbies FOR DELETE USING (true);

CREATE POLICY "public read darkcases players"  ON public.darkcases_players FOR SELECT USING (true);
CREATE POLICY "public insert darkcases players" ON public.darkcases_players FOR INSERT WITH CHECK (true);
CREATE POLICY "public update darkcases players" ON public.darkcases_players FOR UPDATE USING (true);
CREATE POLICY "public delete darkcases players" ON public.darkcases_players FOR DELETE USING (true);

ALTER TABLE public.darkcases_lobbies REPLICA IDENTITY FULL;
ALTER TABLE public.darkcases_players REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.darkcases_lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.darkcases_players;
