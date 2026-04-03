export type PropertySeedEntry = {
  titel: string;
  slug: string;
  objektgruppe: "haeuser" | "neubau" | "wohnungen";
  ort: string;
  region: string;
  preisText: string;
  kurzbeschreibung: string;
  beschreibung: string;
  eckdaten: string;
  highlights: string;
  vermarktungsstatus: "verfuegbar" | "reserviert" | "verkauft";
  featured: boolean;
  coverImageUrl: string;
};

export const propertySeed: PropertySeedEntry[] = [
  {
    titel: "Luxurioese Villa am Strand von Marbella",
    slug: "luxurioese-villa-am-strand-von-marbella",
    objektgruppe: "haeuser",
    ort: "Marbella",
    region: "Costa del Sol",
    preisText: "2.850.000 EUR",
    kurzbeschreibung:
      "Andalusische Villa in Guadalmina Baja, weniger als 200 Meter vom Meer entfernt, mit Garten, Pool und grosszuegigem Wohngefuehl.",
    beschreibung:
      "Diese Villa in Marbella richtet sich an Kaeufer, die strandnah wohnen und dabei Ruhe, Grosszuegigkeit und klassischen andalusischen Stil suchen. Geboten werden rund 300 m2 Wohnflaeche auf zwei Ebenen, ein grosser Garten mit Pool und mehrere Terrassen in einer der gefragtesten Lagen der Costa del Sol.",
    eckdaten:
      "Wohnflaeche: ca. 300 m2\nSchlafzimmer: 6\nGaragenplaetze: 3\nMeer: < 200 m",
    highlights:
      "Typischer andalusischer Stil mit grossem Garten und Pool.\nGrosser Wohn- und Essbereich mit offener Kueche und Kamin.\nNur wenige Minuten zu Strand, Marbella und dem gewohnten Alltag an der Kueste.",
    vermarktungsstatus: "verfuegbar",
    featured: true,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D794x10000%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i30273a8e09885a5b/version/1633195545/image.jpg",
  },
  {
    titel: "Reihenhaus in Toplage in La Cala de Mijas",
    slug: "reihenhaus-in-toplage-in-la-cala-de-mijas",
    objektgruppe: "haeuser",
    ort: "La Cala de Mijas",
    region: "Costa del Sol",
    preisText: "650.000 EUR",
    kurzbeschreibung:
      "Grosszuegiges Reihenhaus mit Meerblick, privatem Pool und fusslaeufiger Naehe zu Strand, Schule und Zentrum von La Cala de Mijas.",
    beschreibung:
      "Das Haus bietet rund 347 m2 Wohnflaeche mit offenem Wohnbereich, Kamin, komplett ausgestatteter Kueche und mehreren Terrassen. Im Aussenbereich erwarten Sie Pool, Grillplatz und Meerblick, im Untergeschoss zusaetzlicher Platz fuer Gaeste, Kino oder Fitness sowie eine Garage fuer Autos und Motorraeder.",
    eckdaten:
      "Wohnflaeche: ca. 347 m2\nSchlafzimmer: 3\nBaeder: 2\nStrand und Zentrum: ca. 5 Min.",
    highlights:
      "Privater Pool, grosse Terrasse und Grillplatz mit Meerblick.\nEinbauschraenke, Alarmanlage sowie einbruchsichere Fenster und Tueren.\nGute Lage fuer Familien, weil Schule, Bushaltestelle und Strand schnell erreichbar sind.",
    vermarktungsstatus: "verfuegbar",
    featured: true,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/none/path/sa7cb54a604c6896d/image/i123dc840e3b92612/version/1550605412/image.jpg",
  },
  {
    titel: "Idilia Senses in Rincon de la Victoria",
    slug: "idilia-senses-rincon-de-la-victoria",
    objektgruppe: "neubau",
    ort: "Rincon de la Victoria",
    region: "Costa del Sol",
    preisText: "396.000 EUR bis 481.000 EUR",
    kurzbeschreibung:
      "Kleiner Neubaukomplex mit 2-Schlafzimmer-Wohnungen, grossen Terrassen und weitem Blick ueber das Mittelmeer.",
    beschreibung:
      "In Idilia Senses stehen nur noch wenige Einheiten zur Verfuegung. Das Projekt kombiniert moderne Wohnungen mit grosszuegigen Terrassen, ausgestatteten Kuechen, Poolbereich, Gruenflaechen und Spielplatz in einer Lage mit schneller Verbindung nach Malaga und zum Flughafen.",
    eckdaten:
      "Verfuegbare Einheiten: 5\nSchlafzimmer: 2\nFertigstellung: Q4 2024\nFlughafen Malaga: ca. 30 km",
    highlights:
      "Spektakulaerer Meerblick von jeder Wohnung.\nPool, Liegeflaechen und Spielplatz innerhalb der Anlage.\nIdeal fuer Kaeufer, die moderne Neubauqualitaet mit guter Anbindung suchen.",
    vermarktungsstatus: "verfuegbar",
    featured: true,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/none/path/sa7cb54a604c6896d/image/ief8240af339b3091/version/1679907623/image.jpg",
  },
  {
    titel: "Amphora Beach Residence in Manilva",
    slug: "amphora-beach-residence-manilva",
    objektgruppe: "neubau",
    ort: "Manilva",
    region: "Costa del Sol",
    preisText: "ab 199.999 EUR",
    kurzbeschreibung:
      "Neubauprojekt nur rund 150 Meter vom Mittelmeer entfernt, mit 2- und 3-Schlafzimmer-Apartments, Meerblick und grosszuegiger Anlage.",
    beschreibung:
      "Amphora Beach verbindet Strandnaehe mit einer durchdachten Wohnanlage inklusive Gruenflaechen, drei Pools, Fitnessstudio, Garage und Abstellraum. Fuer Kaeufer interessant, die eine klare Neubauoption im westlichen Teil der Costa del Sol mit Naehe zu Golf und Marbella suchen.",
    eckdaten:
      "Schlafzimmer: 2 bis 3\nWohnflaeche: ab 88 m2\nMeer: ca. 150 m\nMarbella: ca. 40 km",
    highlights:
      "Terrassen mit Meerblick und komplett eingerichtete Kuechen.\nDrei Pools, Fitnessstudio und 14.000 m2 grosses Areal.\nGolfplaetze und Strand bequem erreichbar.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/none/path/sa7cb54a604c6896d/image/i10e800654cb9559a/version/1679896992/image.jpg",
  },
  {
    titel: "Nexus Residences in Benalmadena",
    slug: "nexus-residences-benalmadena",
    objektgruppe: "neubau",
    ort: "Benalmadena",
    region: "Costa del Sol",
    preisText: "ab 251.000 EUR",
    kurzbeschreibung:
      "Exklusive Wohnanlage mit Meerblick, grossen Terrassen und 35 Wohneinheiten in sehr guter Lage zwischen Malaga und Marbella.",
    beschreibung:
      "Nexus Residences bietet lichtdurchflutete Apartments mit 3 oder 4 Schlafzimmern, grosszuegigen Terrassen, ausgestatteten Kuechen und einem gepflegten Aussenbereich. Durch die Lage erreichen Sie Flughafen, Malaga, Marbella sowie Strand und Hafen in kurzer Zeit.",
    eckdaten:
      "Schlafzimmer: 3 bis 4\nGaragenplaetze: 2\nStrand / Hafen: ca. 4 km\nFertigstellung: Q4 2025",
    highlights:
      "Von jeder Wohnung aus Meerblick.\nAbstellraum und zwei Garagenplaetze pro Einheit.\nSpannend fuer Kaeufer, die eine moderne Anlage in Benalmadena suchen.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i1f94e04220254d4e/version/1679854431/image.jpg",
  },
  {
    titel: "Blue View Heights in Manilva",
    slug: "blue-view-heights-manilva",
    objektgruppe: "neubau",
    ort: "Manilva",
    region: "Costa del Sol",
    preisText: "289.000 EUR bis 566.000 EUR",
    kurzbeschreibung:
      "Wohnprojekt mit Doppelhaushaelften, mediterranen Gaerten, Spa und Gemeinschaftsflaechen in ruhiger Lage mit Meerblick.",
    beschreibung:
      "Blue View Heights wurde fuer Kaeufer konzipiert, die modernes Wohnen, grosszuegige Aussenflaechen und Serviceangebote wie Spa, Fitness und Gemeinschaftsbereiche verbinden moechten. Die Haeuser sind nach Suedwesten ausgerichtet und bieten mehrere Grundrissvarianten mit Terrassen, Garten und optional privatem Pool.",
    eckdaten:
      "Wohnflaeche: 106 bis 146 m2\nSchlafzimmer: 2 bis 4\nGarage: eigener Platz\nFertigstellung: Ende 2024",
    highlights:
      "Mediterrane Gaerten, Promenadenbereiche und Ruhezonen.\nGrosser Pool, Gemeinschaftsraum, Spa und Fitnessstudio.\nMehrere Wohnmodelle fuer unterschiedliche Familien- und Lebenssituationen.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i7e19188e5519cb24/version/1679767115/image.jpg",
  },
  {
    titel: "Luxurioese Design Villa in Marbella",
    slug: "luxurioese-design-villa-in-marbella",
    objektgruppe: "neubau",
    ort: "Marbella",
    region: "Costa del Sol",
    preisText: "Preis auf Anfrage",
    kurzbeschreibung:
      "Zeitgenoessische Design-Villa in Guadalmina Baja, nur wenige Schritte von Strand, Golf und Hotel entfernt.",
    beschreibung:
      "Diese moderne Villa in Guadalmina Baja wurde als hochwertige Design-Immobilie mit klaren Linien, grossem Aussenbereich und starkem Wellness- und Freizeitkonzept geplant. Neben den vier Schlafzimmern im Obergeschoss bietet das Haus unter anderem Kino, Fitness, Spa, Innenpool sowie Garage und Servicetrakt in einer der bekanntesten Wohnlagen Marbellas.",
    eckdaten:
      "Schlafzimmer: 4 + Servicebereich\nStrand: ca. 50 m\nGolf: ca. 10 m\nGarage: 2 Autos",
    highlights:
      "Design-Villa in Guadalmina Baja mit sehr starker Lage.\nKino, Fitnessraum, Spa, Sauna, Dampfbad und Innenpool im Untergeschoss.\nNur wenige Minuten nach Puerto Banus und schnell im Zentrum von Estepona.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D630x10000%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i233aa2debf7076cd/version/1553630021/luxuri%C3%B6se-design-villa-marbella-andalusien.jpg",
  },
  {
    titel: "One Residences in La Cala de Mijas",
    slug: "one-residences-la-cala-de-mijas",
    objektgruppe: "neubau",
    ort: "La Cala de Mijas",
    region: "Costa del Sol",
    preisText: "550.000 EUR bis 1.250.000 EUR",
    kurzbeschreibung:
      "Luxusanlage mit hochwertiger Architektur, grossen Aussenbereichen und umfangreichen Services fuer anspruchsvolle Kaeufer.",
    beschreibung:
      "One Residences verbindet moderne Architektur mit einem sehr starken Freizeit- und Servicekonzept. Auf rund 17.000 m2 entstanden 80 Apartments mit Gaerten, Pools, Fitness, Sauna, roemischem Bad, privatem Kino, Golfsimulator und weiteren Annehmlichkeiten, die das Projekt deutlich von klassischen Neubauten unterscheiden.",
    eckdaten:
      "Areal: ca. 17.000 m2\nVerfuegbare Apartments: 10\nGaragenplaetze: 2\nZusatzraum: Abstellraum",
    highlights:
      "Luxusprojekt mit Golf, Kino, Spa und Gastrobar.\nNahtloser Innen-Aussenbereich mit hochwertiger Materialitaet.\nSehr gute Wahl fuer Kaeufer, die Lifestyle und Qualitaet kombinieren moechten.",
    vermarktungsstatus: "verfuegbar",
    featured: true,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D682x2048%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i0d1f10fe06991be9/version/1643563441/image.jpg",
  },
  {
    titel: "Penthousewohnung in Torremolinos",
    slug: "penthousewohnung-in-torremolinos",
    objektgruppe: "wohnungen",
    ort: "Torremolinos",
    region: "Costa del Sol",
    preisText: "405.000 EUR",
    kurzbeschreibung:
      "Renoviertes Duplex-Penthouse mit rund 160 m2 Wohn- und Nutzflaeche, grosser Terrasse und sehr guter Lage nahe Strand und Flughafen.",
    beschreibung:
      "Die Wohnung wurde modernisiert und bietet heute einen grosszuegigen Wohn- und Essbereich, moderne Kueche, drei Schlafzimmer, mehrere Baeder sowie viel Einbaumobiliar nach Mass. Besonders stark sind die Terrasse mit Blick, der Steinofengrill und die Lage mit kurzer Entfernung zu Strand, Park, Geschaeften und Malaga Airport.",
    eckdaten:
      "Wohn- und Nutzflaeche: ca. 160 m2\nSchlafzimmer: 3\nFlughafen Malaga: ca. 10 Min.\nParkplatz: privat",
    highlights:
      "Grosse Terrasse mit Blick und Steinofengrill.\nLuxurioese Anlage mit Garten und Pool.\nGute Option fuer Eigennutzung, Ferienwohnen oder den Start an der Kueste.",
    vermarktungsstatus: "verfuegbar",
    featured: true,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i0387a034f9e5ea2e/version/1717873382/image.jpg",
  },
  {
    titel: "Geraeumige Wohnung in Benalmadena, Montealto",
    slug: "geraeumige-wohnung-in-benalmadena-montealto",
    objektgruppe: "wohnungen",
    ort: "Benalmadena",
    region: "Costa del Sol",
    preisText: "385.000 EUR",
    kurzbeschreibung:
      "Grosse renovierte Wohnung mit 4 Schlafzimmern, mehreren Terrassenbereichen und Gemeinschaftspool in Montealto.",
    beschreibung:
      "Diese Wohnung eignet sich fuer Kaeufer, die viel Platz und flexible Nutzung suchen. Sie bietet rund 200 m2 Gesamtflaeche, vier Doppelschlafzimmer, eine separate Kueche, Wohn-Essbereich mit Terrassenzugang und zusaetzliche Flaechen, die den Alltag oder laengere Aufenthalte sehr angenehm machen.",
    eckdaten:
      "Gesamtflaeche: ca. 200 m2\nSchlafzimmer: 4\nBaeder: 2\nTerrasse: 40 m2",
    highlights:
      "Komplett renoviert mit Einbauschraenken und Klimaanlage.\nGemeinschaftspool, Parkplatz und Gegensprechanlage.\nSuedliche Ausrichtung mit grosszuegigen Aussenflaechen.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i7e7a82278fac1b2e/version/1711803574/image.jpg",
  },
  {
    titel: "1. Strandlage in Torremolinos",
    slug: "strandlage-in-torremolinos",
    objektgruppe: "wohnungen",
    ort: "Torremolinos",
    region: "Costa del Sol",
    preisText: "230.000 EUR",
    kurzbeschreibung:
      "Renovierte Wohnung in erster Strandlage mit Meerblick, Pool und guter Eignung fuer Ferienvermietung.",
    beschreibung:
      "Die Wohnung liegt in direkter Strandlage in Torremolinos und bietet eine interessante Mischung aus Eigennutzung und Vermietungspotenzial. Neben Meerblick, Aufzug und Gemeinschaftsbereichen ueberzeugt vor allem die Kombination aus Lage, Ausrichtung und ueberschaubarer Einstiegssumme.",
    eckdaten:
      "Schlafzimmer: 1 (urspruenglich 2)\nWohnflaeche: 62 m2\nStockwerk: 4. Etage\nAusrichtung: Sueden",
    highlights:
      "Terrasse mit Meerblick.\nGemeinschaftsgarage und Abstellraum.\nSpannend fuer Ferienvermietung und Kaeufer mit Fokus auf Lage.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/i77c5090954943cd9/version/1711805204/image.jpg",
  },
  {
    titel: "Gelegenheit in Riviera del Sol, Mijas",
    slug: "gelegenheit-in-riviera-del-sol-mijas",
    objektgruppe: "wohnungen",
    ort: "Mijas",
    region: "Costa del Sol",
    preisText: "189.000 EUR",
    kurzbeschreibung:
      "Gepflegte Wohnung in ruhiger Urbanisation mit Terrasse, Meerblick, Pool und Garage in Riviera del Sol.",
    beschreibung:
      "Die Wohnung ist eine kompakte Gelegenheit fuer Kaeufer, die einen bezahlbaren Einstieg an der Costa del Sol suchen. Sie verbindet zwei Schlafzimmer, zwei Baeder und Meerblick mit einer ruhigen Anlage, Gemeinschaftspool und Parkplatz in gutem Verhaeltnis von Preis zu Lage.",
    eckdaten:
      "Schlafzimmer: 2\nBaeder: 2\nUrbanisation: ruhig und gepflegt\nExtras: Garage und Pool",
    highlights:
      "Terrasse mit Meerblick.\nGute Gelegenheit fuer den Einstieg oder als Ferienwohnung.\nRuhige Wohnanlage mit gepflegtem Gemeinschaftsbereich.",
    vermarktungsstatus: "verfuegbar",
    featured: false,
    coverImageUrl:
      "https://image.jimcdn.com/app/cms/image/transf/dimension%3D1920x400%3Aformat%3Djpg/path/sa7cb54a604c6896d/image/icbbd2ad3fd0f327d/version/1711807824/image.jpg",
  },
];
