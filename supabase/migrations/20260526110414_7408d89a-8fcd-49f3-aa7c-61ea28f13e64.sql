ALTER TABLE public.imposter_lobbies REPLICA IDENTITY FULL;
ALTER TABLE public.imposter_players REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.imposter_lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.imposter_players;