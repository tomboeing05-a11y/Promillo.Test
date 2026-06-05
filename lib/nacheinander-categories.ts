// Kategorien für "Nacheinander" – Spieler nennen reihum Begriffe.
export interface NachCategory {
  id: string;
  label: string;
  emoji: string;
  difficulty: "easy" | "medium" | "hard";
}

export const NACH_CATEGORIES: NachCategory[] = [
  // Easy
  { id: "automarken", label: "Automarken", emoji: "🚗", difficulty: "easy" },
  { id: "tiere-zoo", label: "Tiere im Zoo", emoji: "🦁", difficulty: "easy" },
  { id: "obstsorten", label: "Obstsorten", emoji: "🍎", difficulty: "easy" },
  { id: "getraenke", label: "Getränke an der Bar", emoji: "🍹", difficulty: "easy" },
  { id: "biersorten", label: "Biersorten", emoji: "🍺", difficulty: "easy" },
  { id: "fast-food", label: "Fast-Food-Ketten", emoji: "🍔", difficulty: "easy" },
  { id: "pizza-belaege", label: "Pizza-Beläge", emoji: "🍕", difficulty: "easy" },
  { id: "eissorten", label: "Eissorten", emoji: "🍦", difficulty: "easy" },
  { id: "suessigkeiten", label: "Süßigkeiten-Marken", emoji: "🍫", difficulty: "easy" },
  { id: "bundeslaender", label: "Deutsche Bundesländer", emoji: "🇩🇪", difficulty: "easy" },
  { id: "hauptstaedte-eu", label: "Hauptstädte in Europa", emoji: "🏛️", difficulty: "easy" },
  { id: "sportarten", label: "Sportarten", emoji: "🏅", difficulty: "easy" },
  { id: "berufe", label: "Berufe", emoji: "👷", difficulty: "easy" },
  { id: "social-apps", label: "Social-Media-Apps", emoji: "📱", difficulty: "easy" },
  { id: "streaming", label: "Streaming-Dienste", emoji: "📺", difficulty: "easy" },
  { id: "apple-produkte", label: "Apple-Produkte", emoji: "🍏", difficulty: "easy" },
  { id: "hunderassen", label: "Hunderassen", emoji: "🐕", difficulty: "easy" },
  { id: "modemarken", label: "Modemarken", emoji: "👗", difficulty: "easy" },
  { id: "luxusmarken", label: "Luxusmarken", emoji: "💎", difficulty: "easy" },
  { id: "kosenamen", label: "Kosenamen für den Partner", emoji: "💕", difficulty: "easy" },

  // Medium
  { id: "filme-brad-pitt", label: "Filme mit Brad Pitt", emoji: "🎬", difficulty: "medium" },
  { id: "filme-leo", label: "Filme mit Leonardo DiCaprio", emoji: "🎥", difficulty: "medium" },
  { id: "tarantino", label: "Filme von Quentin Tarantino", emoji: "🎞️", difficulty: "medium" },
  { id: "disney-filme", label: "Disney-Animationsfilme", emoji: "🏰", difficulty: "medium" },
  { id: "pixar-filme", label: "Pixar-Filme", emoji: "💡", difficulty: "medium" },
  { id: "marvel-helden", label: "Marvel-Helden", emoji: "🦸", difficulty: "medium" },
  { id: "dc-helden", label: "DC-Helden", emoji: "🦇", difficulty: "medium" },
  { id: "harry-potter", label: "Harry-Potter-Figuren", emoji: "⚡", difficulty: "medium" },
  { id: "got", label: "Game-of-Thrones-Charaktere", emoji: "🐉", difficulty: "medium" },
  { id: "friends", label: "Friends-Charaktere", emoji: "☕", difficulty: "medium" },
  { id: "simpsons", label: "Simpsons-Charaktere", emoji: "🟡", difficulty: "medium" },
  { id: "star-wars", label: "Star-Wars-Charaktere", emoji: "🌌", difficulty: "medium" },
  { id: "james-bond", label: "James-Bond-Darsteller", emoji: "🕴️", difficulty: "medium" },
  { id: "taylor-songs", label: "Songs von Taylor Swift", emoji: "🎤", difficulty: "medium" },
  { id: "rapper-de", label: "Deutsche Rapper", emoji: "🎙️", difficulty: "medium" },
  { id: "boybands", label: "Boybands aller Zeiten", emoji: "👬", difficulty: "medium" },
  { id: "bayern-spieler", label: "Spieler beim FC Bayern", emoji: "🔴", difficulty: "medium" },
  { id: "bundesliga-vereine", label: "Bundesliga-Vereine", emoji: "⚽", difficulty: "medium" },
  { id: "wm-gewinner", label: "Fußball-Weltmeister (Länder)", emoji: "🏆", difficulty: "medium" },
  { id: "f1-fahrer", label: "Formel-1-Fahrer", emoji: "🏎️", difficulty: "medium" },
  { id: "konsolen", label: "Spielkonsolen", emoji: "🎮", difficulty: "medium" },
  { id: "mario-charaktere", label: "Mario-Charaktere", emoji: "🍄", difficulty: "medium" },
  { id: "fortnite-skins", label: "Fortnite-Skins", emoji: "🎯", difficulty: "medium" },
  { id: "pokemon-gen1", label: "Pokémon der ersten Generation", emoji: "⚡", difficulty: "medium" },
  { id: "anime", label: "Anime-Serien", emoji: "🍥", difficulty: "medium" },
  { id: "cocktails", label: "Cocktails", emoji: "🍸", difficulty: "medium" },
  { id: "kaesesorten", label: "Käsesorten", emoji: "🧀", difficulty: "medium" },
  { id: "pasta", label: "Pasta-Sorten", emoji: "🍝", difficulty: "medium" },
  { id: "brettspiele", label: "Brettspiel-Klassiker", emoji: "🎲", difficulty: "medium" },
  { id: "trinkspiele", label: "Trinkspiele", emoji: "🍻", difficulty: "medium" },
  { id: "karaoke", label: "Karaoke-Klassiker", emoji: "🎵", difficulty: "medium" },
  { id: "achterbahnen", label: "Achterbahnen-Standorte", emoji: "🎢", difficulty: "medium" },
  { id: "maerchen", label: "Märchen der Gebrüder Grimm", emoji: "📖", difficulty: "medium" },
  { id: "prinzessinnen", label: "Disney-Prinzessinnen", emoji: "👸", difficulty: "medium" },

  // Hard
  { id: "clash-karten", label: "Legendäre Karten in Clash Royale", emoji: "👑", difficulty: "hard" },
  { id: "torschuetzenkoenige", label: "Bundesliga-Torschützenkönige", emoji: "🥇", difficulty: "hard" },
  { id: "ballon-dor", label: "Ballon-d'Or-Gewinner", emoji: "🏆", difficulty: "hard" },
  { id: "cl-sieger", label: "Champions-League-Sieger (Vereine)", emoji: "⭐", difficulty: "hard" },
  { id: "oscar-best-pic", label: "Oscar-Beste-Film-Gewinner", emoji: "🏆", difficulty: "hard" },
  { id: "us-praesidenten", label: "US-Präsidenten", emoji: "🇺🇸", difficulty: "hard" },
  { id: "bundeskanzler", label: "Bundeskanzler Deutschlands", emoji: "🇩🇪", difficulty: "hard" },
  { id: "afrikanische-laender", label: "Länder in Afrika", emoji: "🌍", difficulty: "hard" },
  { id: "asiatische-laender", label: "Länder in Asien", emoji: "🌏", difficulty: "hard" },
  { id: "studio-ghibli", label: "Studio-Ghibli-Filme", emoji: "🌳", difficulty: "hard" },
];

export function pickRandomCategory(exclude: string[] = []): NachCategory {
  const pool = NACH_CATEGORIES.filter((c) => !exclude.includes(c.id));
  const arr = pool.length > 0 ? pool : NACH_CATEGORIES;
  return arr[Math.floor(Math.random() * arr.length)  // Neue Easy-Kategorien
  { id: "netflix-serien", label: "Netflix-Serien", emoji: "🎬", difficulty: "easy" },
  { id: "trinkspiele", label: "Trinkspiele", emoji: "🍻", difficulty: "easy" },
  { id: "tiktok-sounds", label: "TikTok-Sounds & Trends", emoji: "🎵", difficulty: "easy" },
  { id: "deutsche-stadte", label: "Städte in Deutschland", emoji: "🏙️", difficulty: "easy" },
  { id: "schauspieler-de", label: "Deutsche Schauspieler", emoji: "🎭", difficulty: "easy" },
  { id: "party-songs", label: "Party-Klassiker (Songs)", emoji: "🎤", difficulty: "easy" },

  // Neue Medium-Kategorien
  { id: "realityshows", label: "Reality-TV-Shows", emoji: "📺", difficulty: "medium" },
  { id: "youtuber-de", label: "Deutsche YouTuber & Streamer", emoji: "📱", difficulty: "medium" },
  { id: "video-games", label: "Videospiel-Reihen", emoji: "🎮", difficulty: "medium" },
  { id: "sportler-de", label: "Berühmte deutsche Sportler", emoji: "🏅", difficulty: "medium" },
  { id: "fast-food-items", label: "McDonald's-Menüs & -Produkte", emoji: "🍔", difficulty: "medium" },
  { id: "serien-charaktere", label: "Charaktere aus deutschen Serien", emoji: "🎥", difficulty: "medium" },

  // Neue Hard-Kategorien
  { id: "wm-gastgeber", label: "WM-Gastgeberländer", emoji: "🌍", difficulty: "hard" },
  { id: "oscar-schauspieler", label: "Oscar-Gewinner (Beste Hauptrolle Männer)", emoji: "🏆", difficulty: "hard" },
  { id: "charts-nr1", label: "Songs die in Deutschland #1 waren", emoji: "🎵", difficulty: "hard" },
  { id: "serie-staffeln", label: "Serien mit mehr als 5 Staffeln", emoji: "📺", difficulty: "hard" },
  { id: "tarantino-figuren", label: "Tarantino-Filmfiguren", emoji: "🎬", difficulty: "hard" },
  { id: "dinos", label: "Dinosaurier-Arten", emoji: "🦖", difficulty: "hard" },
];
}
