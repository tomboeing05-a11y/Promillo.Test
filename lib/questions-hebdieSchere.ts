// Heb die Schere – "Wer hat schon mal…" Trinkspiel.
// Vorleser liest Karte laut vor → alle auf die es zutrifft trinken → Handy weiter an nächste Person.
// Kategorien: classic (Wer-hat-schon-mal), action (Trink-Action), spicy (heiß), deep (persönlich).

export type N99Category = "classic" | "action" | "spicy" | "deep";

export interface N99Question {
  text: string;
  category: N99Category;
}

export const N99_CATEGORY_LABEL: Record<N99Category, string> = {
  classic: "Klassisch",
  action: "Action",
  spicy: "Spicy",
  deep: "Tief",
};

export const N99_CATEGORY_EMOJI: Record<N99Category, string> = {
  classic: "🍻",
  action: "⚡",
  spicy: "🌶️",
  deep: "💭",
};

// 99 Fragen
export const N99_QUESTIONS: N99Question[] = [
  // ===== Aufwärmen =====
  { text: "Alle stoßen an – auf den Abend! Alle trinken 1 Schluck.", category: "action" },
  { text: "Wer heute schon Kaffee getrunken hat: trinkt 1 Schluck.", category: "classic" },
  { text: "Die Person mit dem längsten Haar trinkt 2 Schlücke.", category: "action" },
  { text: "Wer schon mal verschlafen hat und zu spät zur Arbeit/Schule kam: 2 Schlücke.", category: "classic" },
  { text: "Alle, die heute schon geflucht haben: 1 Schluck.", category: "classic" },
  { text: "Die jüngste Person trinkt 2 Schlücke.", category: "action" },
  { text: "Wer letzten Monat verkatert war: trinkt 2 Schlücke.", category: "classic" },
  { text: "Alle, die schon mal etwas geklaut haben (auch als Kind): 2 Schlücke.", category: "classic" },
  { text: "Wer im Auto Karaoke singt: 1 Schluck.", category: "classic" },
  { text: "Der/Die Vorlesende bestimmt, wer in der Runde einen Schluck trinkt.", category: "action" },

  // ===== Klassisch / Wer hat schon mal =====
  { text: "Wer schon mal in der Öffentlichkeit gepinkelt hat: 2 Schlücke.", category: "classic" },
  { text: "Wer schon mal eine Beziehung per Nachricht beendet hat: 3 Schlücke.", category: "classic" },
  { text: "Alle, die schon mal beim Lügen erwischt wurden: 2 Schlücke.", category: "classic" },
  { text: "Wer schon mal aus Versehen den falschen Namen gerufen hat: 3 Schlücke.", category: "spicy" },
  { text: "Wer noch nie einen Strafzettel bekommen hat: 2 Schlücke.", category: "classic" },
  { text: "Alle, die schon mal geweint haben, weil sie betrunken waren: 2 Schlücke.", category: "classic" },
  { text: "Wer noch nie einen Joint geraucht hat: 1 Schluck.", category: "spicy" },
  { text: "Wer schon mal etwas wegen Heißhunger nachts bestellt hat: 1 Schluck.", category: "classic" },
  { text: "Alle, die mehr als 3 Sprachen sprechen: dürfen jemandem 3 Schlücke geben.", category: "action" },
  { text: "Wer ein Tattoo hat: 2 Schlücke. Wer mehr als 3 hat: 4 Schlücke.", category: "classic" },

  // ===== Action / Aufgaben =====
  { text: "Daumen-Battle! Der/Die Vorlesende fordert jemanden heraus. Verlierer trinkt 3 Schlücke.", category: "action" },
  { text: "Letzte Person, die einen Finger an die Nase legt, trinkt 3 Schlücke.", category: "action" },
  { text: "Schere-Stein-Papier mit der Person gegenüber. Verlierer 2 Schlücke.", category: "action" },
  { text: "Alle wechseln einen Platz nach links. Letzter trinkt 2 Schlücke.", category: "action" },
  { text: "Wer als letztes \"Prost!\" ruft, trinkt 3 Schlücke.", category: "action" },
  { text: "Reihum ein Land mit A nennen. Wer hängt, trinkt 3 Schlücke.", category: "action" },
  { text: "Macht alle ein Selfie zusammen. Wer nicht mitmacht, trinkt 3 Schlücke.", category: "action" },
  { text: "Der/Die Vorlesende verteilt 5 Schlücke beliebig in der Runde.", category: "action" },
  { text: "Alle Männer trinken 2 Schlücke.", category: "action" },
  { text: "Alle Frauen trinken 2 Schlücke.", category: "action" },
  { text: "Person mit dem hellsten Outfit trinkt 2 Schlücke.", category: "action" },
  { text: "Wer Sneaker trägt: 1 Schluck.", category: "action" },
  { text: "Zähle bis 10 ohne zu stottern – sonst 2 Schlücke.", category: "action" },
  { text: "Imitiert ein Tier eurer Wahl. Schlechteste Imitation trinkt 3 Schlücke.", category: "action" },
  { text: "Der/Die Vorlesende wählt einen Trink-Buddy für den Rest des Abends. Ihr trinkt immer gemeinsam.", category: "action" },

  // ===== Spicy =====
  { text: "Wer schon mal Sex an einem öffentlichen Ort hatte: 3 Schlücke.", category: "spicy" },
  { text: "Wer schon mal jemanden geküsst hat, dessen Namen er/sie nicht wusste: 3 Schlücke.", category: "spicy" },
  { text: "Alle, die schon mal ein Nacktfoto verschickt haben: 3 Schlücke.", category: "spicy" },
  { text: "Wer schon mal in der Schule/Arbeit Sexting betrieben hat: 2 Schlücke.", category: "spicy" },
  { text: "Wer schon mal mit jemandem im Raum geflirtet hat: 3 Schlücke.", category: "spicy" },
  { text: "Wer schon mal jemanden aus der Runde attraktiv fand: 3 Schlücke. (still trinken)", category: "spicy" },
  { text: "Alle, die letzte Woche Sex hatten: 2 Schlücke.", category: "spicy" },
  { text: "Wer schon mal mit mehr als einer Person im selben Monat etwas hatte: 3 Schlücke.", category: "spicy" },
  { text: "Wer schon mal beim Sex gelacht hat: 2 Schlücke.", category: "spicy" },
  { text: "Alle, die schon mal ein Dating-Profil hatten: 2 Schlücke.", category: "spicy" },
  { text: "Wer noch jungfräulich ist, darf jemanden 4 Schlücke trinken lassen.", category: "spicy" },
  { text: "Wer schon mal jemanden geküsst hat, der vergeben war: 3 Schlücke.", category: "spicy" },
  { text: "Alle, die Pornos schauen (ehrlich!): 2 Schlücke.", category: "spicy" },
  { text: "Wer schon mal jemanden im Raum geküsst hat: 3 Schlücke und Outing.", category: "spicy" },

  // ===== Tief / Deep =====
  { text: "Wer war schon mal richtig verliebt: 2 Schlücke und erzähle in einem Satz.", category: "deep" },
  { text: "Wer hat schon mal jemandem das Herz gebrochen: 3 Schlücke.", category: "deep" },
  { text: "Wem wurde schon mal das Herz gebrochen und hat danach trotzdem wieder vertraut: 3 Schlücke.", category: "deep" },
  { text: "Wer schon mal seine besten Freunde belogen hat: 2 Schlücke.", category: "deep" },
  { text: "Wer noch Kontakt zu seinem Ex hat: 2 Schlücke.", category: "deep" },
  { text: "Wer schon mal innerlich gekündigt hat, aber trotzdem noch im Job blieb: 2 Schlücke.", category: "deep" },
  { text: "Wer schon mal in Therapie war oder ist: 2 Schlücke. Respekt.", category: "deep" },
  { text: "Wer im letzten Jahr geweint hat: 1 Schluck.", category: "deep" },
  { text: "Wer schon mal Schluss machen wollte, sich aber nicht getraut hat: 3 Schlücke.", category: "deep" },
  { text: "Wer schon mal einem Familienmitglied was Wichtiges verschwiegen hat: 3 Schlücke.", category: "deep" },
  { text: "Wer schon mal an einer Freundschaft gezweifelt hat, die heute besteht: 2 Schlücke.", category: "deep" },
  { text: "Wer einen Traum hat, der so persönlich ist, dass er ihn hier nicht verrät: 2 Schlücke (still).", category: "deep" },

  // ===== Lockerer Mix =====
  { text: "Wer schon mal jemandem beim Klauen zugeschaut und nichts gesagt hat: 2 Schlücke.", category: "classic" },
  { text: "Wer schon mal nackt baden war: 2 Schlücke.", category: "classic" },
  { text: "Alle, die einen Führerschein haben: 1 Schluck. (Cheers, ihr Verantwortlichen.)", category: "classic" },
  { text: "Wer schon mal eine Wette verloren hat, die wirklich peinlich war: 2 Schlücke.", category: "classic" },
  { text: "Wer keinen TikTok-Account hat: 2 Schlücke.", category: "classic" },
  { text: "Alle, die diese Woche im Fitnessstudio waren: dürfen jemandem 2 Schlücke geben.", category: "action" },
  { text: "Wer schon mal einen Bus/Zug verpasst hat, weil er zu lange im Bad war: 1 Schluck.", category: "classic" },
  { text: "Wer in den letzten 24h online shoppen war: 1 Schluck.", category: "classic" },
  { text: "Wer schon mal im Urlaub etwas richtig Dummes gemacht hat: 3 Schlücke.", category: "classic" },
  { text: "Alle, die schon mal einen Aprilscherz reingefallen sind: 1 Schluck.", category: "classic" },
  { text: "Wer keine Spülmaschine zuhause hat: 2 Schlücke.", category: "classic" },
  { text: "Wer schon mal etwas verbrannt hat beim Kochen: 1 Schluck.", category: "classic" },
  { text: "Wer schon mal beim ersten Date eingeschlafen ist: 3 Schlücke.", category: "spicy" },

  // ===== Mehr Action =====
  { text: "Alle zeigen ihren letzten Screenshot. Abstimmung: Wessen ist am peinlichsten? Die Person mit den meisten Stimmen trinkt 3 Schlücke.", category: "action" },
  { text: "Letzte gegoogelte Suche zeigen. Abstimmung: Wessen ist am peinlichsten? Die Person mit den meisten Stimmen trinkt 3 Schlücke.", category: "action" },
  { text: "Wer Instagram hat: letzten Like vorzeigen. Wer das peinlichste zeigt (Abstimmung): 2 Schlücke.", category: "action" },
  { text: "Der/Die Vorlesende öffnet das Telefonbuch und liest Kontakt #7 vor. Sonst 3 Schlücke.", category: "action" },
  { text: "Der/Die Vorlesende schickt der ersten Person in der Chatliste ein Herz-Emoji (Vorsicht: kann Chef oder Ex sein!). Weigerung: 3 Schlücke.", category: "action" },
  { text: "Wer zuerst aufsteht und 5 Liegestützen macht, darf 5 Schlücke verteilen.", category: "action" },
  { text: "Sing den Refrain deines Lieblingssongs. Sonst 3 Schlücke.", category: "action" },
  { text: "Mache ein Kompliment an die Person links. Sonst 2 Schlücke.", category: "action" },
  { text: "Sage der Person rechts von dir in einem Satz, was du an ihr manchmal nervig findest – freundlich aber ehrlich. Sonst 2 Schlücke.", category: "action" },
  { text: "Erzähle einen Witz. Lacht niemand: 3 Schlücke.", category: "action" },

  // ===== Endspurt =====
  { text: "Wer schon mal im falschen Bett aufgewacht ist: 3 Schlücke.", category: "spicy" },
  { text: "Wer schon mal etwas getan hat, das er bis heute nicht zugibt: 2 Schlücke (still).", category: "deep" },
  { text: "Alle, die heute noch fahren müssen: trinken Wasser. Rest 2 Schlücke.", category: "action" },
  { text: "Wer schon mal eine Nacht durchgemacht und am nächsten Tag gearbeitet hat: 2 Schlücke.", category: "classic" },
  { text: "Wer noch nie ein Tagebuch geführt hat: 1 Schluck.", category: "classic" },
  { text: "Alle, die schon mal einen Geburtstag vergessen haben: 2 Schlücke.", category: "classic" },
  { text: "Wer mehr als 5 Streaming-Abos hat: 2 Schlücke.", category: "classic" },
  { text: "Wer noch nie ein Konzert besucht hat: 3 Schlücke.", category: "classic" },
  { text: "Wer schon mal alleine in Urlaub war: 2 Schlücke.", category: "classic" },
  { text: "Wer schon mal jemandem heimlich nachgespiont hat (Insta-Stalking zählt): 2 Schlücke.", category: "spicy" },
  { text: "Wer im letzten Jahr einen One-Night-Stand hatte: 3 Schlücke.", category: "spicy" },
  { text: "Der/Die Vorlesende: Wer in der Runde wäre dein perfektes Date? Antworte ehrlich oder trinke 4 Schlücke.", category: "spicy" },
  { text: "Der/Die Vorlesende wählt jemanden, der sie/ihn am besten kennt. Diese Person trinkt 2 Schlücke.", category: "deep" },
  { text: "Alle stoßen an – auf Frage 99! Ex it: Glas leeren oder 5 Schlücke.", category: "action" },
  { text: "Wer schon mal jemandem etwas Wichtiges gesagt hat, was er bereut: 2 Schlücke.", category: "deep" },
];
