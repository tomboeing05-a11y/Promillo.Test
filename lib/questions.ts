export type Difficulty = "easy" | "medium" | "hard";
export type Category = "filme" | "musik" | "fussball" | "allgemein" | "gemischt";

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "filme", label: "Filme & Serien", emoji: "🎬" },
  { id: "musik", label: "Musik", emoji: "🎵" },
  { id: "fussball", label: "Fußball", emoji: "⚽" },
  { id: "allgemein", label: "Allgemeinwissen", emoji: "🧠" },
  { id: "gemischt", label: "Gemischt", emoji: "🎲" },
];

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  difficulty: Difficulty;
  category: Category;
}

// Punkte pro richtige Antwort (= Anzahl Schlücke beim Verteilen)
export const SIPS: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

// Strafe bei falscher Antwort:
// easy(1pt) -> -3, medium(2pt) -> -2, hard(3pt) -> -1
export const PENALTY: Record<Difficulty, number> = {
  easy: 3,
  medium: 2,
  hard: 1,
};

// Falsche Antwort: immer 2 Schlücke trinken (fix)
export const WRONG_SIPS = 2;

export const questions: Question[] = [
  {
    "question": "Welcher Regisseur drehte 'Pulp Fiction'?",
    "options": [
      "Martin Scorsese",
      "Quentin Tarantino",
      "Coen Brothers",
      "Paul Thomas Anderson"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 1
  },
  {
    "question": "Wer spielt den Joker in 'The Dark Knight'?",
    "options": [
      "Joaquin Phoenix",
      "Jared Leto",
      "Heath Ledger",
      "Jack Nicholson"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 2
  },
  {
    "question": "Welche Serie spielt im fiktiven Hawkins?",
    "options": [
      "Riverdale",
      "Stranger Things",
      "Dark",
      "The OA"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 3
  },
  {
    "question": "Welcher Schauspieler spielt Iron Man im MCU?",
    "options": [
      "Chris Evans",
      "Mark Ruffalo",
      "Robert Downey Jr.",
      "Chris Hemsworth"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 4
  },
  {
    "question": "Wer ist der Hauptdarsteller in 'Forrest Gump'?",
    "options": [
      "Tom Hanks",
      "Brad Pitt",
      "Leonardo DiCaprio",
      "Matt Damon"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 5
  },
  {
    "question": "Wie heißt der Zauberlehrling in J.K. Rowlings Reihe?",
    "options": [
      "Harry Potter",
      "Ron Weasley",
      "Neville Longbottom",
      "Draco Malfoy"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 6
  },
  {
    "question": "In welcher Stadt spielt 'Friends'?",
    "options": [
      "Los Angeles",
      "Chicago",
      "New York",
      "Boston"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 7
  },
  {
    "question": "Wer ist der König in 'Der König der Löwen'?",
    "options": [
      "Simba",
      "Mufasa",
      "Scar",
      "Rafiki"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 8
  },
  {
    "question": "Wie heißt der grüne Held aus dem Sumpf?",
    "options": [
      "Hulk",
      "Shrek",
      "Yoda",
      "Kermit"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 9
  },
  {
    "question": "Welcher Film beginnt mit 'A long time ago in a galaxy far, far away'?",
    "options": [
      "Star Trek",
      "Star Wars",
      "Guardians of the Galaxy",
      "Interstellar"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 10
  },
  {
    "question": "Wer spielt Jack in 'Titanic'?",
    "options": [
      "Leonardo DiCaprio",
      "Brad Pitt",
      "Matt Damon",
      "Tom Cruise"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 11
  },
  {
    "question": "Wie heißt SpongeBobs Haustier?",
    "options": [
      "Patrick",
      "Gary",
      "Squidward",
      "Sandy"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 12
  },
  {
    "question": "Wer ist Batmans Butler?",
    "options": [
      "Alfred",
      "Jeeves",
      "Bruce",
      "Lucius"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 13
  },
  {
    "question": "Wie heißt der Hauptcharakter in 'Breaking Bad'?",
    "options": [
      "Jesse Pinkman",
      "Saul Goodman",
      "Walter White",
      "Gus Fring"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 14
  },
  {
    "question": "Wer ist der Erzfeind von Superman?",
    "options": [
      "Joker",
      "Lex Luthor",
      "Bane",
      "Green Goblin"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 15
  },
  {
    "question": "Welche Farbe hat Yoda?",
    "options": [
      "Blau",
      "Grün",
      "Grau",
      "Gelb"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 16
  },
  {
    "question": "Wie heißt der Tonstudio-Pirat in 'Fluch der Karibik'?",
    "options": [
      "Jack Sparrow",
      "Will Turner",
      "Davy Jones",
      "Barbossa"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 17
  },
  {
    "question": "In welcher Serie geht es um eine Familie namens Targaryen?",
    "options": [
      "The Witcher",
      "Vikings",
      "Game of Thrones",
      "Rome"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 18
  },
  {
    "question": "Wer spielt Neo in 'The Matrix'?",
    "options": [
      "Will Smith",
      "Keanu Reeves",
      "Tom Cruise",
      "Hugh Jackman"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 19
  },
  {
    "question": "Welcher Film hat den Slogan 'Just keep swimming'?",
    "options": [
      "Findet Nemo",
      "Findet Dorie",
      "Arielle",
      "Madagascar"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 20
  },
  {
    "question": "Welche Band veröffentlichte 'Abbey Road'?",
    "options": [
      "The Rolling Stones",
      "The Beatles",
      "The Who",
      "Led Zeppelin"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "musik",
    "id": 21
  },
  {
    "question": "Wer sang 'Bad Guy'?",
    "options": [
      "Dua Lipa",
      "Billie Eilish",
      "Ariana Grande",
      "Lorde"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "musik",
    "id": 22
  },
  {
    "question": "Wer sang 'Shape of You'?",
    "options": [
      "Justin Bieber",
      "Ed Sheeran",
      "Bruno Mars",
      "Sam Smith"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "musik",
    "id": 23
  },
  {
    "question": "Welche Sängerin ist als 'Queen B' bekannt?",
    "options": [
      "Beyoncé",
      "Rihanna",
      "Madonna",
      "Britney Spears"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 24
  },
  {
    "question": "Welche Band sang 'Bohemian Rhapsody'?",
    "options": [
      "Queen",
      "ABBA",
      "Pink Floyd",
      "Eagles"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 25
  },
  {
    "question": "Wer ist der 'King of Pop'?",
    "options": [
      "Elvis Presley",
      "Michael Jackson",
      "Prince",
      "David Bowie"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "musik",
    "id": 26
  },
  {
    "question": "Wie heißt das Pink-Floyd-Album mit dem Prisma-Cover?",
    "options": [
      "The Wall",
      "Wish You Were Here",
      "Animals",
      "Dark Side of the Moon"
    ],
    "answer": 3,
    "difficulty": "easy",
    "category": "musik",
    "id": 27
  },
  {
    "question": "Wer komponierte die Musik zu 'Star Wars'?",
    "options": [
      "Hans Zimmer",
      "Ennio Morricone",
      "John Williams",
      "Danny Elfman"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "musik",
    "id": 28
  },
  {
    "question": "Welcher Rapper heißt mit echtem Namen Marshall Mathers?",
    "options": [
      "Eminem",
      "Drake",
      "50 Cent",
      "Snoop Dogg"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 29
  },
  {
    "question": "Wer sang 'Rolling in the Deep'?",
    "options": [
      "Adele",
      "Sam Smith",
      "Beyoncé",
      "Pink"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 30
  },
  {
    "question": "Welcher Verein gewann 2024 die UEFA Champions League?",
    "options": [
      "Manchester City",
      "Real Madrid",
      "Bayern München",
      "Inter Mailand"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 31
  },
  {
    "question": "Wer wurde 2014 Fußball-Weltmeister?",
    "options": [
      "Brasilien",
      "Argentinien",
      "Deutschland",
      "Spanien"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "fussball",
    "id": 32
  },
  {
    "question": "Welches Land hat Lionel Messi 2022 zum WM-Titel geführt?",
    "options": [
      "Brasilien",
      "Argentinien",
      "Uruguay",
      "Frankreich"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 33
  },
  {
    "question": "Welcher Verein hat die meisten Bundesliga-Meisterschaften?",
    "options": [
      "Bayern München",
      "Borussia Dortmund",
      "Werder Bremen",
      "Borussia M'gladbach"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 34
  },
  {
    "question": "Welches Land gewann die EM 2021?",
    "options": [
      "England",
      "Italien",
      "Spanien",
      "Frankreich"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 35
  },
  {
    "question": "Welcher Trainer gewann mit Deutschland die WM 2014?",
    "options": [
      "Jürgen Klinsmann",
      "Joachim Löw",
      "Hansi Flick",
      "Rudi Völler"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 36
  },
  {
    "question": "Wie viele Spieler stehen pro Team beim Fußball auf dem Platz?",
    "options": [
      "9",
      "10",
      "11",
      "12"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "fussball",
    "id": 37
  },
  {
    "question": "Wie heißt der Goldene Ball für den weltbesten Fußballer?",
    "options": [
      "FIFA Award",
      "Ballon d'Or",
      "World Cup MVP",
      "Golden Boot"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 38
  },
  {
    "question": "Welches Land hat die meisten WM-Titel im Fußball?",
    "options": [
      "Deutschland",
      "Italien",
      "Brasilien",
      "Argentinien"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "fussball",
    "id": 39
  },
  {
    "question": "Welches Tier ziert das Wappen Englands?",
    "options": [
      "Adler",
      "Drei Löwen",
      "Stier",
      "Pferd"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 40
  },
  {
    "question": "Wie lange dauert ein Fußballspiel (regulär)?",
    "options": [
      "80 Min",
      "90 Min",
      "100 Min",
      "120 Min"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 41
  },
  {
    "question": "Welche Farbe hat das Trikot der niederländischen Nationalmannschaft (Heim)?",
    "options": [
      "Rot",
      "Blau",
      "Orange",
      "Gelb"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "fussball",
    "id": 42
  },
  {
    "question": "Wer ist 'CR7'?",
    "options": [
      "Cristiano Ronaldo",
      "Carlos Ronaldo",
      "Cesc Robles",
      "Carlo Rossi"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 43
  },
  {
    "question": "In welcher Stadt steht das Camp Nou?",
    "options": [
      "Madrid",
      "Barcelona",
      "Sevilla",
      "Valencia"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 44
  },
  {
    "question": "Wie heißt die höchste deutsche Spielklasse?",
    "options": [
      "1. Liga",
      "Premier",
      "Bundesliga",
      "Superliga"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "fussball",
    "id": 45
  },
  {
    "question": "Wer wurde 2018 Weltmeister?",
    "options": [
      "Kroatien",
      "Frankreich",
      "Belgien",
      "Deutschland"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 46
  },
  {
    "question": "Wie heißt das Stadion des FC Bayern?",
    "options": [
      "Olympiastadion",
      "Allianz Arena",
      "Signal Iduna Park",
      "Volksparkstadion"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 47
  },
  {
    "question": "Welche Sportart spielt Cristiano Ronaldo?",
    "options": [
      "Basketball",
      "Tennis",
      "Fußball",
      "Golf"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "fussball",
    "id": 48
  },
  {
    "question": "Welches Land richtete die WM 2022 aus?",
    "options": [
      "Russland",
      "Katar",
      "USA",
      "Brasilien"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 49
  },
  {
    "question": "Wie heißt Messis Hauptverein bis 2021?",
    "options": [
      "Real Madrid",
      "FC Barcelona",
      "PSG",
      "Inter Miami"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 50
  },
  {
    "question": "Wie heißt die Hauptstadt von Australien?",
    "options": [
      "Sydney",
      "Melbourne",
      "Canberra",
      "Perth"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 51
  },
  {
    "question": "Welches chemische Element hat das Symbol Au?",
    "options": [
      "Silber",
      "Aluminium",
      "Gold",
      "Argon"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 52
  },
  {
    "question": "Wie viele Bundesländer hat Deutschland?",
    "options": [
      "14",
      "15",
      "16",
      "17"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 53
  },
  {
    "question": "In welchem Jahr fiel die Berliner Mauer?",
    "options": [
      "1987",
      "1988",
      "1989",
      "1990"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 54
  },
  {
    "question": "Welcher Planet ist der größte unseres Sonnensystems?",
    "options": [
      "Saturn",
      "Jupiter",
      "Neptun",
      "Uranus"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 55
  },
  {
    "question": "Wer malte die Mona Lisa?",
    "options": [
      "Michelangelo",
      "Raffael",
      "Leonardo da Vinci",
      "Donatello"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 56
  },
  {
    "question": "Wie heißt der höchste Berg der Welt?",
    "options": [
      "K2",
      "Mount Everest",
      "Kangchendzönga",
      "Lhotse"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 57
  },
  {
    "question": "Wer schrieb 'Faust'?",
    "options": [
      "Schiller",
      "Goethe",
      "Lessing",
      "Kleist"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 58
  },
  {
    "question": "In welcher Stadt steht das Kolosseum?",
    "options": [
      "Athen",
      "Rom",
      "Florenz",
      "Neapel"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 59
  },
  {
    "question": "Wer war der erste Mensch auf dem Mond?",
    "options": [
      "Buzz Aldrin",
      "Neil Armstrong",
      "Yuri Gagarin",
      "Michael Collins"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 60
  },
  {
    "question": "Welche Währung wird in Japan verwendet?",
    "options": [
      "Yuan",
      "Won",
      "Yen",
      "Ringgit"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 61
  },
  {
    "question": "Wer schrieb '1984'?",
    "options": [
      "Aldous Huxley",
      "George Orwell",
      "Ray Bradbury",
      "Kurt Vonnegut"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 62
  },
  {
    "question": "Welcher Fluss fließt durch Wien?",
    "options": [
      "Rhein",
      "Donau",
      "Elbe",
      "Inn"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 63
  },
  {
    "question": "Wie viele Kontinente gibt es?",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 64
  },
  {
    "question": "Welches Land ist flächenmäßig das größte der Erde?",
    "options": [
      "USA",
      "China",
      "Russland",
      "Kanada"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 65
  },
  {
    "question": "Welche Farbe entsteht aus Blau und Gelb?",
    "options": [
      "Rot",
      "Grün",
      "Violett",
      "Orange"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 66
  },
  {
    "question": "Wie viele Beine hat eine Spinne?",
    "options": [
      "6",
      "8",
      "10",
      "12"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 67
  },
  {
    "question": "Wie heißt der längste Fluss Südamerikas?",
    "options": [
      "Nil",
      "Amazonas",
      "Mississippi",
      "Mekong"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 68
  },
  {
    "question": "Welches Tier ist auf der Flagge Sri Lankas?",
    "options": [
      "Tiger",
      "Löwe",
      "Elefant",
      "Adler"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 69
  },
  {
    "question": "Welcher Ozean ist der größte?",
    "options": [
      "Atlantik",
      "Indik",
      "Pazifik",
      "Arktis"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 70
  },
  {
    "question": "Wie heißt die Hauptstadt Frankreichs?",
    "options": [
      "Lyon",
      "Marseille",
      "Paris",
      "Bordeaux"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 71
  },
  {
    "question": "Wie viele Sekunden hat eine Stunde?",
    "options": [
      "360",
      "3600",
      "1440",
      "6000"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 72
  },
  {
    "question": "Was ist die Hauptstadt von Spanien?",
    "options": [
      "Barcelona",
      "Madrid",
      "Sevilla",
      "Valencia"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 73
  },
  {
    "question": "Welche Farbe hat ein Smaragd?",
    "options": [
      "Rot",
      "Blau",
      "Grün",
      "Gelb"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 74
  },
  {
    "question": "Wie heißt der größte Wüste der Erde (heiß)?",
    "options": [
      "Gobi",
      "Kalahari",
      "Sahara",
      "Atacama"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 75
  },
  {
    "question": "Was ist H2O?",
    "options": [
      "Salz",
      "Wasser",
      "Sauerstoff",
      "Zucker"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 76
  },
  {
    "question": "Welches Land hat die Form eines Stiefels?",
    "options": [
      "Spanien",
      "Italien",
      "Griechenland",
      "Portugal"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 77
  },
  {
    "question": "Wie heißt die Hauptstadt der USA?",
    "options": [
      "New York",
      "Los Angeles",
      "Washington D.C.",
      "Chicago"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 78
  },
  {
    "question": "Welcher Vogel kann nicht fliegen?",
    "options": [
      "Spatz",
      "Pinguin",
      "Adler",
      "Schwalbe"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 79
  },
  {
    "question": "Wie heißt der höchste Berg Deutschlands?",
    "options": [
      "Brocken",
      "Zugspitze",
      "Watzmann",
      "Feldberg"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 80
  },
  {
    "question": "Welche App zeigt nur Fotos und Reels?",
    "options": [
      "TikTok",
      "Instagram",
      "WhatsApp",
      "Snapchat"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 81
  },
  {
    "question": "Wer gründete Microsoft mit?",
    "options": [
      "Steve Jobs",
      "Bill Gates",
      "Mark Zuckerberg",
      "Elon Musk"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 82
  },
  {
    "question": "Wie heißt Marios Bruder?",
    "options": [
      "Wario",
      "Luigi",
      "Toad",
      "Yoshi"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 83
  },
  {
    "question": "Welche Farbe haben Pikachus Backen?",
    "options": [
      "Blau",
      "Rot",
      "Grün",
      "Gelb"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 84
  },
  {
    "question": "Wie heißt das Spiel mit der Spitzhacke und den Klötzen?",
    "options": [
      "Roblox",
      "Fortnite",
      "Minecraft",
      "Terraria"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 85
  },
  {
    "question": "Wer ist Elon Musks E-Auto-Firma?",
    "options": [
      "Rivian",
      "Tesla",
      "Lucid",
      "Polestar"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 86
  },
  {
    "question": "Was heißt 'lol' im Chat?",
    "options": [
      "laughing out loud",
      "lots of love",
      "live online",
      "low light"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 87
  },
  {
    "question": "Was ist Steves Beruf in Minecraft?",
    "options": [
      "Bergmann",
      "Bäcker",
      "Lehrer",
      "Pirat"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 88
  },
  {
    "question": "Welche Konsole baut Sony?",
    "options": [
      "Xbox",
      "PlayStation",
      "Switch",
      "Game Boy"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 89
  },
  {
    "question": "Wer gründete Facebook?",
    "options": [
      "Jack Dorsey",
      "Mark Zuckerberg",
      "Sergey Brin",
      "Larry Page"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 90
  },
  {
    "question": "Welcher Browser hat ein Fuchs-Logo?",
    "options": [
      "Chrome",
      "Edge",
      "Firefox",
      "Safari"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 91
  },
  {
    "question": "Wie heißt der Erfinder der Glühbirne (im Volksmund)?",
    "options": [
      "Tesla",
      "Edison",
      "Bell",
      "Einstein"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 92
  },
  {
    "question": "Welche Frucht ziert das Apple-Logo?",
    "options": [
      "Birne",
      "Apfel",
      "Pfirsich",
      "Kirsche"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 93
  },
  {
    "question": "Wer ist 'MrBeast' bekannt durch?",
    "options": [
      "Twitch",
      "TikTok",
      "YouTube",
      "Spotify"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 94
  },
  {
    "question": "Welche App ist für Kurzvideos bekannt?",
    "options": [
      "Reddit",
      "TikTok",
      "LinkedIn",
      "Pinterest"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 95
  },
  {
    "question": "Wofür steht die Abkürzung 'GIF'?",
    "options": [
      "Graphics Interchange Format",
      "General Image File",
      "Grouped Image Frame",
      "Global Image Feed"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 96
  },
  {
    "question": "Wer ist der Held von 'The Legend of Zelda'?",
    "options": [
      "Zelda",
      "Link",
      "Ganon",
      "Mario"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 97
  },
  {
    "question": "Welches Tier ist Pokémon Nr. 1?",
    "options": [
      "Pikachu",
      "Bisasam",
      "Glumanda",
      "Mew"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 98
  },
  {
    "question": "Welches soziale Netzwerk gehört Mark Zuckerberg?",
    "options": [
      "TikTok",
      "X",
      "Instagram",
      "Snapchat"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 99
  },
  {
    "question": "Welche Farbe hat das Snapchat-Logo?",
    "options": [
      "Blau",
      "Gelb",
      "Pink",
      "Grün"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 100
  },
  {
    "question": "Wie heißt der Online-Shop von Jeff Bezos?",
    "options": [
      "eBay",
      "Amazon",
      "AliExpress",
      "Etsy"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 101
  },
  {
    "question": "Welches Spiel beinhaltet eine 'Battle Royale' mit Tänzen?",
    "options": [
      "Apex",
      "PUBG",
      "Fortnite",
      "Warzone"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 102
  },
  {
    "question": "Wie heißt die Hauptstadt von Italien?",
    "options": [
      "Mailand",
      "Rom",
      "Florenz",
      "Neapel"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 103
  },
  {
    "question": "Welches Land hat die Form eines Hexagons (umgangssprachlich)?",
    "options": [
      "Spanien",
      "Frankreich",
      "Polen",
      "Belgien"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 104
  },
  {
    "question": "Wie heißt das Volkslied 'Stille Nacht' im Original-Land?",
    "options": [
      "Deutschland",
      "Österreich",
      "Schweiz",
      "Italien"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "musik",
    "id": 105
  },
  {
    "question": "Wer schrieb 'Romeo und Julia'?",
    "options": [
      "Goethe",
      "Schiller",
      "Shakespeare",
      "Molière"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 106
  },
  {
    "question": "Wie viele Spieler hat eine Basketball-Mannschaft auf dem Feld?",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 107
  },
  {
    "question": "Welche Sportart wird auf Eis mit Steinen gespielt?",
    "options": [
      "Eishockey",
      "Curling",
      "Eisstockschießen",
      "Eiskunstlauf"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 108
  },
  {
    "question": "Welche Stadt liegt am Bosporus?",
    "options": [
      "Ankara",
      "Istanbul",
      "Athen",
      "Sofia"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 109
  },
  {
    "question": "Welches Tier wird oft als 'König der Tiere' bezeichnet?",
    "options": [
      "Tiger",
      "Adler",
      "Löwe",
      "Elefant"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 110
  },
  {
    "question": "Wer schoss das Siegtor im WM-Finale 2014 für Deutschland?",
    "options": [
      "Mario Götze",
      "Thomas Müller",
      "Bastian Schweinsteiger",
      "Mesut Özil"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 111
  },
  {
    "question": "Welcher Boxer hieß 'The Greatest'?",
    "options": [
      "Mike Tyson",
      "Muhammad Ali",
      "Floyd Mayweather",
      "George Foreman"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 112
  },
  {
    "question": "Welche Farben hat die deutsche Flagge?",
    "options": [
      "Rot-Weiß-Schwarz",
      "Schwarz-Rot-Gold",
      "Gelb-Rot-Schwarz",
      "Schwarz-Weiß-Rot"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 113
  },
  {
    "question": "Wie viele Tage hat ein Schaltjahr?",
    "options": [
      "364",
      "365",
      "366",
      "367"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 114
  },
  {
    "question": "Welcher Monat hat 28 oder 29 Tage?",
    "options": [
      "Februar",
      "März",
      "April",
      "Juni"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 115
  },
  {
    "question": "Wie viele Streifen hat die US-Flagge?",
    "options": [
      "12",
      "13",
      "14",
      "15"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 116
  },
  {
    "question": "Was bedeutet 'WWW'?",
    "options": [
      "World Wide Web",
      "World Wide Wifi",
      "Web Wide World",
      "Wide World Web"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 117
  },
  {
    "question": "Welches Tier liefert Wolle?",
    "options": [
      "Kuh",
      "Schaf",
      "Pferd",
      "Ziege"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 118
  },
  {
    "question": "Wie heißt das süße Brotgebäck mit Loch?",
    "options": [
      "Brezel",
      "Donut",
      "Croissant",
      "Bagel"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 119
  },
  {
    "question": "Welche Stadt ist Hauptstadt Englands?",
    "options": [
      "Manchester",
      "Liverpool",
      "London",
      "Birmingham"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 120
  },
  {
    "question": "Wie heißt der Weihnachtsmann auf Englisch?",
    "options": [
      "Father Christmas",
      "Santa Claus",
      "Saint Nick",
      "Alle drei korrekt"
    ],
    "answer": 3,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 121
  },
  {
    "question": "Welches Tier sagt 'muh'?",
    "options": [
      "Schaf",
      "Kuh",
      "Hund",
      "Katze"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 122
  },
  {
    "question": "Welche Farbe hat die Sonne (gemalt von Kindern)?",
    "options": [
      "Rot",
      "Gelb",
      "Blau",
      "Grün"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 123
  },
  {
    "question": "Wer schrieb 'Die Verwandlung'?",
    "options": [
      "Kafka",
      "Mann",
      "Hesse",
      "Brecht"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 124
  },
  {
    "question": "Welches Instrument hat 88 Tasten?",
    "options": [
      "Orgel",
      "Akkordeon",
      "Klavier",
      "Cembalo"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "musik",
    "id": 125
  },
  {
    "question": "Was misst ein Thermometer?",
    "options": [
      "Druck",
      "Temperatur",
      "Geschwindigkeit",
      "Feuchtigkeit"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 126
  },
  {
    "question": "Wer war der erste deutsche Bundeskanzler?",
    "options": [
      "Brandt",
      "Adenauer",
      "Kohl",
      "Schmidt"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 127
  },
  {
    "question": "Welches Land hat die meisten Einwohner (Stand 2023)?",
    "options": [
      "China",
      "USA",
      "Indien",
      "Indonesien"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 128
  },
  {
    "question": "Welcher Wochentag kommt nach Donnerstag?",
    "options": [
      "Mittwoch",
      "Freitag",
      "Samstag",
      "Sonntag"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 129
  },
  {
    "question": "Welche Stadt liegt an der Themse?",
    "options": [
      "Dublin",
      "London",
      "Manchester",
      "Edinburgh"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 130
  },
  {
    "question": "Was bedeutet 'UFO'?",
    "options": [
      "Unbekanntes Flugobjekt",
      "Ultra Flying Object",
      "Universal Flugobjekt",
      "Unidentifiziertes Flugobjekt"
    ],
    "answer": 3,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 131
  },
  {
    "question": "Wie heißt der größte See Afrikas?",
    "options": [
      "Tanganjika-See",
      "Viktoriasee",
      "Tschadsee",
      "Malawisee"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 132
  },
  {
    "question": "Welches Organ pumpt Blut?",
    "options": [
      "Lunge",
      "Leber",
      "Herz",
      "Niere"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 133
  },
  {
    "question": "Welche Sprache spricht man in Brasilien?",
    "options": [
      "Spanisch",
      "Portugiesisch",
      "Brasilianisch",
      "Französisch"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 134
  },
  {
    "question": "In welchem Märchen rollt der Käse-Klumpen am Ende den Berg hinab?",
    "options": [
      "Hans im Glück",
      "Tischlein deck dich",
      "Die Bremer Stadtmusikanten",
      "Frau Holle"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 135
  },
  {
    "question": "Welches Land erfand die Pizza?",
    "options": [
      "Frankreich",
      "Italien",
      "Spanien",
      "Griechenland"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 136
  },
  {
    "question": "Welche Tageszeit hat die Sonne am höchsten?",
    "options": [
      "Morgen",
      "Mittag",
      "Abend",
      "Mitternacht"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 137
  },
  {
    "question": "Welcher See ist der größte Deutschlands?",
    "options": [
      "Chiemsee",
      "Bodensee",
      "Müritz",
      "Starnberger See"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 138
  },
  {
    "question": "Welche Hauptstadt liegt in Norwegen?",
    "options": [
      "Stockholm",
      "Helsinki",
      "Oslo",
      "Kopenhagen"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 139
  },
  {
    "question": "Welches Tier produziert Honig?",
    "options": [
      "Wespe",
      "Biene",
      "Hummel",
      "Ameise"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 140
  },
  {
    "question": "Welcher Fluss fließt durch Paris?",
    "options": [
      "Rhône",
      "Seine",
      "Loire",
      "Garonne"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 141
  },
  {
    "question": "Welche Hauptstadt liegt in Polen?",
    "options": [
      "Prag",
      "Warschau",
      "Krakau",
      "Budapest"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 142
  },
  {
    "question": "Welche Farbe bekommt man, wenn man Rot und Weiß mischt?",
    "options": [
      "Pink",
      "Orange",
      "Lila",
      "Braun"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 143
  },
  {
    "question": "Welches Werkzeug zeichnet Kreise?",
    "options": [
      "Lineal",
      "Zirkel",
      "Geodreieck",
      "Winkelmesser"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 144
  },
  {
    "question": "Welches Land erfand das Sushi?",
    "options": [
      "China",
      "Japan",
      "Korea",
      "Vietnam"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 145
  },
  {
    "question": "Welche Tageszeit hat 'AM'?",
    "options": [
      "Vormittag",
      "Nachmittag",
      "Abend",
      "Nacht"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 146
  },
  {
    "question": "Wie viele Augen hat ein Würfel insgesamt?",
    "options": [
      "18",
      "21",
      "24",
      "28"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 147
  },
  {
    "question": "Welche Farbe hat eine Tomate (reif)?",
    "options": [
      "Grün",
      "Gelb",
      "Rot",
      "Lila"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 148
  },
  {
    "question": "Wer war US-Präsident vor Trump (1. Amtszeit)?",
    "options": [
      "Bush",
      "Obama",
      "Clinton",
      "Biden"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 149
  },
  {
    "question": "Wie heißt die Hauptstadt von Russland?",
    "options": [
      "St. Petersburg",
      "Kiew",
      "Moskau",
      "Minsk"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 150
  },
  {
    "question": "Welche Sportart spielt Serena Williams?",
    "options": [
      "Golf",
      "Tennis",
      "Badminton",
      "Squash"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 151
  },
  {
    "question": "Welches Spiel hat 'Game Over' eingeführt?",
    "options": [
      "Schach",
      "Pac-Man",
      "Tetris",
      "Pong"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 152
  },
  {
    "question": "Welche Stadt heißt 'die ewige Stadt'?",
    "options": [
      "Athen",
      "Rom",
      "Jerusalem",
      "Istanbul"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 153
  },
  {
    "question": "Welche App ersetzt SMS bei vielen?",
    "options": [
      "Instagram",
      "WhatsApp",
      "Facebook",
      "Twitter"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 154
  },
  {
    "question": "Wer ist Donald Ducks Onkel?",
    "options": [
      "Daisy",
      "Dagobert",
      "Goofy",
      "Mickey"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 155
  },
  {
    "question": "Welches Tier ist das Maskottchen von Twitter (alt)?",
    "options": [
      "Eule",
      "Vogel",
      "Fuchs",
      "Hund"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 156
  },
  {
    "question": "Welches Land verbindet man mit der Wikinger-Geschichte?",
    "options": [
      "Italien",
      "Norwegen",
      "Portugal",
      "Griechenland"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 157
  },
  {
    "question": "Welche Filmreihe spielt in Hogwarts?",
    "options": [
      "Star Wars",
      "Herr der Ringe",
      "Harry Potter",
      "Narnia"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 158
  },
  {
    "question": "Wie heißt die Hauptfigur in 'Die Tribute von Panem'?",
    "options": [
      "Tris",
      "Bella",
      "Katniss",
      "Hermine"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "filme",
    "id": 159
  },
  {
    "question": "Welche Farbe hat ein Polizeiauto in Deutschland (modern)?",
    "options": [
      "Grün-Weiß",
      "Blau-Silber",
      "Schwarz-Weiß",
      "Rot-Weiß"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 160
  },
  {
    "question": "Welche Form hat ein Sechseck?",
    "options": [
      "3 Ecken",
      "4 Ecken",
      "5 Ecken",
      "6 Ecken"
    ],
    "answer": 3,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 161
  },
  {
    "question": "Wie heißt die Mutter von Bart Simpson?",
    "options": [
      "Marge",
      "Lisa",
      "Maggie",
      "Selma"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 162
  },
  {
    "question": "Wer ist die Hauptfigur in 'Mr. Bean'?",
    "options": [
      "Rowan Atkinson",
      "Hugh Grant",
      "John Cleese",
      "Stephen Fry"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 163
  },
  {
    "question": "Welche Marke baut den Golf?",
    "options": [
      "Audi",
      "VW",
      "BMW",
      "Opel"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 164
  },
  {
    "question": "Wer schrieb das Drehbuch zu 'The Social Network'?",
    "options": [
      "Aaron Sorkin",
      "Charlie Kaufman",
      "David Fincher",
      "Spike Jonze"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 165
  },
  {
    "question": "Welches Studio produzierte 'Spirited Away'?",
    "options": [
      "Pixar",
      "Studio Ghibli",
      "Toei Animation",
      "Madhouse"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "filme",
    "id": 166
  },
  {
    "question": "Wer gewann den Ballon d'Or 2023?",
    "options": [
      "Erling Haaland",
      "Kylian Mbappé",
      "Lionel Messi",
      "Kevin De Bruyne"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 167
  },
  {
    "question": "Welcher Klub gewann das CL-Finale 1999 in letzter Minute?",
    "options": [
      "Manchester United",
      "Real Madrid",
      "Bayern München",
      "FC Barcelona"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 168
  },
  {
    "question": "Wer schoss das erste Tor bei Brasilien gegen Deutschland (WM 2014, 7:1)?",
    "options": [
      "Müller",
      "Klose",
      "Khedira",
      "Kroos"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 169
  },
  {
    "question": "Welcher Verein gewann 1997 die UEFA Champions League?",
    "options": [
      "Juventus Turin",
      "Borussia Dortmund",
      "Bayern München",
      "Manchester United"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 170
  },
  {
    "question": "In welchem Jahr fand die erste Fußball-WM statt?",
    "options": [
      "1926",
      "1930",
      "1934",
      "1938"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 171
  },
  {
    "question": "Wer ist Rekordtorschütze der Bundesliga (Stand 2023)?",
    "options": [
      "Gerd Müller",
      "Robert Lewandowski",
      "Klaus Fischer",
      "Jupp Heynckes"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 172
  },
  {
    "question": "Welches Land trägt seine Heimspiele im Stade de France aus?",
    "options": [
      "Belgien",
      "Frankreich",
      "Schweiz",
      "Portugal"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 173
  },
  {
    "question": "Welches Album von Kendrick Lamar gewann den Pulitzer-Preis?",
    "options": [
      "good kid, m.A.A.d city",
      "To Pimp a Butterfly",
      "DAMN.",
      "Mr. Morale"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 174
  },
  {
    "question": "Wer drehte 'There Will Be Blood'?",
    "options": [
      "Paul Thomas Anderson",
      "Wes Anderson",
      "Darren Aronofsky",
      "David Lynch"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 175
  },
  {
    "question": "Wie heißt das längste Buch von Tolkien?",
    "options": [
      "Der Hobbit",
      "Das Silmarillion",
      "Der Herr der Ringe",
      "Nachrichten aus Mittelerde"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "filme",
    "id": 176
  },
  {
    "question": "Wer war 'The Greatest' im Boxen?",
    "options": [
      "Mike Tyson",
      "Muhammad Ali",
      "Joe Frazier",
      "George Foreman"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 177
  },
  {
    "question": "Wie heißt die Hauptstadt von Kanada?",
    "options": [
      "Toronto",
      "Vancouver",
      "Ottawa",
      "Montreal"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 178
  },
  {
    "question": "In welchem Jahr wurde die DDR gegründet?",
    "options": [
      "1945",
      "1947",
      "1949",
      "1953"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 179
  },
  {
    "question": "Wer komponierte 'Ode an die Freude'?",
    "options": [
      "Mozart",
      "Bach",
      "Beethoven",
      "Brahms"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 180
  },
  {
    "question": "Wie viele Knochen hat ein erwachsener Mensch (ca.)?",
    "options": [
      "186",
      "206",
      "226",
      "256"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 181
  },
  {
    "question": "Welches Land hat die meisten Zeitzonen?",
    "options": [
      "USA",
      "Russland",
      "China",
      "Frankreich"
    ],
    "answer": 3,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 182
  },
  {
    "question": "Wer schrieb 'Schuld und Sühne'?",
    "options": [
      "Tolstoi",
      "Dostojewski",
      "Tschechow",
      "Gogol"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 183
  },
  {
    "question": "Welcher Spieler wurde 'El Fenómeno' genannt?",
    "options": [
      "Ronaldinho",
      "Romário",
      "Ronaldo Nazário",
      "Rivaldo"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 184
  },
  {
    "question": "Welche Band hat 'OK Computer' veröffentlicht?",
    "options": [
      "Oasis",
      "Blur",
      "Radiohead",
      "Pulp"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 185
  },
  {
    "question": "Wer schrieb 'Die Unvollendete' Symphonie?",
    "options": [
      "Schubert",
      "Mahler",
      "Bruckner",
      "Schumann"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 186
  },
  {
    "question": "Welcher Brite gewann die Tour de France 2012 als Erster?",
    "options": [
      "Chris Froome",
      "Bradley Wiggins",
      "Mark Cavendish",
      "Geraint Thomas"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 187
  },
  {
    "question": "Welcher Trainer gewann mit Inter das Triple 2010?",
    "options": [
      "Conte",
      "Allegri",
      "Mourinho",
      "Ancelotti"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 188
  },
  {
    "question": "Welche Sprache hat die meisten Muttersprachler weltweit?",
    "options": [
      "Englisch",
      "Spanisch",
      "Hindi",
      "Mandarin"
    ],
    "answer": 3,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 189
  },
  {
    "question": "Welcher Spieler war 2009 der bis dahin teuerste Transfer der Welt zu Real Madrid?",
    "options": [
      "Kaká",
      "Zlatan Ibrahimović",
      "Cristiano Ronaldo",
      "Karim Benzema"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 190
  },
  {
    "question": "Wer war US-Präsident während der Kubakrise?",
    "options": [
      "Eisenhower",
      "Kennedy",
      "Johnson",
      "Nixon"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 191
  },
  {
    "question": "Welches Land gewann die Copa América 2024?",
    "options": [
      "Brasilien",
      "Kolumbien",
      "Argentinien",
      "Uruguay"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 192
  },
  {
    "question": "Welcher Maler schnitt sich ein Ohr ab?",
    "options": [
      "Monet",
      "Gauguin",
      "Van Gogh",
      "Cézanne"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 193
  },
  {
    "question": "Wer schrieb die Songs für 'Hamilton'?",
    "options": [
      "Lin-Manuel Miranda",
      "Stephen Sondheim",
      "Andrew Lloyd Webber",
      "Pasek & Paul"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 194
  },
  {
    "question": "Welcher BVB-Trainer holte 2011/12 die Meisterschaft?",
    "options": [
      "Tuchel",
      "Klopp",
      "Stöger",
      "Favre"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 195
  },
  {
    "question": "Welcher Spieler trägt den Spitznamen 'The Egyptian King'?",
    "options": [
      "Mohamed Salah",
      "Riyad Mahrez",
      "Hakim Ziyech",
      "Mostafa Mohamed"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 196
  },
  {
    "question": "Wer gewann den Oscar 2020 als bester Film?",
    "options": [
      "1917",
      "Joker",
      "Parasite",
      "Ford v Ferrari"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "filme",
    "id": 197
  },
  {
    "question": "Wer dirigierte 'Inception'?",
    "options": [
      "Christopher Nolan",
      "Steven Spielberg",
      "Ridley Scott",
      "James Cameron"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 198
  },
  {
    "question": "Welche Schauspielerin gewann den Oscar für 'La La Land'?",
    "options": [
      "Emma Stone",
      "Natalie Portman",
      "Meryl Streep",
      "Isabelle Huppert"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 199
  },
  {
    "question": "Wer komponierte 'Pirates of the Caribbean'?",
    "options": [
      "John Williams",
      "Hans Zimmer & Klaus Badelt",
      "James Horner",
      "Howard Shore"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "musik",
    "id": 200
  },
  {
    "question": "Wer schrieb 'Der Herr der Ringe'?",
    "options": [
      "C.S. Lewis",
      "J.R.R. Tolkien",
      "J.K. Rowling",
      "Terry Pratchett"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "filme",
    "id": 201
  },
  {
    "question": "In welchem Jahr starb Freddie Mercury?",
    "options": [
      "1989",
      "1990",
      "1991",
      "1992"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 202
  },
  {
    "question": "Wer sang 'Like a Rolling Stone'?",
    "options": [
      "Bob Dylan",
      "Bruce Springsteen",
      "Neil Young",
      "Tom Petty"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 203
  },
  {
    "question": "Wer war Sänger von Nirvana?",
    "options": [
      "Kurt Cobain",
      "Dave Grohl",
      "Krist Novoselic",
      "Eddie Vedder"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 204
  },
  {
    "question": "Wer sang 'Hello' (2015)?",
    "options": [
      "Adele",
      "Sia",
      "Lorde",
      "Sam Smith"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 205
  },
  {
    "question": "Welche Band sang 'Hotel California'?",
    "options": [
      "Eagles",
      "Fleetwood Mac",
      "The Doors",
      "Lynyrd Skynyrd"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 206
  },
  {
    "question": "Wer gewann den Eurovision Song Contest 2014 (Conchita)?",
    "options": [
      "Frankreich",
      "Österreich",
      "Deutschland",
      "Schweden"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "musik",
    "id": 207
  },
  {
    "question": "Wer gewann den ESC 2010 (Lena)?",
    "options": [
      "Norwegen",
      "Schweden",
      "Deutschland",
      "Aserbaidschan"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 208
  },
  {
    "question": "Welches Album von Beyoncé erschien 2016?",
    "options": [
      "4",
      "Lemonade",
      "B'Day",
      "Renaissance"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "musik",
    "id": 209
  },
  {
    "question": "Wer spielte Walter White?",
    "options": [
      "Bryan Cranston",
      "Aaron Paul",
      "Bob Odenkirk",
      "Giancarlo Esposito"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 210
  },
  {
    "question": "Wer ist der Schöpfer von 'The Wire'?",
    "options": [
      "David Simon",
      "Vince Gilligan",
      "David Chase",
      "David Lynch"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 211
  },
  {
    "question": "Welche Serie hat eine Folge namens 'Ozymandias'?",
    "options": [
      "Mad Men",
      "Breaking Bad",
      "Better Call Saul",
      "True Detective"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "filme",
    "id": 212
  },
  {
    "question": "Wer drehte 'Schindlers Liste'?",
    "options": [
      "Steven Spielberg",
      "Stanley Kubrick",
      "Roman Polanski",
      "Martin Scorsese"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 213
  },
  {
    "question": "Wer schrieb 'Die unendliche Geschichte'?",
    "options": [
      "Cornelia Funke",
      "Michael Ende",
      "Otfried Preußler",
      "Erich Kästner"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 214
  },
  {
    "question": "In welchem Stadion findet das CL-Finale 2026 statt?",
    "options": [
      "Wembley",
      "Camp Nou",
      "Puskás Aréna",
      "Allianz Arena"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 215
  },
  {
    "question": "Wer wurde Torschützenkönig der EM 2024?",
    "options": [
      "Harry Kane",
      "Dani Olmo",
      "Cody Gakpo (Gruppe)",
      "Mehrere mit 3 Toren"
    ],
    "answer": 3,
    "difficulty": "medium",
    "category": "fussball",
    "id": 216
  },
  {
    "question": "Wer gewann den Confed-Cup 2017?",
    "options": [
      "Brasilien",
      "Deutschland",
      "Chile",
      "Mexiko"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 217
  },
  {
    "question": "Welcher Verein wurde 2012 CL-Sieger (München-Finale)?",
    "options": [
      "Bayern",
      "Real",
      "Chelsea",
      "Barcelona"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 218
  },
  {
    "question": "Wer ist Rekordnationalspieler Deutschlands?",
    "options": [
      "Matthäus",
      "Klose",
      "Podolski",
      "Schweinsteiger"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 219
  },
  {
    "question": "In welchem Jahr stieg der HSV erstmals aus der Bundesliga ab?",
    "options": [
      "2016",
      "2017",
      "2018",
      "2019"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 220
  },
  {
    "question": "Welcher Spieler wurde 2014 mit Deutschland Weltmeister und war zuvor 2006 Bundestrainer?",
    "options": [
      "Berti Vogts",
      "Jürgen Klinsmann",
      "Andreas Brehme",
      "Lothar Matthäus"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 221
  },
  {
    "question": "Welcher Klub gewann die CL 2019?",
    "options": [
      "Tottenham",
      "Liverpool",
      "Bayern",
      "Manchester City"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 222
  },
  {
    "question": "Wer gewann die WM 2010?",
    "options": [
      "Niederlande",
      "Spanien",
      "Deutschland",
      "Uruguay"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 223
  },
  {
    "question": "Welcher deutsche Verein gewann 1997 den CL-Titel?",
    "options": [
      "Bayern",
      "BVB",
      "Schalke",
      "Leverkusen"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 224
  },
  {
    "question": "Welcher Verein gewann 1997 den UEFA-Cup gegen Inter?",
    "options": [
      "Bayer Leverkusen",
      "Schalke 04",
      "Bayern München",
      "Werder Bremen"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 225
  },
  {
    "question": "Wer gewann die EM 2016?",
    "options": [
      "Frankreich",
      "Portugal",
      "Deutschland",
      "Wales"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 226
  },
  {
    "question": "Welches Land gewann 2002 die WM?",
    "options": [
      "Brasilien",
      "Deutschland",
      "Italien",
      "Argentinien"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 227
  },
  {
    "question": "Wer war Cheftrainer Spaniens bei der WM 2010?",
    "options": [
      "Luis Aragonés",
      "Vicente del Bosque",
      "Luis Enrique",
      "Julen Lopetegui"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 228
  },
  {
    "question": "Wer hält den Rekord für die meisten Champions-League-Tore aller Zeiten?",
    "options": [
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Robert Lewandowski",
      "Karim Benzema"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 229
  },
  {
    "question": "Welcher Stürmer wechselte 2017 für 222 Mio € zu PSG?",
    "options": [
      "Mbappé",
      "Neymar",
      "Cavani",
      "Di María"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 230
  },
  {
    "question": "Wer wurde 2022 in Katar Torschützenkönig?",
    "options": [
      "Mbappé",
      "Messi",
      "Giroud",
      "Álvarez"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 231
  },
  {
    "question": "Welches Stadion ist 'Anfield'?",
    "options": [
      "Everton",
      "Liverpool",
      "Man City",
      "Arsenal"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 232
  },
  {
    "question": "Wer wurde 2003 Bundesliga-Meister?",
    "options": [
      "Bayern",
      "Bremen",
      "Dortmund",
      "Stuttgart"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 233
  },
  {
    "question": "Welcher Klub gewann 2024 die Bundesliga?",
    "options": [
      "Bayern",
      "Leverkusen",
      "Stuttgart",
      "RB Leipzig"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 234
  },
  {
    "question": "Wer wurde 2024 Bundesliga-Trainer der Saison?",
    "options": [
      "Tuchel",
      "Xabi Alonso",
      "Streich",
      "Nagelsmann"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 235
  },
  {
    "question": "Wer gewann 2023 die WM der Frauen?",
    "options": [
      "USA",
      "Spanien",
      "England",
      "Australien"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 236
  },
  {
    "question": "Welcher Verein heißt 'Die Werkself'?",
    "options": [
      "Schalke",
      "Leverkusen",
      "Wolfsburg",
      "Hoffenheim"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 237
  },
  {
    "question": "Welcher Verein heißt 'Die Knappen'?",
    "options": [
      "Schalke 04",
      "BVB",
      "Bochum",
      "Duisburg"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 238
  },
  {
    "question": "Welche Position spielt Manuel Neuer?",
    "options": [
      "Stürmer",
      "Mittelfeld",
      "Verteidiger",
      "Torwart"
    ],
    "answer": 3,
    "difficulty": "medium",
    "category": "fussball",
    "id": 239
  },
  {
    "question": "Wer ist Gründer von Tesla & SpaceX?",
    "options": [
      "Bill Gates",
      "Elon Musk",
      "Jeff Bezos",
      "Larry Page"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 240
  },
  {
    "question": "In welcher Stadt sitzt das Apple-HQ?",
    "options": [
      "Mountain View",
      "Cupertino",
      "Palo Alto",
      "San Jose"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 241
  },
  {
    "question": "Wer gründete Amazon?",
    "options": [
      "Jeff Bezos",
      "Elon Musk",
      "Larry Page",
      "Tim Cook"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 242
  },
  {
    "question": "Welches Spiel hat die 'Creeper'?",
    "options": [
      "Roblox",
      "Minecraft",
      "Terraria",
      "Fortnite"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 243
  },
  {
    "question": "Wer entwickelte 'Pong'?",
    "options": [
      "Atari",
      "Nintendo",
      "Sega",
      "Sony"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 244
  },
  {
    "question": "Wie heißt die Hauptperson in 'The Witcher'?",
    "options": [
      "Geralt von Riva",
      "Yennefer",
      "Vesemir",
      "Ciri"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 245
  },
  {
    "question": "Wer spielt Geralt in der Netflix-Serie 'The Witcher' (Staffel 1-3)?",
    "options": [
      "Henry Cavill",
      "Chris Hemsworth",
      "Liam Hemsworth",
      "Jason Momoa"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 246
  },
  {
    "question": "Welches Spiel hat die Figur 'Master Chief'?",
    "options": [
      "Doom",
      "Halo",
      "Destiny",
      "Gears of War"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 247
  },
  {
    "question": "Welche Marke heißt der Aibo-Roboterhund?",
    "options": [
      "Sony",
      "Panasonic",
      "Toshiba",
      "Sharp"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 248
  },
  {
    "question": "Wer gewann den ersten 'The Voice of Germany'?",
    "options": [
      "Ivy Quainoo",
      "Andreas Kümmert",
      "Nick Howard",
      "Charley Ann Schmutzler"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 249
  },
  {
    "question": "Welches Element hat das Symbol 'Fe'?",
    "options": [
      "Fluor",
      "Eisen",
      "Kupfer",
      "Blei"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 250
  },
  {
    "question": "Was misst die Skala nach Richter?",
    "options": [
      "Wind",
      "Erdbeben",
      "Lautstärke",
      "Druck"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 251
  },
  {
    "question": "Wie heißt die Hauptstadt von Argentinien?",
    "options": [
      "Santiago",
      "Lima",
      "Buenos Aires",
      "Asunción"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 252
  },
  {
    "question": "Welches Land grenzt nicht an Deutschland?",
    "options": [
      "Polen",
      "Tschechien",
      "Ungarn",
      "Frankreich"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 253
  },
  {
    "question": "Welcher Krieg fand 1914–1918 statt?",
    "options": [
      "Krimkrieg",
      "1. Weltkrieg",
      "2. Weltkrieg",
      "Kalter Krieg"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 254
  },
  {
    "question": "Wer schrieb 'Die Blechtrommel'?",
    "options": [
      "Grass",
      "Böll",
      "Hesse",
      "Walser"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 255
  },
  {
    "question": "Welche Hauptstadt liegt in Belgien?",
    "options": [
      "Brüssel",
      "Antwerpen",
      "Brügge",
      "Gent"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 256
  },
  {
    "question": "Wie heißt der höchste Berg Afrikas?",
    "options": [
      "Kilimandscharo",
      "Kenia",
      "Atlas",
      "Ruwenzori"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 257
  },
  {
    "question": "In welchem Jahr endete der 2. Weltkrieg?",
    "options": [
      "1944",
      "1945",
      "1946",
      "1947"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 258
  },
  {
    "question": "Wer war der erste Mensch im All?",
    "options": [
      "Armstrong",
      "Gagarin",
      "Tereschkowa",
      "Glenn"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 259
  },
  {
    "question": "Wie heißt der römische Gott des Krieges?",
    "options": [
      "Jupiter",
      "Mars",
      "Apollo",
      "Merkur"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 260
  },
  {
    "question": "Welches Land hat die Hauptstadt Lissabon?",
    "options": [
      "Spanien",
      "Portugal",
      "Brasilien",
      "Italien"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 261
  },
  {
    "question": "Wer schrieb 'Don Quijote'?",
    "options": [
      "Cervantes",
      "Lorca",
      "Borges",
      "Neruda"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 262
  },
  {
    "question": "Welches Tier hat die längste Tragzeit?",
    "options": [
      "Wal",
      "Elefant",
      "Giraffe",
      "Nashorn"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 263
  },
  {
    "question": "Welches Land erfand das Schießpulver?",
    "options": [
      "Indien",
      "China",
      "Persien",
      "Ägypten"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 264
  },
  {
    "question": "Welches Land trinkt am meisten Bier pro Kopf?",
    "options": [
      "Deutschland",
      "Belgien",
      "Tschechien",
      "Irland"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 265
  },
  {
    "question": "Wer ist der Erfinder der Relativitätstheorie?",
    "options": [
      "Newton",
      "Einstein",
      "Hawking",
      "Planck"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 266
  },
  {
    "question": "Wie viele Spiele dauert die längste Tennis-Partie der Geschichte (Isner-Mahut, Sätze)?",
    "options": [
      "3 Sätze",
      "4 Sätze",
      "5 Sätze (11h+)",
      "6 Sätze"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "fussball",
    "id": 267
  },
  {
    "question": "Welche Sprache spricht man in Österreich?",
    "options": [
      "Österreichisch",
      "Deutsch",
      "Schweizerdeutsch",
      "Bairisch"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 268
  },
  {
    "question": "Wer war Königin von England (gestorben 2022)?",
    "options": [
      "Elizabeth I.",
      "Victoria",
      "Elizabeth II.",
      "Mary"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 269
  },
  {
    "question": "Aus welchem Land stammt ursprünglich die Pasta?",
    "options": [
      "Italien",
      "Frankreich",
      "China",
      "Griechenland"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 270
  },
  {
    "question": "Welche Stadt war Hauptstadt der DDR?",
    "options": [
      "Leipzig",
      "Dresden",
      "Ost-Berlin",
      "Magdeburg"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 271
  },
  {
    "question": "Welches Land grenzt an Mexiko im Süden?",
    "options": [
      "Belize",
      "Honduras",
      "Nicaragua",
      "Costa Rica"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 272
  },
  {
    "question": "Welche Sprache hat die meisten Sprecher in Indien?",
    "options": [
      "Hindi",
      "Englisch",
      "Tamil",
      "Bengali"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 273
  },
  {
    "question": "Was ist der Pythagoras-Satz?",
    "options": [
      "a+b=c",
      "a²+b²=c²",
      "a²-b²=c",
      "2a=b"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 274
  },
  {
    "question": "In welchem Jahr entdeckte Kolumbus Amerika?",
    "options": [
      "1490",
      "1491",
      "1492",
      "1493"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 275
  },
  {
    "question": "Welches Land erfand den Tango?",
    "options": [
      "Brasilien",
      "Argentinien",
      "Spanien",
      "Mexiko"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 276
  },
  {
    "question": "Wer komponierte 'Die Zauberflöte'?",
    "options": [
      "Mozart",
      "Beethoven",
      "Bach",
      "Haydn"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 277
  },
  {
    "question": "Wie viele Saiten hat eine klassische Gitarre?",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 278
  },
  {
    "question": "Welches Tier ist das schnellste an Land?",
    "options": [
      "Gepard",
      "Antilope",
      "Leopard",
      "Strauß"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 279
  },
  {
    "question": "Welche Sprache wird im Vatikan offiziell verwendet?",
    "options": [
      "Italienisch",
      "Latein",
      "Griechisch",
      "Englisch"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 280
  },
  {
    "question": "Welcher Komponist wurde taub?",
    "options": [
      "Mozart",
      "Beethoven",
      "Schumann",
      "Chopin"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "musik",
    "id": 281
  },
  {
    "question": "Wer war Reichskanzler 1871?",
    "options": [
      "Bismarck",
      "Wilhelm I.",
      "Adenauer",
      "Hindenburg"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 282
  },
  {
    "question": "Welcher Erfinder steht hinter dem Dynamit?",
    "options": [
      "Edison",
      "Tesla",
      "Nobel",
      "Bell"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 283
  },
  {
    "question": "Wer war 'Der Sonnenkönig'?",
    "options": [
      "Ludwig XIV.",
      "Ludwig XV.",
      "Ludwig XVI.",
      "Heinrich IV."
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 284
  },
  {
    "question": "In welchem Land liegt Machu Picchu?",
    "options": [
      "Mexiko",
      "Peru",
      "Bolivien",
      "Ecuador"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 285
  },
  {
    "question": "Welche Hauptstadt liegt in Ungarn?",
    "options": [
      "Bukarest",
      "Prag",
      "Budapest",
      "Bratislava"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 286
  },
  {
    "question": "Wer schrieb 'Das Kapital'?",
    "options": [
      "Marx",
      "Engels",
      "Lenin",
      "Hegel"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 287
  },
  {
    "question": "Wer war der erste römische Kaiser?",
    "options": [
      "Caesar",
      "Augustus",
      "Nero",
      "Trajan"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 288
  },
  {
    "question": "Welches Land hat die Hauptstadt Reykjavik?",
    "options": [
      "Island",
      "Norwegen",
      "Finnland",
      "Grönland"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 289
  },
  {
    "question": "In welchem Jahr begann der 1. Weltkrieg?",
    "options": [
      "1912",
      "1913",
      "1914",
      "1915"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 290
  },
  {
    "question": "Wer schrieb 'Krieg und Frieden'?",
    "options": [
      "Dostojewski",
      "Tolstoi",
      "Tschechow",
      "Puschkin"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 291
  },
  {
    "question": "Welches Land erfand das Origami?",
    "options": [
      "China",
      "Japan",
      "Korea",
      "Vietnam"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 292
  },
  {
    "question": "Welche Hauptstadt liegt in Marokko?",
    "options": [
      "Casablanca",
      "Marrakesch",
      "Rabat",
      "Fès"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 293
  },
  {
    "question": "Welcher Buchstabe steht für 1000 im Römischen?",
    "options": [
      "C",
      "D",
      "M",
      "L"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 294
  },
  {
    "question": "Wie heißt das größte Korallenriff der Welt?",
    "options": [
      "Great Barrier Reef",
      "Belize Barrier Reef",
      "Rotes Meer Reef",
      "Maldiven Atoll"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 295
  },
  {
    "question": "Wer schrieb 'Der Steppenwolf'?",
    "options": [
      "Hesse",
      "Mann",
      "Kafka",
      "Brecht"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 296
  },
  {
    "question": "Welches Land hat die Pyramiden von Gizeh?",
    "options": [
      "Sudan",
      "Mexiko",
      "Ägypten",
      "Peru"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 297
  },
  {
    "question": "Welches Instrument spielte Jimi Hendrix?",
    "options": [
      "Bass",
      "Schlagzeug",
      "Gitarre",
      "Klavier"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "musik",
    "id": 298
  },
  {
    "question": "Auf welcher Insel sind die größten lebenden Echsen der Welt heimisch?",
    "options": [
      "Bali",
      "Komodo",
      "Sumatra",
      "Java"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 299
  },
  {
    "question": "Wie heißt die Hauptstadt Südkoreas?",
    "options": [
      "Pjöngjang",
      "Seoul",
      "Busan",
      "Incheon"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 300
  },
  {
    "question": "Welches Tier ist das größte Säugetier?",
    "options": [
      "Elefant",
      "Blauwal",
      "Giraffe",
      "Walross"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 301
  },
  {
    "question": "Wer war Bundeskanzlerin Deutschlands 2005-2021?",
    "options": [
      "Schröder",
      "Merkel",
      "Scholz",
      "Steinmeier"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 302
  },
  {
    "question": "In welcher Sportart fällt der Begriff 'Birdie'?",
    "options": [
      "Tennis",
      "Golf",
      "Bowling",
      "Darts"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 303
  },
  {
    "question": "Wer schrieb 'Effi Briest'?",
    "options": [
      "Fontane",
      "Storm",
      "Keller",
      "Raabe"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 304
  },
  {
    "question": "Was bedeutet 'NASA'?",
    "options": [
      "National Air Service Agency",
      "National Aeronautics and Space Administration",
      "Naval Aerospace Science Agency",
      "North American Space Authority"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 305
  },
  {
    "question": "Welches Land hat die meisten Inseln (>200.000)?",
    "options": [
      "Indonesien",
      "Philippinen",
      "Schweden",
      "Norwegen"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 306
  },
  {
    "question": "Welches Land erfand die Sauna?",
    "options": [
      "Schweden",
      "Norwegen",
      "Finnland",
      "Russland"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 307
  },
  {
    "question": "Welche Stadt ist als 'Big Apple' bekannt?",
    "options": [
      "LA",
      "Chicago",
      "New York",
      "Boston"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 308
  },
  {
    "question": "Wer war der erste Pharao, dessen Grab unzerstört entdeckt wurde?",
    "options": [
      "Ramses II.",
      "Tutanchamun",
      "Cheops",
      "Echnaton"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 309
  },
  {
    "question": "Welcher Schauspieler spielte 'Hannibal Lecter'?",
    "options": [
      "Al Pacino",
      "Robert De Niro",
      "Anthony Hopkins",
      "Marlon Brando"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "filme",
    "id": 310
  },
  {
    "question": "Welche Hauptstadt liegt in Vietnam?",
    "options": [
      "Hanoi",
      "Ho-Chi-Minh-Stadt",
      "Hue",
      "Da Nang"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 311
  },
  {
    "question": "Welche Hauptstadt liegt in Thailand?",
    "options": [
      "Bangkok",
      "Phuket",
      "Chiang Mai",
      "Pattaya"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 312
  },
  {
    "question": "Wer komponierte 'West Side Story'?",
    "options": [
      "Bernstein",
      "Gershwin",
      "Sondheim",
      "Copland"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 313
  },
  {
    "question": "Welches Auto-Logo zeigt vier Ringe?",
    "options": [
      "BMW",
      "Audi",
      "Mercedes",
      "Opel"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 314
  },
  {
    "question": "Welches Spiel sammelte den 'Game of the Year' 2017 (Zelda)?",
    "options": [
      "BOTW",
      "Horizon",
      "PUBG",
      "Cuphead"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 315
  },
  {
    "question": "Wer spielte James Bond in 'Casino Royale' (2006)?",
    "options": [
      "Pierce Brosnan",
      "Daniel Craig",
      "Timothy Dalton",
      "Sean Connery"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "filme",
    "id": 316
  },
  {
    "question": "Welcher Maler malte die Sixtinische Kapelle?",
    "options": [
      "Raffael",
      "Leonardo",
      "Michelangelo",
      "Tizian"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 317
  },
  {
    "question": "Welche Stadt heißt 'die Stadt der Liebe'?",
    "options": [
      "Rom",
      "Wien",
      "Paris",
      "Venedig"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 318
  },
  {
    "question": "Welches Element verwenden Atombomben (Hiroshima)?",
    "options": [
      "Uran",
      "Plutonium",
      "Beides",
      "Wasserstoff"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 319
  },
  {
    "question": "Wer schrieb 'Stolz und Vorurteil'?",
    "options": [
      "Jane Austen",
      "Emily Brontë",
      "Charlotte Brontë",
      "Virginia Woolf"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 320
  },
  {
    "question": "Welcher Skifahrer hat die meisten Olympia-Goldmedaillen (Marit Bjørgen, Land)?",
    "options": [
      "Schweden",
      "Norwegen",
      "Finnland",
      "Russland"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 321
  },
  {
    "question": "Wer wurde 1980 FIFA-Weltfußballer (Ballon d'Or war Europa)?",
    "options": [
      "Karl-Heinz Rummenigge",
      "Paolo Rossi",
      "Diego Maradona",
      "Michel Platini"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 322
  },
  {
    "question": "Welche deutsche Region war 2010 Kulturhauptstadt Europas?",
    "options": [
      "München",
      "Hamburg",
      "Ruhrgebiet",
      "Berlin"
    ],
    "answer": 2,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 323
  },
  {
    "question": "Welches Sportevent ist 'The Masters'?",
    "options": [
      "Golf",
      "Tennis",
      "Snooker",
      "Schach"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 324
  },
  {
    "question": "Welche Stadt veranstaltete Olympia 2016?",
    "options": [
      "London",
      "Rio",
      "Tokio",
      "Peking"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 325
  },
  {
    "question": "Welche Stadt veranstaltete Olympia 2020 (verschoben)?",
    "options": [
      "Tokio",
      "Peking",
      "Paris",
      "Rio"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 326
  },
  {
    "question": "Wer ist der Drummer von Foo Fighters & Ex-Nirvana?",
    "options": [
      "Taylor Hawkins",
      "Dave Grohl",
      "Pat Smear",
      "Chris Shiflett"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "musik",
    "id": 327
  },
  {
    "question": "In welchem Land liegt die Inka-Festung Sacsayhuamán?",
    "options": [
      "Bolivien",
      "Peru",
      "Ecuador",
      "Chile"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 328
  },
  {
    "question": "Welches Album veröffentlichte Taylor Swift direkt nach 'Midnights'?",
    "options": [
      "Lover",
      "Folklore",
      "Evermore",
      "The Tortured Poets Department"
    ],
    "answer": 3,
    "difficulty": "medium",
    "category": "musik",
    "id": 329
  },
  {
    "question": "Wer komponierte 'Carmen'?",
    "options": [
      "Bizet",
      "Verdi",
      "Puccini",
      "Rossini"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 330
  },
  {
    "question": "Wer ist im Roman 'Der große Gatsby' der Titelheld?",
    "options": [
      "Jay Gatsby",
      "Nick Carraway",
      "Tom Buchanan",
      "Jordan Baker"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 331
  },
  {
    "question": "Wer drehte 'Stalker' (1979)?",
    "options": [
      "Tarkowski",
      "Eisenstein",
      "Kieślowski",
      "Béla Tarr"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 332
  },
  {
    "question": "Welcher Spieler erzielte das 'Tor des Jahrhunderts' WM 1986?",
    "options": [
      "Pelé",
      "Maradona",
      "Platini",
      "Zico"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 333
  },
  {
    "question": "Wer war Bundesliga-Torschützenkönig 1971/72?",
    "options": [
      "Müller",
      "Seeler",
      "Heynckes",
      "Fischer"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 334
  },
  {
    "question": "Welches Land wurde 1992 sensationell Europameister?",
    "options": [
      "Schweden",
      "Dänemark",
      "Norwegen",
      "Niederlande"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 335
  },
  {
    "question": "Wer schoss das Goldene Tor 1954?",
    "options": [
      "Rahn",
      "F. Walter",
      "Morlock",
      "O. Walter"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 336
  },
  {
    "question": "Wer wurde EM 2004 zum besten Spieler gewählt?",
    "options": [
      "Zagorakis",
      "Charisteas",
      "Karagounis",
      "Dellas"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 337
  },
  {
    "question": "Wer hat die meisten Spiele für die DFB-Elf?",
    "options": [
      "Matthäus",
      "Klose",
      "Podolski",
      "Schweinsteiger"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 338
  },
  {
    "question": "In welchem Jahr wurde der DFB gegründet?",
    "options": [
      "1900",
      "1904",
      "1912",
      "1920"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 339
  },
  {
    "question": "Wer wurde 1964 erster Bundesliga-Meister?",
    "options": [
      "Köln",
      "Bremen",
      "Dortmund",
      "Frankfurt"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 340
  },
  {
    "question": "Wer war NL-Cheftrainer WM 1974?",
    "options": [
      "Michels",
      "Cruyff",
      "Happel",
      "Beenhakker"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 341
  },
  {
    "question": "Wer gewann den ersten Oscar als beste Hauptdarstellerin (1929)?",
    "options": [
      "Janet Gaynor",
      "Mary Pickford",
      "Greta Garbo",
      "Joan Crawford"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 342
  },
  {
    "question": "Wer schrieb 'Unendlicher Spaß'?",
    "options": [
      "Pynchon",
      "DFW",
      "DeLillo",
      "Franzen"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 343
  },
  {
    "question": "Welches Element hat die Ordnungszahl 79?",
    "options": [
      "Quecksilber",
      "Platin",
      "Gold",
      "Wolfram"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 344
  },
  {
    "question": "Wer entdeckte Penicillin?",
    "options": [
      "Pasteur",
      "Koch",
      "Fleming",
      "Ehrlich"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 345
  },
  {
    "question": "Wann endete der Dreißigjährige Krieg?",
    "options": [
      "1618",
      "1648",
      "1664",
      "1689"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 346
  },
  {
    "question": "Wer malte 'Die Nachtwache'?",
    "options": [
      "Vermeer",
      "Rembrandt",
      "Rubens",
      "Hals"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 347
  },
  {
    "question": "Größter Mond des Saturn?",
    "options": [
      "Europa",
      "Titan",
      "Ganymed",
      "Triton"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 348
  },
  {
    "question": "Komponist von 'Tristan und Isolde'?",
    "options": [
      "Verdi",
      "Puccini",
      "Wagner",
      "Strauss"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "musik",
    "id": 349
  },
  {
    "question": "Erster BRD-Bundeskanzler?",
    "options": [
      "Brandt",
      "Erhard",
      "Adenauer",
      "Kiesinger"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 350
  },
  {
    "question": "Welche Schlacht fand 1815 statt?",
    "options": [
      "Austerlitz",
      "Leipzig",
      "Waterloo",
      "Trafalgar"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 351
  },
  {
    "question": "Welcher Russe gewann 2003 den Ballon d'Or?",
    "options": [
      "Arschawin",
      "Niemand",
      "Akinfejew",
      "Pawljutschenko"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 352
  },
  {
    "question": "Welcher Verein gewann 1956 die erste CL?",
    "options": [
      "Benfica",
      "AC Mailand",
      "Real Madrid",
      "Barcelona"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "fussball",
    "id": 353
  },
  {
    "question": "Rekord-Torschütze der Premier League?",
    "options": [
      "Rooney",
      "Shearer",
      "Agüero",
      "Kane"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 354
  },
  {
    "question": "Wer hielt 1996 entscheidende Elfmeter gegen England (HF)?",
    "options": [
      "Illgner",
      "Köpke",
      "Kahn",
      "Lehmann"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 355
  },
  {
    "question": "Wer wurde 'Der Kaiser' genannt?",
    "options": [
      "Beckenbauer",
      "Seeler",
      "Matthäus",
      "Rummenigge"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 356
  },
  {
    "question": "Welches Tier hat drei Herzen?",
    "options": [
      "Tintenfisch",
      "Krake",
      "Hai",
      "Aal"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 357
  },
  {
    "question": "Wer schrieb 'Hundert Jahre Einsamkeit'?",
    "options": [
      "Vargas Llosa",
      "Borges",
      "García Márquez",
      "Allende"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 358
  },
  {
    "question": "Welcher Black Eyed Peas-Hit war 2009 wochenlang auf Platz 1?",
    "options": [
      "I Gotta Feeling",
      "Boom Boom Pow",
      "Where Is the Love",
      "Pump It"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 359
  },
  {
    "question": "Ballon d'Or 2006?",
    "options": [
      "Ronaldinho",
      "Cannavaro",
      "Henry",
      "Pirlo"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 360
  },
  {
    "question": "Kleinster Knochen im Körper?",
    "options": [
      "Hammer",
      "Amboss",
      "Steigbügel",
      "Steißbein"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 361
  },
  {
    "question": "Welcher Trainer gewann 4x in Folge Premier League mit ManCity?",
    "options": [
      "Mancini",
      "Pellegrini",
      "Guardiola",
      "Arteta"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "fussball",
    "id": 362
  },
  {
    "question": "Wann zerstörte der Vesuv Pompeji?",
    "options": [
      "79 n. Chr.",
      "112",
      "180",
      "242"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 363
  },
  {
    "question": "Italiens Kapitän WM 2006?",
    "options": [
      "Maldini",
      "Cannavaro",
      "Pirlo",
      "Buffon"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 364
  },
  {
    "question": "Wer erfand das Telefon (umstritten, Patent)?",
    "options": [
      "Edison",
      "Bell",
      "Meucci",
      "Tesla"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 365
  },
  {
    "question": "Wer schrieb 'Berlin Alexanderplatz'?",
    "options": [
      "Döblin",
      "Tucholsky",
      "Roth",
      "Fallada"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 366
  },
  {
    "question": "Welches Element hat Ordnungszahl 26?",
    "options": [
      "Eisen",
      "Kupfer",
      "Zink",
      "Mangan"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 367
  },
  {
    "question": "Welche Pflanze gewinnt CO2 aus Luft & macht Sauerstoff durch ...?",
    "options": [
      "Atmung",
      "Photosynthese",
      "Osmose",
      "Diffusion"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 368
  },
  {
    "question": "Wer war erster Bundespräsident der BRD?",
    "options": [
      "Heuss",
      "Lübke",
      "Heinemann",
      "Scheel"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 369
  },
  {
    "question": "Welches Jahr fand die Französische Revolution statt?",
    "options": [
      "1789",
      "1799",
      "1804",
      "1815"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 370
  },
  {
    "question": "Wer komponierte 'Die Walküre'?",
    "options": [
      "Wagner",
      "Verdi",
      "Strauss",
      "Mahler"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 371
  },
  {
    "question": "Wer war Pharao der 'Amarna-Zeit'?",
    "options": [
      "Cheops",
      "Tutanchamun",
      "Echnaton",
      "Ramses"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 372
  },
  {
    "question": "Welcher Maler malte 'Das Mädchen mit dem Perlenohrring'?",
    "options": [
      "Rembrandt",
      "Vermeer",
      "Hals",
      "Rubens"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "musik",
    "id": 373
  },
  {
    "question": "Hauptstadt von Kasachstan (seit 2019)?",
    "options": [
      "Almaty",
      "Nur-Sultan/Astana",
      "Karaganda",
      "Schymkent"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 374
  },
  {
    "question": "Welche Sportlerin gewann 23 Grand-Slam-Titel?",
    "options": [
      "Steffi Graf",
      "Serena Williams",
      "Margaret Court",
      "Martina Navrátilová"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 375
  },
  {
    "question": "Wer schrieb 'Der Prozess'?",
    "options": [
      "Kafka",
      "Mann",
      "Hesse",
      "Brecht"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 376
  },
  {
    "question": "Wer entdeckte die Doppelhelix der DNA (mit Crick)?",
    "options": [
      "Watson",
      "Franklin",
      "Wilkins",
      "Pauling"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 377
  },
  {
    "question": "Welches Element ist das häufigste im Universum?",
    "options": [
      "Helium",
      "Sauerstoff",
      "Wasserstoff",
      "Kohlenstoff"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 378
  },
  {
    "question": "Welche Stadt war Hauptstadt des Byzantinischen Reiches?",
    "options": [
      "Rom",
      "Konstantinopel",
      "Athen",
      "Antiochia"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 379
  },
  {
    "question": "Wann wurde die EU offiziell mit dem Vertrag von Maastricht gegründet?",
    "options": [
      "1990",
      "1992",
      "1993",
      "1995"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 380
  },
  {
    "question": "Welcher Maler entwickelte den Pointillismus?",
    "options": [
      "Seurat",
      "Monet",
      "Manet",
      "Cézanne"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 381
  },
  {
    "question": "Welches Schiff sank 1912?",
    "options": [
      "Lusitania",
      "Titanic",
      "Britannic",
      "Olympic"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "filme",
    "id": 382
  },
  {
    "question": "Wer war erster Generalsekretär der UN?",
    "options": [
      "U Thant",
      "Hammarskjöld",
      "Trygve Lie",
      "Waldheim"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 383
  },
  {
    "question": "Welche Sprache stirbt – Sorbisch ist verwandt mit ...?",
    "options": [
      "Deutsch",
      "Polnisch",
      "Tschechisch",
      "Russisch"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 384
  },
  {
    "question": "Welches Tier ist das einzige Säugetier, das fliegen kann?",
    "options": [
      "Flughörnchen",
      "Fledermaus",
      "Kolibri",
      "Flugfisch"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 385
  },
  {
    "question": "Welcher Boxer schlug 1974 in Kinshasa Foreman ('Rumble in the Jungle')?",
    "options": [
      "Ali",
      "Frazier",
      "Norton",
      "Holmes"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 386
  },
  {
    "question": "Welches Bundesliga-Team heißt 'Die Lilien'?",
    "options": [
      "Darmstadt 98",
      "Sandhausen",
      "Heidenheim",
      "Paderborn"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 387
  },
  {
    "question": "Welcher Trainer feierte mit Leicester 2016 PL-Sensation?",
    "options": [
      "Ranieri",
      "Pearson",
      "Rodgers",
      "Mourinho"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 388
  },
  {
    "question": "Wer schoss Brasilien zum Titel 1958 (17-jährig)?",
    "options": [
      "Pelé",
      "Garrincha",
      "Zagallo",
      "Vavá"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 389
  },
  {
    "question": "Welcher Verein gewann 1983 als erster die CL nach Hamburg-Sieg?",
    "options": [
      "Liverpool",
      "HSV",
      "Juventus",
      "Roma"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 390
  },
  {
    "question": "Welcher Spieler hält Rekord für meiste Tore in einer Bundesliga-Saison?",
    "options": [
      "Müller (40)",
      "Lewandowski (41)",
      "Heynckes (38)",
      "Fischer (36)"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 391
  },
  {
    "question": "Welcher Stadiontyp ist 'Old Trafford' (Verein)?",
    "options": [
      "Man United",
      "Man City",
      "Liverpool",
      "Arsenal"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 392
  },
  {
    "question": "Wer war erste Frau im All?",
    "options": [
      "Sally Ride",
      "Walentina Tereschkowa",
      "Mae Jemison",
      "Eileen Collins"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 393
  },
  {
    "question": "Wer schrieb 'Moby Dick'?",
    "options": [
      "Melville",
      "Twain",
      "Hawthorne",
      "Poe"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 394
  },
  {
    "question": "Welches Jahr fiel Rom (Westrom)?",
    "options": [
      "410",
      "455",
      "476",
      "527"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 395
  },
  {
    "question": "Wer erfand das Periodensystem?",
    "options": [
      "Mendelejew",
      "Bunsen",
      "Avogadro",
      "Dalton"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 396
  },
  {
    "question": "Welches Tier hat das größte Gehirn?",
    "options": [
      "Mensch",
      "Elefant",
      "Pottwal",
      "Schimpanse"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 397
  },
  {
    "question": "Welches Land erfand das moderne Schach?",
    "options": [
      "Indien",
      "Persien",
      "China",
      "Spanien"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 398
  },
  {
    "question": "Wer schrieb 'Buddenbrooks'?",
    "options": [
      "Heinrich Mann",
      "Thomas Mann",
      "Hesse",
      "Fontane"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 399
  },
  {
    "question": "Welcher französische König wurde 1793 hingerichtet?",
    "options": [
      "Ludwig XIV.",
      "Ludwig XV.",
      "Ludwig XVI.",
      "Napoleon"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 400
  },
  {
    "question": "Welches Land hat die Hauptstadt Vaduz?",
    "options": [
      "Liechtenstein",
      "Monaco",
      "Andorra",
      "San Marino"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 401
  },
  {
    "question": "Wer schrieb 'Im Westen nichts Neues'?",
    "options": [
      "Remarque",
      "Böll",
      "Grass",
      "Brecht"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 402
  },
  {
    "question": "Welcher Komponist schrieb 'Die vier Jahreszeiten'?",
    "options": [
      "Vivaldi",
      "Bach",
      "Händel",
      "Telemann"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 403
  },
  {
    "question": "Welche Galaxie ist unsere?",
    "options": [
      "Andromeda",
      "Milchstraße",
      "Sombrero",
      "Triangulum"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 405
  },
  {
    "question": "Wer schrieb 'Die Brüder Karamasow'?",
    "options": [
      "Tolstoi",
      "Dostojewski",
      "Turgenjew",
      "Gogol"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 406
  },
  {
    "question": "Welcher Forscher umsegelte 1519-1522 als Erster die Welt (Expedition)?",
    "options": [
      "Vasco da Gama",
      "Magellan",
      "Drake",
      "Cook"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 407
  },
  {
    "question": "Wer ist 'Mutter der Götter' in der griechischen Mythologie?",
    "options": [
      "Hera",
      "Rhea",
      "Demeter",
      "Athene"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 408
  },
  {
    "question": "Welches Land erfand den Buchdruck mit beweglichen Lettern (Europa)?",
    "options": [
      "England",
      "Deutschland",
      "Italien",
      "Frankreich"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 409
  },
  {
    "question": "Welcher Berg ist der höchste Europas?",
    "options": [
      "Mont Blanc",
      "Elbrus",
      "Matterhorn",
      "Etna"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 410
  },
  {
    "question": "Welche Hauptstadt liegt in Aserbaidschan?",
    "options": [
      "Eriwan",
      "Tiflis",
      "Baku",
      "Aschgabat"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 411
  },
  {
    "question": "Welche Hauptstadt liegt in Mongolei?",
    "options": [
      "Ulan-Bator",
      "Astana",
      "Bischkek",
      "Duschanbe"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 412
  },
  {
    "question": "Wer schrieb 'Ulysses'?",
    "options": [
      "Joyce",
      "Beckett",
      "Wilde",
      "Yeats"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 413
  },
  {
    "question": "Welcher römische Kaiser legalisierte das Christentum (313)?",
    "options": [
      "Trajan",
      "Konstantin",
      "Theodosius",
      "Diokletian"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 414
  },
  {
    "question": "Welcher Vulkan brach 1980 in den USA aus?",
    "options": [
      "Mount St. Helens",
      "Mount Rainier",
      "Mount Hood",
      "Mount Shasta"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 415
  },
  {
    "question": "Wer war der erste Mensch, der den Mt. Everest bestieg (mit Tenzing)?",
    "options": [
      "Hillary",
      "Mallory",
      "Messner",
      "Habeler"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 416
  },
  {
    "question": "Welches Land verkaufte Alaska an USA?",
    "options": [
      "England",
      "Frankreich",
      "Russland",
      "Spanien"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 417
  },
  {
    "question": "Welches Modell der Sterneklassifikation: O-B-A-F-G-K-M – Sonne?",
    "options": [
      "F",
      "G",
      "K",
      "M"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 418
  },
  {
    "question": "Welcher Mathematiker bewies den 'großen Fermatschen Satz' (1994)?",
    "options": [
      "Wiles",
      "Perelman",
      "Tao",
      "Mochizuki"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 419
  },
  {
    "question": "Welche Hauptstadt liegt in Bolivien (Regierung)?",
    "options": [
      "Sucre",
      "La Paz",
      "Santa Cruz",
      "Cochabamba"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 420
  },
  {
    "question": "Aus welchem Land stammt der Whisky ursprünglich?",
    "options": [
      "Irland",
      "England",
      "Frankreich",
      "USA"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 421
  },
  {
    "question": "Welches Bundesland gehört nicht zu Deutschland?",
    "options": [
      "Kärnten",
      "Saarland",
      "Thüringen",
      "Brandenburg"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 422
  },
  {
    "question": "Welcher Spieler erzielte das WM-Tor 2002 zum Endsieg (Brasilien)?",
    "options": [
      "Ronaldo (2)",
      "Rivaldo",
      "Ronaldinho",
      "Roberto Carlos"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 423
  },
  {
    "question": "Welche europäische Stadt hat die meisten Brücken?",
    "options": [
      "Venedig",
      "Amsterdam",
      "Hamburg",
      "Stockholm"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 424
  },
  {
    "question": "Welches Land erfand den Karneval (Köln-Stil)?",
    "options": [
      "Deutschland",
      "Italien (Venedig)",
      "Brasilien",
      "Frankreich"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 425
  },
  {
    "question": "Welches Spiel von Hideo Kojima?",
    "options": [
      "Final Fantasy",
      "Metal Gear Solid",
      "Resident Evil",
      "Silent Hill (nur Mitwirkung)"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "filme",
    "id": 426
  },
  {
    "question": "Welche Sprache hat die meisten offiziellen Sprecher in Afrika (Englisch ist nicht muttersprachlich)?",
    "options": [
      "Swahili",
      "Arabisch",
      "Französisch (offiziell)",
      "Hausa"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 427
  },
  {
    "question": "Wer war erster Generalsekretär der KPdSU nach Lenin?",
    "options": [
      "Stalin",
      "Trotzki",
      "Bucharin",
      "Sinowjew"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 428
  },
  {
    "question": "Welches Lied gewann den ESC 1974 (ABBA)?",
    "options": [
      "Mamma Mia",
      "Dancing Queen",
      "Waterloo",
      "Fernando"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "musik",
    "id": 429
  },
  {
    "question": "Welcher Komponist starb 1791 in Wien?",
    "options": [
      "Mozart",
      "Haydn",
      "Salieri",
      "Beethoven"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 430
  },
  {
    "question": "Welches Tier ist auf der Flagge Bhutans?",
    "options": [
      "Tiger",
      "Drache",
      "Elefant",
      "Adler"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 431
  },
  {
    "question": "Welches Land hat die längste Küstenlinie?",
    "options": [
      "Russland",
      "Indonesien",
      "Kanada",
      "USA"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 432
  },
  {
    "question": "Wer drehte 'Pans Labyrinth'?",
    "options": [
      "del Toro",
      "Iñárritu",
      "Cuarón",
      "Almodóvar"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 433
  },
  {
    "question": "Welcher Roman beginnt mit 'Call me Ishmael'?",
    "options": [
      "Moby Dick",
      "Huckleberry Finn",
      "Heart of Darkness",
      "Lord Jim"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 434
  },
  {
    "question": "Welches Jahr starb Beethoven?",
    "options": [
      "1820",
      "1827",
      "1832",
      "1840"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "musik",
    "id": 435
  },
  {
    "question": "Welche Stadt war 1972 Schauplatz der Olympia-Geiselnahme?",
    "options": [
      "München",
      "Mexiko-Stadt",
      "Montreal",
      "Moskau"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 436
  },
  {
    "question": "Welche Rückennummer trug Zinédine Zidane bei Real Madrid?",
    "options": [
      "5",
      "7",
      "10",
      "21"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 437
  },
  {
    "question": "Welches Element bildet mit Sauerstoff Rost?",
    "options": [
      "Kupfer",
      "Aluminium",
      "Eisen",
      "Zink"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 438
  },
  {
    "question": "Wer schrieb 'Lolita'?",
    "options": [
      "Nabokov",
      "Hemingway",
      "Salinger",
      "Bellow"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 439
  },
  {
    "question": "Wer war erster Präsident der USA?",
    "options": [
      "Adams",
      "Jefferson",
      "Washington",
      "Franklin"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 440
  },
  {
    "question": "Welches Volk baute Machu Picchu?",
    "options": [
      "Maya",
      "Azteken",
      "Inka",
      "Olmeken"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 441
  },
  {
    "question": "Welcher Komponist schrieb das 'Brandenburgische Konzert'?",
    "options": [
      "Bach",
      "Händel",
      "Vivaldi",
      "Telemann"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 442
  },
  {
    "question": "Welche Stadt war Hauptstadt des Heiligen Römischen Reiches im Spätmittelalter (Wahl)?",
    "options": [
      "Aachen",
      "Frankfurt",
      "Wien",
      "Regensburg"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 443
  },
  {
    "question": "Welcher Trainer gewann mit Real Madrid 3 CL in Folge (2016-18)?",
    "options": [
      "Mourinho",
      "Zidane",
      "Ancelotti",
      "Benítez"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 444
  },
  {
    "question": "Welches Buch begann die 'Hexenverfolgung' systematisch (1487)?",
    "options": [
      "Hexenhammer",
      "Malleus Carolinus",
      "Codex Sinaiticus",
      "Liber Hereticus"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 445
  },
  {
    "question": "Welches Land erfand Sake?",
    "options": [
      "China",
      "Japan",
      "Korea",
      "Vietnam"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 446
  },
  {
    "question": "Welcher Maler malte 'Guernica'?",
    "options": [
      "Dalí",
      "Picasso",
      "Miró",
      "Goya"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 447
  },
  {
    "question": "Welche Hauptstadt liegt in Estland?",
    "options": [
      "Riga",
      "Tallinn",
      "Vilnius",
      "Helsinki"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 448
  },
  {
    "question": "Welches Spiel hat die Figur 'Solid Snake'?",
    "options": [
      "Splinter Cell",
      "Hitman",
      "Metal Gear",
      "Tenchu"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 449
  },
  {
    "question": "Wer komponierte 'Bolero'?",
    "options": [
      "Ravel",
      "Debussy",
      "Satie",
      "Saint-Saëns"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 450
  },
  {
    "question": "Welcher Spieler war 1966 Weltmeister-Kapitän Englands?",
    "options": [
      "Bobby Moore",
      "Bobby Charlton",
      "Geoff Hurst",
      "Gordon Banks"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 451
  },
  {
    "question": "Wer war 'Iron Lady' (UK-Premier)?",
    "options": [
      "May",
      "Thatcher",
      "Truss",
      "Sturgeon"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 452
  },
  {
    "question": "Welche Brücke verbindet Brooklyn mit Manhattan zuerst (1883)?",
    "options": [
      "Manhattan Bridge",
      "Brooklyn Bridge",
      "Williamsburg Bridge",
      "Queensboro Bridge"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 453
  },
  {
    "question": "Welcher Mathematiker bewies Poincaré-Vermutung?",
    "options": [
      "Wiles",
      "Tao",
      "Perelman",
      "Mochizuki"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 454
  },
  {
    "question": "Welcher Komponist schrieb 'Eine kleine Nachtmusik'?",
    "options": [
      "Mozart",
      "Haydn",
      "Beethoven",
      "Schubert"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 455
  },
  {
    "question": "Welche Schauspielerin spielte 'Black Swan'?",
    "options": [
      "Natalie Portman",
      "Mila Kunis",
      "Winona Ryder",
      "Anne Hathaway"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 456
  },
  {
    "question": "Welches Land erfand das Curling?",
    "options": [
      "Schottland",
      "Kanada",
      "Norwegen",
      "Schweden"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 457
  },
  {
    "question": "Welcher japanische Regisseur drehte 'Die sieben Samurai'?",
    "options": [
      "Kurosawa",
      "Ozu",
      "Miyazaki",
      "Kitano"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 458
  },
  {
    "question": "Welche Infektionskrankheit gilt seit 1980 weltweit als ausgerottet?",
    "options": [
      "Tuberkulose",
      "Polio",
      "Pocken",
      "Masern"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 459
  },
  {
    "question": "Welcher US-Präsident saß während Sezessionskrieg im Amt?",
    "options": [
      "Lincoln",
      "Grant",
      "Johnson",
      "Polk"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 460
  },
  {
    "question": "Welches Element ist flüssig bei Raumtemperatur (Metall)?",
    "options": [
      "Brom (Nichtmetall)",
      "Quecksilber",
      "Cäsium (knapp)",
      "Gallium (knapp)"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 461
  },
  {
    "question": "Welche WM-Stürmerin hält den Torrekord (FIFA Frauen-WM)?",
    "options": [
      "Marta",
      "Birgit Prinz",
      "Abby Wambach",
      "Sun Wen"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 462
  },
  {
    "question": "Welcher deutsche Skifahrer ist Rekord-Slalom-Sieger Weltcup?",
    "options": [
      "Maier",
      "Neureuther",
      "Klammer",
      "Stenmark (Schwede)"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 463
  },
  {
    "question": "Welche Stadt war Sitz der Inquisition (Spanien)?",
    "options": [
      "Madrid",
      "Toledo",
      "Sevilla",
      "Granada"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 464
  },
  {
    "question": "Welche Hauptstadt liegt in Litauen?",
    "options": [
      "Riga",
      "Vilnius",
      "Tallinn",
      "Minsk"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 465
  },
  {
    "question": "Wer schrieb 'Faust II'?",
    "options": [
      "Goethe",
      "Schiller",
      "Lessing",
      "Heine"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 466
  },
  {
    "question": "Welcher Komet kehrt alle 76 Jahre wieder?",
    "options": [
      "Hale-Bopp",
      "Halley",
      "Encke",
      "Shoemaker"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 467
  },
  {
    "question": "Welcher Bundeskanzler hatte die kürzeste Amtszeit?",
    "options": [
      "Kiesinger",
      "Erhard",
      "Brandt",
      "Schmidt"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 468
  },
  {
    "question": "Welcher Boxer war Olympiasieger 1960 und später 'Ali'?",
    "options": [
      "Joe Frazier",
      "Cassius Clay",
      "George Foreman",
      "Sugar Ray"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 469
  },
  {
    "question": "Welcher Bundesliga-Verein hat das größte Stadion?",
    "options": [
      "Bayern",
      "Dortmund",
      "Schalke",
      "Berlin"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 470
  },
  {
    "question": "Welcher Tennisspieler hält Rekord für Grand-Slam-Titel Herren (24)?",
    "options": [
      "Federer",
      "Nadal",
      "Djokovic",
      "Sampras"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "fussball",
    "id": 471
  },
  {
    "question": "Welche Hauptstadt liegt im Tschad?",
    "options": [
      "N'Djamena",
      "Niamey",
      "Bamako",
      "Ouagadougou"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 472
  },
  {
    "question": "Welches Land hat die meisten Sprachen?",
    "options": [
      "Indien",
      "Indonesien",
      "Papua-Neuguinea",
      "Nigeria"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 473
  },
  {
    "question": "Welcher deutsche Ingenieur erfand den Selbstzünder-Verbrennungsmotor?",
    "options": [
      "Carl Benz",
      "Rudolf Diesel",
      "Nikolaus Otto",
      "Gottlieb Daimler"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 474
  },
  {
    "question": "Welche Hauptstadt liegt in Nepal?",
    "options": [
      "Kathmandu",
      "Thimphu",
      "Dhaka",
      "Colombo"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 475
  },
  {
    "question": "Welcher englische König unterschrieb 1215 die Magna Carta?",
    "options": [
      "Heinrich II.",
      "Johann Ohneland",
      "Eduard I.",
      "Richard Löwenherz"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 476
  },
  {
    "question": "Welcher Komponist schrieb 'Peter und der Wolf'?",
    "options": [
      "Strawinsky",
      "Prokofjew",
      "Schostakowitsch",
      "Tschaikowsky"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "musik",
    "id": 477
  },
  {
    "question": "Wer schrieb 'Solaris' (Roman)?",
    "options": [
      "Lem",
      "Asimov",
      "Clarke",
      "Dick"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 478
  },
  {
    "question": "Welcher Spieler war Kapitän der DFB-Elf 2014?",
    "options": [
      "Lahm",
      "Schweinsteiger",
      "Neuer",
      "Klose"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 479
  },
  {
    "question": "Welche Krankheit wurde von Robert Koch 1882 als Erreger identifiziert?",
    "options": [
      "Cholera",
      "Tuberkulose",
      "Milzbrand",
      "Lepra"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 480
  },
  {
    "question": "Welches Buch von Adam Smith (1776)?",
    "options": [
      "Das Kapital",
      "Wohlstand der Nationen",
      "Allgemeine Theorie",
      "Leviathan"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 481
  },
  {
    "question": "In welcher Stadt residierte die Vichy-Regierung während des Zweiten Weltkriegs?",
    "options": [
      "Lyon",
      "Marseille",
      "Vichy",
      "Bordeaux"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 482
  },
  {
    "question": "Welcher Komponist schrieb 'Schwanensee'?",
    "options": [
      "Tschaikowsky",
      "Strawinsky",
      "Borodin",
      "Glasunow"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 483
  },
  {
    "question": "Welcher deutsche Physiker entdeckte 1895 eine bis dahin unbekannte Strahlung?",
    "options": [
      "Albert Einstein",
      "Max Planck",
      "Wilhelm Conrad Röntgen",
      "Werner Heisenberg"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 484
  },
  {
    "question": "Wer war erster Sieger der Tour de France (1903)?",
    "options": [
      "Garin",
      "Petit-Breton",
      "Pélissier",
      "Lapize"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 485
  },
  {
    "question": "Welche Hauptstadt liegt in Senegal?",
    "options": [
      "Dakar",
      "Conakry",
      "Bamako",
      "Abidjan"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 486
  },
  {
    "question": "Welcher Maler malte 'Der Schrei'?",
    "options": [
      "Munch",
      "Klimt",
      "Schiele",
      "Kokoschka"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 487
  },
  {
    "question": "Welcher Verein gewann 2005 das berühmte 'Wunder von Istanbul'?",
    "options": [
      "Liverpool",
      "Milan",
      "Chelsea",
      "Real"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 488
  },
  {
    "question": "Wer schrieb 'American Psycho'?",
    "options": [
      "Bret Easton Ellis",
      "Chuck Palahniuk",
      "Don DeLillo",
      "Cormac McCarthy"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 489
  },
  {
    "question": "Welche Hauptstadt liegt in Paraguay?",
    "options": [
      "La Paz",
      "Asunción",
      "Montevideo",
      "Quito"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 490
  },
  {
    "question": "Welche Galaxie ist unsere Nachbarin (groß, Spiralgalaxie)?",
    "options": [
      "Andromeda",
      "Triangulum",
      "Sombrero",
      "Bode"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 491
  },
  {
    "question": "Wer erzielte 1969 das berühmte 1000. Tor von Pelé?",
    "options": [
      "Garrincha",
      "Pelé selbst",
      "Tostão",
      "Jairzinho"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 492
  },
  {
    "question": "Welches Element hat das Symbol 'Hg'?",
    "options": [
      "Quecksilber",
      "Helium",
      "Hafnium",
      "Holmium"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 493
  },
  {
    "question": "Welcher Verein wurde 2023 erstmals englischer Meister seit Jahren (ManCity verteidigte)?",
    "options": [
      "Arsenal",
      "Liverpool",
      "Manchester City",
      "Newcastle"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "fussball",
    "id": 494
  },
  {
    "question": "Welche Hauptstadt liegt in Kambodscha?",
    "options": [
      "Phnom Penh",
      "Vientiane",
      "Hanoi",
      "Bangkok"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 495
  },
  {
    "question": "Welcher Komponist schrieb 'Eine Alpensinfonie'?",
    "options": [
      "Strauss",
      "Mahler",
      "Bruckner",
      "Reger"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 496
  },
  {
    "question": "Wer war erste Frau, die einen Nobelpreis bekam?",
    "options": [
      "Curie",
      "Meitner",
      "Hodgkin",
      "Levi-Montalcini"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 497
  },
  {
    "question": "Welches Element ist Hauptbestandteil der Sonne?",
    "options": [
      "Helium",
      "Wasserstoff",
      "Sauerstoff",
      "Kohlenstoff"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 498
  },
  {
    "question": "Wer war Anführer der Sowjetunion bei der Kubakrise?",
    "options": [
      "Stalin",
      "Chruschtschow",
      "Breschnew",
      "Andropow"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 499
  },
  {
    "question": "Welche Sprache wird in Belarus offiziell gesprochen (zusätzlich zu Russisch)?",
    "options": [
      "Ukrainisch",
      "Belarussisch",
      "Polnisch",
      "Litauisch"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 500
  },
  {
    "question": "Wie viele Staaten grenzen ans Kaspische Meer?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 501
  },
  {
    "question": "Welcher Sänger spielte Freddie Mercury in 'Bohemian Rhapsody'?",
    "options": [
      "Rami Malek",
      "Sacha Baron Cohen",
      "Ben Whishaw",
      "Eddie Redmayne"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 502
  },
  {
    "question": "Welche Hauptstadt liegt in Tunesien?",
    "options": [
      "Tunis",
      "Algier",
      "Tripolis",
      "Rabat"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 503
  },
  {
    "question": "Welcher Roman von Charles Dickens beginnt mit 'It was the best of times, it was the worst of times'?",
    "options": [
      "Oliver Twist",
      "David Copperfield",
      "Eine Geschichte aus zwei Städten",
      "Große Erwartungen"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 504
  },
  {
    "question": "Welcher Maler war Hauptvertreter des deutschen Expressionismus 'Die Brücke'?",
    "options": [
      "Kirchner",
      "Marc",
      "Macke",
      "Nolde"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 505
  },
  {
    "question": "Welches Land erfand die Nudeln (älteste Funde)?",
    "options": [
      "Italien",
      "China",
      "Türkei",
      "Persien"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 506
  },
  {
    "question": "Welche Stadt war Schauplatz der Bartholomäus-Nacht 1572?",
    "options": [
      "Paris",
      "Lyon",
      "Marseille",
      "Avignon"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 507
  },
  {
    "question": "Welcher Boxer besiegte Mike Tyson 1990 (Sensation)?",
    "options": [
      "Holyfield",
      "Buster Douglas",
      "Lennox Lewis",
      "Riddick Bowe"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 508
  },
  {
    "question": "Welche Hauptstadt liegt in Eritrea?",
    "options": [
      "Asmara",
      "Addis Abeba",
      "Khartum",
      "Dschibuti"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 509
  },
  {
    "question": "Welcher Komponist schrieb 'Mondscheinsonate'?",
    "options": [
      "Beethoven",
      "Chopin",
      "Schumann",
      "Liszt"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 510
  },
  {
    "question": "Welcher Roman von Joseph Heller (1961)?",
    "options": [
      "Catch-22",
      "Slaughterhouse-Five",
      "On the Road",
      "Naked Lunch"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 511
  },
  {
    "question": "Welcher Spieler erzielte 5 Tore in einem CL-Spiel (Lewandowski 2015 in 9 Min, gegen)?",
    "options": [
      "Wolfsburg",
      "BVB",
      "Hertha",
      "Hamburg"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 512
  },
  {
    "question": "Wer spielt Captain Jack Sparrow?",
    "options": [
      "Johnny Depp",
      "Orlando Bloom",
      "Geoffrey Rush",
      "Will Smith"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 513
  },
  {
    "question": "Wie heißt der Hai im Disney-Film 'Findet Nemo' der Vegetarier sein will?",
    "options": [
      "Bruce",
      "Chum",
      "Anchor",
      "Sharky"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 514
  },
  {
    "question": "Welche Serie hat die Figur 'Eleven'?",
    "options": [
      "Stranger Things",
      "Dark",
      "Riverdale",
      "The OA"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 515
  },
  {
    "question": "Wer spielt 'Wednesday' in der Netflix-Serie?",
    "options": [
      "Jenna Ortega",
      "Millie Bobby Brown",
      "Zendaya",
      "Sadie Sink"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 516
  },
  {
    "question": "Wie heißt der Hund in 'Die Maske'?",
    "options": [
      "Milo",
      "Rex",
      "Buddy",
      "Max"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 517
  },
  {
    "question": "In welcher Serie kommt 'Daenerys Targaryen' vor?",
    "options": [
      "Game of Thrones",
      "House of the Dragon",
      "Vikings",
      "Witcher"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 518
  },
  {
    "question": "Wer spielt 'Loki' im MCU?",
    "options": [
      "Tom Hiddleston",
      "Chris Hemsworth",
      "Benedict Cumberbatch",
      "Sebastian Stan"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 519
  },
  {
    "question": "Wie heißt Buzz Lightyears Erzfeind?",
    "options": [
      "Zurg",
      "Lotso",
      "Stinky Pete",
      "Sid"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 520
  },
  {
    "question": "In welcher Serie kämpfen ehemalige Karate-Kid-Rivalen wieder gegeneinander?",
    "options": [
      "Cobra Kai",
      "The Karate Sensei",
      "Dojo",
      "Black Belt"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 521
  },
  {
    "question": "Wer drehte 'Oppenheimer' (2023)?",
    "options": [
      "Christopher Nolan",
      "Denis Villeneuve",
      "Greta Gerwig",
      "Ridley Scott"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 522
  },
  {
    "question": "Welcher Film gewann den Oscar 2024 als bester Film?",
    "options": [
      "Oppenheimer",
      "Barbie",
      "Killers of the Flower Moon",
      "Poor Things"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 523
  },
  {
    "question": "Wer spielt 'Barbie' (2023)?",
    "options": [
      "Margot Robbie",
      "Florence Pugh",
      "Anya Taylor-Joy",
      "Zendaya"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 524
  },
  {
    "question": "Wer spielt 'Ken' in 'Barbie' (2023)?",
    "options": [
      "Ryan Gosling",
      "Chris Pine",
      "Ryan Reynolds",
      "Chris Pratt"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 525
  },
  {
    "question": "Welche Serie spielt im fiktiven 'Winden'?",
    "options": [
      "Dark",
      "Stranger Things",
      "1899",
      "Babylon Berlin"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 526
  },
  {
    "question": "Wie heißt die Protagonistin in 'Killing Eve'?",
    "options": [
      "Villanelle",
      "Eve",
      "Konstantin",
      "Carolyn"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "filme",
    "id": 527
  },
  {
    "question": "Welcher Schauspieler spielte 'Tony Soprano'?",
    "options": [
      "James Gandolfini",
      "Michael Gandolfini",
      "Robert De Niro",
      "Al Pacino"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 528
  },
  {
    "question": "Welche Serie hat Don Draper als Hauptfigur?",
    "options": [
      "Mad Men",
      "Boardwalk Empire",
      "Sopranos",
      "Better Call Saul"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 529
  },
  {
    "question": "Wer drehte 'Parasite'?",
    "options": [
      "Bong Joon-ho",
      "Park Chan-wook",
      "Hong Sang-soo",
      "Kim Ki-duk"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 530
  },
  {
    "question": "Welche Animationsserie zeigt die Familie Belcher?",
    "options": [
      "Bob's Burgers",
      "Family Guy",
      "American Dad",
      "King of the Hill"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 531
  },
  {
    "question": "Wer spielt 'Saul Goodman'?",
    "options": [
      "Bob Odenkirk",
      "Bryan Cranston",
      "Aaron Paul",
      "Giancarlo Esposito"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 532
  },
  {
    "question": "Welche Serie spielt in der 'Upside Down'?",
    "options": [
      "Stranger Things",
      "Dark",
      "OA",
      "Twin Peaks"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 533
  },
  {
    "question": "Wer drehte 'Inglourious Basterds'?",
    "options": [
      "Tarantino",
      "Rodriguez",
      "Scorsese",
      "Spielberg"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 534
  },
  {
    "question": "Wie heißt der Drache im Hobbit?",
    "options": [
      "Smaug",
      "Falkor",
      "Drogon",
      "Toothless"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 535
  },
  {
    "question": "Welcher Disney-Film hat ein Warzenschwein als zentralen Sidekick?",
    "options": [
      "Bambi",
      "Der König der Löwen",
      "Dschungelbuch",
      "Findet Nemo"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 536
  },
  {
    "question": "Wer spielte 'Forrest Gump'?",
    "options": [
      "Tom Hanks",
      "Kevin Costner",
      "Bill Murray",
      "Robin Williams"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 537
  },
  {
    "question": "Wer ist der Hauptdarsteller in 'Gladiator'?",
    "options": [
      "Russell Crowe",
      "Mel Gibson",
      "Brad Pitt",
      "Tom Hardy"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 538
  },
  {
    "question": "Welche Serie hat 'House of Cards' den Streaming-Markt geöffnet (Plattform)?",
    "options": [
      "Netflix",
      "Amazon",
      "HBO",
      "Apple TV"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 539
  },
  {
    "question": "Wer spielt 'Jack Bauer' in '24'?",
    "options": [
      "Kiefer Sutherland",
      "Bruce Willis",
      "Mel Gibson",
      "Liam Neeson"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 540
  },
  {
    "question": "Wie heißt die Drogenboss-Serie über Pablo Escobar?",
    "options": [
      "Narcos",
      "Ozark",
      "El Chapo",
      "Cartel"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 541
  },
  {
    "question": "Wer spielt 'Jon Snow'?",
    "options": [
      "Kit Harington",
      "Richard Madden",
      "Aidan Turner",
      "Sam Heughan"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 542
  },
  {
    "question": "Welche Serie spielt im Krankenhaus 'Seattle Grace'?",
    "options": [
      "Grey's Anatomy",
      "ER",
      "House",
      "Scrubs"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 543
  },
  {
    "question": "Wer spielt 'Tony Stark'?",
    "options": [
      "Robert Downey Jr.",
      "Mark Ruffalo",
      "Chris Evans",
      "Chris Pratt"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 544
  },
  {
    "question": "Welcher Film hat den Slogan 'I see dead people'?",
    "options": [
      "The Sixth Sense",
      "The Others",
      "Shutter Island",
      "Inception"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 545
  },
  {
    "question": "Wer drehte 'Avatar' (2009)?",
    "options": [
      "James Cameron",
      "Steven Spielberg",
      "Peter Jackson",
      "Ridley Scott"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 546
  },
  {
    "question": "Welche Serie spielt im fiktiven 'Pawnee'?",
    "options": [
      "Parks and Recreation",
      "The Office",
      "Brooklyn 99",
      "Community"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 547
  },
  {
    "question": "Wer spielt 'Michael Scott' im US-Office?",
    "options": [
      "Steve Carell",
      "John Krasinski",
      "Rainn Wilson",
      "Ed Helms"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 548
  },
  {
    "question": "Welche Serie zeigt einen Drogendealer-Lehrer in Albuquerque?",
    "options": [
      "Breaking Bad",
      "Better Call Saul",
      "Ozark",
      "Narcos"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 549
  },
  {
    "question": "Wer spielt 'Hermione Granger'?",
    "options": [
      "Emma Watson",
      "Bonnie Wright",
      "Evanna Lynch",
      "Katie Leung"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 550
  },
  {
    "question": "Welche Serie um eine Mathematik-Professorin heißt 'Haus des Geldes' (Original-Titel)?",
    "options": [
      "La Casa de Papel",
      "Money Heist",
      "Casa Bonita",
      "Élite"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 551
  },
  {
    "question": "Wer drehte 'The Grand Budapest Hotel'?",
    "options": [
      "Wes Anderson",
      "Paul Thomas Anderson",
      "Coen Brothers",
      "Spike Jonze"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 552
  },
  {
    "question": "Welche Serie zeigt Mike Ross als 'falschen' Anwalt?",
    "options": [
      "Suits",
      "Boston Legal",
      "How to Get Away",
      "The Good Wife"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 553
  },
  {
    "question": "Welche Pixar-Figur ist eine kochende Ratte?",
    "options": [
      "Remy",
      "Linguini",
      "Anton",
      "Skinner"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 554
  },
  {
    "question": "Welche Pixar-Figur ist ein Kochroboter? Falsch — welche Pixar-Figur ist eine kochende Ratte?",
    "options": [
      "Remy",
      "Linguini",
      "Anton",
      "Skinner"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 555
  },
  {
    "question": "Wer drehte 'Joker' (2019)?",
    "options": [
      "Todd Phillips",
      "Christopher Nolan",
      "Matt Reeves",
      "Zack Snyder"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 556
  },
  {
    "question": "In welcher BBC-Serie spielt Benedict Cumberbatch den berühmten Detektiv aus der Baker Street?",
    "options": [
      "Endeavour",
      "Sherlock",
      "Luther",
      "Broadchurch"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "filme",
    "id": 557
  },
  {
    "question": "Wer sang 'Blinding Lights'?",
    "options": [
      "The Weeknd",
      "Drake",
      "Post Malone",
      "Bruno Mars"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 558
  },
  {
    "question": "Wer sang 'Levitating'?",
    "options": [
      "Dua Lipa",
      "Ariana Grande",
      "Doja Cat",
      "Charli XCX"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 559
  },
  {
    "question": "Wer sang 'Anti-Hero' (2022)?",
    "options": [
      "Taylor Swift",
      "Olivia Rodrigo",
      "Billie Eilish",
      "Lana Del Rey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 560
  },
  {
    "question": "Welcher Rapper veröffentlichte 'Donda'?",
    "options": [
      "Kanye West",
      "Drake",
      "J. Cole",
      "Travis Scott"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 561
  },
  {
    "question": "Wer sang 'Flowers' (2023)?",
    "options": [
      "Miley Cyrus",
      "Dua Lipa",
      "Olivia Rodrigo",
      "Halsey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 562
  },
  {
    "question": "Welcher deutsche Rapper veröffentlichte 'Sonny Black'?",
    "options": [
      "Bushido",
      "Sido",
      "Capital Bra",
      "Kollegah"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 563
  },
  {
    "question": "Welche Band sang 'Smells Like Teen Spirit'?",
    "options": [
      "Nirvana",
      "Pearl Jam",
      "Soundgarden",
      "Foo Fighters"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 564
  },
  {
    "question": "Welche Band sang 'Wonderwall'?",
    "options": [
      "Oasis",
      "Blur",
      "Coldplay",
      "The Verve"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 565
  },
  {
    "question": "Wer sang 'Despacito'?",
    "options": [
      "Luis Fonsi",
      "Maluma",
      "Daddy Yankee",
      "J Balvin"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 566
  },
  {
    "question": "Welcher Künstler veröffentlichte 'Astroworld'?",
    "options": [
      "Travis Scott",
      "Drake",
      "Kid Cudi",
      "Kanye West"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 567
  },
  {
    "question": "Wer sang 'Old Town Road'?",
    "options": [
      "Lil Nas X",
      "Post Malone",
      "Drake",
      "Cardi B"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 568
  },
  {
    "question": "Welche Band sang 'Yellow' (2000)?",
    "options": [
      "Coldplay",
      "Keane",
      "Travis",
      "Snow Patrol"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 569
  },
  {
    "question": "Wer komponierte 'Für Elise'?",
    "options": [
      "Beethoven",
      "Mozart",
      "Chopin",
      "Schubert"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 570
  },
  {
    "question": "Welche Band veröffentlichte 'The Joshua Tree'?",
    "options": [
      "U2",
      "REM",
      "Pink Floyd",
      "Coldplay"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 571
  },
  {
    "question": "Wer sang 'Hey Jude'?",
    "options": [
      "The Beatles",
      "Rolling Stones",
      "The Who",
      "Kinks"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 572
  },
  {
    "question": "Wer sang 'Toxic' (2003)?",
    "options": [
      "Britney Spears",
      "Christina Aguilera",
      "Jessica Simpson",
      "Mandy Moore"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 573
  },
  {
    "question": "Welche deutsche Band sang 'Tage wie diese'?",
    "options": [
      "Die Toten Hosen",
      "Die Ärzte",
      "Rammstein",
      "Tokio Hotel"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 574
  },
  {
    "question": "Welche deutsche Band sang 'Westerland'?",
    "options": [
      "Die Ärzte",
      "Die Toten Hosen",
      "Fettes Brot",
      "Wir sind Helden"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 575
  },
  {
    "question": "Wer sang 'Atemlos durch die Nacht'?",
    "options": [
      "Helene Fischer",
      "Andrea Berg",
      "Vanessa Mai",
      "Beatrice Egli"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 576
  },
  {
    "question": "Wer sang 'Stairway to Heaven'?",
    "options": [
      "Led Zeppelin",
      "Deep Purple",
      "Black Sabbath",
      "Pink Floyd"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 577
  },
  {
    "question": "Welche Band veröffentlichte 'Thriller'? (Solo-Album)",
    "options": [
      "Michael Jackson",
      "Jackson 5",
      "Earth Wind & Fire",
      "Prince"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 578
  },
  {
    "question": "Welche Sängerin heißt mit echtem Namen Stefani Germanotta?",
    "options": [
      "Lady Gaga",
      "Katy Perry",
      "Pink",
      "Sia"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 579
  },
  {
    "question": "Wer sang 'Umbrella'?",
    "options": [
      "Rihanna",
      "Beyoncé",
      "Mariah Carey",
      "Alicia Keys"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 580
  },
  {
    "question": "Wer komponierte 'Rhapsody in Blue'?",
    "options": [
      "Gershwin",
      "Copland",
      "Bernstein",
      "Ives"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 581
  },
  {
    "question": "Wer sang 'Uptown Funk'?",
    "options": [
      "Mark Ronson & Bruno Mars",
      "Pharrell",
      "Justin Timberlake",
      "Daft Punk"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 582
  },
  {
    "question": "Welche Band sang 'Sweet Child o' Mine'?",
    "options": [
      "Guns N' Roses",
      "Aerosmith",
      "Bon Jovi",
      "Mötley Crüe"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 583
  },
  {
    "question": "Wer sang 'Believer'?",
    "options": [
      "Imagine Dragons",
      "OneRepublic",
      "Twenty One Pilots",
      "Maroon 5"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 584
  },
  {
    "question": "Wer sang 'Counting Stars'?",
    "options": [
      "OneRepublic",
      "Imagine Dragons",
      "Coldplay",
      "Bastille"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 585
  },
  {
    "question": "Wer sang 'Royals'?",
    "options": [
      "Lorde",
      "Halsey",
      "Sia",
      "Florence + The Machine"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 586
  },
  {
    "question": "Wer sang 'Get Lucky'?",
    "options": [
      "Daft Punk",
      "Justice",
      "Cassius",
      "Air"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 587
  },
  {
    "question": "Welche Band veröffentlichte 'A Night at the Opera'?",
    "options": [
      "Queen",
      "Pink Floyd",
      "Beatles",
      "Genesis"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 588
  },
  {
    "question": "Wer sang 'Tears in Heaven'?",
    "options": [
      "Eric Clapton",
      "Phil Collins",
      "Sting",
      "Mark Knopfler"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 589
  },
  {
    "question": "Auf welchem Album erschien Bushidos Song '80 Millionen'?",
    "options": [
      "Sonny Black",
      "Carlo Cokxxx Nutten",
      "AMYF",
      "Heavy Metal Payback"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 590
  },
  {
    "question": "Wer sang 'Bad Romance'?",
    "options": [
      "Lady Gaga",
      "Beyoncé",
      "Rihanna",
      "Katy Perry"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 591
  },
  {
    "question": "Welche Band sang 'In the End'?",
    "options": [
      "Linkin Park",
      "Limp Bizkit",
      "Korn",
      "System of a Down"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 592
  },
  {
    "question": "Wer sang 'Lose Yourself'?",
    "options": [
      "Eminem",
      "Jay-Z",
      "50 Cent",
      "Dr. Dre"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 593
  },
  {
    "question": "Wer komponierte 'Nessun Dorma'?",
    "options": [
      "Puccini",
      "Verdi",
      "Bizet",
      "Rossini"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 594
  },
  {
    "question": "Welche Sängerin sang 'Chandelier'?",
    "options": [
      "Sia",
      "Adele",
      "Lorde",
      "Birdy"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 595
  },
  {
    "question": "Welche Band sang 'Don't Stop Believin''?",
    "options": [
      "Journey",
      "Foreigner",
      "Boston",
      "Toto"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 596
  },
  {
    "question": "Wer sang 'Drivers License' (2021)?",
    "options": [
      "Olivia Rodrigo",
      "Tate McRae",
      "Conan Gray",
      "Billie Eilish"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 597
  },
  {
    "question": "Wer sang 'Vossi Bop' (UK Rap)?",
    "options": [
      "Stormzy",
      "Dave",
      "Skepta",
      "Central Cee"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 598
  },
  {
    "question": "Welcher deutsche Rapper hatte 2019 einen Riesen-Hit mit dem Song 'Roller'?",
    "options": [
      "Capital Bra",
      "Apache 207",
      "Bonez MC",
      "Shirin David"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "musik",
    "id": 599
  },
  {
    "question": "Welche deutsche Band sang 'Major Tom'?",
    "options": [
      "Peter Schilling",
      "Falco",
      "Nena",
      "Alphaville"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 600
  },
  {
    "question": "Wer sang '99 Luftballons'?",
    "options": [
      "Nena",
      "Falco",
      "Hubert Kah",
      "Spider Murphy Gang"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 601
  },
  {
    "question": "Wer sang 'Du hast' (1997)?",
    "options": [
      "Rammstein",
      "Oomph!",
      "Megaherz",
      "Eisbrecher"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 602
  },
  {
    "question": "Wer komponierte 'Boléro'? (französisch)",
    "options": [
      "Ravel",
      "Debussy",
      "Berlioz",
      "Fauré"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 603
  },
  {
    "question": "Wer sang 'Stressed Out'?",
    "options": [
      "Twenty One Pilots",
      "Imagine Dragons",
      "Bastille",
      "AJR"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 604
  },
  {
    "question": "Wer veröffentlichte 'Channel Orange'?",
    "options": [
      "Frank Ocean",
      "Tyler the Creator",
      "The Weeknd",
      "Childish Gambino"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 605
  },
  {
    "question": "Welche Band sang 'Seven Nation Army'?",
    "options": [
      "The White Stripes",
      "Black Keys",
      "Arctic Monkeys",
      "Foals"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 606
  },
  {
    "question": "Wer sang 'God's Plan'?",
    "options": [
      "Drake",
      "Travis Scott",
      "Future",
      "Lil Baby"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 607
  },
  {
    "question": "Wer veröffentlichte 'Currents' (2015)?",
    "options": [
      "Tame Impala",
      "MGMT",
      "The xx",
      "Beach House"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 608
  },
  {
    "question": "Wer sang 'As It Was' (2022)?",
    "options": [
      "Harry Styles",
      "Ed Sheeran",
      "Sam Smith",
      "Lewis Capaldi"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 609
  },
  {
    "question": "Wer sang 'Watermelon Sugar'?",
    "options": [
      "Harry Styles",
      "Niall Horan",
      "Shawn Mendes",
      "Justin Bieber"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 610
  },
  {
    "question": "Wer komponierte 'Im Hofe des Bergkönigs' (Peer Gynt)?",
    "options": [
      "Grieg",
      "Sibelius",
      "Nielsen",
      "Sinding"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 611
  },
  {
    "question": "Wer wurde Torschützenkönig der WM 2018?",
    "options": [
      "Harry Kane",
      "Cristiano Ronaldo",
      "Lukaku",
      "Griezmann"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 612
  },
  {
    "question": "Wer wurde Trainer des FC Bayern 2024/25?",
    "options": [
      "Vincent Kompany",
      "Thomas Tuchel",
      "Julian Nagelsmann",
      "Hansi Flick"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 613
  },
  {
    "question": "Welcher Verein gewann die EL 2024?",
    "options": [
      "Atalanta Bergamo",
      "Leverkusen",
      "Roma",
      "Marseille"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 614
  },
  {
    "question": "Wer ist Trainer der DFB-Elf seit 2023?",
    "options": [
      "Julian Nagelsmann",
      "Hansi Flick",
      "Rudi Völler",
      "Joachim Löw"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 615
  },
  {
    "question": "Welche Nation gewann Olympia-Gold im Fußball 2021 (Männer)?",
    "options": [
      "Brasilien",
      "Spanien",
      "Argentinien",
      "Mexiko"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 616
  },
  {
    "question": "Welcher Verein heißt 'Die Roten' in Hannover?",
    "options": [
      "Hannover 96",
      "Hansa Rostock",
      "Energie Cottbus",
      "Union Berlin"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 617
  },
  {
    "question": "Wer wurde 2024 Europameister?",
    "options": [
      "Spanien",
      "England",
      "Frankreich",
      "Niederlande"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 618
  },
  {
    "question": "Wer wurde 2024 zum besten Spieler der EM gewählt?",
    "options": [
      "Rodri",
      "Bellingham",
      "Yamal",
      "Olmo"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 619
  },
  {
    "question": "Wer war jüngster EM-Torschütze 2024?",
    "options": [
      "Lamine Yamal",
      "Jude Bellingham",
      "Pedri",
      "Musiala"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 620
  },
  {
    "question": "Welcher Verein gewann 2024 die FA-Cup?",
    "options": [
      "Manchester United",
      "Man City",
      "Liverpool",
      "Arsenal"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 621
  },
  {
    "question": "Welches Land verlor das WM-Finale 2022?",
    "options": [
      "Frankreich",
      "Argentinien",
      "Kroatien",
      "Marokko"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 622
  },
  {
    "question": "Wer schoss den entscheidenden Elfmeter Argentiniens im WM-Finale 2022?",
    "options": [
      "Montiel",
      "Messi",
      "Dybala",
      "Lautaro"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 623
  },
  {
    "question": "Wer wurde 2024 Ballon d'Or-Sieger?",
    "options": [
      "Rodri",
      "Vinicius",
      "Bellingham",
      "Haaland"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 626
  },
  {
    "question": "Welches Stadion ist 'Signal Iduna Park'?",
    "options": [
      "Dortmund",
      "Schalke",
      "Bayern",
      "Köln"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 627
  },
  {
    "question": "Wer war 'der Bomber der Nation'?",
    "options": [
      "Gerd Müller",
      "Klose",
      "Völler",
      "Klinsmann"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 628
  },
  {
    "question": "Wer war Trainer Englands bei EM 2024?",
    "options": [
      "Gareth Southgate",
      "Roy Hodgson",
      "Sam Allardyce",
      "Eddie Howe"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 629
  },
  {
    "question": "Welcher Verein gewann CL 2023?",
    "options": [
      "Manchester City",
      "Inter Mailand",
      "Real Madrid",
      "Bayern"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 630
  },
  {
    "question": "Wer wurde 2023 zur Weltfußballerin gewählt?",
    "options": [
      "Aitana Bonmatí",
      "Alexia Putellas",
      "Sam Kerr",
      "Caroline Graham Hansen"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 631
  },
  {
    "question": "Welcher Verein gewann 2025 die CL? (Final 2025: PSG)",
    "options": [
      "PSG",
      "Inter",
      "Real",
      "Arsenal"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 632
  },
  {
    "question": "Welcher Klub ist als 'die Roten Bullen' bekannt (deutsche BL)?",
    "options": [
      "RB Leipzig",
      "Bayern",
      "Köln",
      "Mainz"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 633
  },
  {
    "question": "Wer hält den Rekord für die meisten Champions-League-Tore in einer einzelnen Saison (17 Tore)?",
    "options": [
      "Lionel Messi",
      "Robert Lewandowski",
      "Cristiano Ronaldo",
      "Karim Benzema"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "fussball",
    "id": 634
  },
  {
    "question": "Welcher Verein gewann den UEFA-Pokal 1980 (Eintracht)?",
    "options": [
      "Eintracht Frankfurt",
      "Bayer Leverkusen",
      "Bayern",
      "Mönchengladbach"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 635
  },
  {
    "question": "In welchem Stadion fand das WM-Finale 2014 statt?",
    "options": [
      "Maracanã",
      "Mineirão",
      "Pacaembu",
      "Castelão"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 636
  },
  {
    "question": "Welche Nationalmannschaft hat das Trikot 'La Albiceleste'?",
    "options": [
      "Argentinien",
      "Uruguay",
      "Chile",
      "Paraguay"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 637
  },
  {
    "question": "Welcher Spieler wurde 1996 Europameister mit Deutschland im Wembley?",
    "options": [
      "Bierhoff",
      "Klinsmann",
      "Möller",
      "Sammer"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 638
  },
  {
    "question": "Wer schoss das Golden Goal im EM-Finale 1996?",
    "options": [
      "Bierhoff",
      "Klinsmann",
      "Möller",
      "Häßler"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 639
  },
  {
    "question": "Wer wurde 2022 Trainer der englischen Nationalmannschaft (vor Tuchel)? (Southgate-Nachfolger 2024)",
    "options": [
      "Lee Carsley (Interim)",
      "Steve Holland",
      "Sam Allardyce",
      "Eddie Howe"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 640
  },
  {
    "question": "Wer war jüngster WM-Torschütze 2022 (Gakpo, Mukoko, Bellingham etc.)? Wer schoss das erste Tor des Turniers?",
    "options": [
      "Enner Valencia",
      "Mbappé",
      "Messi",
      "Bellingham"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 641
  },
  {
    "question": "Welcher Klub gewann 2024 zum ersten Mal die Bundesliga?",
    "options": [
      "Bayer Leverkusen",
      "Stuttgart",
      "Leipzig",
      "Hoffenheim"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 642
  },
  {
    "question": "Wer war Cheftrainer Leverkusens beim ersten Meistertitel?",
    "options": [
      "Xabi Alonso",
      "Gerardo Seoane",
      "Heiko Herrlich",
      "Bruno Labbadia"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 643
  },
  {
    "question": "Welcher englische Verein wurde 1985 erstmals nach Aufhebung der UEFA-Sperre wieder international spielberechtigt?",
    "options": [
      "Liverpool",
      "Manchester United",
      "Everton",
      "Arsenal"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "fussball",
    "id": 644
  },
  {
    "question": "Wer war 1990 WM-Kapitän Deutschlands?",
    "options": [
      "Lothar Matthäus",
      "Andreas Brehme",
      "Klaus Augenthaler",
      "Jürgen Klinsmann"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 645
  },
  {
    "question": "Zu welchem Verein wechselte Cristiano Ronaldo Anfang 2023?",
    "options": [
      "Inter Miami",
      "Al-Nassr",
      "Al-Hilal",
      "Al-Ittihad"
    ],
    "answer": 1,
    "difficulty": "easy",
    "category": "fussball",
    "id": 646
  },
  {
    "question": "Wer wechselte 2023 zu Inter Miami?",
    "options": [
      "Messi",
      "Busquets",
      "Suárez",
      "Alle drei"
    ],
    "answer": 3,
    "difficulty": "medium",
    "category": "fussball",
    "id": 647
  },
  {
    "question": "Welcher BVB-Trainer war Edin Terzić Nachfolger 2024?",
    "options": [
      "Nuri Sahin",
      "Lucien Favre",
      "Marco Rose",
      "Niko Kovac"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "fussball",
    "id": 648
  },
  {
    "question": "Wer hält den Rekord für die meisten Tore in der Geschichte der Fußball-Europameisterschaft (Stand 2024)?",
    "options": [
      "Michel Platini",
      "Cristiano Ronaldo",
      "Antoine Griezmann",
      "Alan Shearer"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "fussball",
    "id": 649
  },
  {
    "question": "Welcher Verein heißt 'I Bianconeri'?",
    "options": [
      "Juventus",
      "Inter",
      "Milan",
      "Roma"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 650
  },
  {
    "question": "Welcher Verein heißt 'Die Alte Dame' (Italien)?",
    "options": [
      "Juventus",
      "Inter",
      "Milan",
      "Lazio"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "fussball",
    "id": 651
  },
  {
    "question": "Wer wurde 2020 Champions-League-Sieger?",
    "options": [
      "Bayern München",
      "PSG",
      "Real Madrid",
      "Liverpool"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "fussball",
    "id": 652
  },
  {
    "question": "Welche Hauptstadt liegt in der Schweiz?",
    "options": [
      "Bern",
      "Zürich",
      "Genf",
      "Basel"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 653
  },
  {
    "question": "Welches Land hat die Hauptstadt Stockholm?",
    "options": [
      "Schweden",
      "Norwegen",
      "Finnland",
      "Dänemark"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 654
  },
  {
    "question": "Wie heißt der längste Fluss der Welt? (umstritten — am häufigsten genannt)",
    "options": [
      "Nil",
      "Amazonas",
      "Jangtse",
      "Mississippi"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 655
  },
  {
    "question": "Welches chemische Element hat das Symbol 'K'?",
    "options": [
      "Kalium",
      "Kobalt",
      "Krypton",
      "Kupfer"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 656
  },
  {
    "question": "Wie viele Zähne hat ein erwachsener Mensch (mit Weisheitszähnen)?",
    "options": [
      "32",
      "28",
      "30",
      "34"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 657
  },
  {
    "question": "Welches Land hat die meisten UNESCO-Welterbe-Stätten?",
    "options": [
      "Italien",
      "China",
      "Spanien",
      "Frankreich"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 658
  },
  {
    "question": "In welchem Jahr wurde die Bundesrepublik Deutschland gegründet?",
    "options": [
      "1949",
      "1945",
      "1955",
      "1961"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 659
  },
  {
    "question": "Wer war der erste Bundespräsident Österreichs (Zweite Republik)?",
    "options": [
      "Karl Renner",
      "Theodor Körner",
      "Adolf Schärf",
      "Franz Jonas"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 660
  },
  {
    "question": "Welches Element hat das Symbol 'Na'?",
    "options": [
      "Natrium",
      "Stickstoff",
      "Niob",
      "Nickel"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 661
  },
  {
    "question": "Wie heißt die größte Insel der Welt?",
    "options": [
      "Grönland",
      "Neuguinea",
      "Borneo",
      "Madagaskar"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 662
  },
  {
    "question": "In welchem Jahr wurde die Wiedervereinigung Deutschlands gefeiert?",
    "options": [
      "1990",
      "1989",
      "1991",
      "1992"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 663
  },
  {
    "question": "Wie heißt die kleinste Hauptstadt Europas (Einwohner)?",
    "options": [
      "Vaduz",
      "Valletta",
      "San Marino",
      "Monaco"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 664
  },
  {
    "question": "Welcher Fluss bildet die Grenze zwischen USA und Mexiko?",
    "options": [
      "Rio Grande",
      "Colorado",
      "Mississippi",
      "Pecos"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 665
  },
  {
    "question": "Welche Sprache wird offiziell in Brasilien gesprochen?",
    "options": [
      "Portugiesisch",
      "Spanisch",
      "Französisch",
      "Englisch"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 666
  },
  {
    "question": "Welche Hauptstadt liegt in Indien?",
    "options": [
      "Neu-Delhi",
      "Mumbai",
      "Kalkutta",
      "Chennai"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 667
  },
  {
    "question": "Welches Land hat die meisten Vulkane?",
    "options": [
      "Indonesien",
      "Japan",
      "USA",
      "Chile"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 668
  },
  {
    "question": "Welche Hauptstadt liegt in Ägypten?",
    "options": [
      "Kairo",
      "Alexandria",
      "Luxor",
      "Gizeh"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 669
  },
  {
    "question": "Welcher Berg ist der höchste Nordamerikas?",
    "options": [
      "Denali",
      "Logan",
      "Pico de Orizaba",
      "Whitney"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 670
  },
  {
    "question": "Welches Tier ist das größte landlebende Säugetier?",
    "options": [
      "Afrikanischer Elefant",
      "Asiatischer Elefant",
      "Nashorn",
      "Flusspferd"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 671
  },
  {
    "question": "Welches Edelmetall hat das Symbol 'Pt'?",
    "options": [
      "Platin",
      "Palladium",
      "Plutonium",
      "Polonium"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 672
  },
  {
    "question": "Welche Metropolregion ist nach Einwohnerzahl die größte der Welt?",
    "options": [
      "Delhi",
      "Tokio",
      "Shanghai",
      "São Paulo"
    ],
    "answer": 1,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 673
  },
  {
    "question": "Welches Land hat die meisten Nobelpreisträger?",
    "options": [
      "USA",
      "Großbritannien",
      "Deutschland",
      "Frankreich"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 674
  },
  {
    "question": "Welche europäische Hauptstadt liegt mit über 1000 Metern am höchsten?",
    "options": [
      "Madrid",
      "Bern",
      "Andorra la Vella",
      "Reykjavík"
    ],
    "answer": 2,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 675
  },
  {
    "question": "Welche Hauptstadt liegt am Tigris?",
    "options": [
      "Bagdad",
      "Teheran",
      "Damaskus",
      "Beirut"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 676
  },
  {
    "question": "Welcher Wissenschaftler formulierte die drei Bewegungsgesetze?",
    "options": [
      "Newton",
      "Einstein",
      "Galilei",
      "Kepler"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 677
  },
  {
    "question": "Welche Hauptstadt liegt im Iran?",
    "options": [
      "Teheran",
      "Mashhad",
      "Isfahan",
      "Schiras"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 678
  },
  {
    "question": "Wie heißt das tiefste Meeresgebiet der Welt?",
    "options": [
      "Marianengraben",
      "Tonga-Graben",
      "Java-Graben",
      "Puerto-Rico-Graben"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 679
  },
  {
    "question": "Welches Land grenzt nicht an China?",
    "options": [
      "Iran",
      "Indien",
      "Russland",
      "Nepal"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 680
  },
  {
    "question": "Welche Hauptstadt liegt in Südafrika (Regierung)?",
    "options": [
      "Pretoria",
      "Kapstadt",
      "Johannesburg",
      "Durban"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 681
  },
  {
    "question": "Welches Element ist das leichteste?",
    "options": [
      "Wasserstoff",
      "Helium",
      "Lithium",
      "Sauerstoff"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 682
  },
  {
    "question": "Welche Stadt heißt 'Stadt der sieben Hügel'?",
    "options": [
      "Rom",
      "Lissabon",
      "Istanbul",
      "Alle drei"
    ],
    "answer": 3,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 683
  },
  {
    "question": "Welches Land hat die längste Küste am Mittelmeer?",
    "options": [
      "Italien",
      "Griechenland",
      "Spanien",
      "Türkei"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "allgemein",
    "id": 684
  },
  {
    "question": "Welcher Wissenschaftler entwickelte die Evolutionstheorie?",
    "options": [
      "Darwin",
      "Mendel",
      "Lamarck",
      "Wallace"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "allgemein",
    "id": 685
  },
  {
    "question": "Wer schrieb 'Der alte Mann und das Meer'?",
    "options": [
      "Hemingway",
      "Steinbeck",
      "Faulkner",
      "Fitzgerald"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 686
  },
  {
    "question": "Welche Hauptstadt liegt am Tejo?",
    "options": [
      "Lissabon",
      "Madrid",
      "Porto",
      "Sevilla"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "allgemein",
    "id": 687
  },
  {
    "question": "Welches Pokémon entwickelt sich zu Glurak?",
    "options": [
      "Glumanda",
      "Schiggy",
      "Bisasam",
      "Pikachu"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 688
  },
  {
    "question": "Welches Spiel hat die Figur 'Kratos'?",
    "options": [
      "God of War",
      "Devil May Cry",
      "Bayonetta",
      "Darksiders"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 689
  },
  {
    "question": "Welche Konsole heißt 'Switch'?",
    "options": [
      "Nintendo",
      "Sony",
      "Microsoft",
      "Sega"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 690
  },
  {
    "question": "Welche App nutzt 'Snaps' die nach 24h verschwinden?",
    "options": [
      "Snapchat",
      "Instagram",
      "BeReal",
      "TikTok"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 691
  },
  {
    "question": "Welches Spiel hat 'Battle Pass' bekannt gemacht?",
    "options": [
      "Fortnite",
      "PUBG",
      "Apex",
      "Warzone"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 692
  },
  {
    "question": "Was bedeutet die Abkürzung 'NPC'?",
    "options": [
      "Non-Player Character",
      "Network Play Character",
      "New Player Class",
      "Native PvP Class"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 693
  },
  {
    "question": "Welche Marke baut den 'Cybertruck'?",
    "options": [
      "Tesla",
      "Rivian",
      "Ford",
      "GMC"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 694
  },
  {
    "question": "Wer ist CEO von Meta?",
    "options": [
      "Mark Zuckerberg",
      "Sheryl Sandberg",
      "Sundar Pichai",
      "Jack Dorsey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 695
  },
  {
    "question": "Was steht 'OG' im Slang für?",
    "options": [
      "Original Gangster",
      "Original Game",
      "Old Guy",
      "Over Game"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 696
  },
  {
    "question": "Was misst die 'API'?",
    "options": [
      "nichts – Schnittstelle",
      "App-Speed",
      "App Power Index",
      "Account Performance"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 697
  },
  {
    "question": "Welche Krypto-Währung hat das Symbol 'BTC'?",
    "options": [
      "Bitcoin",
      "Ethereum",
      "Tether",
      "BNB"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 698
  },
  {
    "question": "Wer hat 'ChatGPT' entwickelt?",
    "options": [
      "OpenAI",
      "Google",
      "Meta",
      "Anthropic"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 699
  },
  {
    "question": "Welche Sportart spielt 'LeBron James'?",
    "options": [
      "Basketball",
      "American Football",
      "Baseball",
      "Eishockey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 700
  },
  {
    "question": "Welches Tier ist Pokémon Nr. 25?",
    "options": [
      "Pikachu",
      "Glumanda",
      "Mew",
      "Mewtu"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 701
  },
  {
    "question": "Welche Sportart spielt 'Tom Brady'?",
    "options": [
      "American Football",
      "Baseball",
      "Basketball",
      "Eishockey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 702
  },
  {
    "question": "Wer gewann 2023 die Formel-1-WM?",
    "options": [
      "Verstappen",
      "Hamilton",
      "Leclerc",
      "Norris"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 703
  },
  {
    "question": "Wer gewann 2024 die Formel-1-WM?",
    "options": [
      "Verstappen",
      "Norris",
      "Leclerc",
      "Hamilton"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 704
  },
  {
    "question": "Wer ist Trainer/Teamchef bei Red Bull Racing seit 2005?",
    "options": [
      "Christian Horner",
      "Toto Wolff",
      "Frédéric Vasseur",
      "Andrea Stella"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 705
  },
  {
    "question": "Welches Game hat 'Among Us' populär gemacht (Studio)?",
    "options": [
      "Innersloth",
      "Mojang",
      "Riot",
      "Valve"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 706
  },
  {
    "question": "Wer ist 'PewDiePie' (echter Name)?",
    "options": [
      "Felix Kjellberg",
      "Jake Paul",
      "Logan Paul",
      "MrBeast"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 707
  },
  {
    "question": "Wer ist Inhaber von Twitter (jetzt X)?",
    "options": [
      "Elon Musk",
      "Jack Dorsey",
      "Mark Zuckerberg",
      "Larry Page"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 708
  },
  {
    "question": "Welche App ist berühmt für 'Stories' (zuerst eingeführt)?",
    "options": [
      "Snapchat",
      "Instagram",
      "Facebook",
      "WhatsApp"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 709
  },
  {
    "question": "Welche Marke heißt 'Just Do It'?",
    "options": [
      "Nike",
      "Adidas",
      "Puma",
      "Reebok"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 710
  },
  {
    "question": "Welche Marke heißt 'Impossible is Nothing'?",
    "options": [
      "Adidas",
      "Nike",
      "Puma",
      "Under Armour"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 711
  },
  {
    "question": "Was sind 'NFTs'?",
    "options": [
      "Non-Fungible Tokens",
      "New Financial Tokens",
      "Net Future Tokens",
      "Network Fast Transfer"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 712
  },
  {
    "question": "Welcher Streamer ist als 'Ninja' bekannt?",
    "options": [
      "Tyler Blevins",
      "Shroud",
      "TimTheTatman",
      "DrDisrespect"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 713
  },
  {
    "question": "Welches Spiel hat den Charakter 'Aloy'?",
    "options": [
      "Horizon Zero Dawn",
      "Tomb Raider",
      "Last of Us",
      "Uncharted"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 714
  },
  {
    "question": "Welches Spiel hat den Charakter 'Ellie'?",
    "options": [
      "The Last of Us",
      "Horizon",
      "Days Gone",
      "Death Stranding"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 715
  },
  {
    "question": "Welche App hat ein Geist als Logo?",
    "options": [
      "Snapchat",
      "Discord",
      "Telegram",
      "Signal"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 716
  },
  {
    "question": "Wie viele Pokémon gab es in Gen 1?",
    "options": [
      "151",
      "150",
      "152",
      "201"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 717
  },
  {
    "question": "Welches Spiel hat 'Creeper Aw man'-Meme?",
    "options": [
      "Minecraft",
      "Roblox",
      "Terraria",
      "Fortnite"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 718
  },
  {
    "question": "Welches Tier ist das schnellste im Wasser (Fisch)?",
    "options": [
      "Schwertfisch",
      "Thunfisch",
      "Marlin",
      "Hai"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 719
  },
  {
    "question": "Was bedeutet 'OMG'?",
    "options": [
      "Oh My God",
      "Online Meta Game",
      "On My Goal",
      "Out My Group"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 720
  },
  {
    "question": "Was ist 'FOMO'?",
    "options": [
      "Fear of Missing Out",
      "Friends of My Own",
      "Full of Memes Only",
      "Front of My Office"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 721
  },
  {
    "question": "Welches Tier ist auf dem Lacoste-Logo?",
    "options": [
      "Krokodil",
      "Eidechse",
      "Drache",
      "Schlange"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 722
  },
  {
    "question": "Welche Sportart hat 'Touchdowns'?",
    "options": [
      "American Football",
      "Rugby",
      "Basketball",
      "Eishockey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 723
  },
  {
    "question": "Welche Sportart spielt Tiger Woods?",
    "options": [
      "Golf",
      "Tennis",
      "Boxen",
      "Basketball"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 724
  },
  {
    "question": "Welche Marke baut den 911?",
    "options": [
      "Porsche",
      "Ferrari",
      "Lamborghini",
      "Aston Martin"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 725
  },
  {
    "question": "Wie nennt man eine '6' beim Würfeln im Slang?",
    "options": [
      "Sechs",
      "Sex (englisch)",
      "Six (englisch)",
      "Hexa"
    ],
    "answer": 2,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 726
  },
  {
    "question": "Welches Pokémon ist legendär aus Gen 1 (Vogel)?",
    "options": [
      "Arktos",
      "Lugia",
      "Ho-Oh",
      "Rayquaza"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "gemischt",
    "id": 727
  },
  {
    "question": "Welcher Comedian moderiert das US 'The Daily Show' (lang)?",
    "options": [
      "Jon Stewart",
      "Trevor Noah",
      "Jimmy Fallon",
      "Conan O'Brien"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "gemischt",
    "id": 728
  },
  {
    "question": "Welche Marke baut die 'GTI'?",
    "options": [
      "VW",
      "Opel",
      "Renault",
      "Peugeot"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "gemischt",
    "id": 729
  },
  {
    "question": "Wer spielt 'Jack Reacher' in der Amazon-Serie?",
    "options": [
      "Alan Ritchson",
      "Tom Cruise",
      "Henry Cavill",
      "Chris Hemsworth"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 730
  },
  {
    "question": "Welche Serie spielt im 'House of the Dragon'?",
    "options": [
      "GoT-Prequel",
      "GoT-Sequel",
      "Witcher-Prequel",
      "LOTR-Prequel"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 731
  },
  {
    "question": "Wer spielt 'Wolverine'?",
    "options": [
      "Hugh Jackman",
      "Liev Schreiber",
      "Chris Hemsworth",
      "Channing Tatum"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 732
  },
  {
    "question": "Wer spielt 'Doctor Strange'?",
    "options": [
      "Benedict Cumberbatch",
      "Eddie Redmayne",
      "Ralph Fiennes",
      "Hugh Grant"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 733
  },
  {
    "question": "Wer drehte 'Dune' (2021)?",
    "options": [
      "Denis Villeneuve",
      "Christopher Nolan",
      "Ridley Scott",
      "James Cameron"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 734
  },
  {
    "question": "Wer spielt 'Paul Atreides' in 'Dune' (2021)?",
    "options": [
      "Timothée Chalamet",
      "Austin Butler",
      "Tom Holland",
      "Ansel Elgort"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 735
  },
  {
    "question": "Welche Serie spielt im 'Hellfire Club' (S4)?",
    "options": [
      "Stranger Things",
      "Wednesday",
      "Riverdale",
      "Sex Education"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 736
  },
  {
    "question": "Wer spielt 'Daenerys Targaryen'?",
    "options": [
      "Emilia Clarke",
      "Sophie Turner",
      "Maisie Williams",
      "Lena Headey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 737
  },
  {
    "question": "Wer drehte 'Pretty Woman'?",
    "options": [
      "Garry Marshall",
      "Nora Ephron",
      "Penny Marshall",
      "Rob Reiner"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 738
  },
  {
    "question": "Wer spielt 'Vivian' in 'Pretty Woman'?",
    "options": [
      "Julia Roberts",
      "Meg Ryan",
      "Sandra Bullock",
      "Demi Moore"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 739
  },
  {
    "question": "Wer spielt 'James Bond' in 'No Time to Die'?",
    "options": [
      "Daniel Craig",
      "Pierce Brosnan",
      "Idris Elba",
      "Tom Hardy"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 740
  },
  {
    "question": "Wer ist die Stimme von Shrek (Original)?",
    "options": [
      "Mike Myers",
      "Eddie Murphy",
      "Jack Black",
      "Will Ferrell"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 741
  },
  {
    "question": "Wer ist die Stimme von Esel in 'Shrek'?",
    "options": [
      "Eddie Murphy",
      "Chris Rock",
      "Martin Lawrence",
      "Kevin Hart"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 742
  },
  {
    "question": "Wer drehte 'Once Upon a Time in Hollywood'?",
    "options": [
      "Tarantino",
      "Scorsese",
      "Nolan",
      "Fincher"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 743
  },
  {
    "question": "Wer spielt 'Cliff Booth' in 'Once Upon a Time in Hollywood'?",
    "options": [
      "Brad Pitt",
      "Leonardo DiCaprio",
      "Matt Damon",
      "George Clooney"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 744
  },
  {
    "question": "Welche Serie hat 'Walter White' und 'Jesse Pinkman'?",
    "options": [
      "Breaking Bad",
      "Better Call Saul",
      "Ozark",
      "Narcos"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 745
  },
  {
    "question": "Wer spielt 'Jesse Pinkman'?",
    "options": [
      "Aaron Paul",
      "Bob Odenkirk",
      "Giancarlo Esposito",
      "Dean Norris"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 746
  },
  {
    "question": "Wer spielt 'Jon Snow' in 'GoT'?",
    "options": [
      "Kit Harington",
      "Aidan Turner",
      "Richard Madden",
      "Iwan Rheon"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 747
  },
  {
    "question": "Welche Serie zeigt die fiktive Stadt 'Derry'?",
    "options": [
      "It / Welcome to Derry",
      "Stranger Things",
      "Castle Rock",
      "Riverdale"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 748
  },
  {
    "question": "Wer spielt 'Pennywise' in 'It' (2017)?",
    "options": [
      "Bill Skarsgård",
      "Stellan Skarsgård",
      "Tim Curry",
      "Doug Jones"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 749
  },
  {
    "question": "Wer drehte 'Get Out'?",
    "options": [
      "Jordan Peele",
      "Spike Lee",
      "Ari Aster",
      "James Wan"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 750
  },
  {
    "question": "Welche Disney-Serie spielt im 'Mando-Verse'?",
    "options": [
      "The Mandalorian",
      "Andor",
      "Ahsoka",
      "Book of Boba Fett"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 751
  },
  {
    "question": "Wer spielt 'Geralt' in der Witcher-Serie ab Staffel 4?",
    "options": [
      "Liam Hemsworth",
      "Henry Cavill",
      "Chris Hemsworth",
      "Sam Heughan"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 752
  },
  {
    "question": "Welche Serie spielt in 'Westeros'?",
    "options": [
      "Game of Thrones",
      "Witcher",
      "Vikings",
      "Last Kingdom"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 753
  },
  {
    "question": "Wer spielt 'Wolverine' in 'Deadpool & Wolverine'?",
    "options": [
      "Hugh Jackman",
      "Ryan Reynolds",
      "Tom Hardy",
      "Henry Cavill"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 754
  },
  {
    "question": "Wer spielt 'Deadpool'?",
    "options": [
      "Ryan Reynolds",
      "Ryan Gosling",
      "Chris Pratt",
      "Mark Wahlberg"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 755
  },
  {
    "question": "Welche Serie zeigt Anwälte um 'Harvey Specter'?",
    "options": [
      "Suits",
      "The Good Wife",
      "Boston Legal",
      "Drop Dead Diva"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 756
  },
  {
    "question": "Wer spielt 'Harvey Specter'?",
    "options": [
      "Gabriel Macht",
      "Patrick J. Adams",
      "Rick Hoffman",
      "Sarah Rafferty"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 757
  },
  {
    "question": "In welcher britischen Serie der Autorin Phoebe Waller-Bridge bricht die Hauptfigur ständig die vierte Wand?",
    "options": [
      "Killing Eve",
      "Fleabag",
      "Sherlock",
      "Broadchurch"
    ],
    "answer": 1,
    "difficulty": "hard",
    "category": "filme",
    "id": 758
  },
  {
    "question": "Wer spielt 'Eleven' in 'Stranger Things'?",
    "options": [
      "Millie Bobby Brown",
      "Sadie Sink",
      "Natalia Dyer",
      "Maya Hawke"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 759
  },
  {
    "question": "Welche Animationsserie zeigt die 'Smith'-Familie mit Stan?",
    "options": [
      "American Dad",
      "Family Guy",
      "Simpsons",
      "King of the Hill"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 760
  },
  {
    "question": "Wer drehte 'Avengers: Endgame'?",
    "options": [
      "Russo Brothers",
      "Joss Whedon",
      "Jon Favreau",
      "Taika Waititi"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 761
  },
  {
    "question": "Welche Serie zeigt das 'Pied Piper' Startup?",
    "options": [
      "Silicon Valley",
      "Halt and Catch Fire",
      "Mr. Robot",
      "Westworld"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 762
  },
  {
    "question": "Wer drehte 'Whiplash'?",
    "options": [
      "Damien Chazelle",
      "Wes Anderson",
      "PT Anderson",
      "Spike Jonze"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "filme",
    "id": 763
  },
  {
    "question": "Wer spielt 'Mia' in 'La La Land'?",
    "options": [
      "Emma Stone",
      "Margot Robbie",
      "Emma Watson",
      "Brie Larson"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 764
  },
  {
    "question": "Wer drehte 'La La Land'?",
    "options": [
      "Damien Chazelle",
      "Tarantino",
      "Nolan",
      "PTA"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 765
  },
  {
    "question": "Welche Serie spielt um 'Frank Underwood'?",
    "options": [
      "House of Cards",
      "Scandal",
      "Madam Secretary",
      "Designated Survivor"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 766
  },
  {
    "question": "Wer spielt 'Frank Underwood'?",
    "options": [
      "Kevin Spacey",
      "Bryan Cranston",
      "Anthony Hopkins",
      "Robin Wright"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 767
  },
  {
    "question": "Welche Serie hat die Hauptfigur 'Walter White Jr.' aka 'Flynn'?",
    "options": [
      "Breaking Bad",
      "Better Call Saul",
      "Ozark",
      "Bloodline"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "filme",
    "id": 768
  },
  {
    "question": "Wer drehte 'Schindlers Liste'? (Wiederholung medium)",
    "options": [
      "Spielberg",
      "Lucas",
      "Coppola",
      "Lumet"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 769
  },
  {
    "question": "Wer spielt 'Tony Montana' in 'Scarface'?",
    "options": [
      "Al Pacino",
      "Robert De Niro",
      "Andy Garcia",
      "Al Lewis"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 770
  },
  {
    "question": "Welche Serie hat 'Don Draper' als Werbeagentur-Chef?",
    "options": [
      "Mad Men",
      "Boardwalk Empire",
      "Suits",
      "Halt and Catch Fire"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "filme",
    "id": 771
  },
  {
    "question": "Wer sang 'Cruel Summer'?",
    "options": [
      "Taylor Swift",
      "Olivia Rodrigo",
      "Sabrina Carpenter",
      "Lana Del Rey"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 772
  },
  {
    "question": "Wer sang 'Espresso' (2024)?",
    "options": [
      "Sabrina Carpenter",
      "Olivia Rodrigo",
      "Dua Lipa",
      "Tate McRae"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 773
  },
  {
    "question": "Welcher Künstler hatte 2024 'Not Like Us'?",
    "options": [
      "Kendrick Lamar",
      "Drake",
      "J. Cole",
      "Future"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 774
  },
  {
    "question": "Wer sang 'Industry Baby' mit Jack Harlow?",
    "options": [
      "Lil Nas X",
      "Drake",
      "Travis Scott",
      "Post Malone"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 775
  },
  {
    "question": "Welche deutsche Band sang 'Sonne'?",
    "options": [
      "Rammstein",
      "Oomph!",
      "Megaherz",
      "Eisbrecher"
    ],
    "answer": 0,
    "difficulty": "easy",
    "category": "musik",
    "id": 776
  },
  {
    "question": "Welche Sängerin heißt 'SZA'?",
    "options": [
      "Solána Imani Rowe",
      "Beyoncé Knowles",
      "Doja Cat",
      "Lizzo"
    ],
    "answer": 0,
    "difficulty": "hard",
    "category": "musik",
    "id": 777
  },
  {
    "question": "Wer sang 'Snooze' (2022/23)?",
    "options": [
      "SZA",
      "H.E.R.",
      "Jhené Aiko",
      "Summer Walker"
    ],
    "answer": 0,
    "difficulty": "medium",
    "category": "musik",
    "id": 778
  }
]
];