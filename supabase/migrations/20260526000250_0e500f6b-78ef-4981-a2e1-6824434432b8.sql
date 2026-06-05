
-- Imposter game lobbies
CREATE TABLE public.imposter_lobbies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting', -- waiting | playing | revealed
  categories TEXT[] NOT NULL DEFAULT ARRAY['einfach','trends','marken','filme','fussball'],
  hint_enabled BOOLEAN NOT NULL DEFAULT true,
  word TEXT,
  hint TEXT,
  imposter_player_id UUID,
  starter_player_id UUID,
  host_player_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.imposter_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lobby_id UUID NOT NULL REFERENCES public.imposter_lobbies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_host BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_imposter_players_lobby ON public.imposter_players(lobby_id);
CREATE INDEX idx_imposter_lobbies_code ON public.imposter_lobbies(code);

ALTER TABLE public.imposter_lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imposter_players ENABLE ROW LEVEL SECURITY;

-- Party game: public party-mode access. Anyone can read/create/update lobbies and players.
-- Sensitive role assignment is gated via server functions; lobby word is hidden client-side until reveal.
CREATE POLICY "public read lobbies" ON public.imposter_lobbies FOR SELECT USING (true);
CREATE POLICY "public insert lobbies" ON public.imposter_lobbies FOR INSERT WITH CHECK (true);
CREATE POLICY "public update lobbies" ON public.imposter_lobbies FOR UPDATE USING (true);
CREATE POLICY "public delete lobbies" ON public.imposter_lobbies FOR DELETE USING (true);

CREATE POLICY "public read players" ON public.imposter_players FOR SELECT USING (true);
CREATE POLICY "public insert players" ON public.imposter_players FOR INSERT WITH CHECK (true);
CREATE POLICY "public update players" ON public.imposter_players FOR UPDATE USING (true);
CREATE POLICY "public delete players" ON public.imposter_players FOR DELETE USING (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.imposter_lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.imposter_players;
ALTER TABLE public.imposter_lobbies REPLICA IDENTITY FULL;
ALTER TABLE public.imposter_players REPLICA IDENTITY FULL;
