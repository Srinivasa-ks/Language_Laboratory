export type LevelId = "syll" | "word" | "sent";

export interface Drill {
  ipa: string;
  text: string;
  say?: string;
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
  syllables: Drill[];
  words: Drill[];
  sentences: Drill[];
}

export const LEVELS: { id: LevelId; name: string; blurb: string }[] = [
  { id: "syll", name: "Syllables", blurb: "Tiny one-beat building blocks." },
  { id: "word", name: "Words", blurb: "The sound inside real vocabulary." },
  { id: "sent", name: "Sentences", blurb: "Full-speed connected speech." },
];

export const getDrills = (p: Phoneme, level: LevelId): Drill[] =>
  level === "syll" ? p.syllables : level === "word" ? p.words : p.sentences;

const d = (ipa: string, text: string, say?: string): Drill => ({ ipa, text, say });

export const PHONEMES: Phoneme[] = [
  // ───────────────────────── MONOPHTHONGS ─────────────────────────
  {
    id: "iː", ipa: "iː", category: "monophthong", chartPos: { x: 66, y: 30 },
    label: "close front unrounded vowel", keyword: "the FLEECE vowel",
    hint: "Spread your lips into a slight smile, push the tongue high and far forward, and hold the sound long — it is a tense vowel.",
    keywords: ["see", "tree", "machine"],
    syllables: [d("/biː/", "bee"), d("/siː/", "sea"), d("/miː/", "me"), d("/tiː/", "tea"), d("/kiː/", "key")],
    words: [d("/fliːs/", "fleece"), d("/bɪˈliːv/", "believe"), d("/rɪˈsiːt/", "receipt"), d("/ˈpiːpl/", "people"), d("/məˈʃiːn/", "machine"), d("/fiːld/", "field")],
    sentences: [
      d("/ʃiː siːz θriː ɡriːn triːz baɪ ðə siː/", "She sees three green trees by the sea."),
      d("/pliːz kiːp ðə rɪˈsiːt bɪˈliːv miː/", "Please keep the receipt — believe me."),
    ],
  },
  {
    id: "ɪ", ipa: "ɪ", category: "monophthong", chartPos: { x: 94, y: 56 },
    label: "near-close near-front unrounded vowel", keyword: "the KIT vowel",
    hint: "Short and relaxed — the tongue sits a touch lower and further back than /iː/. Never stretch it long.",
    keywords: ["ship", "women", "busy"],
    syllables: [d("/bɪt/", "bit"), d("/sɪt/", "sit"), d("/hɪp/", "hip"), d("/lɪd/", "lid"), d("/kɪs/", "kiss")],
    words: [d("/ʃɪp/", "ship"), d("/ˈwɪmɪn/", "women"), d("/ˈbɪzi/", "busy"), d("/brɪdʒ/", "bridge"), d("/ˈmɪnɪt/", "minute"), d("/ɡɪlt/", "guilt")],
    sentences: [
      d("/sɪks slɪm ʃɪps slɪpt ˈɪntə ˈhɑːbə/", "Six slim ships slipped into harbour."),
      d("/ðɪs ˈlɪtl ˈvɪlɪdʒ ɪz kwaɪt bɪɡ/", "This little village is quite big."),
    ],
  },
  {
    id: "e", ipa: "e", category: "monophthong", chartPos: { x: 78, y: 96 },
    label: "mid front unrounded vowel", keyword: "the DRESS vowel",
    hint: "Drop the jaw a little below /ɪ/ and keep it short and crisp — a plain 'eh', never gliding to 'ay'.",
    keywords: ["bed", "said", "many"],
    syllables: [d("/bed/", "bed"), d("/red/", "red"), d("/pen/", "pen"), d("/leɡ/", "leg"), d("/nek/", "neck")],
    words: [d("/frend/", "friend"), d("/sed/", "said"), d("/əˈɡen/", "again"), d("/hed/", "head"), d("/ˈmeni/", "many"), d("/ˈeni/", "any")],
    sentences: [
      d("/ɡet ˈredi ðen lets ɡəʊ tə bed/", "Get ready, then let's go to bed."),
      d("/ðə red hen pekt ət ðə bred/", "The red hen pecked at the bread."),
    ],
  },
  {
    id: "æ", ipa: "æ", category: "monophthong", chartPos: { x: 84, y: 172 },
    label: "near-open front unrounded vowel", keyword: "the TRAP vowel",
    hint: "Open wide — jaw down, tongue low and front. A bright, flat 'a', held short.",
    keywords: ["cat", "laugh", "camera"],
    syllables: [d("/kæt/", "cat"), d("/mæp/", "map"), d("/tæp/", "tap"), d("/dʒæm/", "jam"), d("/hæd/", "had")],
    words: [d("/ˈæpl/", "apple"), d("/blæk/", "black"), d("/hænd/", "hand"), d("/ˈæŋɡri/", "angry"), d("/ˈkæmrə/", "camera"), d("/ˈtrævl/", "travel")],
    sentences: [
      d("/ə fæt kæt sæt ɒn ə blæk mæt/", "A fat cat sat on a black mat."),
      d("/sæm hæz hæm ənd dʒæm ɪn ðə pæn/", "Sam has ham and jam in the pan."),
    ],
  },
  {
    id: "ʌ", ipa: "ʌ", category: "monophthong", chartPos: { x: 198, y: 152 },
    label: "open-mid central unrounded vowel", keyword: "the STRUT vowel",
    hint: "A short punch from the middle of the mouth — lips neutral, tongue mid-central, like a light 'uh'.",
    keywords: ["cup", "London", "mother"],
    syllables: [d("/kʌp/", "cup"), d("/sʌn/", "sun"), d("/mʌd/", "mud"), d("/lʌv/", "love"), d("/bʌs/", "bus")],
    words: [d("/kʌm/", "come"), d("/ˈmʌni/", "money"), d("/ˈlʌndən/", "London"), d("/ˈstʌmək/", "stomach"), d("/ˈmʌðə/", "mother"), d("/əˈbʌv/", "above")],
    sentences: [
      d("/ðə jʌŋ ˈrʌnə lʌvz ðə sʌn/", "The young runner loves the sun."),
      d("/ˈnʌθɪŋ əˈbʌv ʌs bʌt ˈsʌmə klaʊdz/", "Nothing above us but summer clouds."),
    ],
  },
  {
    id: "ɒ", ipa: "ɒ", category: "monophthong", chartPos: { x: 258, y: 176 },
    label: "open back rounded vowel", keyword: "the LOT vowel",
    hint: "Round the lips lightly and drop the jaw — a short, dark, open 'o' at the back of the mouth.",
    keywords: ["hot", "want", "sorry"],
    syllables: [d("/hɒt/", "hot"), d("/dɒɡ/", "dog"), d("/bɒks/", "box"), d("/pɒt/", "pot"), d("/wɒʃ/", "wash")],
    words: [d("/klɒk/", "clock"), d("/wɒnt/", "want"), d("/bɪˈkɒz/", "because"), d("/wɒtʃ/", "watch"), d("/ˈkwɒləti/", "quality"), d("/ˈsɒri/", "sorry")],
    sentences: [
      d("/stɒp ðə kɑː ðə pɒt ɪz hɒt/", "Stop the car — the pot is hot."),
      d("/ðə dɒɡ ɡɒt lɒst ɒn ðə ˈkɒmən/", "The dog got lost on the common."),
    ],
  },
  {
    id: "ʊ", ipa: "ʊ", category: "monophthong", chartPos: { x: 268, y: 52 },
    label: "near-close near-back rounded vowel", keyword: "the FOOT vowel",
    hint: "Short and loose — lips softly rounded, tongue high and back but relaxed. Never let it glide into /uː/.",
    keywords: ["book", "could", "sugar"],
    syllables: [d("/bʊk/", "book"), d("/pʊt/", "put"), d("/lʊk/", "look"), d("/ɡʊd/", "good"), d("/fʊl/", "full")],
    words: [d("/kʊd/", "could"), d("/wʊd/", "would"), d("/pʊʃ/", "push"), d("/ˈbʊtʃə/", "butcher"), d("/ˈʃʊɡə/", "sugar"), d("/ˈkʊʃn/", "cushion")],
    sentences: [
      d("/pʊt ðə ɡʊd bʊk ɒn ðə ʃelf/", "Put the good book on the shelf."),
      d("/ə ɡʊd kʊk kʊd pʊʃ ðə ˈkʊʃn/", "A good cook could push the cushion."),
    ],
  },
  {
    id: "ə", ipa: "ə", category: "monophthong", chartPos: { x: 150, y: 100 },
    label: "mid central unrounded vowel", keyword: "the schwa",
    hint: "The laziest sound in English — mouth barely open, completely relaxed, and always unstressed.",
    keywords: ["about", "teacher", "banana"],
    syllables: [d("/ə/", "uh"), d("/ðə/", "the"), d("/ə/", "a"), d("/əv/", "of"), d("/tə/", "to")],
    words: [d("/əˈbaʊt/", "about"), d("/səˈpɔːt/", "support"), d("/ˈtiːtʃə/", "teacher"), d("/ˈdɒktə/", "doctor"), d("/bəˈnɑːnə/", "banana"), d("/ˈmeməri/", "memory")],
    sentences: [
      d("/ə bəˈnɑːnə ənd ə təˈmɑːtəʊ pliːz/", "A banana and a tomato, please."),
      d("/ðə ˈdɒktə rɪˈmembəd ði ʌmˈbrelə/", "The doctor remembered the umbrella."),
    ],
  },
  {
    id: "uː", ipa: "uː", category: "monophthong", chartPos: { x: 294, y: 30 },
    label: "close back rounded vowel", keyword: "the GOOSE vowel",
    hint: "Push the lips into a tight circle and raise the tongue high at the back — long and tense.",
    keywords: ["blue", "through", "soup"],
    syllables: [d("/bluː/", "blue"), d("/fuːd/", "food"), d("/ʃuː/", "shoe"), d("/tuː/", "two"), d("/huː/", "who")],
    words: [d("/duː/", "do"), d("/muːv/", "move"), d("/ɡruːp/", "group"), d("/θruː/", "through"), d("/suːp/", "soup"), d("/dʒuːn/", "June")],
    sentences: [
      d("/huː muːvd maɪ bluː ʃuːz/", "Who moved my blue shoes?"),
      d("/ðə muːn rəʊz ˈəʊvə ðə leɪk ɪn dʒuːn/", "The moon rose over the lake in June."),
    ],
  },
  {
    id: "ɔː", ipa: "ɔː", category: "monophthong", chartPos: { x: 292, y: 96 },
    label: "open-mid back rounded vowel", keyword: "the THOUGHT vowel",
    hint: "Round and open at the back — jaw fairly low, lips in a firm circle, held long.",
    keywords: ["four", "water", "daughter"],
    syllables: [d("/fɔː/", "four"), d("/dɔː/", "door"), d("/mɔː/", "more"), d("/sɔː/", "saw"), d("/tɔːl/", "tall")],
    words: [d("/wɔːk/", "walk"), d("/ˈwɔːtə/", "water"), d("/θɔːt/", "thought"), d("/bɔːd/", "board"), d("/bɪˈfɔː/", "before"), d("/ˈdɔːtə/", "daughter")],
    sentences: [
      d("/ɔːl smɔːl bɔɪz əˈdɔː ðə ˈdaɪnəsɔː/", "All small boys adore the dinosaur."),
      d("/fɔː mɔː dɔːz nəʊ mɔː ðæn bɪˈfɔː/", "Four more doors — no more than before."),
    ],
  },
  {
    id: "ɜː", ipa: "ɜː", category: "monophthong", chartPos: { x: 178, y: 122 },
    label: "open-mid central unrounded vowel", keyword: "the NURSE vowel",
    hint: "Pull the lips back slightly, tongue flat in the centre — a long, neutral hum. Don't roll the r.",
    keywords: ["bird", "world", "journey"],
    syllables: [d("/bɜːd/", "bird"), d("/hɜː/", "her"), d("/fɜː/", "fur"), d("/wɜːk/", "work"), d("/lɜːn/", "learn")],
    words: [d("/ɡɜːl/", "girl"), d("/wɜːld/", "world"), d("/wɜːd/", "word"), d("/hɜːd/", "heard"), d("/ˈɜːli/", "early"), d("/ˈdʒɜːni/", "journey")],
    sentences: [
      d("/hɜː fɜːst wɜːd wəz hɜːd baɪ ðə nɜːs/", "Her first word was heard by the nurse."),
      d("/ˈθɜːti bɜːdz tɜːnd təˈwɔːdz ði ɜːθ/", "Thirty birds turned towards the earth."),
    ],
  },
  {
    id: "ɑː", ipa: "ɑː", category: "monophthong", chartPos: { x: 212, y: 208 },
    label: "open back unrounded vowel", keyword: "the BATH vowel",
    hint: "Open the jaw wide at the back — no lip rounding, a long dark 'ah' as in 'spa'.",
    keywords: ["car", "dance", "heart"],
    syllables: [d("/kɑː/", "car"), d("/bɑː/", "bar"), d("/fɑː/", "far"), d("/pɑːk/", "park"), d("/kɑːm/", "calm")],
    words: [d("/hɑːt/", "heart"), d("/ˈrɑːðə/", "rather"), d("/mɑːtʃ/", "march"), d("/ɑːsk/", "ask"), d("/dɑːns/", "dance"), d("/pɑːst/", "past")],
    sentences: [
      d("/maɪ ˈfɑːðə ˈdɑːnsɪz ɪn ðə ˈɡɑːdn/", "My father dances in the garden."),
      d("/hɑːf ðə klɑːs pɑːst ði ɪɡˈzæm/", "Half the class passed the exam."),
    ],
  },

  // ───────────────────────── DIPHTHONGS ─────────────────────────
  {
    id: "eɪ", ipa: "eɪ", category: "diphthong",
    label: "closing diphthong e → ɪ", keyword: "the FACE vowel",
    hint: "Start on /e/ and glide up towards /ɪ/ — one smooth movement, never two separate vowels.",
    keywords: ["day", "great", "straight"],
    syllables: [d("/deɪ/", "day"), d("/seɪ/", "say"), d("/meɪ/", "may"), d("/eɪt/", "eight"), d("/weɪt/", "wait")],
    words: [d("/meɪk/", "make"), d("/reɪn/", "rain"), d("/ɡreɪt/", "great"), d("/ðeɪ/", "they"), d("/tʃeɪndʒ/", "change"), d("/streɪt/", "straight")],
    sentences: [
      d("/ðeɪ pleɪ ɔːl deɪ ɪn meɪ/", "They play all day in May."),
      d("/ðə treɪn keɪm leɪt əˈɡen təˈdeɪ/", "The train came late again today."),
    ],
  },
  {
    id: "aɪ", ipa: "aɪ", category: "diphthong",
    label: "closing diphthong a → ɪ", keyword: "the PRICE vowel",
    hint: "Fall from an open /a/ up to a light /ɪ/ — a big, confident glide.",
    keywords: ["eye", "island", "quiet"],
    syllables: [d("/aɪ/", "I"), d("/maɪ/", "my"), d("/haɪ/", "high"), d("/flaɪ/", "fly"), d("/taɪm/", "time")],
    words: [d("/aɪ/", "eye"), d("/laɪk/", "like"), d("/waɪt/", "white"), d("/raɪs/", "rice"), d("/ˈkwaɪət/", "quiet"), d("/ˈaɪlənd/", "island")],
    sentences: [
      d("/aɪ laɪk braɪt waɪt raɪs/", "I like bright white rice."),
      d("/faɪv ˈdraɪvəz əˈraɪvd ət naɪn/", "Five drivers arrived at nine."),
    ],
  },
  {
    id: "ɔɪ", ipa: "ɔɪ", category: "diphthong",
    label: "closing diphthong ɔ → ɪ", keyword: "the CHOICE vowel",
    hint: "Start rounded and open at the back, then glide forward to /ɪ/ — keep it one syllable.",
    keywords: ["boy", "royal", "oyster"],
    syllables: [d("/bɔɪ/", "boy"), d("/tɔɪ/", "toy"), d("/ɔɪl/", "oil"), d("/kɔɪn/", "coin"), d("/vɔɪs/", "voice")],
    words: [d("/ɪnˈdʒɔɪ/", "enjoy"), d("/nɔɪz/", "noise"), d("/pɔɪnt/", "point"), d("/ˈrɔɪəl/", "royal"), d("/ˈɔɪstə/", "oyster"), d("/ˈlɔɪəl/", "loyal")],
    sentences: [
      d("/ðə ˈlɪtl bɔɪ meɪd ə laʊd nɔɪz/", "The little boy made a loud noise."),
      d("/ɪnˈdʒɔɪ ði ˈɔɪstə ɪts ə ˈrɔɪəl triːt/", "Enjoy the oyster — it's a royal treat."),
    ],
  },
  {
    id: "əʊ", ipa: "əʊ", category: "diphthong",
    label: "closing diphthong ə → ʊ", keyword: "the GOAT vowel",
    hint: "Begin on a central schwa, then round and close towards /ʊ/ — the classic British 'oh'.",
    keywords: ["go", "phone", "alone"],
    syllables: [d("/ɡəʊ/", "go"), d("/nəʊ/", "no"), d("/həʊm/", "home"), d("/rəʊd/", "road"), d("/nəʊ/", "know")],
    words: [d("/kəʊt/", "coat"), d("/bəʊθ/", "both"), d("/ˈəʊpən/", "open"), d("/fəʊn/", "phone"), d("/əˈləʊn/", "alone"), d("/səʊl/", "soul")],
    sentences: [
      d("/dəʊnt ɡəʊ həʊm səʊ suːn/", "Don't go home so soon."),
      d("/nəʊ wʌn nəʊz ði əʊld rəʊd/", "No one knows the old road."),
    ],
  },
  {
    id: "aʊ", ipa: "aʊ", category: "diphthong",
    label: "closing diphthong a → ʊ", keyword: "the MOUTH vowel",
    hint: "Open wide on /a/, then round up to /ʊ/ — a big 'ow' glide.",
    keywords: ["how", "south", "allow"],
    syllables: [d("/haʊ/", "how"), d("/naʊ/", "now"), d("/aʊt/", "out"), d("/taʊn/", "town"), d("/haʊs/", "house")],
    words: [d("/aʊə/", "our"), d("/saʊθ/", "south"), d("/əˈbaʊt/", "about"), d("/faʊnd/", "found"), d("/əˈlaʊ/", "allow"), d("/laʊd/", "loud")],
    sentences: [
      d("/haʊ naʊ braʊn kaʊ/", "How now, brown cow?"),
      d("/aʊə haʊs stændz saʊθ əv taʊn/", "Our house stands south of town."),
    ],
  },
  {
    id: "ɪə", ipa: "ɪə", category: "diphthong",
    label: "centring diphthong ɪ → ə", keyword: "the NEAR vowel",
    hint: "Start on a clear /ɪ/, then relax into schwa — no 'r' sound, just the glide.",
    keywords: ["here", "idea", "serious"],
    syllables: [d("/hɪə/", "here"), d("/ɪə/", "ear"), d("/jɪə/", "year"), d("/nɪə/", "near"), d("/bɪə/", "beer")],
    words: [d("/aɪˈdɪə/", "idea"), d("/rɪəl/", "real"), d("/ˈhɪərəʊ/", "hero"), d("/ˈsɪəriəs/", "serious"), d("/ˈmɪrə/", "mirror"), d("/hɪə/", "hear")],
    sentences: [
      d("/kʌm nɪə ənd hɪə ðɪs aɪˈdɪə/", "Come near and hear this idea."),
      d("/ðə ˈhɪərəʊ ɪz ˈrɪəli ˈsɪəriəs/", "The hero is really serious."),
    ],
  },
  {
    id: "eə", ipa: "eə", category: "diphthong",
    label: "centring diphthong e → ə", keyword: "the SQUARE vowel",
    hint: "Open on /e/, glide to a relaxed schwa — as in 'air', with no hard r.",
    keywords: ["there", "parents", "aware"],
    syllables: [d("/eə/", "air"), d("/ðeə/", "there"), d("/weə/", "where"), d("/keə/", "care"), d("/tʃeə/", "chair")],
    words: [d("/ðeə/", "their"), d("/ʃeə/", "share"), d("/ˈpeərənts/", "parents"), d("/prɪˈpeə/", "prepare"), d("/əˈweə/", "aware"), d("/skweə/", "square")],
    sentences: [
      d("/weəz ðə tʃeə ˈəʊvə ðeə/", "Where's the chair over there?"),
      d("/teɪk keə ɒn ðə skweə stəʊn steəz/", "Take care on the square stone stairs."),
    ],
  },
  {
    id: "ʊə", ipa: "ʊə", category: "diphthong",
    label: "centring diphthong ʊ → ə", keyword: "the CURE vowel",
    hint: "From a rounded /ʊ/, relax down to schwa — a rarer glide, heard in 'tour' and 'sure'.",
    keywords: ["tour", "Europe", "brochure"],
    syllables: [d("/tʊə/", "tour"), d("/pjʊə/", "pure"), d("/ʃʊə/", "sure"), d("/kjʊə/", "cure"), d("/pʊə/", "poor")],
    words: [d("/ˈjʊərəp/", "Europe"), d("/ˈtʊərɪst/", "tourist"), d("/ˈdʒʊəri/", "jury"), d("/ˈfjʊəriəs/", "furious"), d("/ˈbrəʊʃʊə/", "brochure"), d("/ɪnˈdjʊə/", "endure")],
    sentences: [
      d("/ɑː juː ʃʊə ðə tʊə wəz pjʊə fʌn/", "Are you sure the tour was pure fun?"),
      d("/ðə pʊə ˈtʊərɪst lɒst ðə ˈbrəʊʃʊə/", "The poor tourist lost the brochure."),
    ],
  },

  // ───────────────────────── PLOSIVES ─────────────────────────
  {
    id: "p", ipa: "p", category: "plosive", voiced: false,
    label: "voiceless bilabial plosive", keyword: "as in 'paper'",
    hint: "Close both lips, build air pressure, release with a small puff — hold a hand in front of your mouth to feel it.",
    keywords: ["paper", "happy", "perhaps"],
    syllables: [d("/piː/", "pea"), d("/peɪ/", "pay"), d("/pɒp/", "pop"), d("/ʌp/", "up"), d("/pʌp/", "pup")],
    words: [d("/ˈpeɪpə/", "paper"), d("/ˈæpl/", "apple"), d("/ˈhæpi/", "happy"), d("/pəˈhæps/", "perhaps"), d("/stɒp/", "stop"), d("/ˈpiːpl/", "people")],
    sentences: [
      d("/ˈpiːtə pɪkt ə pek əv ˈpepəz/", "Peter picked a peck of peppers."),
      d("/pɒp ðə tɒp ɒf ðə ˈplɑːstɪk pɒt/", "Pop the top off the plastic pot."),
    ],
  },
  {
    id: "b", ipa: "b", category: "plosive", voiced: true,
    label: "voiced bilabial plosive", keyword: "as in 'bubble'",
    hint: "Same lip closure as /p/, but switch the voice on — no puff of air, just a soft buzz.",
    keywords: ["bubble", "build", "maybe"],
    syllables: [d("/biː/", "bee"), d("/baɪ/", "buy"), d("/bɒb/", "bob"), d("/bɪb/", "bib"), d("/tʌb/", "tub")],
    words: [d("/ˈbʌbl/", "bubble"), d("/ˈrɒbə/", "robber"), d("/əˈbʌv/", "above"), d("/bɪld/", "build"), d("/kəʊm/", "comb"), d("/ˈmeɪbi/", "maybe")],
    sentences: [
      d("/ˈbɒbi bɪlt ə bɪɡ bluː bəʊt/", "Bobby built a big blue boat."),
      d("/ðə ˈræbɪt bɪt ðə ˈrʌbə bænd/", "The rabbit bit the rubber band."),
    ],
  },
  {
    id: "t", ipa: "t", category: "plosive", voiced: false,
    label: "voiceless alveolar plosive", keyword: "as in 'water'",
    hint: "Tongue tip on the ridge behind the teeth, sharp release with a puff — crisper than in many languages.",
    keywords: ["water", "often", "mountain"],
    syllables: [d("/tiː/", "tea"), d("/taɪ/", "tie"), d("/taɪt/", "tight"), d("/ɪt/", "it"), d("/kæt/", "cat")],
    words: [d("/ˈwɔːtə/", "water"), d("/ˈletə/", "letter"), d("/ˈbetə/", "better"), d("/ˈɒfn/", "often"), d("/ˈmaʊntɪn/", "mountain"), d("/təˈnaɪt/", "tonight")],
    sentences: [
      d("/ˈtwenti ˈtaɪni ˈtaɪɡəz tʊk ðə treɪn/", "Twenty tiny tigers took the train."),
      d("/wɒt ə lɒt əv ˈwɔːtər ɪn ðə ˈbɒtl/", "What a lot of water in the bottle."),
    ],
  },
  {
    id: "d", ipa: "d", category: "plosive", voiced: true,
    label: "voiced alveolar plosive", keyword: "as in 'ladder'",
    hint: "Tongue tip on the ridge again, voiced and gentle — no puff, the vocal cords hum.",
    keywords: ["ladder", "sudden", "would"],
    syllables: [d("/deɪ/", "day"), d("/daɪ/", "die"), d("/dɒɡ/", "dog"), d("/dɪd/", "did"), d("/ɒd/", "odd")],
    words: [d("/ˈlædə/", "ladder"), d("/ˈsʌdn/", "sudden"), d("/ˈhɪdn/", "hidden"), d("/wʊd/", "would"), d("/dʒʌdʒ/", "judge"), d("/raɪd/", "ride")],
    sentences: [
      d("/ˈdeɪvɪd dɪd ðə ˈdɪʃɪz ˈɑːftə ˈdɪnə/", "David did the dishes after dinner."),
      d("/ə ɡʊd diːd ɪz ˈnevə ˈhɪdn/", "A good deed is never hidden."),
    ],
  },
  {
    id: "k", ipa: "k", category: "plosive", voiced: false,
    label: "voiceless velar plosive", keyword: "as in 'quick'",
    hint: "Back of the tongue against the soft palate — the puff is strongest before 'ee', weakest before 'oo'.",
    keywords: ["school", "quick", "chemistry"],
    syllables: [d("/kiː/", "key"), d("/kɑː/", "car"), d("/kʊk/", "cook"), d("/kæt/", "cat"), d("/bæk/", "back")],
    words: [d("/skuːl/", "school"), d("/ˈmjuːzɪk/", "music"), d("/kwɪk/", "quick"), d("/bɪˈkɒz/", "because"), d("/ˈkemɪstri/", "chemistry"), d("/ˈpɒkɪt/", "pocket")],
    sentences: [
      d("/kæn ðə kʊk kiːp ðə ˈkɪtʃɪn kliːn/", "Can the cook keep the kitchen clean?"),
      d("/ə kwɪk kɪk krækt ðə klɒk/", "A quick kick cracked the clock."),
    ],
  },
  {
    id: "ɡ", ipa: "ɡ", category: "plosive", voiced: true,
    label: "voiced velar plosive", keyword: "as in 'begin'",
    hint: "Same back closure as /k/ with the voice on — a firm 'g', never a throat scrape.",
    keywords: ["again", "guess", "language"],
    syllables: [d("/ɡəʊ/", "go"), d("/ɡet/", "get"), d("/bɪɡ/", "big"), d("/ɡæɡ/", "gag"), d("/ɡæs/", "gas")],
    words: [d("/əˈɡen/", "again"), d("/bɪˈɡɪn/", "begin"), d("/ɡes/", "guess"), d("/ˈlæŋɡwɪdʒ/", "language"), d("/ˈbɪɡə/", "bigger"), d("/eɡ/", "egg")],
    sentences: [
      d("/ðə ɡɜːl ɡeɪv ðə dɒɡ ə ɡʊd hʌɡ/", "The girl gave the dog a good hug."),
      d("/bɪˈɡɪn əˈɡen ənd ɡɪv ɪt ə ɡəʊ/", "Begin again and give it a go."),
    ],
  },

  // ───────────────────────── NASALS ─────────────────────────
  {
    id: "m", ipa: "m", category: "nasal", voiced: true,
    label: "voiced bilabial nasal", keyword: "as in 'summer'",
    hint: "Lips closed, voice humming out through the nose — let it ring.",
    keywords: ["summer", "hammer", "swimming"],
    syllables: [d("/miː/", "me"), d("/maɪ/", "my"), d("/həʊm/", "home"), d("/sʌm/", "sum"), d("/mæp/", "map")],
    words: [d("/ˈsʌmə/", "summer"), d("/ˈhæmə/", "hammer"), d("/kʌm/", "come"), d("/neɪm/", "name"), d("/ˈswɪmɪŋ/", "swimming"), d("/mʌm/", "mum")],
    sentences: [
      d("/maɪ mʌm meɪks ˈmɑːməleɪd ɪn meɪ/", "My mum makes marmalade in May."),
      d("/ˈmeni men məʊ ðə ˈmedəʊ/", "Many men mow the meadow."),
    ],
  },
  {
    id: "n", ipa: "n", category: "nasal", voiced: true,
    label: "voiced alveolar nasal", keyword: "as in 'dinner'",
    hint: "Tongue tip on the ridge, air through the nose — a bright, forward hum.",
    keywords: ["dinner", "funny", "none"],
    syllables: [d("/nəʊ/", "no"), d("/nəʊ/", "know"), d("/sʌn/", "sun"), d("/net/", "net"), d("/ɒn/", "on")],
    words: [d("/ˈdɪnə/", "dinner"), d("/ˈfʌni/", "funny"), d("/naɪn/", "nine"), d("/nʌn/", "none"), d("/ˈmʌni/", "money"), d("/rʌn/", "run")],
    sentences: [
      d("/ˈnænsi niːdz naɪn njuː ˈnəʊtbʊks/", "Nancy needs nine new notebooks."),
      d("/nəʊ wʌn ˈnəʊtɪst ðə nɔɪz ət nuːn/", "No one noticed the noise at noon."),
    ],
  },
  {
    id: "ŋ", ipa: "ŋ", category: "nasal", voiced: true,
    label: "voiced velar nasal", keyword: "as in 'singing'",
    hint: "Back of the tongue on the soft palate, humming through the nose — it always follows a vowel and never starts a word.",
    keywords: ["morning", "finger", "English"],
    syllables: [d("/sɪŋ/", "sing"), d("/lɒŋ/", "long"), d("/rɪŋ/", "ring"), d("/sɒŋ/", "song"), d("/kɪŋ/", "king")],
    words: [d("/ˈmɔːnɪŋ/", "morning"), d("/ˈfɪŋɡə/", "finger"), d("/ˈɪŋɡlɪʃ/", "English"), d("/ˈθɪŋkɪŋ/", "thinking"), d("/jʌŋ/", "young"), d("/ˈhæŋɪŋ/", "hanging")],
    sentences: [
      d("/ðə jʌŋ kɪŋ sæŋ ə lɒŋ sɒŋ/", "The young king sang a long song."),
      d("/ˈmɔːnɪŋ brɪŋz ə njuː bɪˈɡɪnɪŋ/", "Morning brings a new beginning."),
    ],
  },

  // ───────────────────────── FRICATIVES ─────────────────────────
  {
    id: "f", ipa: "f", category: "fricative", voiced: false,
    label: "voiceless labiodental fricative", keyword: "as in 'coffee'",
    hint: "Top teeth rest on the lower lip — blow air steadily, no voice.",
    keywords: ["coffee", "phone", "laugh"],
    syllables: [d("/fiː/", "fee"), d("/fɔː/", "four"), d("/liːf/", "leaf"), d("/ɒf/", "off"), d("/ɪf/", "if")],
    words: [d("/ˈkɒfi/", "coffee"), d("/fəʊn/", "phone"), d("/lɑːf/", "laugh"), d("/hɑːf/", "half"), d("/freɪz/", "phrase"), d("/ɡrɑːf/", "graph")],
    sentences: [
      d("/fɔː faɪn fɪʃ fel ɒf ðə fens/", "Four fine fish fell off the fence."),
      d("/fəʊn ðə ˈkæfeɪ əˈbaʊt ðə ˈfəʊtəʊ/", "Phone the café about the photo."),
    ],
  },
  {
    id: "v", ipa: "v", category: "fricative", voiced: true,
    label: "voiced labiodental fricative", keyword: "as in 'seven'",
    hint: "Same teeth-on-lip contact as /f/, but add voice — you should feel the lower lip tingle.",
    keywords: ["very", "river", "move"],
    syllables: [d("/vaɪ/", "vie"), d("/vaʊ/", "vow"), d("/lʌv/", "love"), d("/faɪv/", "five"), d("/dʌv/", "dove")],
    words: [d("/ˈveri/", "very"), d("/ˈsevn/", "seven"), d("/ˈrɪvə/", "river"), d("/hæv/", "have"), d("/muːv/", "move"), d("/vɔɪs/", "voice")],
    sentences: [
      d("/vɪv ɡeɪv ˈsevn ˈveri ˈvæljuəbl ˈvɑːzɪz/", "Viv gave seven very valuable vases."),
      d("/ðə ˈrɪvə muːvz ˈəʊvə ðə stəʊnz/", "The river moves over the stones."),
    ],
  },
  {
    id: "θ", ipa: "θ", category: "fricative", voiced: false,
    label: "voiceless dental fricative", keyword: "as in 'think'",
    hint: "Tongue tip between the teeth — blow air gently. 'Think', never 'sink' or 'tink'.",
    keywords: ["think", "month", "theatre"],
    syllables: [d("/θaɪ/", "thigh"), d("/θʌm/", "thumb"), d("/θriː/", "three"), d("/bɑːθ/", "bath"), d("/bəʊθ/", "both")],
    words: [d("/θɪŋk/", "think"), d("/mʌnθ/", "month"), d("/ˈnʌθɪŋ/", "nothing"), d("/ˈɔːθə/", "author"), d("/ˈθɪətə/", "theatre"), d("/saʊθ/", "south")],
    sentences: [
      d("/ði ˈæθliːt θɪŋks əˈbaʊt ˈθɜːzdeɪ/", "The athlete thinks about Thursday."),
      d("/ˈθɜːti ˈθaʊznd ˈfeðəz bəʊθ təˈɡeðə/", "Thirty thousand feathers, both together."),
    ],
  },
  {
    id: "ð", ipa: "ð", category: "fricative", voiced: true,
    label: "voiced dental fricative", keyword: "as in 'this'",
    hint: "Tongue between the teeth again, this time with voice — the sound of 'this', 'that', 'the'.",
    keywords: ["mother", "weather", "another"],
    syllables: [d("/ðɪs/", "this"), d("/ðæt/", "that"), d("/beɪð/", "bathe"), d("/briːð/", "breathe"), d("/smuːð/", "smooth")],
    words: [d("/ˈmʌðə/", "mother"), d("/ˈfɑːðə/", "father"), d("/ˈweðə/", "weather"), d("/ˈbrʌðə/", "brother"), d("/əˈnʌðə/", "another"), d("/wɪð/", "with")],
    sentences: [
      d("/ðɪs ənd ðæt ðiːz ənd ðəʊz/", "This and that, these and those."),
      d("/maɪ ˈmʌðər ənd ˈfɑːðə breɪvd ðə ˈweðə/", "My mother and father braved the weather."),
    ],
  },
  {
    id: "s", ipa: "s", category: "fricative", voiced: false,
    label: "voiceless alveolar fricative", keyword: "as in 'city'",
    hint: "Tongue tip close to the ridge, air hissing down the centre — a sharp, long snake sound.",
    keywords: ["city", "science", "castle"],
    syllables: [d("/siː/", "sea"), d("/sɪt/", "sit"), d("/bʌs/", "bus"), d("/jes/", "yes"), d("/aɪs/", "ice")],
    words: [d("/ˈsɪti/", "city"), d("/ˈsaɪəns/", "science"), d("/naɪs/", "nice"), d("/piːs/", "piece"), d("/mɪs/", "miss"), d("/ˈkɑːsl/", "castle")],
    sentences: [
      d("/sɪks slɪm swɒnz swæm ˈsləʊli saʊθ/", "Six slim swans swam slowly south."),
      d("/ðə ˈsaɪəns klɑːs sɔː ðə ˈkɑːsl/", "The science class saw the castle."),
    ],
  },
  {
    id: "z", ipa: "z", category: "fricative", voiced: true,
    label: "voiced alveolar fricative", keyword: "as in 'busy'",
    hint: "Same position as /s/ with the voice on — a bee's buzz, kept light and forward.",
    keywords: ["busy", "cousin", "scissors"],
    syllables: [d("/zuː/", "zoo"), d("/ˈzɪərəʊ/", "zero"), d("/hɪz/", "his"), d("/dʒæz/", "jazz"), d("/bʌz/", "buzz")],
    words: [d("/ˈbɪzi/", "busy"), d("/pliːz/", "please"), d("/ˈkʌzn/", "cousin"), d("/ˈsɪzəz/", "scissors"), d("/ˈhaʊzɪz/", "houses"), d("/nɔɪz/", "noise")],
    sentences: [
      d("/ˈzəʊiz ˈkʌzn tʃəʊz ðəʊz ˈrəʊzɪz/", "Zoe's cousin chose those roses."),
      d("/ðə biːz bʌz ɪn ðə briːz/", "The bees buzz in the breeze."),
    ],
  },
  {
    id: "ʃ", ipa: "ʃ", category: "fricative", voiced: false,
    label: "voiceless post-alveolar fricative", keyword: "as in 'station'",
    hint: "Pull the tongue back from /s/ and round the lips a little — a soft, hushed 'shhh'.",
    keywords: ["station", "ocean", "sugar"],
    syllables: [d("/ʃiː/", "she"), d("/ʃəʊ/", "show"), d("/ʃuː/", "shoe"), d("/dɪʃ/", "dish"), d("/wɪʃ/", "wish")],
    words: [d("/ˈsteɪʃn/", "station"), d("/ˈəʊʃn/", "ocean"), d("/ˈʃʊɡə/", "sugar"), d("/məˈʃiːn/", "machine"), d("/ˈspeʃl/", "special"), d("/ʃʊə/", "sure")],
    sentences: [
      d("/ʃi selz ˈsiːʃelz baɪ ðə ˈsiːʃɔː/", "She sells seashells by the seashore."),
      d("/ðə ʃef wɒʃt ðə ˈdɪʃɪz ˈsləʊli/", "The chef washed the dishes slowly."),
    ],
  },
  {
    id: "ʒ", ipa: "ʒ", category: "fricative", voiced: true,
    label: "voiced post-alveolar fricative", keyword: "as in 'vision'",
    hint: "The voiced twin of /ʃ/ — rare in English, hiding inside 'vision', 'measure', 'pleasure'.",
    keywords: ["measure", "treasure", "usually"],
    syllables: [d("/ruːʒ/", "rouge"), d("/beɪʒ/", "beige"), d("/ˈɡærɑːʒ/", "garage"), d("/ˈvɪʒn/", "vision"), d("/ˈmeʒə/", "measure")],
    words: [d("/ˈvɪʒn/", "vision"), d("/ˈmeʒə/", "measure"), d("/ˈpleʒə/", "pleasure"), d("/ˈjuːʒuəli/", "usually"), d("/ˈtreʒə/", "treasure"), d("/ˈeɪʒə/", "Asia")],
    sentences: [
      d("/ðə ˈtreʒə wəz bɪˈjɒnd ˈmeʒə/", "The treasure was beyond measure."),
      d("/ʃi tʊk ˈpleʒər ɪn ði ˈjuːʒuəl ruːˈtiːn/", "She took pleasure in the usual routine."),
    ],
  },
  {
    id: "h", ipa: "h", category: "fricative", voiced: false,
    label: "voiceless glottal fricative", keyword: "as in 'hello'",
    hint: "Just a gentle breath of air from the throat — the following vowel gives it its colour.",
    keywords: ["hello", "behind", "vehicle"],
    syllables: [d("/hiː/", "he"), d("/haɪ/", "hi"), d("/hæt/", "hat"), d("/hɪl/", "hill"), d("/əˈhed/", "ahead")],
    words: [d("/həˈləʊ/", "hello"), d("/bɪˈhaɪnd/", "behind"), d("/haʊs/", "house"), d("/huː/", "who"), d("/ˈviːɪkl/", "vehicle"), d("/ˈhʌndrəd/", "hundred")],
    sentences: [
      d("/hi hɜːd ə hɔːs ɪn ðə hɔːl/", "He heard a horse in the hall."),
      d("/ə ˈhʌndrəd hæts hʌŋ ɒn ðə hɪl/", "A hundred hats hung on the hill."),
    ],
  },

  // ───────────────────────── AFFRICATES ─────────────────────────
  {
    id: "tʃ", ipa: "tʃ", category: "affricate", voiced: false,
    label: "voiceless post-alveolar affricate", keyword: "as in 'teacher'",
    hint: "A /t/ that melts straight into /ʃ/ — one contact, one burst: 'ch'.",
    keywords: ["teacher", "picture", "question"],
    syllables: [d("/tʃeə/", "chair"), d("/tʃɪn/", "chin"), d("/wɒtʃ/", "watch"), d("/tiːtʃ/", "teach"), d("/rɪtʃ/", "rich")],
    words: [d("/ˈtiːtʃə/", "teacher"), d("/ˈpɪktʃə/", "picture"), d("/ˈneɪtʃə/", "nature"), d("/ˈtʃɪkɪn/", "chicken"), d("/ˈkwestʃən/", "question"), d("/tʃiːp/", "cheap")],
    sentences: [
      d("/ˈtʃɑːli tʃəʊz ə ˈtʃɒklɪt tʃɪp/", "Charlie chose a chocolate chip."),
      d("/iːtʃ tʃaɪld wɒtʃt ðə ˈtʃɪkɪn tʃeɪs/", "Each child watched the chicken chase."),
    ],
  },
  {
    id: "dʒ", ipa: "dʒ", category: "affricate", voiced: true,
    label: "voiced post-alveolar affricate", keyword: "as in 'jacket'",
    hint: "/d/ gliding into /ʒ/ with the voice on — a firm 'j', as in 'jam'.",
    keywords: ["jacket", "danger", "major"],
    syllables: [d("/dʒæm/", "jam"), d("/dʒɔː/", "jaw"), d("/peɪdʒ/", "page"), d("/eɪdʒ/", "age"), d("/hjuːdʒ/", "huge")],
    words: [d("/ˈdʒækɪt/", "jacket"), d("/ˈdeɪndʒə/", "danger"), d("/brɪdʒ/", "bridge"), d("/ɪnˈdʒɔɪ/", "enjoy"), d("/ˈmeɪdʒə/", "major"), d("/dʒʌst/", "just")],
    sentences: [
      d("/ðə dʒʌdʒ ɪnˈdʒɔɪd ði ˈɒrɪndʒ dʒæm/", "The judge enjoyed the orange jam."),
      d("/ə ˈdʒentl ˈdʒaɪənt dʒɒɡd əˈkrɒs ðə brɪdʒ/", "A gentle giant jogged across the bridge."),
    ],
  },

  // ───────────────────────── APPROXIMANTS ─────────────────────────
  {
    id: "w", ipa: "w", category: "approximant", voiced: true,
    label: "voiced labio-velar approximant", keyword: "as in 'woman'",
    hint: "Round the lips like /uː/ then glide into the vowel — no friction, no biting the lip.",
    keywords: ["woman", "one", "twelve"],
    syllables: [d("/wiː/", "we"), d("/waɪ/", "why"), d("/waɪn/", "wine"), d("/wet/", "wet"), d("/əˈweɪ/", "away")],
    words: [d("/ˈwʊmən/", "woman"), d("/wʌn/", "one"), d("/ˈɔːlweɪz/", "always"), d("/kwɪk/", "quick"), d("/ˈlæŋɡwɪdʒ/", "language"), d("/twelv/", "twelve")],
    sentences: [
      d("/wi went west wɪð ðə wɪnd/", "We went west with the wind."),
      d("/ðə ˈwʊmən wʌn twelv wɔːm ˈswetəz/", "The woman won twelve warm sweaters."),
    ],
  },
  {
    id: "r", ipa: "r", category: "approximant", voiced: true,
    label: "voiced post-alveolar approximant", keyword: "as in 'really'",
    hint: "Curl the tongue tip towards the ridge without touching — the British r is soft, never rolled or growled.",
    keywords: ["sorry", "hurry", "library"],
    syllables: [d("/red/", "red"), d("/rəʊd/", "road"), d("/rɪŋ/", "ring"), d("/raɪt/", "right"), d("/ˈveri/", "very")],
    words: [d("/ˈsɒri/", "sorry"), d("/ˈrɪəli/", "really"), d("/ˈhʌri/", "hurry"), d("/əˈraʊnd/", "around"), d("/ˈlaɪbrəri/", "library"), d("/ˈmɪrə/", "mirror")],
    sentences: [
      d("/ˈrɔːri rəʊld ðə red ˈlɒri raʊnd ðə ˈkɔːnə/", "Rory rolled the red lorry round the corner."),
      d("/ˈhʌri ðə treɪn əˈraɪvz əˈraʊnd θriː/", "Hurry — the train arrives around three."),
    ],
  },
  {
    id: "j", ipa: "j", category: "approximant", voiced: true,
    label: "voiced palatal approximant", keyword: "as in 'young'",
    hint: "Start at the /iː/ position and glide into the vowel — the 'y' in 'yes', light and quick.",
    keywords: ["young", "music", "million"],
    syllables: [d("/jes/", "yes"), d("/juː/", "you"), d("/jɪə/", "year"), d("/jet/", "yet"), d("/bɪˈjɒnd/", "beyond")],
    words: [d("/jʌŋ/", "young"), d("/juːz/", "use"), d("/ˈmjuːzɪk/", "music"), d("/vjuː/", "view"), d("/ˈmɪljən/", "million"), d("/ˈʌnjən/", "onion")],
    sentences: [
      d("/juː njuː ðə njuːz wəz truː/", "You knew the news was true."),
      d("/ə ˈmɪljən vjuːz əv ðə ˈjeləʊ muːn/", "A million views of the yellow moon."),
    ],
  },
  {
    id: "l", ipa: "l", category: "approximant", voiced: true,
    label: "voiced alveolar lateral approximant", keyword: "as in 'little'",
    hint: "Tongue tip on the ridge, air flowing around the sides — light 'l' before vowels, a dark velarised 'l' at the end of words.",
    keywords: ["little", "bottle", "yellow"],
    syllables: [d("/leɪ/", "lay"), d("/ləʊ/", "low"), d("/laɪt/", "light"), d("/wel/", "well"), d("/fʊl/", "full")],
    words: [d("/ˈlɪtl/", "little"), d("/ˈbɒtl/", "bottle"), d("/ˈɔːlweɪz/", "always"), d("/ˈjeləʊ/", "yellow"), d("/lʌv/", "love"), d("/ˈrɪəli/", "really")],
    sentences: [
      d("/ˈlɪli lʌvz ðə ˈlɪtl ˈbluːbelz/", "Lily loves the little bluebells."),
      d("/ðə tɔːl wɔːl fel ɪn ðə hɔːl/", "The tall wall fell in the hall."),
    ],
  },
];

export const PHONEME_MAP = new Map(PHONEMES.map((p) => [p.id, p]));

export const VOWELS = PHONEMES.filter((p) => p.category === "monophthong");
export const DIPHTHONGS = PHONEMES.filter((p) => p.category === "diphthong");
export const CONSONANTS = PHONEMES.filter(
  (p) => p.category !== "monophthong" && p.category !== "diphthong"
);

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

export const TOTAL_DRILLS = PHONEMES.reduce(
  (n, p) => n + p.syllables.length + p.words.length + p.sentences.length,
  0
);
