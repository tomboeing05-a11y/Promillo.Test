// Dark Cases – Rätsel-Datei
// Jedes Rätsel hat: einen kurzen Rätsel-Satz (für alle) + die vollständige Lösung (nur Erzähler)

export type DarkCaseDifficulty = "leicht" | "mittel" | "dunkel";

export interface DarkCase {
  id: number;
  riddle: string;       // Kurzer Rätsel-Satz (alle sehen ihn)
  solution: string;     // Vollständige Lösung (nur Erzähler)
  difficulty: DarkCaseDifficulty;
}

export const DARK_CASES: DarkCase[] = [
  // ── LEICHT ───────────────────────────────────────────────────────────────
  {
    id: 1,
    difficulty: "leicht",
    riddle: "Ein Mann liegt tot in einer Telefonzelle. Die Scheiben sind unversehrt.",
    solution: "Der Mann war Taucher. Er rief aus einer Telefonzelle an, als ein Hai das Glasdach des Unterwassertunnels, durch den er gerade lief, einschlug. Das Wasser flutete die Zelle.",
  },
  {
    id: 2,
    difficulty: "leicht",
    riddle: "Eine Frau erschießt ihren Mann. Kurz darauf essen die beiden zu Abend.",
    solution: "Die Frau ist Fotografin. Sie hat ihren Mann mit der Kamera „erschossen" – also fotografiert. Danach aßen beide zusammen.",
  },
  {
    id: 3,
    difficulty: "leicht",
    riddle: "Ein Mann betritt ein Restaurant und bestellt Möwensuppe. Er isst einen Löffel, geht nach Hause und bringt sich um.",
    solution: "Der Mann war früher Schiffbrüchiger. Er wurde zusammen mit seiner Frau und einem Koch gerettet. Der Koch hatte ihnen damals „Möwensuppe" gegeben, um sie am Leben zu erhalten. Jetzt erkannte er am echten Geschmack, dass die Suppe damals aus Menschenfleisch bestanden hatte – seiner Frau. Er konnte nicht mehr leben.",
  },
  {
    id: 4,
    difficulty: "leicht",
    riddle: "Ein Mann wohnt im 20. Stock. Jeden Morgen fährt er mit dem Aufzug runter. Abends fährt er bis zum 14. Stock und geht den Rest zu Fuß.",
    solution: "Der Mann ist kleinwüchsig. Er kann morgens den Erdgeschoss-Knopf drücken, abends aber nur bis Stockwerk 14 reichen. Bei Regen hat er einen Regenschirm, mit dem er den 20. Knopf erreicht.",
  },
  {
    id: 5,
    difficulty: "leicht",
    riddle: "Eine Frau stirbt, weil sie ein Lied hört.",
    solution: "Die Frau ist Seiltänzerin in einem Zirkus. Das Lied war das Zeichen für ihren Assistenten, das Netz wegzunehmen. Als das Lied gespielt wurde, fiel sie und starb.",
  },
  {
    id: 6,
    difficulty: "leicht",
    riddle: "Ein toter Mann liegt mitten in der Wüste. Er hat einen Rucksack auf dem Rücken.",
    solution: "Der Rucksack ist ein nicht geöffneter Fallschirm. Sein Hauptfallschirm öffnete sich nicht, und er hat den Rucksack mit dem Reservefallschirm nicht rechtzeitig geöffnet.",
  },
  {
    id: 7,
    difficulty: "leicht",
    riddle: "Eine Frau kauft eine neue Uhr und ist schuld am Tod zweier Menschen.",
    solution: "Die Frau kauft eine teure Uhr in einem Juweliergeschäft. Als sie das Geschäft verlässt, folgt ihr ein Räuber. Um die Uhr zu stehlen, erschießt er zwei Menschen, die ihr helfen wollen.",
  },
  {
    id: 8,
    difficulty: "leicht",
    riddle: "Ein Mann schläft ein und wacht auf – 10 Jahre älter.",
    solution: "Der Mann ist Astronaut. Er schläft in einem Tiefschlaf für die Weltraumreise. Als er aufwacht, sind 10 Jahre auf der Erde vergangen.",
  },
  {
    id: 9,
    difficulty: "leicht",
    riddle: "Ein Mädchen springt aus dem Fenster und stirbt nicht.",
    solution: "Das Mädchen springt aus dem Erdgeschossfenster.",
  },
  {
    id: 10,
    difficulty: "leicht",
    riddle: "Ein Mann hat Angst vor dem Fenster, wenn es hell ist – nicht wenn es dunkel ist.",
    solution: "Der Mann lebt in einem Leuchtturm. Tagsüber sieht er, wie hoch er ist, und bekommt Angst. Nachts sieht er es nicht.",
  },
  {
    id: 11,
    difficulty: "leicht",
    riddle: "Zwei Frauen essen im Restaurant. Eine stirbt.",
    solution: "Beide Frauen aßen dasselbe vergiftete Gericht. Eine starb sofort, die andere überlebte – weil sie auf Diät war und nicht alles aufgegessen hatte.",
  },
  {
    id: 12,
    difficulty: "leicht",
    riddle: "Ein Mann drückt in einem Aufzug auf den 13. Stock und weint.",
    solution: "Er war im 13. Stock wegen eines Arztbesuches und hat erfahren, dass seine Krankheit unheilbar ist.",
  },
  {
    id: 13,
    difficulty: "leicht",
    riddle: "Ein Auto steht vor einem Haus. Der Fahrer ist tot – ohne Verletzungen.",
    solution: "Der Fahrer starb an einem Herzinfarkt während er fuhr. Das Auto rollte langsam aus und blieb vor dem Haus stehen.",
  },
  {
    id: 14,
    difficulty: "leicht",
    riddle: "Ein Mann läuft jeden Tag barfuß durch die Stadt – obwohl er Schuhe hat.",
    solution: "Der Mann ist blind. Er erkennt die Straßen an den Bodenstrukturen unter seinen Füßen und kann sich so besser orientieren als mit Schuhen.",
  },
  {
    id: 15,
    difficulty: "leicht",
    riddle: "Ein Mann stirbt jeden Tag – und lebt trotzdem.",
    solution: "Der Mann ist Schauspieler. Er spielt täglich in einem Theaterstück die Rolle einer sterbenden Person.",
  },
  {
    id: 16,
    difficulty: "leicht",
    riddle: "Ein Junge ruft nach seiner Mutter – und stirbt.",
    solution: "Der Junge ist beim Bergsteigen verunglückt und hängt an einem Seil. Er ruft nach seiner Mutter, die auf dem Gipfel ist. Durch das Rufen verliert er den Griff.",
  },
  {
    id: 17,
    difficulty: "leicht",
    riddle: "Eine Frau betritt ein Haus, in dem es keine Türen gibt.",
    solution: "Das Haus ist noch im Bau. Die Türen wurden noch nicht eingebaut.",
  },
  {
    id: 18,
    difficulty: "leicht",
    riddle: "Ein Mann kauft ein Haus und stirbt eine Woche später.",
    solution: "Der Mann kaufte ein Haus, das direkt neben einem Flughafen lag. Der Lärm und die Abgase sorgten innerhalb einer Woche für seinen Tod – er war bereits todkrank und sehr empfindlich.",
  },
  {
    id: 19,
    difficulty: "leicht",
    riddle: "Eine Frau lacht, als sie ihren toten Mann sieht.",
    solution: "Die Frau ist Witwe und hat geerbt. Sie lacht, weil der Mann sie jahrelang gequält hat und sie jetzt endlich frei ist.",
  },
  {
    id: 20,
    difficulty: "leicht",
    riddle: "Ein Mann geht in ein Zimmer und findet 53 Fahrräder.",
    solution: "Das sind keine echten Fahrräder – es sind Spielkarten. Ein Kartenspiel mit 52 Karten plus eine Joker-Karte. Die Karten lagen aufgefächert auf dem Tisch und erinnerten von weitem an Speichen.",
  },

  // ── MITTEL ────────────────────────────────────────────────────────────────
  {
    id: 21,
    difficulty: "mittel",
    riddle: "Ein Mann stirbt, weil er einen Brief bekommt.",
    solution: "Der Mann ist ein Trickbetrüger, der vielen Menschen Geld gestohlen hat. Einer seiner Opfer schickte ihm einen Brief – aber nicht mit Inhalt, sondern nur mit einer Nadel, die er beim Öffnen in den Finger stach. Die Nadel war vergiftet.",
  },
  {
    id: 22,
    difficulty: "mittel",
    riddle: "Ein Zug fährt von Berlin nach München. Alle Passagiere sterben, aber kein einziger wird vermisst.",
    solution: "Der Zug war ein Geisterzug – ein Museumsfahrzeug ohne echte Passagiere. Die Schaufensterpuppen, die als Passagiere platziert waren, wurden beim Unfall zerstört.",
  },
  {
    id: 23,
    difficulty: "mittel",
    riddle: "Ein Chirurg operiert seinen Sohn. Trotzdem sagt er: 'Ich kann diesen Jungen nicht operieren – er ist mein Sohn.'",
    solution: "Der Chirurg ist die Mutter des Jungen. Sein Vater starb kurz vorher im selben Krankenhaus bei einem Unfall.",
  },
  {
    id: 24,
    difficulty: "mittel",
    riddle: "Ein Mann findet eine Flasche, trinkt daraus und stirbt.",
    solution: "Der Mann war ein Schiffbrüchiger auf einem Floß. Seine Mitreisenden hatten Meerwasser in eine Flasche gefüllt und gekennzeichnet. Der Mann in seiner Verzweiflung dachte es sei Trinkwasser und trank es. Das Salz tötete ihn.",
  },
  {
    id: 25,
    difficulty: "mittel",
    riddle: "Ein Mann hat Angst vor Montagen.",
    solution: "Der Mann arbeitet als Henker. Hinrichtungen finden immer montags statt.",
  },
  {
    id: 26,
    difficulty: "mittel",
    riddle: "Ein Mörder wird zum Tode verurteilt. Er darf zwischen drei Räumen wählen: Feuer, Haie, Löwen. Er wählt die Löwen und überlebt.",
    solution: "Die Löwen hatten seit Wochen nichts gefressen – und sind deshalb durch Verhungern bereits gestorben.",
  },
  {
    id: 27,
    difficulty: "mittel",
    riddle: "Eine Frau erschießt sich selbst vor einem Spiegel und überlebt.",
    solution: "Die Frau schoss auf ihr eigenes Spiegelbild in einem Schaufenster – in der Hoffnung, sich zu töten. Die Kugel zerbrach das Glas, traf aber die Frau nicht.",
  },
  {
    id: 28,
    difficulty: "mittel",
    riddle: "Ein Mann lebt allein auf einer Insel. Er findet Fußabdrücke – seine eigenen.",
    solution: "Der Mann ist seit Jahren auf der Insel. Er hat vergessen, dass er selbst vor Wochen an dieser Stelle entlanggegangen war. Die Erkenntnis, dass er nie gefunden wird, treibt ihn in den Wahnsinn.",
  },
  {
    id: 29,
    difficulty: "mittel",
    riddle: "Zwei Männer sitzen im selben Zimmer. Einer stirbt. Der andere merkt es nicht.",
    solution: "Einer der Männer ist taub und blind. Er merkt nicht, dass sein Zimmernachbar aufgehört hat zu atmen.",
  },
  {
    id: 30,
    difficulty: "mittel",
    riddle: "Ein Forscher stirbt in seinem Labor. Auf seinem Tisch liegt ein einziges Streichholz.",
    solution: "Der Forscher lebte allein in einer arktischen Forschungsstation. Er wollte sich ein Feuer machen, aber sein einziges Streichholz war feucht. Er erfrierte.",
  },
  {
    id: 31,
    difficulty: "mittel",
    riddle: "Ein Mann fährt an einer roten Ampel vorbei, ohne anzuhalten. Ein Polizist sieht es – und macht nichts.",
    solution: "Der Mann fährt Fahrrad. In seinem Land ist es Radfahrern erlaubt, bei Rot weiterzufahren, wenn keine Fußgänger die Straße überqueren.",
  },
  {
    id: 32,
    difficulty: "mittel",
    riddle: "Eine Frau geht schlafen und tötet drei Menschen.",
    solution: "Die Frau ist Leuchtturmwärterin. Sie schläft ein, ohne das Licht zu warten – drei Schiffe fahren auf die Felsen und sinken.",
  },
  {
    id: 33,
    difficulty: "mittel",
    riddle: "Ein Mann isst allein zu Mittag und stirbt nicht – obwohl er vergiftetes Essen bekommt.",
    solution: "Der Mann ist Inspektor in einer Giftküche. Er testet systematisch kleine Mengen Gift, um für eine Sondermission immun zu werden. Die Dosis war für ihn harmlos.",
  },
  {
    id: 34,
    difficulty: "mittel",
    riddle: "Ein Bauer findet jeden Morgen ein totes Huhn – ohne eine Spur von einem Tier.",
    solution: "Der Nachbarsbauer vergiftet langsam das Trinkwasser. Er will das Land kaufen und treibt den Bauer zur Verzweiflung.",
  },
  {
    id: 35,
    difficulty: "mittel",
    riddle: "Ein Mann öffnet ein Fenster und stirbt.",
    solution: "Der Mann ist Pilot. Er öffnete das Cockpitfenster in großer Höhe und wurde durch den Druckunterschied nach draußen gesogen.",
  },
  {
    id: 36,
    difficulty: "mittel",
    riddle: "Eine Frau findet ihren Mann tot – lächelnd.",
    solution: "Der Mann war unheilbar krank und hatte sich entschieden, freiwillig zu sterben. Er hinterließ seiner Frau einen Brief, in dem er ihr dankte und erklärte, dass er endlich Frieden hat.",
  },
  {
    id: 37,
    difficulty: "mittel",
    riddle: "Ein Kind sieht seinen Vater jeden Tag – und erkennt ihn nie.",
    solution: "Der Vater ist eineiiger Zwilling. Der Sohn sieht immer abwechselnd den Vater und den Onkel, kann sie aber nicht unterscheiden.",
  },
  {
    id: 38,
    difficulty: "mittel",
    riddle: "Drei Männer gehen durch den Regen. Zwei werden nass, einer nicht. Alle tragen keinen Schirm.",
    solution: "Der dritte Mann geht zwischen den anderen beiden. Er ist so klein, dass er zwischen ihnen trocken bleibt.",
  },
  {
    id: 39,
    difficulty: "mittel",
    riddle: "Ein Zeuge sah den Mörder genau – konnte ihn aber nicht beschreiben.",
    solution: "Der Zeuge ist blind. Er hat den Mörder nicht gesehen, aber gehört und gerochen – konnte jedoch keine visuelle Beschreibung liefern.",
  },
  {
    id: 40,
    difficulty: "mittel",
    riddle: "Ein Mann heiratet 20 Frauen in einem Jahr – und wird nicht verhaftet.",
    solution: "Der Mann ist Priester und hält die Trauungen durch. Er hat selbst keine der Frauen geheiratet.",
  },
  {
    id: 41,
    difficulty: "mittel",
    riddle: "Ein Mann stirbt, weil er zu schnell läuft.",
    solution: "Der Mann läuft einen Marathon. In der letzten Runde bricht er zusammen und stirbt an Herzversagen – weil er sein Herz überlastet hat.",
  },
  {
    id: 42,
    difficulty: "mittel",
    riddle: "Eine Frau schreibt einen Brief an jemanden, den sie noch nie getroffen hat – und dieser Person rettet das Leben.",
    solution: "Die Frau schreibt einen Drohbrief an einen Fremden. Der Empfänger zeigt den Brief der Polizei. Diese ermittelt in der Umgebung der Absenderin und findet dabei ihre Tochter, die entführt worden war.",
  },
  {
    id: 43,
    difficulty: "mittel",
    riddle: "Ein Mann betritt ein Zimmer voller Leichen und setzt sich hin.",
    solution: "Der Mann ist Bestatter. Er setzt sich in seinem Arbeitsraum hin, um Pause zu machen.",
  },
  {
    id: 44,
    difficulty: "mittel",
    riddle: "Ein Koch bereitet jeden Tag das gleiche Essen zu – und niemand beschwert sich.",
    solution: "Der Koch arbeitet in einem Altenheim für Menschen mit Demenz. Diese erinnern sich nicht, dass sie dasselbe gestern schon gegessen haben.",
  },
  {
    id: 45,
    difficulty: "mittel",
    riddle: "Ein Mann lebt 20 Jahre ohne Licht.",
    solution: "Der Mann lebte in einem Gefängnis in Einzelhaft, das kein Fenster hatte. Nach seiner Entlassung konnte er sich an Tageslicht nicht mehr gewöhnen.",
  },
  {
    id: 46,
    difficulty: "mittel",
    riddle: "Zwei Brüder rennen um ihr Leben – der Langsamere überlebt.",
    solution: "Die Brüder werden von einem Bären verfolgt. Der schnellere Bruder läuft weg und lockt den Bären weiter. Der langsamere Bruder klettert auf einen Baum und überlebt.",
  },
  {
    id: 47,
    difficulty: "mittel",
    riddle: "Ein Mann schläft in einer Kirche und überlebt einen Bombenangriff.",
    solution: "Der Mann war betrunken und schlief in der Kirche. Als die Bombe fiel, war die dicke Steinmauer der Kirche stark genug, um ihn zu schützen. Alle anderen, die in Holzhäusern schlafen, sterben.",
  },
  {
    id: 48,
    difficulty: "mittel",
    riddle: "Eine Frau bekommt eine Blume – und stirbt vor Freude.",
    solution: "Die Frau ist allergisch auf Pollen und weiß es nicht. Sie hält die Blume nahe ans Gesicht und bekommt einen tödlichen Schock.",
  },
  {
    id: 49,
    difficulty: "mittel",
    riddle: "Ein Dieb stiehlt eine Million Euro – und gibt alles zurück.",
    solution: "Der Dieb ist Undercover-Polizist. Er stahl das Geld als Teil einer kontrollierten Operation, um eine Verbrecherorganisation zu überführen. Danach wurde alles zurückgegeben.",
  },
  {
    id: 50,
    difficulty: "mittel",
    riddle: "Ein Mann rennt um sein Leben – und bringt sich dabei um.",
    solution: "Der Mann wird von jemandem verfolgt und rennt auf ein Hausdach. Er läuft so schnell, dass er nicht mehr bremsen kann und herunterfällt.",
  },

  // ── DUNKEL ────────────────────────────────────────────────────────────────
  {
    id: 51,
    difficulty: "dunkel",
    riddle: "Ein Mann liegt in einer Gasse. Er hat keine Verletzungen. Neben ihm liegt eine halbe Streichholzschachtel.",
    solution: "Der Mann war obdachlos. Er wollte sich in der Kälte mit einem Feuer wärmen. Das letzte Streichholz entzündete sich zu früh und brannte seine Finger. In der Erschütterung verlor er das Bewusstsein. Er starb an Unterkühlung, noch bevor jemand ihn fand.",
  },
  {
    id: 52,
    difficulty: "dunkel",
    riddle: "Eine Frau springt von einem Wolkenkratzer – und landet sicher.",
    solution: "Die Frau putzt Fenster auf hohen Gebäuden. Sie springt mit dem Sicherheitsseil auf das nächste Gerüst, um schneller zur nächsten Etage zu gelangen.",
  },
  {
    id: 53,
    difficulty: "dunkel",
    riddle: "Ein Vater tötet seinen Sohn – und wird dafür gelobt.",
    solution: "Der Sohn war ein gefährlicher Terrorist, der kurz davor war, eine Bombe zu zünden. Der Vater war Polizist und war derjenige, der den tödlichen Schuss abfeuerte. Die Gesellschaft dankte ihm.",
  },
  {
    id: 54,
    difficulty: "dunkel",
    riddle: "Ein Soldat überlebt den Krieg – und erschießt sich danach.",
    solution: "Der Soldat wurde jahrelang als Kriegsgefangener gefoltert. Als er nach Hause kam, war niemand mehr da – seine Familie war gestorben. Er konnte mit dem Trauma nicht leben.",
  },
  {
    id: 55,
    difficulty: "dunkel",
    riddle: "Ein Mann isst täglich Fleisch – und ist trotzdem Veganer.",
    solution: "Der Mann ist Tierarzt in einem Schlachtbetrieb. Er muss Fleischproben auf Qualität testen – indem er sie verkostet. Privat lebt er vegan.",
  },
  {
    id: 56,
    difficulty: "dunkel",
    riddle: "Ein Mörder wird freigelassen und tötet erneut – dafür wird er nicht bestraft.",
    solution: "Der Mörder ist Henker im Staatsdienst. Er wurde nach einer Reform freigelassen und dann erneut eingestellt. Das Töten ist Teil seines Berufs.",
  },
  {
    id: 57,
    difficulty: "dunkel",
    riddle: "Zwei Menschen sterben. Einer weinte, der andere nicht. Der Weinende überlebte.",
    solution: "Beide lagen in einem brennenden Haus. Der Weinende hatte nasse Augen und hielt sich instinktiv die feuchten Hände vors Gesicht – das schützte seine Lunge ausreichend, um zu entkommen. Der andere sah nichts und lief in die falsche Richtung.",
  },
  {
    id: 58,
    difficulty: "dunkel",
    riddle: "Ein Mann opfert sich – und rettet damit 5 Leben.",
    solution: "Ein Feuerwehrmann läuft in ein brennendes Gebäude, obwohl er weiß, dass es gefährlich ist. Er rettet 5 eingeschlossene Personen, bevor er selbst zusammenbricht. Er überlebt knapp – und wird gefeiert.",
  },
  {
    id: 59,
    difficulty: "dunkel",
    riddle: "Ein Detektiv findet den Mörder – und lässt ihn laufen.",
    solution: "Der Mörder tötete einen bekannten Kinderschänder, um seine eigene Tochter zu schützen. Der Detektiv versteht die Tat und vernichtet die Beweise.",
  },
  {
    id: 60,
    difficulty: "dunkel",
    riddle: "Ein Mann lebt 30 Jahre ohne Spiegel.",
    solution: "Der Mann war entstellt durch eine Brandnarbe. Er weigerte sich, sich im Spiegel zu sehen, um nicht daran erinnert zu werden. Als er im Alter von 60 Jahren nach langer Therapie zum ersten Mal wieder in den Spiegel sah, erkannte er sich nicht mehr – und war überrascht, wie alt er geworden war.",
  },
  {
    id: 61,
    difficulty: "dunkel",
    riddle: "Alle im Raum lachen über einen Mann. Er ist der Einzige, der die Wahrheit kennt.",
    solution: "Der Mann hat gerade erfahren, dass seine Frau einen Seitensprung hatte. Er sagt nichts, lacht mit und geht nach Hause. Die Partygesellschaft kennt das Geheimnis nicht.",
  },
  {
    id: 62,
    difficulty: "dunkel",
    riddle: "Ein Kind wird geboren – und tötet damit jemanden.",
    solution: "Die Mutter stirbt bei der Geburt. Das Kind überlebt.",
  },
  {
    id: 63,
    difficulty: "dunkel",
    riddle: "Ein Mann begeht Mord – obwohl er schläft.",
    solution: "Der Mann leidet an Schlafwandeln. Im Schlaf griff er ein Messer und tötete seine Frau. Er erinnert sich morgens an nichts. Das Gericht spricht ihn frei.",
  },
  {
    id: 64,
    difficulty: "dunkel",
    riddle: "Ein Foto rettet ein Leben – und zerstört ein anderes.",
    solution: "Ein Pressefotograf fotografiert eine Selbstmordszene auf einer Brücke. Das Foto erscheint in der Zeitung und erreicht die Familie – sie eilt zur Brücke und kann die Person retten. Der Fotograf wird jedoch wegen Verletzung der Privatsphäre angeklagt und verliert seine Karriere.",
  },
  {
    id: 65,
    difficulty: "dunkel",
    riddle: "Ein Mann weint bei jeder Beerdigung – obwohl er die Toten nicht kennt.",
    solution: "Der Mann ist professioneller Trauerredner. Er hat ein Talent dafür, so zu sprechen, dass er und andere weinen. Es ist sein Beruf.",
  },
  {
    id: 66,
    difficulty: "dunkel",
    riddle: "Ein Mann wird erschossen – und seine Mörder werden Helden.",
    solution: "Der Mann war der letzte Diktator eines Landes, das unter seiner Herrschaft gelitten hatte. Seine Erschießung beendete den Krieg. Die Soldaten wurden national gefeiert.",
  },
  {
    id: 67,
    difficulty: "dunkel",
    riddle: "Eine Frau läuft nackt durch die Straßen – niemand schaut hin.",
    solution: "Die Frau befindet sich in einer Nudistenkolonie. Dort ist es normal und niemand schenkt ihr besondere Aufmerksamkeit.",
  },
  {
    id: 68,
    difficulty: "dunkel",
    riddle: "Ein Mann findet eine Leiche und freut sich.",
    solution: "Der Mann ist Archäologe. Er findet eine tausend Jahre alte Leiche, die für seine Forschung von unschätzbarem Wert ist.",
  },
  {
    id: 69,
    difficulty: "dunkel",
    riddle: "Ein Mann steckt Häuser in Brand – und wird nicht verhaftet.",
    solution: "Der Mann ist Feuerwehrmann in Ausbildung. Er verbrennt alte, abbruchreife Häuser, um Löscheinsätze unter realen Bedingungen zu üben.",
  },
  {
    id: 70,
    difficulty: "dunkel",
    riddle: "Eine Frau findet heraus, dass ihr Mann seit Jahren lügt – und sagt nichts.",
    solution: "Der Mann leidet an einer Gedächtniskrankheit. Er erfindet Erinnerungen, die er für wahr hält. Die Frau weiß, dass er nicht absichtlich lügt, und schützt ihn vor der Wahrheit.",
  },
  {
    id: 71,
    difficulty: "dunkel",
    riddle: "Ein Junge stirbt – und seine Eltern freuen sich.",
    solution: "Der Junge hatte nur noch wenige Tage zu leben und litt extrem. Als er friedlich einschlief, waren die Eltern erleichtert, dass sein Schmerz vorbei war.",
  },
  {
    id: 72,
    difficulty: "dunkel",
    riddle: "Ein Mann schreibt einen Brief – und wird dadurch berühmt.",
    solution: "Der Mann schreibt einen Abschiedsbrief und überlebt trotzdem. Der Brief wird gefunden, veröffentlicht und als Kunstwerk gefeiert. Er selbst bleibt anonym.",
  },
  {
    id: 73,
    difficulty: "dunkel",
    riddle: "Eine Frau klaut jeden Tag – und jeder weiß es.",
    solution: "Die Frau arbeitet in einem Geldzählraum einer Bank. Es ist ihre Aufgabe, Geld zu zählen und zu kontrollieren. Das 'Stehlen' ist Teil ihrer Jobsimulation – ein Test.",
  },
  {
    id: 74,
    difficulty: "dunkel",
    riddle: "Zwei Männer streiten sich. Einer stirbt. Keiner wird bestraft.",
    solution: "Die beiden Männer sind Boxer in einem Profikampf. Einer der Männer erleidet durch einen legalen Treffer einen Herzstillstand und stirbt. Da alles regelkonform war, gibt es keine Strafe.",
  },
  {
    id: 75,
    difficulty: "dunkel",
    riddle: "Ein Mann trinkt Gift und überlebt – weil er schläft.",
    solution: "Der Mann ist Schlangenbeschwörer. Er wurde von einer seiner Schlangen gebissen und das Gift war in seiner Dose Wasser geraten. Er schlief in seiner Hütte ein und sein Körper, durch jahrelange kleine Dosen immun geworden, überstand das Gift ohne Probleme.",
  },
  {
    id: 76,
    difficulty: "dunkel",
    riddle: "Ein Mann stiehlt Millionen – und wird als Held bezeichnet.",
    solution: "Der Mann hackte das Konto einer kriminellen Organisation, die Menschenhandel betrieb. Er überwies die Millionen an eine NGO für Missbrauchsopfer. Er wurde nie verhaftet.",
  },
  {
    id: 77,
    difficulty: "dunkel",
    riddle: "Ein Kind wächst auf – ohne je ein Gesicht zu sehen.",
    solution: "Das Kind ist blind. Es wächst in einer liebevollen Familie auf und lernt die Welt über Geräusche, Texturen und Gerüche kennen.",
  },
  {
    id: 78,
    difficulty: "dunkel",
    riddle: "Ein Arzt tötet seinen Patienten absichtlich – und wird nicht verurteilt.",
    solution: "Der Arzt führte Sterbehilfe durch. Der Patient hatte eine unheilbare Krankheit, litt stark und hatte schriftlich seine Einwilligung gegeben. In dem Land ist aktive Sterbehilfe legal.",
  },
  {
    id: 79,
    difficulty: "dunkel",
    riddle: "Ein Mann sieht zu, wie jemand ertrinkt – und tut nichts.",
    solution: "Der Mann ist Rettungsschwimmer – aber er ist außer Dienst und rettet einen anderen, weiter entfernten Schwimmer. Er musste eine Entscheidung treffen und konnte nicht beide retten.",
  },
  {
    id: 80,
    difficulty: "dunkel",
    riddle: "Ein Mann verpasst seinen Flug – und überlebt dadurch.",
    solution: "Das Flugzeug stürzte kurz nach dem Start ab. Alle Passagiere starben. Der Mann hatte den Flug wegen einer Autopanne verpasst.",
  },
  {
    id: 81,
    difficulty: "dunkel",
    riddle: "Eine Frau tötet ihren Bruder – und weint auf seiner Beerdigung.",
    solution: "Die Frau verkaufte unwissentlich verdorbene Lebensmittel. Ihr Bruder, der bei ihr kaufte, starb an einer Vergiftung. Sie wusste nicht, dass die Ware schlecht war.",
  },
  {
    id: 82,
    difficulty: "dunkel",
    riddle: "Ein Mann schläft ein – und wacht in einem anderen Land auf.",
    solution: "Der Mann arbeitete als Steuermann auf einem Frachter. Er schlief ein, während er Wache hatte. Das Schiff driftete und landete in fremden Gewässern.",
  },
  {
    id: 83,
    difficulty: "dunkel",
    riddle: "Ein Mann verdient sein Leben damit, dass er stirbt.",
    solution: "Der Mann ist Stuntman und spielt in Filmen die Todesszenen von Schauspielern. Er stirbt im Film – und bekommt dafür sein Gehalt.",
  },
  {
    id: 84,
    difficulty: "dunkel",
    riddle: "Eine Frau schläft mit einem Toten.",
    solution: "Die Frau ist Ärztin und überwacht in der Nachtschicht Patienten auf der Intensivstation. Einer ihrer Patienten stirbt unbemerkt. Sie schläft daneben auf dem Klappbett – und merkt es erst morgens.",
  },
  {
    id: 85,
    difficulty: "dunkel",
    riddle: "Ein Mann hört auf zu lügen – und verliert alles.",
    solution: "Der Mann war Berufsmagier, dessen gesamte Karriere auf Illusionen und inszenierten 'Zufällen' beruhte. Er veröffentlichte ein Buch, das alle seine Tricks enthüllte. Er verlor sein Publikum, seinen Vertrag und seinen Ruhm – gewann aber seinen Seelenfrieden.",
  },
  {
    id: 86,
    difficulty: "dunkel",
    riddle: "Eine Frau redet jeden Tag mit ihrem toten Mann.",
    solution: "Die Frau hat eine Demenzerkrankung. Sie erinnert sich nicht daran, dass ihr Mann gestorben ist. Sie glaubt, er sei noch da.",
  },
  {
    id: 87,
    difficulty: "dunkel",
    riddle: "Ein Mann lebt 10 Jahre im Dunkeln – freiwillig.",
    solution: "Der Mann ist ein buddhistischer Mönch, der ein Jahrzehnt in einem Meditationsraum ohne Licht verbrachte. Er kam bewusst und gestärkt wieder heraus.",
  },
  {
    id: 88,
    difficulty: "dunkel",
    riddle: "Ein Kind fragt seinen Vater, warum er weint. Der Vater sagt: 'Weil ich so glücklich bin.'",
    solution: "Der Vater weint, weil sein Kind nach Jahren im Koma aufgewacht ist. Das Kind weiß nicht, wie lang es geschlafen hat.",
  },
  {
    id: 89,
    difficulty: "dunkel",
    riddle: "Ein Geist erscheint in einem Haus – und die Bewohner freuen sich.",
    solution: "Die Bewohner sind Paranormale Forscher. Sie haben jahrelang auf ein Zeichen gewartet und sind glücklich, dass ihre These bestätigt wird.",
  },
  {
    id: 90,
    difficulty: "dunkel",
    riddle: "Ein Mann küsst seinen Mörder.",
    solution: "Der Mann ist Schauspieler. In der letzten Szene des Theaterstücks küsst er die Person, die im Stück seinen Tod herbeiführt.",
  },
  {
    id: 91,
    difficulty: "dunkel",
    riddle: "Ein Wissenschaftler findet das Mittel gegen den Tod – und stirbt.",
    solution: "Der Wissenschaftler entwickelt ein Antidot gegen ein tödliches Gift, aber es muss noch getestet werden. Er testet es an sich selbst. Es wirkt – aber seine Leber versagt durch die hohe Dosis.",
  },
  {
    id: 92,
    difficulty: "dunkel",
    riddle: "Zwei Männer kämpfen um dasselbe Messer – der Stärkere verliert.",
    solution: "Der stärkere Mann greift nach dem Messer am falschen Ende – er hält die Klinge. Der schwächere Mann hat den Griff. Der Starke verliert durch die Schnittwunde.",
  },
  {
    id: 93,
    difficulty: "dunkel",
    riddle: "Eine Frau wacht auf und sieht, dass ihre Hände blutig sind. Sie erinnert sich an nichts.",
    solution: "Die Frau ist Chirurgin. Sie führte in der Nacht eine Notoperation durch und war so erschöpft, dass sie keine Erinnerung an die letzten Stunden hat. Die Operation war erfolgreich.",
  },
  {
    id: 94,
    difficulty: "dunkel",
    riddle: "Ein Mann verschwindet mitten in der Stadt – und niemand vermisst ihn.",
    solution: "Der Mann war Zeuge im Schutzprogramm und hatte keine echte Identität mehr. Er verschwand in ein neues Leben mit neuem Namen.",
  },
  {
    id: 95,
    difficulty: "dunkel",
    riddle: "Ein Mann beerdigt sich selbst.",
    solution: "Der Mann ist Bestatter. Er hat sich im Testament gewünscht, selbst die Planung seiner Beerdigung zu übernehmen – einschließlich des Einlegens in den Sarg. Er tat es kurz vor seinem Tod.",
  },
  {
    id: 96,
    difficulty: "dunkel",
    riddle: "Ein Kind rettet die Welt – ohne es zu wissen.",
    solution: "Ein Kind spielt zufällig mit einem alten Radio und sendet auf einer Frequenz. Ein Forscher in einem Bunker hört das Signal und weiß, dass draußen noch Leben ist – er stoppt kurz davor die Aktivierung einer Waffe.",
  },
  {
    id: 97,
    difficulty: "dunkel",
    riddle: "Ein Mann hört Stimmen – und ist damit erfolgreicher als je zuvor.",
    solution: "Der Mann entwickelt eine psychische Erkrankung und hört Stimmen. Sein Psychiater erkennt, dass die Stimmen komplexe Musterlösungen formulieren. Der Mann wird Teil eines Forschungsprojekts, das revolutionäre Erkenntnisse liefert.",
  },
  {
    id: 98,
    difficulty: "dunkel",
    riddle: "Eine Frau lacht, als sie stirbt.",
    solution: "Die Frau stirbt an Herzversagen – ausgelöst durch einen unkontrollierbaren Lacheranfall über einen Witz, den ihr Enkel erzählt hatte.",
  },
  {
    id: 99,
    difficulty: "dunkel",
    riddle: "Ein Mann stiehlt ein Kind – und wird dafür nicht verurteilt.",
    solution: "Der Mann ist der leibliche Vater. Das Kind wurde von einer Pflegefamilie betreut, während ein Sorgerechtsstreit lief. Als das Gericht dem Vater das Sorgerecht zusprach, holte er das Kind offiziell zurück.",
  },
  {
    id: 100,
    difficulty: "dunkel",
    riddle: "Ein Mörder verlebt einen ruhigen Abend in seiner Zelle – und ist trotzdem frei.",
    solution: "Der Mörder wurde begnadigt und entlassen. Er sitzt in seiner ehemaligen Zelle, weil er nirgendwo sonst hingehen kann – er hat kein Zuhause mehr. Die Gefängnisleitung erlaubt ihm, die Nacht zu bleiben.",
  },
];

export const DEFAULT_POINTS = {
  correctGuess: 3,   // Punkte für denjenigen, der die Lösung errät
  wrongAnswer: -1,   // Strafschlücke bei Nein-Antwort (auch als Schlücke-System)
  hostBonus: 1,      // Bonus für den Erzähler wenn niemand die Lösung errät
};
