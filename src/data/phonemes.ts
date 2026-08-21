export type LevelId = "syll" | "word" | "sent";

export interface Drill {
  ipa: string;
  text: string;
  say?: string;
}

/** A syllable-level minimal pair: the target syllable (a) against a rival sound's syllable (b). */
export interface PairDrill {
  rival: string; // IPA of the contrasting sound ("∅" = silent)
  a: Drill;
  b: Drill;
}

export const CATEGORY_META = {
  monophthong: { name: "Monophthong", plural: "Monophthongs", text: "text-lagoon", bg: "bg-lagoon", border: "border-lagoon", hex: "#0e7c6b" },
  diphthong:   { name: "Diphthong",   plural: "Diphthongs",   text: "text-honey",  bg: "bg-honey",  border: "border-honey",  hex: "#a8720a" },
  plosive:     { name: "Plosive",     plural: "Plosives",     text: "text-ember",  bg: "bg-ember",  border: "border-ember",  hex: "#d24a2b" },
  fricative:   { name: "Fricative",   plural: "Fricatives",   text: "text-cobalt", bg: "bg-cobalt", border: "border-cobalt", hex: "#2460c0" },
  affricate:   { name: "Affricate",   plural: "Affricates",   text: "text-plum",   bg: "bg-plum",   border: "border-plum",   hex: "#8a44a6" },
  nasal:       { name: "Nasal",       plural: "Nasals",       text: "text-moss",   bg: "bg-moss",   border: "border-moss",   hex: "#5f8a26" },
  approximant: { name: "Approximant", plural: "Approximants", text: "text-rose",   bg: "bg-rose",   border: "border-rose",   hex: "#bf4479" },
} as const;

export type Category = keyof typeof CATEGORY_META;

export interface Phoneme {
  id: string;
  ipa: string;
  category: Category;
  label: string;
  keyword: string;
  hint: string;
  keywords: string[];
  voiced?: boolean;
  chartPos?: { x: number; y: number };
  /** syllable-level minimal pairs against the nearest rival sounds */
  pairs: PairDrill[];
  words: Drill[];
  sentences: Drill[];
}

export const LEVELS: { id: LevelId; name: string; blurb: string }[] = [
  { id: "syll", name: "Syllables", blurb: "Minimal pairs — hear your sound against its nearest rival, one syllable at a time." },
  { id: "word", name: "Words", blurb: "The sound inside real vocabulary — ten targets per phoneme." },
  { id: "sent", name: "Sentences", blurb: "Full-speed connected speech — three carrier sentences per phoneme." },
];

export const getDrills = (p: Phoneme, level: "word" | "sent"): Drill[] =>
  level === "word" ? p.words : p.sentences;

export const getPairs = (p: Phoneme): PairDrill[] => p.pairs;

export const drillsForLevel = (p: Phoneme, level: LevelId): number =>
  level === "syll" ? p.pairs.length : level === "word" ? p.words.length : p.sentences.length;

const d = (ipa: string, text: string, say?: string): Drill => ({ ipa, text, say });
const pair = (rival: string, aIpa: string, aText: string, aSay: string | undefined, bIpa: string, bText: string, bSay?: string): PairDrill => ({
  rival,
  a: d(aIpa, aText, aSay),
  b: d(bIpa, bText, bSay),
});

export const PHONEMES: Phoneme[] = [
  // ───────────────────────── MONOPHTHONGS (12) ─────────────────────────
  {
    id: "iː", ipa: "iː", category: "monophthong", chartPos: { x: 66, y: 30 },
    label: "close front unrounded vowel", keyword: "the FLEECE vowel",
    hint: "Spread your lips into a slight smile, push the tongue high and far forward, and hold the sound long — it is a tense vowel.",
    keywords: ["see", "tree", "machine"],
    pairs: [
      pair("ɪ", "/ʃiːp/", "sheep", undefined, "/ʃɪp/", "ship"),
      pair("ɪ", "/siːt/", "seat", undefined, "/sɪt/", "sit"),
      pair("ɪ", "/liːv/", "leave", undefined, "/lɪv/", "live"),
      pair("ʊ", "/fiːl/", "feel", undefined, "/fʊl/", "full"),
    ],
    words: [
      d("/fliːs/", "fleece"), d("/spiːtʃ/", "speech"), d("/rɪˈsiːv/", "receive"),
      d("/məˈʃiːn/", "machine"), d("/ˈpiːpl/", "people"), d("/fiːld/", "field"),
      d("/bɪˈliːv/", "believe"), d("/bɪˈtwiːn/", "between"), d("/ˈiːvn/", "even"), d("/pəˈliːs/", "police"),
    ],
    sentences: [
      d("/ʃi siːz θriː ɡriːn triːz baɪ ðə siː/", "She sees three green trees by the sea."),
      d("/pliːz kiːp ðə rɪˈsiːt ənd bɪˈliːv miː/", "Please keep the receipt and believe me."),
      d("/hi iːts tʃiːz ənd piːz ˈevri ˈiːvnɪŋ/", "He eats cheese and peas every evening."),
    ],
  },
  {
    id: "ɪ", ipa: "ɪ", category: "monophthong", chartPos: { x: 94, y: 56 },
    label: "near-close near-front unrounded vowel", keyword: "the KIT vowel",
    hint: "Short and relaxed — the tongue sits a touch lower and further back than /iː/. Never stretch it long.",
    keywords: ["ship", "women", "busy"],
    pairs: [
      pair("iː", "/ʃɪp/", "ship", undefined, "/ʃiːp/", "sheep"),
      pair("iː", "/sɪt/", "sit", undefined, "/siːt/", "seat"),
      pair("iː", "/ɪt/", "it", undefined, "/iːt/", "eat"),
      pair("iː", "/dɪd/", "did", undefined, "/diːd/", "deed"),
    ],
    words: [
      d("/ʃɪp/", "ship"), d("/ˈwɪmɪn/", "women"), d("/ˈbɪzi/", "busy"),
      d("/ɡɪlt/", "guilt"), d("/ˈmɪnɪt/", "minute"), d("/ˈsɪstəm/", "system"),
      d("/ˈmɪrə/", "mirror"), d("/brɪdʒ/", "bridge"), d("/ˈvɪlɪdʒ/", "village"), d("/ˈbɪldɪŋ/", "building"),
    ],
    sentences: [
      d("/sɪks slɪm ʃɪps slɪpt ˈɪntə ˈhɑːbə/", "Six slim ships slipped into harbour."),
      d("/ðɪs ˈlɪtl ˈvɪlɪdʒ ɪz kwaɪt bɪɡ/", "This little village is quite big."),
      d("/ɡɪv ɪm ə ˈmɪnɪt tə ˈfɪnɪʃ ðə ˈsɪstəm/", "Give him a minute to finish the system."),
    ],
  },
  {
    id: "e", ipa: "e", category: "monophthong", chartPos: { x: 78, y: 96 },
    label: "mid front unrounded vowel", keyword: "the DRESS vowel",
    hint: "Drop the jaw a little below /ɪ/ and keep it short and crisp — a plain 'eh', never gliding to 'ay'.",
    keywords: ["bed", "said", "many"],
    pairs: [
      pair("æ", "/bed/", "bed", undefined, "/bæd/", "bad"),
      pair("æ", "/pen/", "pen", undefined, "/pæn/", "pan"),
      pair("æ", "/met/", "met", undefined, "/mæt/", "mat"),
      pair("æ", "/sed/", "said", undefined, "/sæd/", "sad"),
    ],
    words: [
      d("/frend/", "friend"), d("/sed/", "said"), d("/əˈɡen/", "again"),
      d("/hed/", "head"), d("/ˈmeni/", "many"), d("/ˈeni/", "any"),
      d("/ˈhevi/", "heavy"), d("/ˈredi/", "ready"), d("/ˈweðə/", "weather"), d("/ˈlemən/", "lemon"),
    ],
    sentences: [
      d("/ɡet ˈredi ðen lets ɡəʊ tə bed/", "Get ready, then let's go to bed."),
      d("/ðə red hen pekt ət ðə bred/", "The red hen pecked at the bread."),
      d("/ʃi sed ðə ˈweðə ɡets ˈbetər ɪn sepˈtembə/", "She said the weather gets better in September."),
    ],
  },
  {
    id: "æ", ipa: "æ", category: "monophthong", chartPos: { x: 84, y: 172 },
    label: "near-open front unrounded vowel", keyword: "the TRAP vowel",
    hint: "Open wide — jaw down, tongue low and front. A bright, flat 'a', held short.",
    keywords: ["cat", "laugh", "camera"],
    pairs: [
      pair("e", "/bæd/", "bad", undefined, "/bed/", "bed"),
      pair("e", "/pæn/", "pan", undefined, "/pen/", "pen"),
      pair("ʌ", "/kæt/", "cat", undefined, "/kʌt/", "cut"),
      pair("ʌ", "/hæt/", "hat", undefined, "/hʌt/", "hut"),
    ],
    words: [
      d("/ˈæpl/", "apple"), d("/blæk/", "black"), d("/hænd/", "hand"),
      d("/ˈæŋɡri/", "angry"), d("/ˈkæmrə/", "camera"), d("/ˈtrævl/", "travel"),
      d("/ˈdʒækɪt/", "jacket"), d("/ˈmænə/", "manner"), d("/ˈsædl/", "saddle"), d("/ˈplænɪt/", "planet"),
    ],
    sentences: [
      d("/ə fæt kæt sæt ɒn ə blæk mæt/", "A fat cat sat on a black mat."),
      d("/sæm hæz hæm ənd dʒæm ɪn ðə pæn/", "Sam has ham and jam in the pan."),
      d("/dʒæk hæd ə bæd kəʊld lɑːst ˈdʒænjuəri/", "Jack had a bad cold last January."),
    ],
  },
  {
    id: "ʌ", ipa: "ʌ", category: "monophthong", chartPos: { x: 198, y: 152 },
    label: "open-mid central unrounded vowel", keyword: "the STRUT vowel",
    hint: "A short punch from the middle of the mouth — lips neutral, tongue mid-central, like a light 'uh'.",
    keywords: ["cup", "London", "mother"],
    pairs: [
      pair("ɑː", "/kʌt/", "cut", undefined, "/kɑːt/", "cart"),
      pair("ɒ", "/kʌp/", "cup", undefined, "/kɒp/", "cop"),
      pair("ɒ", "/hʌt/", "hut", undefined, "/hɒt/", "hot"),
      pair("ɒ", "/lʌk/", "luck", undefined, "/lɒk/", "lock"),
    ],
    words: [
      d("/kʌm/", "come"), d("/ˈmʌni/", "money"), d("/ˈlʌndən/", "London"),
      d("/ˈstʌmək/", "stomach"), d("/ˈmʌðə/", "mother"), d("/əˈbʌv/", "above"),
      d("/ˈkʌpl/", "couple"), d("/ˈhʌndrəd/", "hundred"), d("/ˈkʌlə/", "colour"), d("/ˈnʌθɪŋ/", "nothing"),
    ],
    sentences: [
      d("/ðə jʌŋ ˈrʌnə lʌvz ðə sʌn/", "The young runner loves the sun."),
      d("/ˈnʌθɪŋ əˈbʌv ʌs bʌt ˈsʌmə klaʊdz/", "Nothing above us but summer clouds."),
      d("/maɪ ˈbrʌðə wʌn ɪˈnʌf ˈmʌni ɒn ˈsʌndeɪ/", "My brother won enough money on Sunday."),
    ],
  },
  {
    id: "ɒ", ipa: "ɒ", category: "monophthong", chartPos: { x: 258, y: 176 },
    label: "open back rounded vowel", keyword: "the LOT vowel",
    hint: "Round the lips lightly and drop the jaw — a short, dark, open 'o' at the back of the mouth.",
    keywords: ["hot", "want", "sorry"],
    pairs: [
      pair("ɔː", "/pɒt/", "pot", undefined, "/pɔːt/", "port"),
      pair("ɔː", "/kɒt/", "cot", undefined, "/kɔːt/", "caught"),
      pair("ɔː", "/dɒn/", "don", undefined, "/dɔːn/", "dawn"),
      pair("ɔː", "/hɒk/", "hock", undefined, "/hɔːk/", "hawk"),
    ],
    words: [
      d("/klɒk/", "clock"), d("/wɒnt/", "want"), d("/bɪˈkɒz/", "because"),
      d("/wɒtʃ/", "watch"), d("/ˈkwɒləti/", "quality"), d("/ˈsɒri/", "sorry"),
      d("/ˈprɒbləm/", "problem"), d("/ˈɒfɪs/", "office"), d("/ˈmɒdl/", "model"), d("/ˈɒnɪst/", "honest"),
    ],
    sentences: [
      d("/stɒp ðə kɑː ðə pɒt ɪz hɒt/", "Stop the car — the pot is hot."),
      d("/ðə dɒɡ ɡɒt lɒst ɒn ðə ˈkɒmən/", "The dog got lost on the common."),
      d("/tɒm ɡɒt ə dʒɒb ɪn ən ˈɒfɪs ɪn ˈlʌndən/", "Tom got a job in an office in London."),
    ],
  },
  {
    id: "ʊ", ipa: "ʊ", category: "monophthong", chartPos: { x: 268, y: 52 },
    label: "near-close near-back rounded vowel", keyword: "the FOOT vowel",
    hint: "Short and loose — lips softly rounded, tongue high and back but relaxed. Never let it glide into /uː/.",
    keywords: ["book", "could", "sugar"],
    pairs: [
      pair("uː", "/fʊl/", "full", undefined, "/fuːl/", "fool"),
      pair("uː", "/pʊl/", "pull", undefined, "/puːl/", "pool"),
      pair("uː", "/lʊk/", "look", undefined, "/luːk/", "luke"),
      pair("uː", "/sʊt/", "soot", undefined, "/suːt/", "suit"),
    ],
    words: [
      d("/kʊd/", "could"), d("/wʊd/", "would"), d("/pʊʃ/", "push"),
      d("/ˈbʊtʃə/", "butcher"), d("/ˈʃʊɡə/", "sugar"), d("/ˈkʊʃn/", "cushion"),
      d("/bʊk/", "book"), d("/ɡʊd/", "good"), d("/ˈwʊmən/", "woman"), d("/wʊlf/", "wolf"),
    ],
    sentences: [
      d("/pʊt ðə ɡʊd bʊk ɒn ðə ʃelf/", "Put the good book on the shelf."),
      d("/ə ɡʊd kʊk kʊd pʊʃ ðə ˈkʊʃn/", "A good cook could push the cushion."),
      d("/ðə ˈbʊtʃəz ˈwʊmən sɔː ə wʊlf ɪn ðə wʊd/", "The butcher's woman saw a wolf in the wood."),
    ],
  },
  {
    id: "ə", ipa: "ə", category: "monophthong", chartPos: { x: 150, y: 100 },
    label: "mid central unrounded vowel", keyword: "the schwa",
    hint: "The laziest sound in English — mouth barely open, completely relaxed, and always unstressed.",
    keywords: ["about", "teacher", "banana"],
    pairs: [
      pair("ɜː", "/ə/", "a", "uh", "/ɜː/", "err", "ur"),
      pair("ɒ", "/əv/", "of", "uv", "/ɒv/", "off"),
      pair("uː", "/tə/", "to", "tuh", "/tuː/", "too"),
      pair("iː", "/ðə/", "the", "thuh", "/ðiː/", "thee"),
    ],
    words: [
      d("/əˈbaʊt/", "about"), d("/səˈpɔːt/", "support"), d("/ˈtiːtʃə/", "teacher"),
      d("/ˈdɒktə/", "doctor"), d("/bəˈnɑːnə/", "banana"), d("/ˈmeməri/", "memory"),
      d("/ˈsəʊfə/", "sofa"), d("/ˈkæmrə/", "camera"), d("/ˈpiːtsə/", "pizza"), d("/əˈɡen/", "again"),
    ],
    sentences: [
      d("/ə bəˈnɑːnə ənd ə təˈmɑːtəʊ pliːz/", "A banana and a tomato, please."),
      d("/ðə ˈdɒktə rɪˈmembəd ði ʌmˈbrelə/", "The doctor remembered the umbrella."),
      d("/ðə ˈsəʊfə əˈbaʊt ðə ˈkɔːnə sjuːts əˈmændə/", "The sofa about the corner suits Amanda."),
    ],
  },
  {
    id: "uː", ipa: "uː", category: "monophthong", chartPos: { x: 294, y: 30 },
    label: "close back rounded vowel", keyword: "the GOOSE vowel",
    hint: "Push the lips into a tight circle and raise the tongue high at the back — long and tense.",
    keywords: ["blue", "through", "soup"],
    pairs: [
      pair("ʊ", "/fuːl/", "fool", undefined, "/fʊl/", "full"),
      pair("ʊ", "/puːl/", "pool", undefined, "/pʊl/", "pull"),
      pair("ʊ", "/luːk/", "luke", undefined, "/lʊk/", "look"),
      pair("ʊ", "/suːt/", "suit", undefined, "/sʊt/", "soot"),
    ],
    words: [
      d("/duː/", "do"), d("/muːv/", "move"), d("/ɡruːp/", "group"),
      d("/θruː/", "through"), d("/suːp/", "soup"), d("/dʒuːn/", "June"),
      d("/bluː/", "blue"), d("/skuːl/", "school"), d("/tʃuːz/", "choose"), d("/njuː/", "new"),
    ],
    sentences: [
      d("/huː muːvd maɪ bluː ʃuːz/", "Who moved my blue shoes?"),
      d("/ðə muːn rəʊz ˈəʊvə ðə leɪk ɪn dʒuːn/", "The moon rose over the lake in June."),
      d("/tuː ɡruːps muːvd θruː ðə skuːl/", "Two groups moved through the school."),
    ],
  },
  {
    id: "ɔː", ipa: "ɔː", category: "monophthong", chartPos: { x: 292, y: 96 },
    label: "open-mid back rounded vowel", keyword: "the THOUGHT vowel",
    hint: "Round and open at the back — jaw fairly low, lips in a firm circle, held long.",
    keywords: ["four", "water", "daughter"],
    pairs: [
      pair("ɒ", "/pɔːt/", "port", undefined, "/pɒt/", "pot"),
      pair("ɒ", "/kɔːt/", "caught", undefined, "/kɒt/", "cot"),
      pair("əʊ", "/lɔː/", "law", undefined, "/ləʊ/", "low"),
      pair("ɒ", "/dɔːn/", "dawn", undefined, "/dɒn/", "don"),
    ],
    words: [
      d("/wɔːk/", "walk"), d("/ˈwɔːtə/", "water"), d("/θɔːt/", "thought"),
      d("/bɔːd/", "board"), d("/bɪˈfɔː/", "before"), d("/ˈdɔːtə/", "daughter"),
      d("/dɔː/", "door"), d("/ˈmɔːnɪŋ/", "morning"), d("/ˈɔːtəm/", "autumn"), d("/lɔː/", "law"),
    ],
    sentences: [
      d("/ɔːl smɔːl bɔɪz əˈdɔː ðə ˈdaɪnəsɔː/", "All small boys adore the dinosaur."),
      d("/fɔː mɔː dɔːz nəʊ mɔː ðæn bɪˈfɔː/", "Four more doors — no more than before."),
      d("/hə ˈdɔːtə tɔːks fər ˈaʊəz ˈevri ˈmɔːnɪŋ/", "Her daughter talks for hours every morning."),
    ],
  },
  {
    id: "ɜː", ipa: "ɜː", category: "monophthong", chartPos: { x: 178, y: 122 },
    label: "open-mid central unrounded vowel", keyword: "the NURSE vowel",
    hint: "Pull the lips back slightly, tongue flat in the centre — a long, neutral hum. Don't roll the r.",
    keywords: ["bird", "world", "journey"],
    pairs: [
      pair("ə", "/ɜː/", "err", "ur", "/ə/", "a", "uh"),
      pair("ʌ", "/bɜːd/", "bird", undefined, "/bʌd/", "bud"),
      pair("ʊ", "/wɜːd/", "word", undefined, "/wʊd/", "wood"),
      pair("ɑː", "/fɜːst/", "first", undefined, "/fɑːst/", "fast"),
    ],
    words: [
      d("/ɡɜːl/", "girl"), d("/wɜːld/", "world"), d("/wɜːd/", "word"),
      d("/hɜːd/", "heard"), d("/ˈɜːli/", "early"), d("/ˈdʒɜːni/", "journey"),
      d("/bɜːd/", "bird"), d("/fɜːst/", "first"), d("/wɜːk/", "work"), d("/ˈθɜːzdeɪ/", "Thursday"),
    ],
    sentences: [
      d("/hɜː fɜːst wɜːd wəz hɜːd baɪ ðə nɜːs/", "Her first word was heard by the nurse."),
      d("/ˈθɜːti bɜːdz tɜːnd təˈwɔːdz ði ɜːθ/", "Thirty birds turned towards the earth."),
      d("/hi wɜːks ˈɜːli ənd lɜːnz ˈdʒɜːmən fɜːst/", "He works early and learns German first."),
    ],
  },
  {
    id: "ɑː", ipa: "ɑː", category: "monophthong", chartPos: { x: 212, y: 208 },
    label: "open back unrounded vowel", keyword: "the BATH vowel",
    hint: "Open the jaw wide at the back — no lip rounding, a long dark 'ah' as in 'spa'.",
    keywords: ["car", "dance", "heart"],
    pairs: [
      pair("ʌ", "/kɑːt/", "cart", undefined, "/kʌt/", "cut"),
      pair("ʌ", "/bɑːn/", "barn", undefined, "/bʌn/", "bun"),
      pair("ʌ", "/pɑːk/", "park", undefined, "/pʌk/", "puck"),
      pair("ʌ", "/kɑːm/", "calm", undefined, "/kʌm/", "come"),
    ],
    words: [
      d("/hɑːt/", "heart"), d("/ˈrɑːðə/", "rather"), d("/mɑːtʃ/", "march"),
      d("/ɑːsk/", "ask"), d("/dɑːns/", "dance"), d("/pɑːst/", "past"),
      d("/kɑː/", "car"), d("/pɑːk/", "park"), d("/ˈɡɑːdn/", "garden"), d("/klɑːs/", "class"),
    ],
    sentences: [
      d("/maɪ ˈfɑːðə ˈdɑːnsɪz ɪn ðə ˈɡɑːdn/", "My father dances in the garden."),
      d("/hɑːf ðə klɑːs pɑːst ði ɪɡˈzæm/", "Half the class passed the exam."),
      d("/ði ˈɑːtɪst pɑːkt ðə kɑː fɑː frɒm ðə pɑːk/", "The artist parked the car far from the park."),
    ],
  },

  // ───────────────────────── DIPHTHONGS (8) ─────────────────────────
  {
    id: "eɪ", ipa: "eɪ", category: "diphthong",
    label: "closing diphthong e → ɪ", keyword: "the FACE vowel",
    hint: "Start on /e/ and glide up towards /ɪ/ — one smooth movement, never two separate vowels.",
    keywords: ["day", "great", "straight"],
    pairs: [
      pair("aɪ", "/seɪ/", "say", undefined, "/saɪ/", "sigh"),
      pair("aɪ", "/meɪt/", "mate", undefined, "/maɪt/", "mite"),
      pair("aɪ", "/leɪd/", "laid", undefined, "/laɪd/", "lied"),
      pair("aɪ", "/deɪ/", "day", undefined, "/daɪ/", "die"),
    ],
    words: [
      d("/meɪk/", "make"), d("/reɪn/", "rain"), d("/ɡreɪt/", "great"),
      d("/ðeɪ/", "they"), d("/tʃeɪndʒ/", "change"), d("/streɪt/", "straight"),
      d("/deɪ/", "day"), d("/neɪm/", "name"), d("/ˈsteɪʃn/", "station"), d("/ˈeɪprəl/", "April"),
    ],
    sentences: [
      d("/ðeɪ pleɪ ɔːl deɪ ɪn meɪ/", "They play all day in May."),
      d("/ðə treɪn keɪm leɪt əˈɡen təˈdeɪ/", "The train came late again today."),
      d("/ɡreɪt ˈtʃeɪndʒɪz keɪm tə ðə ˈsteɪʃn ɪn ˈeɪprəl/", "Great changes came to the station in April."),
    ],
  },
  {
    id: "aɪ", ipa: "aɪ", category: "diphthong",
    label: "closing diphthong a → ɪ", keyword: "the PRICE vowel",
    hint: "Fall from an open /a/ up to a light /ɪ/ — a big, confident glide.",
    keywords: ["eye", "island", "quiet"],
    pairs: [
      pair("eɪ", "/saɪ/", "sigh", undefined, "/seɪ/", "say"),
      pair("ɔɪ", "/baɪ/", "buy", undefined, "/bɔɪ/", "boy"),
      pair("iː", "/taɪm/", "time", undefined, "/tiːm/", "team"),
      pair("iː", "/raɪd/", "ride", undefined, "/riːd/", "read"),
    ],
    words: [
      d("/aɪ/", "eye"), d("/laɪk/", "like"), d("/waɪt/", "white"),
      d("/raɪs/", "rice"), d("/ˈkwaɪət/", "quiet"), d("/ˈaɪlənd/", "island"),
      d("/taɪm/", "time"), d("/faɪv/", "five"), d("/tʃaɪld/", "child"), d("/kaɪnd/", "kind"),
    ],
    sentences: [
      d("/aɪ laɪk braɪt waɪt raɪs/", "I like bright white rice."),
      d("/faɪv ˈdraɪvəz əˈraɪvd ət naɪn/", "Five drivers arrived at nine."),
      d("/ðə tʃaɪld faʊnd faɪv kɔɪnz ɒn ˈfraɪdeɪ/", "The child found five coins on Friday."),
    ],
  },
  {
    id: "ɔɪ", ipa: "ɔɪ", category: "diphthong",
    label: "closing diphthong ɔ → ɪ", keyword: "the CHOICE vowel",
    hint: "Start rounded and open at the back, then glide forward to /ɪ/ — keep it one syllable.",
    keywords: ["boy", "royal", "oyster"],
    pairs: [
      pair("aɪ", "/bɔɪ/", "boy", undefined, "/baɪ/", "buy"),
      pair("aɪ", "/tɔɪ/", "toy", undefined, "/taɪ/", "tie"),
      pair("eɪ", "/kɔɪn/", "coin", undefined, "/keɪn/", "cane"),
      pair("eɪ", "/tʃɔɪs/", "choice", undefined, "/tʃeɪs/", "chase"),
    ],
    words: [
      d("/ɪnˈdʒɔɪ/", "enjoy"), d("/nɔɪz/", "noise"), d("/pɔɪnt/", "point"),
      d("/ˈrɔɪəl/", "royal"), d("/ˈɔɪstə/", "oyster"), d("/ˈlɔɪəl/", "loyal"),
      d("/bɔɪ/", "boy"), d("/tɔɪ/", "toy"), d("/kɔɪn/", "coin"), d("/vɔɪs/", "voice"),
    ],
    sentences: [
      d("/ðə ˈlɪtl bɔɪ meɪd ə laʊd nɔɪz/", "The little boy made a loud noise."),
      d("/ɪnˈdʒɔɪ ði ˈɔɪstə ɪts ə ˈrɔɪəl triːt/", "Enjoy the oyster — it's a royal treat."),
      d("/hə vɔɪs ˈkærid əˈkrɒs ðə ˈrɔɪəl hɔːl/", "Her voice carried across the royal hall."),
    ],
  },
  {
    id: "əʊ", ipa: "əʊ", category: "diphthong",
    label: "closing diphthong ə → ʊ", keyword: "the GOAT vowel",
    hint: "Begin on a central schwa, then round and close towards /ʊ/ — the classic British 'oh'.",
    keywords: ["go", "phone", "alone"],
    pairs: [
      pair("ɔː", "/bəʊt/", "boat", undefined, "/bɔːt/", "bought"),
      pair("ɔː", "/kəʊt/", "coat", undefined, "/kɔːt/", "caught"),
      pair("ɒ", "/ɡəʊt/", "goat", undefined, "/ɡɒt/", "got"),
      pair("ɔː", "/səʊ/", "so", undefined, "/sɔː/", "saw"),
    ],
    words: [
      d("/kəʊt/", "coat"), d("/bəʊθ/", "both"), d("/ˈəʊpən/", "open"),
      d("/fəʊn/", "phone"), d("/əˈləʊn/", "alone"), d("/səʊl/", "soul"),
      d("/ɡəʊ/", "go"), d("/həʊm/", "home"), d("/rəʊd/", "road"), d("/nəʊ/", "know"),
    ],
    sentences: [
      d("/dəʊnt ɡəʊ həʊm səʊ suːn/", "Don't go home so soon."),
      d("/nəʊ wʌn nəʊz ði əʊld rəʊd/", "No one knows the old road."),
      d("/ðə bəʊt fləʊts ˈsləʊli bɪˈləʊ ðə snəʊ/", "The boat floats slowly below the snow."),
    ],
  },
  {
    id: "aʊ", ipa: "aʊ", category: "diphthong",
    label: "closing diphthong a → ʊ", keyword: "the MOUTH vowel",
    hint: "Open wide on /a/, then round up to /ʊ/ — a big 'ow' glide.",
    keywords: ["how", "south", "allow"],
    pairs: [
      pair("əʊ", "/naʊ/", "now", undefined, "/nəʊ/", "no"),
      pair("əʊ", "/laʊd/", "loud", undefined, "/ləʊd/", "load"),
      pair("əʊ", "/aʊt/", "out", undefined, "/əʊt/", "oat"),
      pair("ʌ", "/daʊn/", "down", undefined, "/dʌn/", "done"),
    ],
    words: [
      d("/aʊə/", "our"), d("/saʊθ/", "south"), d("/əˈbaʊt/", "about"),
      d("/faʊnd/", "found"), d("/əˈlaʊ/", "allow"), d("/laʊd/", "loud"),
      d("/haʊ/", "how"), d("/haʊs/", "house"), d("/taʊn/", "town"), d("/maʊθ/", "mouth"),
    ],
    sentences: [
      d("/haʊ naʊ braʊn kaʊ/", "How now, brown cow?"),
      d("/aʊə haʊs stændz saʊθ əv taʊn/", "Our house stands south of town."),
      d("/ðə maʊs ræn aʊt əv ðə haʊs/", "The mouse ran out of the house."),
    ],
  },
  {
    id: "ɪə", ipa: "ɪə", category: "diphthong",
    label: "centring diphthong ɪ → ə", keyword: "the NEAR vowel",
    hint: "Start on a clear /ɪ/, then relax into schwa — no 'r' sound, just the glide.",
    keywords: ["here", "idea", "serious"],
    pairs: [
      pair("eə", "/hɪə/", "here", undefined, "/heə/", "hair"),
      pair("eə", "/bɪə/", "beer", undefined, "/beə/", "bear"),
      pair("eə", "/pɪə/", "peer", undefined, "/peə/", "pair"),
      pair("eə", "/fɪə/", "fear", undefined, "/feə/", "fair"),
    ],
    words: [
      d("/aɪˈdɪə/", "idea"), d("/rɪəl/", "real"), d("/ˈhɪərəʊ/", "hero"),
      d("/ˈsɪəriəs/", "serious"), d("/ˈmɪrə/", "mirror"), d("/hɪə/", "hear"),
      d("/hɪə/", "here"), d("/ɪə/", "ear"), d("/nɪə/", "near"), d("/klɪə/", "clear"),
    ],
    sentences: [
      d("/kʌm nɪə ənd hɪə ðɪs aɪˈdɪə/", "Come near and hear this idea."),
      d("/ðə ˈhɪərəʊ ɪz ˈrɪəli ˈsɪəriəs/", "The hero is really serious."),
      d("/kæn juː hɪə miː ˈklɪəli frɒm hɪə/", "Can you hear me clearly from here?"),
    ],
  },
  {
    id: "eə", ipa: "eə", category: "diphthong",
    label: "centring diphthong e → ə", keyword: "the SQUARE vowel",
    hint: "Open on /e/, glide to a relaxed schwa — as in 'air', with no hard r.",
    keywords: ["there", "parents", "aware"],
    pairs: [
      pair("ɪə", "/heə/", "hair", undefined, "/hɪə/", "here"),
      pair("ɪə", "/beə/", "bear", undefined, "/bɪə/", "beer"),
      pair("ɪə", "/peə/", "pair", undefined, "/pɪə/", "peer"),
      pair("ɜː", "/keə/", "care", undefined, "/kɜː/", "cur"),
    ],
    words: [
      d("/ðeə/", "their"), d("/ʃeə/", "share"), d("/ˈpeərənts/", "parents"),
      d("/prɪˈpeə/", "prepare"), d("/əˈweə/", "aware"), d("/skweə/", "square"),
      d("/ðeə/", "there"), d("/weə/", "where"), d("/tʃeə/", "chair"), d("/keə/", "care"),
    ],
    sentences: [
      d("/weəz ðə tʃeə ˈəʊvə ðeə/", "Where's the chair over there?"),
      d("/teɪk keə ɒn ðə skweə stəʊn steəz/", "Take care on the square stone stairs."),
      d("/ðeɪ ʃeə ə peə ɒn ðə rɪˈpeə dʒɒb/", "They share a pear on the repair job."),
    ],
  },
  {
    id: "ʊə", ipa: "ʊə", category: "diphthong",
    label: "centring diphthong ʊ → ə", keyword: "the CURE vowel",
    hint: "From a rounded /ʊ/, relax down to schwa — a rarer glide, heard in 'tour' and 'sure'.",
    keywords: ["tour", "Europe", "brochure"],
    pairs: [
      pair("ɔː", "/tʊə/", "tour", undefined, "/tɔː/", "tore"),
      pair("ɔː", "/pʊə/", "poor", undefined, "/pɔː/", "pour"),
      pair("ɔː", "/kjʊə/", "cure", undefined, "/kɔː/", "core"),
      pair("ɔː", "/pjʊə/", "pure", undefined, "/pɔː/", "paw"),
    ],
    words: [
      d("/ˈjʊərəp/", "Europe"), d("/ˈtʊərɪst/", "tourist"), d("/ˈdʒʊəri/", "jury"),
      d("/ˈfjʊəriəs/", "furious"), d("/ˈbrəʊʃʊə/", "brochure"), d("/ɪnˈdjʊə/", "endure"),
      d("/tʊə/", "tour"), d("/pjʊə/", "pure"), d("/ʃʊə/", "sure"), d("/kjʊə/", "cure"),
    ],
    sentences: [
      d("/ɑː juː ʃʊə ðə tʊə wəz pjʊə fʌn/", "Are you sure the tour was pure fun?"),
      d("/ðə pʊə ˈtʊərɪst lɒst ðə ˈbrəʊʃʊə/", "The poor tourist lost the brochure."),
      d("/ðə ˈfjʊəriəs ˈdʒʊəri ɪnˈdjʊəd ðə lɒŋ tʊə/", "The furious jury endured the long tour."),
    ],
  },

  // ───────────────────────── PLOSIVES ─────────────────────────
  {
    id: "p", ipa: "p", category: "plosive", voiced: false,
    label: "voiceless bilabial plosive", keyword: "as in 'paper'",
    hint: "Close both lips, build air pressure, release with a small puff — hold a hand in front of your mouth to feel it.",
    keywords: ["paper", "happy", "perhaps"],
    pairs: [
      pair("b", "/pæk/", "pack", undefined, "/bæk/", "back"),
      pair("b", "/pɪɡ/", "pig", undefined, "/bɪɡ/", "big"),
      pair("b", "/kæp/", "cap", undefined, "/kæb/", "cab"),
      pair("b", "/peə/", "pear", undefined, "/beə/", "bear"),
    ],
    words: [
      d("/ˈpeɪpə/", "paper"), d("/ˈæpl/", "apple"), d("/ˈhæpi/", "happy"),
      d("/pəˈhæps/", "perhaps"), d("/stɒp/", "stop"), d("/ˈpiːpl/", "people"),
      d("/pen/", "pen"), d("/kʌp/", "cup"), d("/tɒp/", "top"), d("/mæp/", "map"),
    ],
    sentences: [
      d("/ˈpiːtə pɪkt ə pek əv ˈpepəz/", "Peter picked a peck of peppers."),
      d("/pɒp ðə tɒp ɒf ðə ˈplɑːstɪk pɒt/", "Pop the top off the plastic pot."),
      d("/ʃi pʊt ðə ˈpeɪpər ɪn ðə pɪŋk kʌp/", "She put the paper in the pink cup."),
    ],
  },
  {
    id: "b", ipa: "b", category: "plosive", voiced: true,
    label: "voiced bilabial plosive", keyword: "as in 'bubble'",
    hint: "Same lip closure as /p/, but switch the voice on — no puff of air, just a soft buzz.",
    keywords: ["bubble", "build", "maybe"],
    pairs: [
      pair("p", "/bæk/", "back", undefined, "/pæk/", "pack"),
      pair("p", "/bɪɡ/", "big", undefined, "/pɪɡ/", "pig"),
      pair("p", "/kæb/", "cab", undefined, "/kæp/", "cap"),
      pair("p", "/beə/", "bear", undefined, "/peə/", "pear"),
    ],
    words: [
      d("/ˈbʌbl/", "bubble"), d("/ˈrɒbə/", "robber"), d("/əˈbʌv/", "above"),
      d("/bɪld/", "build"), d("/kəʊm/", "comb"), d("/ˈmeɪbi/", "maybe"),
      d("/bed/", "bed"), d("/ˈbeɪbi/", "baby"), d("/bɪɡ/", "big"), d("/klʌb/", "club"),
    ],
    sentences: [
      d("/ˈbɒbi bɪlt ə bɪɡ bluː bəʊt/", "Bobby built a big blue boat."),
      d("/ðə ˈræbɪt bɪt ðə ˈrʌbə bænd/", "The rabbit bit the rubber band."),
      d("/ðə ˈbeɪbi brɪŋz ðə bluː bɔːl bæk/", "The baby brings the blue ball back."),
    ],
  },
  {
    id: "t", ipa: "t", category: "plosive", voiced: false,
    label: "voiceless alveolar plosive", keyword: "as in 'water'",
    hint: "Tongue tip on the ridge behind the teeth, sharp release with a puff — crisper than in many languages.",
    keywords: ["water", "often", "mountain"],
    pairs: [
      pair("d", "/taʊn/", "town", undefined, "/daʊn/", "down"),
      pair("d", "/taɪm/", "time", undefined, "/daɪm/", "dime"),
      pair("d", "/bet/", "bet", undefined, "/bed/", "bed"),
      pair("d", "/taɪ/", "tie", undefined, "/daɪ/", "die"),
    ],
    words: [
      d("/ˈwɔːtə/", "water"), d("/ˈletə/", "letter"), d("/ˈbetə/", "better"),
      d("/ˈɒfn/", "often"), d("/ˈmaʊntɪn/", "mountain"), d("/təˈnaɪt/", "tonight"),
      d("/tiː/", "tea"), d("/taɪm/", "time"), d("/kæt/", "cat"), d("/striːt/", "street"),
    ],
    sentences: [
      d("/ˈtwenti ˈtaɪni ˈtaɪɡəz tʊk ðə treɪn/", "Twenty tiny tigers took the train."),
      d("/wɒt ə lɒt əv ˈwɔːtər ɪn ðə ˈbɒtl/", "What a lot of water in the bottle."),
      d("/teɪk ðə swiːt tiː tə ðə ˈteɪbl/", "Take the sweet tea to the table."),
    ],
  },
  {
    id: "d", ipa: "d", category: "plosive", voiced: true,
    label: "voiced alveolar plosive", keyword: "as in 'ladder'",
    hint: "Tongue tip on the ridge again, voiced and gentle — no puff, the vocal cords hum.",
    keywords: ["ladder", "sudden", "would"],
    pairs: [
      pair("t", "/daʊn/", "down", undefined, "/taʊn/", "town"),
      pair("t", "/daɪm/", "dime", undefined, "/taɪm/", "time"),
      pair("t", "/bed/", "bed", undefined, "/bet/", "bet"),
      pair("t", "/daɪ/", "die", undefined, "/taɪ/", "tie"),
    ],
    words: [
      d("/ˈlædə/", "ladder"), d("/ˈsʌdn/", "sudden"), d("/ˈhɪdn/", "hidden"),
      d("/wʊd/", "would"), d("/dʒʌdʒ/", "judge"), d("/raɪd/", "ride"),
      d("/deɪ/", "day"), d("/dɔː/", "door"), d("/dɑːns/", "dance"), d("/praʊd/", "proud"),
    ],
    sentences: [
      d("/ˈdeɪvɪd dɪd ðə ˈdɪʃɪz ˈɑːftə ˈdɪnə/", "David did the dishes after dinner."),
      d("/ə ɡʊd diːd ɪz ˈnevə ˈhɪdn/", "A good deed is never hidden."),
      d("/ˈdeɪvɪd dɑːnst daʊn ðə rəʊd ət dɔːn/", "David danced down the road at dawn."),
    ],
  },
  {
    id: "k", ipa: "k", category: "plosive", voiced: false,
    label: "voiceless velar plosive", keyword: "as in 'quick'",
    hint: "Back of the tongue against the soft palate — the puff is strongest before 'ee', weakest before 'oo'.",
    keywords: ["school", "quick", "chemistry"],
    pairs: [
      pair("ɡ", "/kəʊt/", "coat", undefined, "/ɡəʊt/", "goat"),
      pair("ɡ", "/keɪm/", "came", undefined, "/ɡeɪm/", "game"),
      pair("ɡ", "/bæk/", "back", undefined, "/bæɡ/", "bag"),
      pair("ɡ", "/kɜːl/", "curl", undefined, "/ɡɜːl/", "girl"),
    ],
    words: [
      d("/skuːl/", "school"), d("/ˈmjuːzɪk/", "music"), d("/kwɪk/", "quick"),
      d("/bɪˈkɒz/", "because"), d("/ˈkemɪstri/", "chemistry"), d("/ˈpɒkɪt/", "pocket"),
      d("/kæt/", "cat"), d("/kiː/", "key"), d("/klɒk/", "clock"), d("/pɑːk/", "park"),
    ],
    sentences: [
      d("/kæn ðə kʊk kiːp ðə ˈkɪtʃɪn kliːn/", "Can the cook keep the kitchen clean?"),
      d("/ə kwɪk kɪk krækt ðə klɒk/", "A quick kick cracked the clock."),
      d("/ðə kæt kɔːt ə kəʊld ɪn ðə ˈkɪtʃɪn/", "The cat caught a cold in the kitchen."),
    ],
  },
  {
    id: "ɡ", ipa: "ɡ", category: "plosive", voiced: true,
    label: "voiced velar plosive", keyword: "as in 'begin'",
    hint: "Same back closure as /k/ with the voice on — a firm 'g', never a throat scrape.",
    keywords: ["again", "guess", "language"],
    pairs: [
      pair("k", "/ɡəʊt/", "goat", undefined, "/kəʊt/", "coat"),
      pair("k", "/ɡeɪm/", "game", undefined, "/keɪm/", "came"),
      pair("k", "/bæɡ/", "bag", undefined, "/bæk/", "back"),
      pair("k", "/ɡɜːl/", "girl", undefined, "/kɜːl/", "curl"),
    ],
    words: [
      d("/əˈɡen/", "again"), d("/bɪˈɡɪn/", "begin"), d("/ɡes/", "guess"),
      d("/ˈlæŋɡwɪdʒ/", "language"), d("/ˈbɪɡə/", "bigger"), d("/eɡ/", "egg"),
      d("/ɡet/", "get"), d("/ɡɜːl/", "girl"), d("/ɡʊd/", "good"), d("/bæɡ/", "bag"),
    ],
    sentences: [
      d("/ðə ɡɜːl ɡeɪv ðə dɒɡ ə ɡʊd hʌɡ/", "The girl gave the dog a good hug."),
      d("/bɪˈɡɪn əˈɡen ənd ɡɪv ɪt ə ɡəʊ/", "Begin again and give it a go."),
      d("/ə ɡreɪ ɡuːs ɡɒt lɒst ɪn ðə fɒɡ/", "A grey goose got lost in the fog."),
    ],
  },

  // ───────────────────────── NASALS ─────────────────────────
  {
    id: "m", ipa: "m", category: "nasal", voiced: true,
    label: "voiced bilabial nasal", keyword: "as in 'summer'",
    hint: "Lips closed, voice humming out through the nose — let it ring.",
    keywords: ["summer", "hammer", "swimming"],
    pairs: [
      pair("n", "/sʌm/", "sum", undefined, "/sʌn/", "sun"),
      pair("n", "/keɪm/", "came", undefined, "/keɪn/", "cane"),
      pair("n", "/ræm/", "ram", undefined, "/ræn/", "ran"),
      pair("n", "/tiːm/", "team", undefined, "/tiːn/", "teen"),
    ],
    words: [
      d("/ˈsʌmə/", "summer"), d("/ˈhæmə/", "hammer"), d("/kʌm/", "come"),
      d("/neɪm/", "name"), d("/ˈswɪmɪŋ/", "swimming"), d("/mʌm/", "mum"),
      d("/mæn/", "man"), d("/taɪm/", "time"), d("/həʊm/", "home"), d("/læmp/", "lamp"),
    ],
    sentences: [
      d("/maɪ mʌm meɪks ˈmɑːməleɪd ɪn meɪ/", "My mum makes marmalade in May."),
      d("/ˈmeni men məʊ ðə ˈmedəʊ/", "Many men mow the meadow."),
      d("/ðə smɔːl mæn swæm tə ðə ˈmɪdl əv ðə leɪk/", "The small man swam to the middle of the lake."),
    ],
  },
  {
    id: "n", ipa: "n", category: "nasal", voiced: true,
    label: "voiced alveolar nasal", keyword: "as in 'dinner'",
    hint: "Tongue tip on the ridge, air through the nose — a bright, forward hum.",
    keywords: ["dinner", "funny", "none"],
    pairs: [
      pair("ŋ", "/sʌn/", "sun", undefined, "/sʌŋ/", "sung"),
      pair("ŋ", "/sɪn/", "sin", undefined, "/sɪŋ/", "sing"),
      pair("ŋ", "/θɪn/", "thin", undefined, "/θɪŋ/", "thing"),
      pair("ŋ", "/ræn/", "ran", undefined, "/ræŋ/", "rang"),
    ],
    words: [
      d("/ˈdɪnə/", "dinner"), d("/ˈfʌni/", "funny"), d("/naɪn/", "nine"),
      d("/nʌn/", "none"), d("/ˈmʌni/", "money"), d("/rʌn/", "run"),
      d("/nəʊ/", "no"), d("/neɪm/", "name"), d("/naɪt/", "night"), d("/ˈnevə/", "never"),
    ],
    sentences: [
      d("/ˈnænsi niːdz naɪn njuː ˈnəʊtbʊks/", "Nancy needs nine new notebooks."),
      d("/nəʊ wʌn ˈnəʊtɪst ðə nɔɪz ət nuːn/", "No one noticed the noise at noon."),
      d("/hi ˈnevə rʌnz ɪn ðə reɪn ət naɪt/", "He never runs in the rain at night."),
    ],
  },
  {
    id: "ŋ", ipa: "ŋ", category: "nasal", voiced: true,
    label: "voiced velar nasal", keyword: "as in 'singing'",
    hint: "Back of the tongue on the soft palate, humming through the nose — it always follows a vowel and never starts a word.",
    keywords: ["morning", "finger", "English"],
    pairs: [
      pair("n", "/sʌŋ/", "sung", undefined, "/sʌn/", "sun"),
      pair("n", "/sɪŋ/", "sing", undefined, "/sɪn/", "sin"),
      pair("n", "/θɪŋ/", "thing", undefined, "/θɪn/", "thin"),
      pair("n", "/ræŋ/", "rang", undefined, "/ræn/", "ran"),
    ],
    words: [
      d("/ˈmɔːnɪŋ/", "morning"), d("/ˈfɪŋɡə/", "finger"), d("/ˈɪŋɡlɪʃ/", "English"),
      d("/ˈθɪŋkɪŋ/", "thinking"), d("/jʌŋ/", "young"), d("/ˈhæŋɪŋ/", "hanging"),
      d("/sɪŋ/", "sing"), d("/lɒŋ/", "long"), d("/rɪŋ/", "ring"), d("/kɪŋ/", "king"),
    ],
    sentences: [
      d("/ðə jʌŋ kɪŋ sæŋ ə lɒŋ sɒŋ/", "The young king sang a long song."),
      d("/ˈmɔːnɪŋ brɪŋz ə njuː bɪˈɡɪnɪŋ/", "Morning brings a new beginning."),
      d("/brɪŋ ðə strɒŋ strɪŋ əˈlɒŋ/", "Bring the strong string along."),
    ],
  },

  // ───────────────────────── FRICATIVES ─────────────────────────
  {
    id: "f", ipa: "f", category: "fricative", voiced: false,
    label: "voiceless labiodental fricative", keyword: "as in 'coffee'",
    hint: "Top teeth rest on the lower lip — blow air steadily, no voice.",
    keywords: ["coffee", "phone", "laugh"],
    pairs: [
      pair("v", "/fæn/", "fan", undefined, "/væn/", "van"),
      pair("v", "/liːf/", "leaf", undefined, "/liːv/", "leave"),
      pair("v", "/seɪf/", "safe", undefined, "/seɪv/", "save"),
      pair("v", "/fæt/", "fat", undefined, "/væt/", "vat"),
    ],
    words: [
      d("/ˈkɒfi/", "coffee"), d("/fəʊn/", "phone"), d("/lɑːf/", "laugh"),
      d("/hɑːf/", "half"), d("/freɪz/", "phrase"), d("/ɡrɑːf/", "graph"),
      d("/fɪʃ/", "fish"), d("/faɪv/", "five"), d("/liːf/", "leaf"), d("/ɒf/", "off"),
    ],
    sentences: [
      d("/fɔː faɪn fɪʃ fel ɒf ðə fens/", "Four fine fish fell off the fence."),
      d("/fəʊn ðə ˈkæfeɪ əˈbaʊt ðə ˈfəʊtəʊ/", "Phone the café about the photo."),
      d("/ðə fɒks faɪndz fuːd ɪn ðə ˈfɒrɪst/", "The fox finds food in the forest."),
    ],
  },
  {
    id: "v", ipa: "v", category: "fricative", voiced: true,
    label: "voiced labiodental fricative", keyword: "as in 'seven'",
    hint: "Same teeth-on-lip contact as /f/, but add voice — you should feel the lower lip tingle.",
    keywords: ["very", "river", "move"],
    pairs: [
      pair("f", "/væn/", "van", undefined, "/fæn/", "fan"),
      pair("f", "/liːv/", "leave", undefined, "/liːf/", "leaf"),
      pair("f", "/seɪv/", "save", undefined, "/seɪf/", "safe"),
      pair("f", "/væt/", "vat", undefined, "/fæt/", "fat"),
    ],
    words: [
      d("/ˈveri/", "very"), d("/ˈsevn/", "seven"), d("/ˈrɪvə/", "river"),
      d("/hæv/", "have"), d("/muːv/", "move"), d("/vɔɪs/", "voice"),
      d("/faɪv/", "five"), d("/lʌv/", "love"), d("/lɪv/", "live"), d("/ˈvɪlɪdʒ/", "village"),
    ],
    sentences: [
      d("/vɪv ɡeɪv ˈsevn ˈveri ˈvæljuəbl ˈvɑːzɪz/", "Viv gave seven very valuable vases."),
      d("/ðə ˈrɪvə muːvz ˈəʊvə ðə stəʊnz/", "The river moves over the stones."),
      d("/wi lʌv ðə wɔːm ˈsʌmər ˈiːvnɪŋz/", "We love the warm summer evenings."),
    ],
  },
  {
    id: "θ", ipa: "θ", category: "fricative", voiced: false,
    label: "voiceless dental fricative", keyword: "as in 'think'",
    hint: "Tongue tip between the teeth — blow air gently. 'Think', never 'sink' or 'tink'.",
    keywords: ["think", "month", "theatre"],
    pairs: [
      pair("s", "/θɪŋk/", "think", undefined, "/sɪŋk/", "sink"),
      pair("s", "/θaɪ/", "thigh", undefined, "/saɪ/", "sigh"),
      pair("s", "/maʊθ/", "mouth", undefined, "/maʊs/", "mouse"),
      pair("s", "/pɑːθ/", "path", undefined, "/pɑːs/", "pass"),
    ],
    words: [
      d("/θɪŋk/", "think"), d("/mʌnθ/", "month"), d("/ˈnʌθɪŋ/", "nothing"),
      d("/ˈɔːθə/", "author"), d("/ˈθɪətə/", "theatre"), d("/saʊθ/", "south"),
      d("/θriː/", "three"), d("/θɪŋ/", "thing"), d("/maʊθ/", "mouth"), d("/bəʊθ/", "both"),
    ],
    sentences: [
      d("/ði ˈæθliːt θɪŋks əˈbaʊt ˈθɜːzdeɪ/", "The athlete thinks about Thursday."),
      d("/ˈθɜːti ˈθaʊznd ˈfeðəz bəʊθ təˈɡeðə/", "Thirty thousand feathers, both together."),
      d("/ðə θriː ˈbrʌðəz θɪŋk əˈbaʊt ðə ˈθɪətə/", "The three brothers think about the theatre."),
    ],
  },
  {
    id: "ð", ipa: "ð", category: "fricative", voiced: true,
    label: "voiced dental fricative", keyword: "as in 'this'",
    hint: "Tongue between the teeth again, this time with voice — the sound of 'this', 'that', 'the'.",
    keywords: ["mother", "weather", "another"],
    pairs: [
      pair("θ", "/ðaɪ/", "thy", undefined, "/θaɪ/", "thigh"),
      pair("θ", "/ləʊð/", "loathe", undefined, "/ləʊθ/", "loath"),
      pair("θ", "/beɪð/", "bathe", undefined, "/bɑːθ/", "bath"),
      pair("θ", "/briːð/", "breathe", undefined, "/breθ/", "breath"),
    ],
    words: [
      d("/ˈmʌðə/", "mother"), d("/ˈfɑːðə/", "father"), d("/ˈweðə/", "weather"),
      d("/ˈbrʌðə/", "brother"), d("/əˈnʌðə/", "another"), d("/wɪð/", "with"),
      d("/ðɪs/", "this"), d("/ðæt/", "that"), d("/beɪð/", "bathe"), d("/smuːð/", "smooth"),
    ],
    sentences: [
      d("/ðɪs ənd ðæt ðiːz ənd ðəʊz/", "This and that, these and those."),
      d("/maɪ ˈmʌðər ənd ˈfɑːðə breɪvd ðə ˈweðə/", "My mother and father braved the weather."),
      d("/ðə ˈweðər ɪz ˈbetə ðæn ði ˈʌðə deɪ/", "The weather is better than the other day."),
    ],
  },
  {
    id: "s", ipa: "s", category: "fricative", voiced: false,
    label: "voiceless alveolar fricative", keyword: "as in 'city'",
    hint: "Tongue tip close to the ridge, air hissing down the centre — a sharp, long snake sound.",
    keywords: ["city", "science", "castle"],
    pairs: [
      pair("z", "/sɪp/", "sip", undefined, "/zɪp/", "zip"),
      pair("z", "/bʌs/", "bus", undefined, "/bʌz/", "buzz"),
      pair("θ", "/sɪŋk/", "sink", undefined, "/θɪŋk/", "think"),
      pair("θ", "/feɪs/", "face", undefined, "/feɪθ/", "faith"),
    ],
    words: [
      d("/ˈsɪti/", "city"), d("/ˈsaɪəns/", "science"), d("/naɪs/", "nice"),
      d("/piːs/", "piece"), d("/mɪs/", "miss"), d("/ˈkɑːsl/", "castle"),
      d("/sʌn/", "sun"), d("/sɪks/", "six"), d("/siː/", "sea"), d("/bʌs/", "bus"),
    ],
    sentences: [
      d("/sɪks slɪm swɒnz swæm ˈsləʊli saʊθ/", "Six slim swans swam slowly south."),
      d("/ðə ˈsaɪəns klɑːs sɔː ðə ˈkɑːsl/", "The science class saw the castle."),
      d("/sɪks ˈsɪstəz sæt ɪn ðə sʌn/", "Six sisters sat in the sun."),
    ],
  },
  {
    id: "z", ipa: "z", category: "fricative", voiced: true,
    label: "voiced alveolar fricative", keyword: "as in 'busy'",
    hint: "Same position as /s/ with the voice on — a bee's buzz, kept light and forward.",
    keywords: ["busy", "cousin", "scissors"],
    pairs: [
      pair("s", "/zɪp/", "zip", undefined, "/sɪp/", "sip"),
      pair("s", "/bʌz/", "buzz", undefined, "/bʌs/", "bus"),
      pair("s", "/aɪz/", "eyes", undefined, "/aɪs/", "ice"),
      pair("s", "/zuː/", "zoo", undefined, "/suː/", "sue"),
    ],
    words: [
      d("/ˈbɪzi/", "busy"), d("/pliːz/", "please"), d("/ˈkʌzn/", "cousin"),
      d("/ˈsɪzəz/", "scissors"), d("/ˈhaʊzɪz/", "houses"), d("/nɔɪz/", "noise"),
      d("/zuː/", "zoo"), d("/ˈzɪərəʊ/", "zero"), d("/hɪz/", "his"), d("/dʒæz/", "jazz"),
    ],
    sentences: [
      d("/ˈzəʊiz ˈkʌzn tʃəʊz ðəʊz ˈrəʊzɪz/", "Zoe's cousin chose those roses."),
      d("/ðə biːz bʌz ɪn ðə briːz/", "The bees buzz in the breeze."),
      d("/ðə ˈziːbrəz ɪn ðə zuː ɑː ˈleɪzi/", "The zebras in the zoo are lazy."),
    ],
  },
  {
    id: "ʃ", ipa: "ʃ", category: "fricative", voiced: false,
    label: "voiceless post-alveolar fricative", keyword: "as in 'station'",
    hint: "Pull the tongue back from /s/ and round the lips a little — a soft, hushed 'shhh'.",
    keywords: ["station", "ocean", "sugar"],
    pairs: [
      pair("s", "/ʃɪp/", "ship", undefined, "/sɪp/", "sip"),
      pair("s", "/ʃɒp/", "shop", undefined, "/sɒp/", "sop"),
      pair("s", "/ʃuː/", "shoe", undefined, "/suː/", "sue"),
      pair("s", "/ʃæk/", "shack", undefined, "/sæk/", "sack"),
    ],
    words: [
      d("/ˈsteɪʃn/", "station"), d("/ˈəʊʃn/", "ocean"), d("/ˈʃʊɡə/", "sugar"),
      d("/məˈʃiːn/", "machine"), d("/ˈspeʃl/", "special"), d("/ʃʊə/", "sure"),
      d("/ʃiː/", "she"), d("/ʃuː/", "shoe"), d("/fɪʃ/", "fish"), d("/wɒʃ/", "wash"),
    ],
    sentences: [
      d("/ʃi selz ˈsiːʃelz baɪ ðə ˈsiːʃɔː/", "She sells seashells by the seashore."),
      d("/ðə ʃef wɒʃt ðə ˈdɪʃɪz ˈsləʊli/", "The chef washed the dishes slowly."),
      d("/ðə ˈneɪʃn wɒtʃt ði ˈəʊʃn reɪs/", "The nation watched the ocean race."),
    ],
  },
  {
    id: "ʒ", ipa: "ʒ", category: "fricative", voiced: true,
    label: "voiced post-alveolar fricative", keyword: "as in 'vision'",
    hint: "The voiced twin of /ʃ/ — rare in English, hiding inside 'vision', 'measure', 'pleasure'.",
    keywords: ["measure", "treasure", "usually"],
    pairs: [
      pair("ʃ", "/ˈpleʒə/", "pleasure", undefined, "/ˈpreʃə/", "pressure"),
      pair("ʃ", "/ˈvɪʒn/", "vision", undefined, "/ˈmɪʃn/", "mission"),
      pair("ʃ", "/ˈsiːʒə/", "seizure", undefined, "/ˈsiːʃɔː/", "seashore"),
      pair("ʃ", "/ˈɡærɑːʒ/", "garage", undefined, "/ˈɡeərɪʃ/", "garish"),
    ],
    words: [
      d("/ˈvɪʒn/", "vision"), d("/ˈmeʒə/", "measure"), d("/ˈpleʒə/", "pleasure"),
      d("/ˈjuːʒuəli/", "usually"), d("/ˈtreʒə/", "treasure"), d("/ˈeɪʒə/", "Asia"),
      d("/ruːʒ/", "rouge"), d("/beɪʒ/", "beige"), d("/ˈɡærɑːʒ/", "garage"), d("/ˈtelɪvɪʒn/", "television"),
    ],
    sentences: [
      d("/ðə ˈtreʒə wəz bɪˈjɒnd ˈmeʒə/", "The treasure was beyond measure."),
      d("/ʃi tʊk ˈpleʒər ɪn ði ˈjuːʒuəl ruːˈtiːn/", "She took pleasure in the usual routine."),
      d("/hi wɒtʃt ˈtelɪvɪʒn ət ˈleʒə/", "He watched television at leisure."),
    ],
  },
  {
    id: "h", ipa: "h", category: "fricative", voiced: false,
    label: "voiceless glottal fricative", keyword: "as in 'hello'",
    hint: "Just a gentle breath of air from the throat — the following vowel gives it its colour.",
    keywords: ["hello", "behind", "vehicle"],
    pairs: [
      pair("∅", "/hæt/", "hat", undefined, "/æt/", "at"),
      pair("∅", "/hɪl/", "hill", undefined, "/ɪl/", "ill"),
      pair("∅", "/hɑːm/", "harm", undefined, "/ɑːm/", "arm"),
      pair("∅", "/hiːl/", "heal", undefined, "/iːl/", "eel"),
    ],
    words: [
      d("/həˈləʊ/", "hello"), d("/bɪˈhaɪnd/", "behind"), d("/haʊs/", "house"),
      d("/huː/", "who"), d("/ˈviːɪkl/", "vehicle"), d("/ˈhʌndrəd/", "hundred"),
      d("/hæt/", "hat"), d("/hɪl/", "hill"), d("/hænd/", "hand"), d("/help/", "help"),
    ],
    sentences: [
      d("/hi hɜːd ə hɔːs ɪn ðə hɔːl/", "He heard a horse in the hall."),
      d("/ə ˈhʌndrəd hæts hʌŋ ɒn ðə hɪl/", "A hundred hats hung on the hill."),
      d("/ðə ˈhɪərəʊ held ðə ˈhevi ˈhæmə/", "The hero held the heavy hammer."),
    ],
  },

  // ───────────────────────── AFFRICATES ─────────────────────────
  {
    id: "tʃ", ipa: "tʃ", category: "affricate", voiced: false,
    label: "voiceless post-alveolar affricate", keyword: "as in 'teacher'",
    hint: "A /t/ that melts straight into /ʃ/ — one contact, one burst: 'ch'.",
    keywords: ["teacher", "picture", "question"],
    pairs: [
      pair("ʃ", "/tʃɪp/", "chip", undefined, "/ʃɪp/", "ship"),
      pair("ʃ", "/tʃeə/", "chair", undefined, "/ʃeə/", "share"),
      pair("ʃ", "/tʃɪn/", "chin", undefined, "/ʃɪn/", "shin"),
      pair("ʃ", "/wɒtʃ/", "watch", undefined, "/wɒʃ/", "wash"),
    ],
    words: [
      d("/ˈtiːtʃə/", "teacher"), d("/ˈpɪktʃə/", "picture"), d("/ˈneɪtʃə/", "nature"),
      d("/ˈtʃɪkɪn/", "chicken"), d("/ˈkwestʃən/", "question"), d("/tʃiːp/", "cheap"),
      d("/tʃeə/", "chair"), d("/tʃaɪld/", "child"), d("/tʃiːz/", "cheese"), d("/wɒtʃ/", "watch"),
    ],
    sentences: [
      d("/ˈtʃɑːli tʃəʊz ə ˈtʃɒklɪt tʃɪp/", "Charlie chose a chocolate chip."),
      d("/iːtʃ tʃaɪld wɒtʃt ðə ˈtʃɪkɪn tʃeɪs/", "Each child watched the chicken chase."),
      d("/ðə ˈtiːtʃə tɔːt ðə ˈtʃɪldrən ət tʃɜːtʃ/", "The teacher taught the children at church."),
    ],
  },
  {
    id: "dʒ", ipa: "dʒ", category: "affricate", voiced: true,
    label: "voiced post-alveolar affricate", keyword: "as in 'jacket'",
    hint: "/d/ gliding into /ʒ/ with the voice on — a firm 'j', as in 'jam'.",
    keywords: ["jacket", "danger", "major"],
    pairs: [
      pair("tʃ", "/dʒɔː/", "jaw", undefined, "/tʃɔː/", "chore"),
      pair("tʃ", "/dʒɪn/", "gin", undefined, "/tʃɪn/", "chin"),
      pair("tʃ", "/dʒəʊk/", "joke", undefined, "/tʃəʊk/", "choke"),
      pair("tʃ", "/dʒɑː/", "jar", undefined, "/tʃɑː/", "char"),
    ],
    words: [
      d("/ˈdʒækɪt/", "jacket"), d("/ˈdeɪndʒə/", "danger"), d("/brɪdʒ/", "bridge"),
      d("/ɪnˈdʒɔɪ/", "enjoy"), d("/ˈmeɪdʒə/", "major"), d("/dʒʌst/", "just"),
      d("/dʒæm/", "jam"), d("/dʒɒb/", "job"), d("/peɪdʒ/", "page"), d("/eɪdʒ/", "age"),
    ],
    sentences: [
      d("/ðə dʒʌdʒ ɪnˈdʒɔɪd ði ˈɒrɪndʒ dʒæm/", "The judge enjoyed the orange jam."),
      d("/ə ˈdʒentl ˈdʒaɪənt dʒɒɡd əˈkrɒs ðə brɪdʒ/", "A gentle giant jogged across the bridge."),
      d("/hɪz ˈdʒɜːni bɪˈɡæn ət ðə lɑːdʒ ˈɡærɑːʒ/", "His journey began at the large garage."),
    ],
  },

  // ───────────────────────── APPROXIMANTS ─────────────────────────
  {
    id: "w", ipa: "w", category: "approximant", voiced: true,
    label: "voiced labio-velar approximant", keyword: "as in 'woman'",
    hint: "Round the lips like /uː/ then glide into the vowel — no friction, no biting the lip.",
    keywords: ["woman", "one", "twelve"],
    pairs: [
      pair("v", "/waɪn/", "wine", undefined, "/vaɪn/", "vine"),
      pair("v", "/west/", "west", undefined, "/vest/", "vest"),
      pair("v", "/wet/", "wet", undefined, "/vet/", "vet"),
      pair("v", "/weɪl/", "wail", undefined, "/veɪl/", "vale"),
    ],
    words: [
      d("/ˈwʊmən/", "woman"), d("/wʌn/", "one"), d("/ˈɔːlweɪz/", "always"),
      d("/kwɪk/", "quick"), d("/ˈlæŋɡwɪdʒ/", "language"), d("/twelv/", "twelve"),
      d("/wiː/", "we"), d("/ˈwɔːtə/", "water"), d("/waɪ/", "why"), d("/əˈweɪ/", "away"),
    ],
    sentences: [
      d("/wi went west wɪð ðə wɪnd/", "We went west with the wind."),
      d("/ðə ˈwʊmən wʌn twelv wɔːm ˈswetəz/", "The woman won twelve warm sweaters."),
      d("/waɪ wəz ðə ˈwɔːtə səʊ wɔːm ɪn ˈwɪntə/", "Why was the water so warm in winter?"),
    ],
  },
  {
    id: "r", ipa: "r", category: "approximant", voiced: true,
    label: "voiced post-alveolar approximant", keyword: "as in 'really'",
    hint: "Curl the tongue tip towards the ridge without touching — the British r is soft, never rolled or growled.",
    keywords: ["sorry", "hurry", "library"],
    pairs: [
      pair("l", "/raɪt/", "right", undefined, "/laɪt/", "light"),
      pair("l", "/riːd/", "read", undefined, "/liːd/", "lead"),
      pair("l", "/rəʊ/", "row", undefined, "/ləʊ/", "low"),
      pair("l", "/reɪk/", "rake", undefined, "/leɪk/", "lake"),
    ],
    words: [
      d("/ˈsɒri/", "sorry"), d("/ˈrɪəli/", "really"), d("/ˈhʌri/", "hurry"),
      d("/əˈraʊnd/", "around"), d("/ˈlaɪbrəri/", "library"), d("/ˈmɪrə/", "mirror"),
      d("/red/", "red"), d("/rəʊd/", "road"), d("/rʌn/", "run"), d("/reɪn/", "rain"),
    ],
    sentences: [
      d("/ˈrɔːri rəʊld ðə red ˈlɒri raʊnd ðə ˈkɔːnə/", "Rory rolled the red lorry round the corner."),
      d("/ˈhʌri ðə treɪn əˈraɪvz əˈraʊnd θriː/", "Hurry — the train arrives around three."),
      d("/ðə red ˈræbɪt ræn raʊnd ðə ˈɡɑːdn/", "The red rabbit ran round the garden."),
    ],
  },
  {
    id: "j", ipa: "j", category: "approximant", voiced: true,
    label: "voiced palatal approximant", keyword: "as in 'young'",
    hint: "Start at the /iː/ position and glide into the vowel — the 'y' in 'yes', light and quick.",
    keywords: ["young", "music", "million"],
    pairs: [
      pair("iː", "/jiːst/", "yeast", undefined, "/iːst/", "east"),
      pair("ɪə", "/jɪə/", "year", undefined, "/ɪə/", "ear"),
      pair("əʊ", "/jəʊk/", "yolk", undefined, "/əʊk/", "oak"),
      pair("æ", "/jæm/", "yam", undefined, "/æm/", "am"),
    ],
    words: [
      d("/jʌŋ/", "young"), d("/juːz/", "use"), d("/ˈmjuːzɪk/", "music"),
      d("/vjuː/", "view"), d("/ˈmɪljən/", "million"), d("/ˈʌnjən/", "onion"),
      d("/jes/", "yes"), d("/juː/", "you"), d("/jɪə/", "year"), d("/ˈjestədeɪ/", "yesterday"),
    ],
    sentences: [
      d("/juː njuː ðə njuːz wəz truː/", "You knew the news was true."),
      d("/ə ˈmɪljən vjuːz əv ðə ˈjeləʊ muːn/", "A million views of the yellow moon."),
      d("/dɪd juː juːz ðə ˈjeləʊ ʌmˈbrelə ˈjestədeɪ/", "Did you use the yellow umbrella yesterday?"),
    ],
  },
  {
    id: "l", ipa: "l", category: "approximant", voiced: true,
    label: "voiced alveolar lateral approximant", keyword: "as in 'little'",
    hint: "Tongue tip on the ridge, air flowing around the sides — light 'l' before vowels, a dark velarised 'l' at the end of words.",
    keywords: ["little", "bottle", "yellow"],
    pairs: [
      pair("r", "/laɪt/", "light", undefined, "/raɪt/", "right"),
      pair("r", "/liːd/", "lead", undefined, "/riːd/", "read"),
      pair("r", "/ləʊ/", "low", undefined, "/rəʊ/", "row"),
      pair("r", "/leɪk/", "lake", undefined, "/reɪk/", "rake"),
    ],
    words: [
      d("/ˈlɪtl/", "little"), d("/ˈbɒtl/", "bottle"), d("/ˈɔːlweɪz/", "always"),
      d("/ˈjeləʊ/", "yellow"), d("/lʌv/", "love"), d("/ˈrɪəli/", "really"),
      d("/leɡ/", "leg"), d("/pleɪ/", "play"), d("/bluː/", "blue"), d("/fʊl/", "full"),
    ],
    sentences: [
      d("/ˈlɪli lʌvz ðə ˈlɪtl ˈbluːbelz/", "Lily loves the little bluebells."),
      d("/ðə tɔːl wɔːl fel ɪn ðə hɔːl/", "The tall wall fell in the hall."),
      d("/pliːz ˈlɪsn tə ðə laɪt reɪn ɒn ðə liːvz/", "Please listen to the light rain on the leaves."),
    ],
  },
];

export const PHONEME_MAP = new Map(PHONEMES.map((p) => [p.id, p]));

export const VOWELS = PHONEMES.filter((p) => p.category === "monophthong");
export const DIPHTHONGS = PHONEMES.filter((p) => p.category === "diphthong");
export const CONSONANTS = PHONEMES.filter(
  (p) => p.category !== "monophthong" && p.category !== "diphthong"
);

export const SOUND_GROUPS: { title: string; hex: string; items: Phoneme[] }[] = [
  { title: "12 vowels", hex: CATEGORY_META.monophthong.hex, items: VOWELS },
  { title: "8 diphthongs", hex: CATEGORY_META.diphthong.hex, items: DIPHTHONGS },
  { title: "24 consonants", hex: CATEGORY_META.plosive.hex, items: CONSONANTS },
];

export const PLACES = [
  "Bilabial", "Labio-dental", "Dental", "Alveolar", "Post-alveolar", "Palatal", "Velar", "Glottal",
];
export const MANNERS = ["Plosive", "Nasal", "Fricative", "Affricate", "Approximant"];

const cell = (manner: number, place: number, ids: string[]) => ({ manner, place, ids });

export const CONSONANT_CELLS = [
  cell(0, 0, ["p", "b"]), cell(0, 3, ["t", "d"]), cell(0, 6, ["k", "ɡ"]),
  cell(1, 0, ["m"]), cell(1, 3, ["n"]), cell(1, 6, ["ŋ"]),
  cell(2, 1, ["f", "v"]), cell(2, 2, ["θ", "ð"]), cell(2, 3, ["s", "z"]),
  cell(2, 4, ["ʃ", "ʒ"]), cell(2, 7, ["h"]),
  cell(3, 4, ["tʃ", "dʒ"]),
  cell(4, 0, ["w"]), cell(4, 3, ["l"]), cell(4, 4, ["r"]), cell(4, 5, ["j"]),
];

export const TOTAL_PAIRS = PHONEMES.reduce((n, p) => n + p.pairs.length, 0);
export const TOTAL_WORDS = PHONEMES.reduce((n, p) => n + p.words.length, 0);
export const TOTAL_SENTENCES = PHONEMES.reduce((n, p) => n + p.sentences.length, 0);
export const TOTAL_DRILLS = TOTAL_PAIRS + TOTAL_WORDS + TOTAL_SENTENCES;
