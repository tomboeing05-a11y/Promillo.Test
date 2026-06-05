// Picini – Picolo-ähnliche Prompts. {name1}/{name2}/{name3} werden ersetzt.
// Pickprompt wählt zufällig aus dem gefilterten Pool – Reihenfolge ist immer random.
//
// FOLLOW-UP-SYSTEM:
// Karten mit "followUpId" haben eine Auflösungs-Karte (followUp), die automatisch
// 2-4 Karten später in die Queue eingefügt wird. So werden "bis zur nächsten Karte"-
// Aktionen sauber abgeschlossen.

export type PiciniCategory = "klassisch" | "hausparty" | "hotspicy";

export const PICINI_CATEGORIES: { id: PiciniCategory; label: string; emoji: string; desc: string }[] = [
  { id: "klassisch", label: "Klassisch", emoji: "🎉", desc: "Locker & für jede Runde" },
  { id: "hausparty", label: "Hausparty", emoji: "🍻", desc: "Mehr Action, mehr Schlücke" },
  { id: "hotspicy", label: "Hot & Spicy", emoji: "🌶️", desc: "Pikant, nur für mutige Runden" },
];

export interface PiciniPrompt {
  text: string;
  followUpId?: string; // verknüpft mit einer followUp-Karte
}

export interface PiciniFollowUp {
  id: string;
  text: string; // {name1} wird mit dem Namen der ursprünglichen Person ersetzt
}

// Auflösungs-Karten: erscheinen 2-4 Karten nach der Startkarte
export const PICINI_FOLLOWUPS: PiciniFollowUp[] = [
  { id: "reime_end",    text: "⏰ Zeit! {name1} darf jetzt wieder normal reden – kein Reim-Stress mehr." },
  { id: "daumen_end",  text: "⏰ Daumen-Runde vorbei! {name1} darf den Daumen senken." },
  { id: "janein_end",  text: "⏰ Jetzt aufgehört! {name1} darf wieder alle Wörter benutzen." },
  { id: "stehen_end",  text: "⏰ {name1} darf sich endlich wieder setzen – gut gemacht (oder nicht)." },
  { id: "eigentlich_end", text: "⏰ Vorbei! {name1} muss nicht mehr jeden Satz mit 'Eigentlich…' beginnen." },
  { id: "konjunktiv_end", text: "⏰ {name1} darf wieder normal reden – kein Konjunktiv mehr." },
  { id: "stimme_end",  text: "⏰ {name1} darf wieder in normaler Stimme reden." },
  { id: "ich_end",     text: "⏰ {name1} darf 'Ich' wieder benutzen – das Ich-Verbot ist aufgehoben." },
  { id: "bier_end",    text: "⏰ Das Bier-Tabu von {name1} ist vorbei! Das Wort darf wieder fallen." },
  { id: "regel_end",   text: "⏰ Die Regel von {name1} ist aufgehoben – zurück zur Normalität." },
  { id: "haende_end",  text: "⏰ {name1} darf das Glas wieder mit einer Hand halten." },
  { id: "liebling_end",text: "⏰ {name1} muss nicht mehr 'Liebling' sagen – die Runde ist sicher." },
  { id: "sitzen_end",  text: "⏰ Die Sitzregel ist aufgehoben – {name1} und alle anderen dürfen wieder frei sitzen." },
  { id: "pakt_end",    text: "⏰ Der Trink-Pakt zwischen {name1} und der anderen Person ist beendet." },
  { id: "akzent_end",  text: "⏰ {name1} darf wieder ohne Akzent reden – Verschnaufpause!" },
];

export const PICINI_PROMPTS: Record<PiciniCategory, PiciniPrompt[]> = {
  klassisch: [
    // Normale Karten
    { text: "{name1} trinkt 1 Schluck und darf 2 weitere Schlücke frei verteilen." },
    { text: "{name1} und {name2} starren sich 5 Sekunden in die Augen. Wer zuerst lacht oder wegschaut, trinkt 2." },
    { text: "Alle, die heute schon Kaffee getrunken haben: 1 Schluck." },
    { text: "{name1} nennt in 5 Sekunden 3 Pizzabeläge. Schafft er/sie es nicht: 2 Schlücke." },
    { text: "Reihum ein Wort, das mit dem letzten Buchstaben des vorherigen beginnt. Wer hängt oder zu lange braucht, trinkt 2." },
    { text: "{name1} sucht sich jemanden zum Anstoßen aus. Wer ablehnt, trinkt doppelt – wer mitmacht: 1 Schluck." },
    { text: "{name1} erzählt einen Witz. Lacht keiner ehrlich: 2 Schlücke für {name1}." },
    { text: "Alle mit weißem Oberteil: 1 Schluck. Alle ohne: trotzdem prosten." },
    { text: "{name1} und {name2} tauschen für 2 Runden die Plätze – ohne ein Wort." },
    { text: "Reihum Tiere nennen. Wer hängt, trinkt 2." },
    { text: "Jüngste:r in der Runde: 1 Schluck. Älteste:r: 2 Schlücke." },
    { text: "{name1} stellt {name2} eine Wahrheitsfrage. Antwort verweigert: 3 Schlücke." },
    { text: "Stille Karte: 10 Sekunden absolute Ruhe. Wer redet, lacht oder hustet, trinkt 2." },
    { text: "{name1} trinkt 1 Schluck pro Vokal im eigenen Vornamen." },
    { text: "Hand aufs Herz: {name1} verrät etwas, das er/sie heute zum ersten Mal gemacht hat – oder 2 Schlücke." },
    { text: "Kategorie 'Automarken'. Reihum, wer zuerst hängt, trinkt 2." },
    { text: "{name1} singt 10 Sekunden lang sein/ihr Lieblingslied – oder 2 Schlücke." },
    { text: "Wer in der Runde am letzten Wochenende getanzt hat: 1 Schluck." },
    { text: "Linkshänder: 1 Schluck. Rechtshänder mit der falschen Hand am Glas: 2 Schlücke." },
    { text: "Stoßt alle gleichzeitig an. Wer kein Glas in der Hand hat, trinkt extra." },
    { text: "{name1} darf jemandem ein Kompliment machen. Die Person bedankt sich – oder trinkt 2." },
    { text: "Kategorie 'Hauptstädte'. Reihum, wer hängt, trinkt 2." },
    { text: "{name1} imitiert eine andere Person aus der Runde. Errät sie es: 2 Schlücke für die imitierte Person." },
    { text: "Wer als Letztes 'Prost' sagt, trinkt 2." },
    { text: "Alle, die heute Sport gemacht haben: 1 Schluck zur Belohnung." },
    { text: "Reihum zählen – aber jede Zahl mit 3 oder durch 3 teilbar wird 'Buzz'. Wer patzt, trinkt 2." },
    { text: "Wer ein Tattoo hat: 1 Schluck. Wer keins hat, prostet allen mit Tattoos zu." },
    { text: "Alle, die heute schon laut gelacht haben: 1 Schluck." },
    { text: "{name1} und {name2} machen ein 'High Five'. Daneben = beide trinken 1." },
    { text: "Kategorie 'Disney-Filme'. Reihum, wer hängt, trinkt 2." },
    { text: "{name1} schließt 10 Sekunden die Augen. Wer in der Zeit lacht, trinkt 1." },
    { text: "Alle, die schon mal im Ausland gewohnt haben: 1 Schluck." },
    { text: "Alle, die heute ihr Bett gemacht haben: 1 Schluck als Belohnung." },
    { text: "{name1} und {name2} sagen gleichzeitig eine Farbe. Gleich = beide 2 Schlücke. Unterschiedlich = beide stoßen an." },
    { text: "Kategorie 'Obstsorten'. Reihum, wer hängt, trinkt 2." },
    { text: "{name1} darf seinen/ihren peinlichsten Lieblings-Song nennen. Verweigerung: 2 Schlücke." },
    { text: "Wer in der Runde am weitesten anreisen musste: 2 Schlücke." },
    { text: "{name1} hält 15 Sekunden Plank-Position. Schafft er/sie es nicht: 2 Schlücke." },
    { text: "Reihum: Jede:r nennt ein Land in Afrika. Wer hängt, trinkt 2." },
    { text: "Alle, die heute schon geflucht haben: 1 Schluck." },
    { text: "Wer den ältesten Schuh anhat (Schätzung), trinkt 2." },
    { text: "{name1} muss in 10 Sekunden 5 Pokémon nennen – oder 2 Schlücke." },
    { text: "Alle, die heute schon etwas Süßes gegessen haben: 1 Schluck." },
    { text: "Reihum: Hauptstädte mit 'B'. Wer hängt, trinkt 2." },
    { text: "{name1} beschreibt sich selbst in 3 Adjektiven. Die Runde stimmt ab, ob es passt – passt nicht: 2 Schlücke." },
    { text: "Alle, die heute schon mindestens einen Liter Wasser getrunken haben: 1 Schluck (Solidarität)." },
    { text: "Wer die längsten Haare hat: 1 Schluck. Wer die kürzesten: 2." },
    { text: "{name1} muss 10 Sekunden ohne Blinzeln durchhalten. Blinzelt: 2 Schlücke." },
    { text: "Reihum: Filme mit Tom Hanks. Wer hängt, trinkt 2." },
    { text: "Alle, die im selben Monat Geburtstag haben wie {name1}: 1 Schluck." },
    { text: "{name1} darf ein neues Wort erfinden + Bedeutung. Lacht jemand ehrlich: 2 Schlücke für die Lacher:innen." },
    { text: "Wer in der Runde am lautesten 'Prost!' rufen kann (Abstimmung): erhält 2 Bonus-Schlücke zum Verteilen." },
    { text: "{name1} schreibt eine Zahl im Kopf, {name2} rät. Treffer = {name1} trinkt 3, daneben = {name2} trinkt 2." },
    { text: "Kategorie 'Eissorten'. Reihum. Wer hängt: 2 Schlücke." },
    { text: "Alle, die heute schon ein Foto gepostet haben: 2 Schlücke." },
    { text: "{name1} darf 10 Sekunden lang einen Tanz aufführen – ohne Musik. Verweigerung: 3 Schlücke." },
    { text: "Reihum: Eine Sportart, die mit Ball gespielt wird. Wer hängt: 2 Schlücke." },
    { text: "Alle, die heute schon gelogen haben (auch Notlügen): 1 Schluck." },
    { text: "Wer als Erste:r in der Runde lächelt, wenn {name1} 'Bananenbrot' sagt: 1 Schluck." },
    { text: "Kategorie 'Berufe mit A'. Reihum. Wer hängt: 2 Schlücke." },
    { text: "Alle, die heute schon umgezogen haben (Kleidung gewechselt): 1 Schluck." },
    { text: "{name1} sagt der Runde, was er/sie heute am liebsten essen würde. Lacht jemand: 2 Schlücke für die Lacher:innen." },
    { text: "Zwei-Wahrheiten-eine-Lüge: {name1} startet. Wer falsch rät, trinkt 2." },
    { text: "{name1} und {name2}: Wer als Erste:r die Augen schließt, wenn die andere Person 'Schlaf' sagt, trinkt 2." },
    { text: "Kategorie 'Süßigkeiten'. Reihum, wer hängt, trinkt 2." },
    { text: "{name1} muss einen Gegenstand im Raum in nur einem Wort beschreiben – alle raten, was es ist. Niemand errät es: 2 Schlücke." },
    { text: "Alle, die heute ihr Handy mehr als 3 Stunden genutzt haben: 1 Schluck (ehrlich bleiben)." },
    { text: "{name1} tippt 3 Emojis und {name2} muss erraten, welchen Film sie darstellen. Falsch: 2 Schlücke." },

    // Karten mit Follow-up (anhalten + auflösen)
    { text: "🎯 Reim-Runde! {name1} spricht ab jetzt nur noch in Reimen. Jeder Patzer: 1 Schluck. (Auflösung kommt in ein paar Karten.)", followUpId: "reime_end" },
    { text: "👍 Daumen-Regel: {name1} hebt jetzt still den Daumen. Wer es als Letzte:r bemerkt und nachmacht, trinkt 2. (Auflösung kommt gleich.)", followUpId: "daumen_end" },
    { text: "🚫 Ja/Nein-Verbot: {name1} darf ab jetzt nur 'Ja' und 'Nein' sagen. Kein anderes Wort. Patzer: 1 Schluck pro Wort. (Endet bald.)", followUpId: "janein_end" },
    { text: "🧍 Steh-Strafe: {name1} muss jetzt aufstehen. Wer sich setzt, bevor die Auflösung kommt: 2 Strafschlücke.", followUpId: "stehen_end" },
    { text: "💬 Eigentlich-Regel: {name1} muss jeden Satz ab jetzt mit 'Eigentlich…' beginnen. Patzer: 1 Schluck. (Endet bald.)", followUpId: "eigentlich_end" },
    { text: "🎭 {name1} erfindet eine kleine Runden-Regel (z. B. 'kein Vorname'). Ab jetzt gilt sie – Verstöße: 2 Schlücke. (Endet automatisch.)", followUpId: "regel_end" },
  ],

  hausparty: [
    // Normale Karten
    { text: "{name1} kippt einen Shot zusammen mit {name2}." },
    { text: "Geschlechter-Regel: Alle Männer trinken 2, danach alle Frauen 1." },
    { text: "{name1} bestimmt eine Person, die ihr/sein halbes Glas exen muss." },
    { text: "Trinke 1 Schluck pro Buchstabe im Spitznamen von {name1}." },
    { text: "Bottoms up: {name1} und {name2} stoßen an – beide austrinken, was noch im Glas ist (oder 3 Strafschlücke)." },
    { text: "{name1} schreibt einer dritten Person aus den Kontakten eine peinliche Sprachnachricht. Weigerung: halbes Glas." },
    { text: "Alle, die heute später als 10 Uhr aufgestanden sind: 2 Schlücke." },
    { text: "Karaoke-Karte: {name1} singt 15 Sekunden lautstark a cappella – oder 3 Schlücke." },
    { text: "Alle, die heute schon mindestens einen Moment still waren: 1 Schluck – für die Ruhe." },
    { text: "'Ich hab noch nie…' Mini-Runde: {name1} startet mit einer Aussage. Wer's gemacht hat, trinkt." },
    { text: "Alle, die ihr Handy gerade in Reichweite haben: 2 Schlücke." },
    { text: "{name1} und {name2} machen ein Selfie – mit ernster Miene. Lachen = je 2 Schlücke." },
    { text: "Trink-Battle: {name1} vs {name2} – wer als Letzte:r das Glas absetzt, gewinnt. Verlierer:in nochmal 2." },
    { text: "Wer als Letztes 'Prost' sagt: 3 Schlücke." },
    { text: "Spontane Wette: {name1} und {name2} sagen gleichzeitig eine Zahl 1–6. Gleich = alle trinken 2." },
    { text: "Würfel im Kopf: Alle sagen gleichzeitig eine Zahl 1–10. Doppelte trinken 2." },
    { text: "Alle, die hier schon mal übernachtet haben: 1 Schluck. Wer noch nie: 2." },
    { text: "{name1} darf eine Person zum Tanzen auffordern. Verweigerung: 3 Schlücke für die andere Seite." },
    { text: "Schere-Stein-Papier: {name1} vs {name2}, best of 3. Verlierer:in trinkt 3." },
    { text: "Wer am weitesten von der Party-Location wohnt: 2 Schlücke." },
    { text: "{name1} hebt das Glas hoch und sagt einen Toast in unter 10 Sekunden. Daneben: 2 Schlücke." },
    { text: "{name1} darf entscheiden: selbst 3 trinken oder 5 an die Runde verteilen." },
    { text: "Kategorie 'Cocktails' – reihum. Wer hängt, trinkt 2." },
    { text: "{name1} bestimmt zwei Personen, die sich gegenseitig zuprosten und je 2 trinken." },
    { text: "Wer das lauteste Lachen in der Runde hat (Abstimmung): 2 Schlücke." },
    { text: "Alle mit dem Buchstaben 'A' im Vornamen: 1 Schluck. Mit 'S': 2." },
    { text: "{name1} und {name2}: '3 Biersorten in 5 Sekunden'. Wer's nicht schafft, trinkt 3." },
    { text: "Wer als Erste:r in der nächsten Minute aufs Handy schaut, trinkt halbes Glas." },
    { text: "{name1} darf eine Person nominieren, die das nächste Lied aussucht – diese trinkt vorher 1." },
    { text: "Alle, die in den letzten 24 Stunden kein Wasser getrunken haben: 3 Schlücke (und jetzt ein Glas Wasser)." },
    { text: "{name1} muss eine Story in genau 3 Sätzen erzählen, die mit 'Gestern…' beginnt. Patzer: 2." },
    { text: "Die Person rechts von {name1} entscheidet, was {name1} trinkt – zwischen 1 und 4 Schlücken." },
    { text: "{name1} darf zwei Personen gegeneinander antreten lassen: Schere-Stein-Papier. Verlierer:in trinkt 3." },
    { text: "Alle, die heute weniger als 5 Stunden geschlafen haben: 2 Schlücke." },
    { text: "Kettenreaktion: {name1} trinkt 1, gibt 2 weiter, der/die trinkt 2 und gibt 3 weiter – maximal 5. Wer die 5 bekommt: nur 3 (Gnade)." },
    { text: "Wer in der Runde heute schon ein Selfie gemacht hat: 2 Schlücke." },
    { text: "Bier-Memory: {name1} sagt 3 Wörter. Reihum müssen alle die 3 der Reihe nach wiederholen + 1 neues anhängen. Wer patzt: 2 Schlücke." },
    { text: "Speed-Date-Karte: {name1} und {name2} stellen sich gegenseitig 3 schnelle Fragen. Wer am längsten überlegt: 3 Schlücke." },
    { text: "Würfel-Vote: Alle zeigen gleichzeitig 1–5 Finger. Niedrigste Zahl trinkt 3." },
    { text: "{name1} darf ein Foto aus der Galerie zeigen (nicht das letzte). Weigerung: halbes Glas." },
    { text: "Alle, die heute ein alkoholfreies Getränk hatten: 1 Schluck. Wer nicht: 2 (zur Hydration)." },
    { text: "Wer als Letzte:r in der Runde 'Cheers' (auf Englisch) sagt: 2 Schlücke." },
    { text: "{name1} würfelt im Kopf 1–10. Alle raten gleichzeitig. Richtige:r darf 3 verteilen." },
    { text: "Zwei-Wahrheiten-eine-Lüge: {name1} startet. Wer falsch rät, trinkt 2." },
    { text: "Alle, die heute noch keinen Schritt vor die Tür gemacht haben: 3 Schlücke." },
    { text: "Spontane Umfrage: Wer in der Runde tanzt am besten? Person mit den wenigsten Stimmen trinkt 2." },
    { text: "{name1} darf einer Person ein 'Trink-Geschenk' machen: 2 Schlücke geschenkt – die Person darf annehmen oder verdoppeln & zurückgeben." },
    { text: "{name1} darf eine Person nominieren, mit der er/sie 'Best Friends' für diese Runde wird – beide trinken zusammen." },
    { text: "{name1} und {name2} bieten sich gegenseitig Schlücke: Wer als Erste:r aufgibt, trinkt die Summe." },
    { text: "Kategorie 'Bierwerbung'. Reihum, wer hängt: 3 Schlücke." },
    { text: "Spontane Challenge: {name1} balanciert sein Glas 10 Sekunden auf dem Handrücken. Verschüttet/verweigert: 3 Schlücke." },
    { text: "{name1} verteilt 4 Schlücke nach freier Wahl." },
    { text: "Reihum: 'Mein Lieblingscocktail ist…' – wer hängt oder doppelt nennt: 2 Schlücke." },
    { text: "Trink-Mathe: {name1} sagt 'plus 1', nächste Person 'plus 2'… Wer den Faden verliert: 3 Schlücke." },
    { text: "Alle, die ihr Telefon auf lautlos haben: 1 Schluck. Auf laut: 2 Schlücke." },
    { text: "{name1} und {name2} stoßen feierlich an und sagen 'Auf die Runde!' – die ganze Runde trinkt 1 mit." },
    { text: "Alle, die bei dieser Party schon jemanden neu kennengelernt haben: 1 Schluck." },
    { text: "{name1} nennt 5 Songs von einem Künstler in 10 Sekunden. Schafft er/sie es nicht: 3 Schlücke." },
    { text: "Wer zuletzt eine Runde ausgegeben hat (Schätzung erlaubt): 2 Schlücke aus Dankbarkeit." },
    { text: "{name1} darf einen 'Schluck-Pakt' mit {name2} anbieten: Die nächsten 3 Karten trinken sie immer gemeinsam. Ablehnung: {name2} trinkt 2." },
    { text: "Hochstrecken: Wer sein Glas als Letztes in die Luft streckt nach 'Hoch die Gläser!': 2 Schlücke." },
    { text: "{name1} erfindet einen Cocktailnamen. Klingt er lecker (Abstimmung): Alle trinken 1. Klingt er schrecklich: {name1} trinkt 2." },

    // Karten mit Follow-up
    { text: "🎤 Verstellte Stimme: {name1} muss ab jetzt mit verstellter, tiefer Stimme reden. Patzer: 2 Schlücke. (Endet bald.)", followUpId: "stimme_end" },
    { text: "🚫 Ich-Verbot: {name1} darf das Wort 'Ich' nicht mehr benutzen. Patzer: 1 Schluck. (Endet bald.)", followUpId: "ich_end" },
    { text: "🍺 Bier-Tabu: {name1} darf 'Bier' nicht mehr sagen. Patzer: 2 Schlücke pro Verwendung. (Endet bald.)", followUpId: "bier_end" },
    { text: "✋ Zwei-Hände: {name1} muss das Glas immer mit beiden Händen halten. Patzer: 2 Schlücke. (Endet bald.)", followUpId: "haende_end" },
    { text: "💬 Konjunktiv-Pflicht: {name1} muss alles im Konjunktiv sagen ('Ich würde…'). Patzer: 1 Schluck pro Patzer. (Endet bald.)", followUpId: "konjunktiv_end" },
  ],

  hotspicy: [
    // Normale Karten
    { text: "{name1} verrät die wildeste Story aus seinem/ihrem Leben – oder kippt einen Shot." },
    { text: "Truth oder Schluck: {name1}, wann war dein letztes Date?" },
    { text: "{name1} flüstert {name2} etwas ins Ohr, das niemand sonst hören darf. Weigerung: halbes Glas." },
    { text: "{name1} und {name2} halten 7 Sekunden Augenkontakt – ohne Worte. Wer wegschaut, trinkt 3." },
    { text: "Spicy Truth: {name1}, was war die spontanste Aktion, die du je gemacht hast?" },
    { text: "{name1} und {name2}: Wer in den letzten 30 Tagen weniger Dates hatte, trinkt 4." },
    { text: "Dare: {name1} schreibt einer Ex-Person 'Ich hab gerade an dich gedacht'. Sonst Glas leeren." },
    { text: "{name1} zeigt das letzte Foto in der Galerie. Verweigerung: 3 Schlücke." },
    { text: "Strip-light: {name1} legt ein Kleidungsstück ab (Socken zählen) – oder trinkt 4." },
    { text: "Truth: {name1}, gestehe einen heimlichen Schwarm in der Runde – oder 4 Schlücke." },
    { text: "{name1} sitzt eine Karte lang auf {name2}s Schoß. Sonst: 3 Schlücke beide." },
    { text: "Whisper: {name1} verrät {name2} eine Fantasie. Geheimhaltungspflicht – sonst ganzes Glas." },
    { text: "Mini-Massage: {name1} massiert {name2} 30 Sekunden die Schultern." },
    { text: "{name1} beschreibt seinen/ihren Typ in 3 Worten. Lacht jemand, trinkt diese Person 2." },
    { text: "Spicy Vote: Wer in der Runde küsst vermutlich am besten? Stille Abstimmung (Finger zeigen). Wer am wenigsten Stimmen bekommt, trinkt 3." },
    { text: "{name1} darf {name2} eine Frage stellen, die sonst zu intim wäre. Antwort verweigert: 4 Schlücke." },
    { text: "Truth or Drink: Wann hast du das letzte Mal an jemanden in dieser Runde gedacht – auf 'die andere Art'?" },
    { text: "{name1} stellt einen Timer auf 30 Sekunden und beantwortet alle Fragen ehrlich. Lüge erkannt: 1 Schluck pro Lüge." },
    { text: "Date-Test: {name1} sagt 3 Dinge über {name2}, die jemand auf einem Date sagen würde. Errät {name2} sie nicht: beide 2." },
    { text: "{name1} sucht die Person aus, die am wenigsten Beziehungserfahrung hat – diese trinkt 2." },
    { text: "Speak-up: {name1} verrät die schlimmste Pickup-Line, die er/sie je gehört hat." },
    { text: "Dare: {name1} und {name2} tanzen 15 Sekunden gemeinsam – ohne Musik. Verweigerung: je 3 Schlücke." },
    { text: "Truth: {name1}, was war dein ungewöhnlichster Ort für einen Kuss?" },
    { text: "{name1} liest die letzte Nachricht in WhatsApp vor (Inhalt). Weigerung: halbes Glas." },
    { text: "{name1} sucht für {name2} ein Match aus der Runde aus. {name2} stimmt zu oder trinkt 3." },
    { text: "Truth: {name1}, in wen aus dieser Runde hattest du als Erste:r verguckt-Vibes?" },
    { text: "{name1} darf eine 'Never have I ever' starten, die er/sie selbst schon gemacht hat – und trinkt mit." },
    { text: "Drei-Wort-Date: {name1} beschreibt sein/ihr Idealdate in genau 3 Worten. Lacht die Runde: 2 für die Lacher:innen." },
    { text: "Confession: {name1} verrät die letzte Person, an die er/sie heute gedacht hat." },
    { text: "Spicy Truth: {name1}, was war das Gewagteste, das du jemandem geschrieben hast?" },
    { text: "{name1} und {name2} machen einen 'Pretend-Trinkspruch', der klingt wie ein Liebesversprechen. Lachen erlaubt – aber dann 2 Schlücke je." },
    { text: "Dare: {name1} ruft jemanden aus den Kontakten an und sagt 'Du fehlst mir gerade'. Sonst ganzes Glas." },
    { text: "Truth: {name1}, hattest du jemals etwas mit jemandem aus deinem Freundeskreis? Antwort verweigert: 4." },
    { text: "{name1} darf {name2} ein Kompliment machen, das niemand sonst je gemacht hat. Weigerung: 3 Schlücke." },
    { text: "Spicy Vote: Wer in der Runde flirtet am offensichtlichsten? Person mit den meisten Stimmen trinkt 3." },
    { text: "{name1} entscheidet: ehrliche Antwort auf eine 'No-Go-Frage' von {name2} – oder 5 Schlücke." },
    { text: "Truth: {name1}, was ist die längste Zeit, die du jemanden geghostet hast?" },
    { text: "{name1} und {name2} müssen sich abwechselnd Komplimente machen – ohne Pause. Wer zuerst hängt: 3 Schlücke." },
    { text: "Dare: {name1} singt {name2} 10 Sekunden lang einen Lovesong vor – oder 4 Schlücke." },
    { text: "Truth: {name1}, was war deine erste Schwärmerei und wie alt warst du?" },
    { text: "Spicy Two-Truths-One-Lie: {name1} erzählt drei Dating-Storys – eine ist erfunden. Wer falsch rät: 3 Schlücke." },
    { text: "{name1} darf eine Person aus der Runde fragen: 'Hand oder Glas?' – Hand = 30 Sek. Händchen halten, Glas = halb leeren." },
    { text: "Truth: {name1}, was war deine peinlichste Aktion auf einem Date?" },
    { text: "Dare: {name1} schickt {name2} per Messenger eine Sprachnachricht mit einem Liebesgedicht – live. Sonst: 4 Schlücke." },
    { text: "Spicy Truth: {name1}, gab es jemals jemanden in dieser Runde, mit dem/der du dir mehr vorstellen konntest?" },
    { text: "{name1} darf sich von {name2} eine 'Date-Note' (1–10) geben lassen. Unter 6 = {name2} trinkt 3, über 8 = {name1} trinkt 3." },
    { text: "Truth: {name1}, was ist die unromantischste Sache, die du an dir selbst attraktiv findest?" },
    { text: "Truth: {name1}, hast du jemals jemanden geküsst, dessen Namen du vergessen hattest?" },
    { text: "Spicy Vote: Wer in der Runde wäre der beste Partner für einen Roadtrip à deux? Person mit wenigsten Stimmen: 3 Schlücke." },
    { text: "Dare: {name1} liest die letzte Nachricht laut vor, die er/sie selbst geschrieben hat. Verweigerung: ganzes Glas." },
    { text: "Truth: {name1}, was ist der absurdeste Ort, an dem du jemals mit jemandem geflirtet hast?" },
    { text: "{name1} darf {name2} drei Wörter sagen, die die Beziehung der beiden beschreiben. Stimmt die Runde nicht zu: 2 Schlücke beide." },
    { text: "Spicy Truth: {name1}, was war deine längste Trockenphase – und warum?" },
    { text: "Dare: {name1} muss in 10 Sekunden eine Pickup-Line an {name2} richten. Lacht jemand: 2 Schlücke für die Lacher:innen." },
    { text: "Truth: {name1}, hast du jemals etwas in einer Beziehung getan, das du heute bereust?" },
    { text: "{name1} darf eine Person in der Runde küssen – auf die Hand. Verweigerung: 3 Schlücke beide." },
    { text: "Truth: {name1}, was war der wildeste Traum, den du diese Woche hattest?" },
    { text: "{name1} darf {name2} ein 'Forbidden Compliment' geben (etwas, das normalerweise zu intim wäre). Weigerung: 3 Schlücke." },
    { text: "Spicy Vote: Wer in der Runde hat den 'mysteriösesten Vibe'? Person mit den meisten Stimmen: 2 Schlücke." },
    { text: "Truth: {name1}, was ist die romantischste Geste, die jemand jemals für dich gemacht hat?" },
    { text: "Dare: {name1} und {name2} machen eine 5-Sekunden-Umarmung – mitten in der Runde. Verweigerung: je 3 Schlücke." },
    { text: "Spicy Truth: {name1}, in welchem Alter hattest du deinen ersten Kuss – und mit wem?" },
    { text: "Truth: {name1}, was ist dein größter Dealbreaker bei Dates?" },
    { text: "Spicy Vote: Wer in der Runde wäre der beste 'Mitbewohner mit Vorzügen'? Person mit den meisten Stimmen: 3 Schlücke." },
    { text: "Truth: {name1}, was war der ungewöhnlichste Spitzname, den jemand dir je gegeben hat?" },
    { text: "Spicy Truth: {name1}, hast du jemals jemanden gedatet, den deine Freund:innen nicht mochten?" },
    { text: "{name1} darf {name2} 'die eine Frage' stellen, die er/sie schon immer wissen wollte. Verweigerung: ganzes Glas." },
    { text: "Final Spicy: {name1} und {name2} stoßen mit geschlossenen Augen an und sagen gleichzeitig ein Wort, das sie aneinander mögen. Gleich = 0 Schlücke. Unterschiedlich = je 2." },
    { text: "{name1} darf sich ein 'Crush-Geständnis' aussuchen: selbst eines machen ODER {name2} dazu zwingen. Wer nicht antwortet: 4 Schlücke." },
    { text: "Sound-Check: {name1} macht 5 Sekunden lang ein Geräusch, das er/sie 'attraktiv' findet. Lacht jemand, trinkt diese Person 2." },
    { text: "Truth: {name1}, was wäre dein perfekter erster Satz beim Flirten?" },
    { text: "{name1} und {name2}: Wer hat mehr ungelesene Nachrichten? Tippen – wer mehr hat, trinkt 2." },
    { text: "Spicy: {name1} beschreibt einen Abend mit {name2} in 3 Worten – nur mit Emojis. Die Runde interpretiert." },
    { text: "Dare: {name1} schreibt {name2} gerade jetzt eine Sprachnachricht, in der er/sie sagt, was er/sie an ihr/ihm mag. Sonst 4 Schlücke." },

    // Karten mit Follow-up
    { text: "💋 Akzent-Runde: {name1} spricht ab jetzt mit einem sexy Akzent ihrer/seiner Wahl. Patzer: 1 Schluck. (Endet bald.)", followUpId: "akzent_end" },
    { text: "💕 Liebling-Pflicht: {name1} muss jeden Satz mit 'Liebling…' beginnen. Patzer: 2 Schlücke. (Endet bald.)", followUpId: "liebling_end" },
    { text: "🤝 Schluck-Pakt: {name1} und {name2} trinken ab jetzt bei jeder Karte gemeinsam. (Endet automatisch nach ein paar Runden.)", followUpId: "pakt_end" },
  ],
};

// ─── pickPrompt ────────────────────────────────────────────────────────────────
// Gibt eine zufällige Karte zurück. Wenn sie ein followUpId hat, wird die
// Auflösungs-Karte als `pendingFollowUp` mitgegeben (die Spiellogik muss sie
// nach 2–4 normalen Karten in die Queue einreihen).
export function pickPrompt(
  cats: PiciniCategory[],
  used: Set<string>,
  players: string[],
): { text: string; key: string; pendingFollowUp?: { text: string; key: string } } | null {
  const pool: PiciniPrompt[] = [];
  for (const c of cats) for (const p of PICINI_PROMPTS[c]) pool.push(p);
  if (pool.length === 0) return null;

  const fresh = pool.filter((p) => !used.has(p.text));
  const arr = fresh.length > 0 ? fresh : pool;
  const pick = arr[Math.floor(Math.random() * arr.length)];

  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const resolve = (t: string) =>
    t
      .replaceAll("{name1}", shuffled[0] ?? "Jemand")
      .replaceAll("{name2}", shuffled[1] ?? shuffled[0] ?? "Jemand anderes")
      .replaceAll("{name3}", shuffled[2] ?? shuffled[0] ?? "Noch jemand");

  const result: ReturnType<typeof pickPrompt> = {
    text: resolve(pick.text),
    key: pick.text,
  };

  if (pick.followUpId) {
    const fu = PICINI_FOLLOWUPS.find((f) => f.id === pick.followUpId);
    if (fu) {
      result.pendingFollowUp = {
        text: resolve(fu.text),
        key: `followup_${fu.id}_${shuffled[0]}`,
      };
    }
  }

  return result;
}
