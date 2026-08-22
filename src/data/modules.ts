/* ═══════════════════════════════════════════════════════════════════════════
   Skills-lab datasets: consonant clusters, word stress, sentence stress,
   connected speech and daily conversations. Purely additive — the phoneme
   bench in data/phonemes.ts is untouched.
   ═══════════════════════════════════════════════════════════════════════ */

export interface Tw {
  t: string;
  ipa: string;
}

/* ── 1 · consonant clusters ─────────────────────────────────────────────── */
export interface ClusterItem {
  id: string;
  ipa: string;
  rule: string;
  words: Tw[]; // progressive: isolated → embedded → longer
  sent: Tw;
  talk: string;
  foils: string[]; // two rival clusters for the identify step
}

export const CLUSTERS: ClusterItem[] = [
  {
    id: "pl", ipa: "/pl/", rule: "Close the lips for /p/, then release straight into /l/ — no vowel between.",
    words: [{ t: "play", ipa: "/pleɪ/" }, { t: "plate", ipa: "/pleɪt/" }, { t: "supply", ipa: "/səˈplaɪ/" }],
    sent: { t: "Please place the plates by the window.", ipa: "/pliːz pleɪs ðə pleɪts baɪ ðə ˈwɪndəʊ/" },
    talk: "Plan a picnic: say what you will bring using 'pl' words.",
    foils: ["/bl/", "/kl/"],
  },
  {
    id: "kl", ipa: "/kl/", rule: "/k/ at the back of the tongue, front tip rises immediately for /l/.",
    words: [{ t: "class", ipa: "/klɑːs/" }, { t: "clean", ipa: "/kliːn/" }, { t: "uncle", ipa: "/ˈʌŋkl/" }],
    sent: { t: "The class cleaned the clock after school.", ipa: "/ðə klɑːs kliːnd ðə klɒk ˈɑːftə skuːl/" },
    talk: "Describe your classroom using three 'kl' words.",
    foils: ["/ɡl/", "/kr/"],
  },
  {
    id: "tr", ipa: "/tr/", rule: "One movement: tongue on the ridge, round the lips slightly — never 'tee-rr'.",
    words: [{ t: "train", ipa: "/treɪn/" }, { t: "street", ipa: "/striːt/" }, { t: "country", ipa: "/ˈkʌntri/" }],
    sent: { t: "The train travelled through the country at three.", ipa: "/ðə treɪn ˈtrævld θruː ðə ˈkʌntri ət θriː/" },
    talk: "Tell someone how to travel across your city.",
    foils: ["/dr/", "/tʃ/"],
  },
  {
    id: "dr", ipa: "/dr/", rule: "Voiced twin of /tr/ — same single movement, vocal cords on.",
    words: [{ t: "dream", ipa: "/driːm/" }, { t: "address", ipa: "/əˈdres/" }, { t: "children", ipa: "/ˈtʃɪldrən/" }],
    sent: { t: "The children drew a dragon drinking water.", ipa: "/ðə ˈtʃɪldrən drjuː ə ˈdræɡən ˈdrɪŋkɪŋ ˈwɔːtə/" },
    talk: "Describe a dream you remember.",
    foils: ["/tr/", "/dʒ/"],
  },
  {
    id: "kr", ipa: "/kr/", rule: "Back /k/ gliding into /r/ — keep it light, no extra vowel.",
    words: [{ t: "cream", ipa: "/kriːm/" }, { t: "secret", ipa: "/ˈsiːkrət/" }, { t: "increase", ipa: "/ˈɪŋkriːs/" }],
    sent: { t: "The crowd crossed the street to buy cream cakes.", ipa: "/ðə kraʊd krɒst ðə striːt tə baɪ kriːm keɪks/" },
    talk: "Explain a recipe that uses cream.",
    foils: ["/ɡr/", "/kw/"],
  },
  {
    id: "ɡr", ipa: "/ɡr/", rule: "Voiced /ɡ/ into /r/ — one voiced glide, as in 'green'.",
    words: [{ t: "green", ipa: "/ɡriːn/" }, { t: "agree", ipa: "/əˈɡriː/" }, { t: "hungry", ipa: "/ˈhʌŋɡri/" }],
    sent: { t: "The hungry group greeted the guests with great joy.", ipa: "/ðə ˈhʌŋɡri ɡruːp ɡriːtɪd ðə ɡests wɪð ɡreɪt dʒɔɪ/" },
    talk: "Say what you're grateful for this week.",
    foils: ["/kr/", "/br/"],
  },
  {
    id: "θr", ipa: "/θr/", rule: "Tongue between the teeth, then straight back for /r/ — 'three', not 'tree'.",
    words: [{ t: "three", ipa: "/θriː/" }, { t: "thread", ipa: "/θred/" }, { t: "through", ipa: "/θruː/" }],
    sent: { t: "She threw three threads through the needle.", ipa: "/ʃiː θruː θriː θredz θruː ðə ˈniːdl/" },
    talk: "Count three things you can see right now.",
    foils: ["/tr/", "/ʃr/"],
  },
  {
    id: "spr", ipa: "/spr/", rule: "Three sounds, one burst: /s/ + /p/ + /r/ — no 'su-prr'.",
    words: [{ t: "spring", ipa: "/sprɪŋ/" }, { t: "spread", ipa: "/spred/" }, { t: "surprise", ipa: "/səˈpraɪz/" }],
    sent: { t: "In spring the flowers spread across the park.", ipa: "/ɪn sprɪŋ ðə ˈflaʊəz spred əˈkrɒs ðə pɑːk/" },
    talk: "Describe a surprise that made you happy.",
    foils: ["/str/", "/skr/"],
  },
  {
    id: "str", ipa: "/str/", rule: "/s/ + /t/ + /r/ in one smooth push — 'street', never 'su-treet'.",
    words: [{ t: "strong", ipa: "/strɒŋ/" }, { t: "street", ipa: "/striːt/" }, { t: "industry", ipa: "/ˈɪndəstri/" }],
    sent: { t: "A strong wind swept down the street last night.", ipa: "/ə strɒŋ wɪnd swept daʊn ðə striːt lɑːst naɪt/" },
    talk: "Describe the busiest street you know.",
    foils: ["/spr/", "/skr/"],
  },
  {
    id: "skw", ipa: "/skw/", rule: "/s/ + /k/ + rounded /w/ — lips round early for the glide.",
    words: [{ t: "square", ipa: "/skweə/" }, { t: "squeeze", ipa: "/skwiːz/" }, { t: "mosquito", ipa: "/məˈskiːtəʊ/" }],
    sent: { t: "Squeeze the square sponge in the sink.", ipa: "/skwiːz ðə skweə spʌndʒ ɪn ðə sɪŋk/" },
    talk: "Give directions to the nearest square or plaza.",
    foils: ["/kw/", "/skr/"],
  },
  {
    id: "ŋk", ipa: "/ŋk/", rule: "The nasal /ŋ/ must stay velar before /k/ — 'think', never 'thin-k'.",
    words: [{ t: "bank", ipa: "/bæŋk/" }, { t: "drink", ipa: "/drɪŋk/" }, { t: "uncle", ipa: "/ˈʌŋkl/" }],
    sent: { t: "I think my uncle drank too much at the bank party.", ipa: "/aɪ θɪŋk maɪ ˈʌŋkl dræŋk tuː mʌtʃ ət ðə bæŋk ˈpɑːti/" },
    talk: "Say what you'd like to drink and where you'd buy it.",
    foils: ["/nk/", "/nt/"],
  },
  {
    id: "ntʃ", ipa: "/ntʃ/", rule: "/n/ melts into the affricate /tʃ/ — 'lunch' is one ending, not 'lun-chuh'.",
    words: [{ t: "lunch", ipa: "/lʌntʃ/" }, { t: "French", ipa: "/frentʃ/" }, { t: "mention", ipa: "/ˈmenʃn/" }],
    sent: { t: "She mentioned French cheese at the lunch party.", ipa: "/ʃiː ˈmenʃnd frentʃ tʃiːz ət ðə lʌntʃ ˈpɑːti/" },
    talk: "Plan a lunch menu with a friend.",
    foils: ["/nʃ/", "/ndʒ/"],
  },
];

/* ── 2 · word stress ────────────────────────────────────────────────────── */
export interface WordStressItem {
  id: string;
  word: string;
  ipa: string;
  syllables: string[];
  stressed: number; // index of the stressed syllable
  rule: string;
  pair?: string;
  sent: Tw;
}

export const WORD_STRESS: WordStressItem[] = [
  { id: "ta", word: "table", ipa: "/ˈteɪbl/", syllables: ["ta", "ble"], stressed: 0, rule: "Most two-syllable nouns carry stress on the first syllable.", sent: { t: "Put the book on the table.", ipa: "/pʊt ðə bʊk ɒn ðə ˈteɪbl/" } },
  { id: "ho", word: "hotel", ipa: "/həʊˈtel/", syllables: ["ho", "tel"], stressed: 1, rule: "Many two-syllable nouns borrowed from French stress the second: hoTEL.", sent: { t: "We stayed at a small hotel.", ipa: "/wi steɪd ət ə smɔːl həʊˈtel/" } },
  { id: "to", word: "today", ipa: "/təˈdeɪ/", syllables: ["to", "day"], stressed: 1, rule: "Time words like toDAY, toNIGHT, toMORROW stress the end.", sent: { t: "Today is the first day of term.", ipa: "/təˈdeɪ ɪz ðə fɜːst deɪ əv tɜːm/" } },
  { id: "be", word: "begin", ipa: "/bɪˈɡɪn/", syllables: ["be", "gin"], stressed: 1, rule: "Two-syllable verbs usually stress the second: beGIN, deCIDE.", pair: "Nouns go first, verbs go last.", sent: { t: "Let's begin the lesson now.", ipa: "/lets bɪˈɡɪn ðə ˈlesn naʊ/" } },
  { id: "re", word: "record", ipa: "/ˈrekɔːd/", syllables: ["re", "cord"], stressed: 0, rule: "The noun is REcord; the verb flips to reCORD — stress changes meaning.", pair: "record (n) ≠ record (v)", sent: { t: "Play the record one more time.", ipa: "/pleɪ ðə ˈrekɔːd wʌn mɔː taɪm/" } },
  { id: "pr", word: "present", ipa: "/ˈpreznt/", syllables: ["pre", "sent"], stressed: 0, rule: "PREsent (noun/adjective) vs preSENT (verb) — same spelling, different beat.", pair: "present (n) ≠ present (v)", sent: { t: "She gave me a lovely present.", ipa: "/ʃi ɡeɪv miː ə ˈlʌvli ˈpreznt/" } },
  { id: "ph", word: "photograph", ipa: "/ˈfəʊtəɡrɑːf/", syllables: ["pho", "to", "graph"], stressed: 0, rule: "Stress the first of three — then watch it move in phoTOgraphy.", pair: "PHOtograph → phoTOgraphy → photoGRAPHic", sent: { t: "This photograph was taken in Jaipur.", ipa: "/ðɪs ˈfəʊtəɡrɑːf wəz ˈteɪkən ɪn ˈdʒaɪpʊə/" } },
  { id: "pg", word: "photography", ipa: "/fəˈtɒɡrəfi/", syllables: ["pho", "tog", "ra", "phy"], stressed: 1, rule: "Adding -y shifts the stress one syllable right: phoTOgraphy.", pair: "PHOtograph → phoTOgraphy", sent: { t: "She studied photography at college.", ipa: "/ʃi ˈstʌdɪd fəˈtɒɡrəfi ət ˈkɒlɪdʒ/" } },
  { id: "co", word: "computer", ipa: "/kəmˈpjuːtə/", syllables: ["com", "pu", "ter"], stressed: 1, rule: "-er agent nouns stress the middle: comPUter, teaCHER pattern aside.", sent: { t: "My computer needs a new keyboard.", ipa: "/maɪ kəmˈpjuːtə niːdz ə njuː ˈkiːbɔːd/" } },
  { id: "im", word: "important", ipa: "/ɪmˈpɔːtnt/", syllables: ["im", "por", "tant"], stressed: 1, rule: "Three-syllable adjectives in -ant usually stress the middle.", sent: { t: "This is an important decision.", ipa: "/ðɪs ɪz ən ɪmˈpɔːtnt dɪˈsɪʒn/" } },
  { id: "in", word: "information", ipa: "/ˌɪnfəˈmeɪʃn/", syllables: ["in", "for", "ma", "tion"], stressed: 2, rule: "-tion words always stress the syllable just before it: informaTION.", sent: { t: "Can I get more information, please?", ipa: "/kən aɪ ɡet mɔːr ˌɪnfəˈmeɪʃn pliːz/" } },
  { id: "un", word: "university", ipa: "/ˌjuːnɪˈvɜːsəti/", syllables: ["u", "ni", "ver", "si", "ty"], stressed: 2, rule: "Five syllables, one main beat — uniVERsity. Secondary stress opens it.", sent: { t: "Her brother teaches at the university.", ipa: "/hɜː ˈbrʌðə ˈtiːtʃɪz ət ði ˌjuːnɪˈvɜːsəti/" } },
];

/* ── 3 · sentence stress ────────────────────────────────────────────────── */
export interface SentenceStressItem {
  id: string;
  text: string;
  ipa: string;
  strong: string[]; // content words that carry the beats (lowercase, no punctuation)
  weak: string[]; // function words squeezed between the beats
  note: string;
  variant?: { text: string; ipa: string; focus: string };
}

export const SENTENCE_STRESS: SentenceStressItem[] = [
  {
    id: "s1", text: "I want to GO to the MARket toMORrow.", ipa: "/aɪ wɒnt tə ɡəʊ tə ðə ˈmɑːkɪt təˈmɒrəʊ/",
    strong: ["go", "market", "tomorrow"], weak: ["i", "want", "to", "the"],
    note: "Three beats: GO · MARket · toMORrow — everything else is squeezed short.",
    variant: { text: "I want to go to the market TODAY.", ipa: "/aɪ wɒnt tə ɡəʊ tə ðə ˈmɑːkɪt təˈdeɪ/", focus: "Shifting the final beat changes the day." },
  },
  {
    id: "s2", text: "She BOUGHT a BEAUtiful RED dress.", ipa: "/ʃi bɔːt ə ˈbjuːtɪfl red dres/",
    strong: ["bought", "beautiful", "red", "dress"], weak: ["she", "a"],
    note: "Every content word gets a beat; 'she' and 'a' almost disappear.",
  },
  {
    id: "s3", text: "I didn't say he STOLE the money.", ipa: "/aɪ ˈdɪdnt seɪ hi stəʊl ðə ˈmʌni/",
    strong: ["say", "stole", "money"], weak: ["i", "didn't", "he", "the"],
    note: "Neutral reading beats say · STOLE · MOneY.",
    variant: { text: "I didn't say HE stole the money.", ipa: "/aɪ ˈdɪdnt seɪ hiː stəʊl ðə ˈmʌni/", focus: "Beating 'he' implies someone else did it." },
  },
  {
    id: "s4", text: "I'd LIKE a CUP of TEA, please.", ipa: "/aɪd laɪk ə kʌp əv tiː pliːz/",
    strong: ["like", "cup", "tea"], weak: ["i'd", "a", "of", "please"],
    note: "'of' collapses to /əv/ between the beats — cuppa-tea rhythm.",
  },
  {
    id: "s5", text: "The CHIldren are PLAYing in the GARden.", ipa: "/ðə ˈtʃɪldrən ə ˈpleɪɪŋ ɪn ðə ˈɡɑːdn/",
    strong: ["children", "playing", "garden"], weak: ["the", "are", "in"],
    note: "'are' is a whisper /ə/ between three strong beats.",
  },
  {
    id: "s6", text: "WHAT time does the NEXT train LEAVE?", ipa: "/wɒt taɪm dəz ðə nekst treɪn liːv/",
    strong: ["what", "time", "next", "train", "leave"], weak: ["does", "the"],
    note: "Question words and key nouns beat; auxiliaries vanish.",
  },
  {
    id: "s7", text: "He can SPEAK three lanGUAges FLUENTly.", ipa: "/hi kən spiːk θriː læŋˈɡwɪdʒɪz ˈfluːəntli/",
    strong: ["speak", "three", "languages", "fluently"], weak: ["he", "can"],
    note: "'can' is /kən/ — only the verbs and numbers carry weight.",
  },
  {
    id: "s8", text: "I DID tell you about the meeting.", ipa: "/aɪ dɪd tel juː əˈbaʊt ðə ˈmiːtɪŋ/",
    strong: ["did", "tell", "meeting"], weak: ["i", "you", "about", "the"],
    note: "Contrastive stress: beating 'DID' contradicts someone's doubt.",
  },
  {
    id: "s9", text: "There's a CAT on the ROOF of the HOUSE.", ipa: "/ðeəz ə kæt ɒn ðə ruːf əv ðə haʊs/",
    strong: ["cat", "roof", "house"], weak: ["there's", "a", "on", "the", "of"],
    note: "A classic nursery rhythm — five weak words ride between three beats.",
  },
  {
    id: "s10", text: "She neVER said SHE took your moNEY.", ipa: "/ʃi nɪˈveɪ səd ʃiː tʊk jɔː ˈmʌni/",
    strong: ["never", "she", "money"], weak: ["said", "took", "your"],
    note: "Moving the beats to neVER · SHE · MOneY shifts the blame entirely.",
  },
];

/* ── 4 · connected speech ───────────────────────────────────────────────── */
export type CSType = "Linking" | "Assimilation" | "Elision" | "Weak form" | "Contraction" | "Reduction";
export const CS_LABELS: CSType[] = ["Linking", "Assimilation", "Elision", "Weak form", "Contraction", "Reduction"];

export interface ConnectedItem {
  id: string;
  type: CSType;
  rule: string;
  careful: Tw;
  natural: Tw;
}

export const CONNECTED: ConnectedItem[] = [
  { id: "c1", type: "Linking", rule: "A final consonant jumps onto the next vowel — 'turn it off' sounds like 'tur-ni-toff'.", careful: { t: "turn it off", ipa: "/tɜːn ɪt ɒf/" }, natural: { t: "tur-ni-toff", ipa: "/tɜː nɪ tɒf/" } },
  { id: "c2", type: "Linking", rule: "Linking /r/: the written r wakes up between vowels — 'far away' → 'fa-ra-way'.", careful: { t: "far away", ipa: "/fɑːr əˈweɪ/" }, natural: { t: "fa-ra-way", ipa: "/fɑː rəˈweɪ/" } },
  { id: "c3", type: "Assimilation", rule: "/t/ before /j/ melts into /tʃ/ — 'don't you' sounds like 'don-chu'.", careful: { t: "don't you", ipa: "/dəʊnt juː/" }, natural: { t: "don-chu", ipa: "/dəʊn tʃu/" } },
  { id: "c4", type: "Assimilation", rule: "/d/ before /j/ becomes /dʒ/ — 'would you' sounds like 'wu-ju' → 'wou-ju'.", careful: { t: "would you", ipa: "/wʊd juː/" }, natural: { t: "wou-ju", ipa: "/wʊ dʒu/" } },
  { id: "c5", type: "Elision", rule: "/t/ between consonants gets deleted — 'next day' is pronounced 'nex-day'.", careful: { t: "next day", ipa: "/nekst deɪ/" }, natural: { t: "nex-day", ipa: "/neks deɪ/" } },
  { id: "c6", type: "Elision", rule: "The /t/ in 'most people' disappears between /s/ and /p/.", careful: { t: "most people", ipa: "/məʊst ˈpiːpl/" }, natural: { t: "mos-people", ipa: "/məʊs ˈpiːpl/" } },
  { id: "c7", type: "Weak form", rule: "'of' weakens to /əv/ — 'a cup of tea' → 'a cuppa tea'.", careful: { t: "a cup of tea", ipa: "/ə kʌp əv tiː/" }, natural: { t: "a cuppa tea", ipa: "/ə ˈkʌpə tiː/" } },
  { id: "c8", type: "Weak form", rule: "'to' weakens to /tə/ before consonants — 'go to bed' → 'go-tə-bed'.", careful: { t: "go to bed", ipa: "/ɡəʊ tə bed/" }, natural: { t: "go-tə-bed", ipa: "/ɡəʊ tə bed/" } },
  { id: "c9", type: "Weak form", rule: "'and' weakens to /ən/ — 'fish and chips' → 'fish'n'chips'.", careful: { t: "fish and chips", ipa: "/fɪʃ ənd tʃɪps/" }, natural: { t: "fish'n'chips", ipa: "/fɪʃ n tʃɪps/" } },
  { id: "c10", type: "Contraction", rule: "'I am' fuses into 'I'm' /aɪm/ — one syllable, not two.", careful: { t: "I am ready", ipa: "/aɪ æm ˈredi/" }, natural: { t: "I'm ready", ipa: "/aɪm ˈredi/" } },
  { id: "c11", type: "Contraction", rule: "'do not' fuses into 'don't' /dəʊnt/ with a syllable lost.", careful: { t: "do not worry", ipa: "/duː nɒt ˈwʌri/" }, natural: { t: "don't worry", ipa: "/dəʊnt ˈwʌri/" } },
  { id: "c12", type: "Reduction", rule: "'going to' reduces to 'gonna' in informal speech — fine in conversation, not in careful reading.", careful: { t: "going to rain", ipa: "/ˈɡəʊɪŋ tə reɪn/" }, natural: { t: "gonna rain", ipa: "/ˈɡɒnə reɪn/" } },
];

/* ── 5 · daily conversations ────────────────────────────────────────────── */
export interface ConvLine {
  role: 0 | 1;
  t: string;
  ipa?: string;
  tip?: string;
}

export interface Conversation {
  id: string;
  title: string;
  setting: string;
  roles: [string, string];
  phrases: Tw[];
  lines: ConvLine[];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "classroom", title: "Classroom", setting: "A student asks the teacher about homework.", roles: ["Student", "Teacher"],
    phrases: [{ t: "Could you repeat that, please?", ipa: "/kʊd juː rɪˈpiːt ðæt pliːz/" }, { t: "When is it due?", ipa: "/wen ɪz ɪt djuː/" }],
    lines: [
      { role: 0, t: "Excuse me, ma'am — could you repeat the homework, please?", ipa: "/ɪkˈskjuːz miː mæm kʊd juː rɪˈpiːt ðə ˈhəʊmwɜːk pliːz/", tip: "Stress REpeat and HOMEwork." },
      { role: 1, t: "Of course. Finish exercise four and read page twenty.", tip: "Beat FINish, FOUR, READ, TWENty." },
      { role: 0, t: "Exercise four and page twenty. When is it due?" },
      { role: 1, t: "It's due on Friday morning, before the first period." },
      { role: 0, t: "Got it. Thank you, ma'am." },
      { role: 1, t: "You're welcome. See you tomorrow.", tip: "'You're' is one weak syllable." },
    ],
  },
  {
    id: "meeting", title: "Meeting", setting: "Two colleagues open a project meeting.", roles: ["Chair", "Colleague"],
    phrases: [{ t: "Shall we get started?", ipa: "/ʃəl wi ɡet ˈstɑːtɪd/" }, { t: "Let's move on to the next point.", ipa: "/lets muːv ɒn tə ðə nekst pɔɪnt/" }],
    lines: [
      { role: 0, t: "Good morning, everyone. Shall we get started?", tip: "Weak 'shall we' → 'ʃəl wi'." },
      { role: 1, t: "Yes — I've sent the agenda to the whole team." },
      { role: 0, t: "Perfect. First, the budget for next quarter." },
      { role: 1, t: "The figures show a ten percent saving already.", tip: "'percent' — beat PERcent." },
      { role: 0, t: "Excellent. Let's move on to the next point." },
      { role: 1, t: "Agreed. The marketing plan needs one more review." },
    ],
  },
  {
    id: "telephone", title: "Telephone", setting: "A caller asks for a colleague and leaves a message.", roles: ["Caller", "Receiver"],
    phrases: [{ t: "Could I speak to Mr Rao, please?", ipa: "/kʊd aɪ spiːk tə ˈmɪstə raʊ pliːz/" }, { t: "Can I take a message?", ipa: "/kən aɪ teɪk ə ˈmesɪdʒ/" }],
    lines: [
      { role: 0, t: "Hello — could I speak to Mr Rao, please?" },
      { role: 1, t: "I'm afraid he's in a meeting. Can I take a message?", tip: "'afraid he's in' links: əˈfreɪ diz ɪn." },
      { role: 0, t: "Yes, please. Ask him to call Anita back this evening." },
      { role: 1, t: "Anita — could you spell the surname for me?" },
      { role: 0, t: "It's A-N-I-T-A, from the accounts office." },
      { role: 1, t: "Noted. I'll pass the message on right away." },
    ],
  },
  {
    id: "debate", title: "Debate", setting: "Two debaters argue about mobile phones in class.", roles: ["For", "Against"],
    phrases: [{ t: "I see your point, but consider this.", ipa: "/aɪ siː jɔː pɔɪnt bət kənˈsɪdə ðɪs/" }, { t: "The evidence suggests otherwise.", ipa: "/ði ˈevɪdəns səˈdʒests ˈʌðəwaɪz/" }],
    lines: [
      { role: 0, t: "Phones in class give students instant access to knowledge." },
      { role: 1, t: "I see your point, but consider this — they divide attention." },
      { role: 0, t: "Only when they're misused. The evidence suggests otherwise.", tip: "Beat EVi-dence, SUG-gests." },
      { role: 1, t: "The evidence also shows lower scores in phone-heavy rooms." },
      { role: 0, t: "Then teach responsible use, not a blanket ban." },
      { role: 1, t: "A fair middle ground — rules, not removal." },
    ],
  },
  {
    id: "rhetoric", title: "Rhetorical Speech", setting: "A short persuasive flourish with rhetorical questions.", roles: ["Speaker", "Echo voice"],
    phrases: [{ t: "How long shall we wait?", ipa: "/haʊ lɒŋ ʃəl wi weɪt/" }, { t: "Not tomorrow — today.", ipa: "/nɒt təˈmɒrəʊ təˈdeɪ/" }],
    lines: [
      { role: 0, t: "How long shall we wait for cleaner streets?", tip: "Pause after 'wait' — let it land." },
      { role: 1, t: "How long, indeed?" },
      { role: 0, t: "Is it the council's job alone? Or ours as well?" },
      { role: 1, t: "Ours as well." },
      { role: 0, t: "Then let us begin — not tomorrow, but today." },
      { role: 1, t: "Today." },
    ],
  },
  {
    id: "persuasion", title: "Persuasive Speech", setting: "Convincing an audience to join a reading club.", roles: ["Speaker", "Listener"],
    phrases: [{ t: "Imagine what one hour a week can do.", ipa: "/ɪˈmædʒɪn wɒt wʌn aʊər ə wiːk kən duː/" }, { t: "You have nothing to lose.", ipa: "/juː həv ˈnʌθɪŋ tə luːz/" }],
    lines: [
      { role: 0, t: "Imagine what one hour a week can do for your English." },
      { role: 1, t: "An hour? I barely have time for breakfast." },
      { role: 0, t: "One hour — for stories, words and confidence.", tip: "Slow down on 'stories, words and confidence'." },
      { role: 1, t: "Confidence is exactly what I need." },
      { role: 0, t: "Then join us on Saturday. You have nothing to lose." },
      { role: 1, t: "All right — count me in." },
    ],
  },
  {
    id: "hotel", title: "Hotel", setting: "A guest checks in at the front desk.", roles: ["Guest", "Receptionist"],
    phrases: [{ t: "I'd like to check in, please.", ipa: "/aɪd laɪk tə tʃek ɪn pliːz/" }, { t: "Could I have a room with a view?", ipa: "/kʊd aɪ həv ə ruːm wɪð ə vjuː/" }],
    lines: [
      { role: 0, t: "Good evening. I'd like to check in — I have a reservation.", tip: "'I'd like to' → /aɪd laɪk tə/." },
      { role: 1, t: "Welcome! May I see your ID, please? Under which name?" },
      { role: 0, t: "Ravi Kumar. Could I have a room with a view?" },
      { role: 1, t: "Of course — room 204, second floor, facing the garden." },
      { role: 0, t: "Lovely. What time is breakfast served?" },
      { role: 1, t: "From seven to ten, in the hall. Enjoy your stay!" },
    ],
  },
  {
    id: "restaurant", title: "Restaurant", setting: "Ordering a meal and asking for the bill.", roles: ["Customer", "Waiter"],
    phrases: [{ t: "What would you recommend?", ipa: "/wɒt wʊd juː ˌrekəˈmend/" }, { t: "Could we have the bill, please?", ipa: "/kʊd wi həv ðə bɪl pliːz/" }],
    lines: [
      { role: 1, t: "Good evening — are you ready to order?" },
      { role: 0, t: "Almost. What would you recommend?", tip: "'would you' assimilates: /wʊdʒu/." },
      { role: 1, t: "The masala dosa is excellent, and the filter coffee is famous." },
      { role: 0, t: "Then I'll have both, please. Less spicy, if possible." },
      { role: 1, t: "Certainly. Anything to start?" },
      { role: 0, t: "Just water, thank you. And later — could we have the bill, please?" },
    ],
  },
  {
    id: "ticket", title: "Ticket Booking", setting: "Booking a train ticket at the counter.", roles: ["Passenger", "Clerk"],
    phrases: [{ t: "One to Mysore, please.", ipa: "/wʌn tə ˈmaɪsɔː pliːz/" }, { t: "Is there a student discount?", ipa: "/ɪz ðeər ə ˈstjuːdnt ˈdɪskaʊnt/" }],
    lines: [
      { role: 0, t: "Good morning. One to Mysore, please — this afternoon." },
      { role: 1, t: "The 2:30 express or the 4 o'clock passenger?" },
      { role: 0, t: "The express. Window seat, if there's one free." },
      { role: 1, t: "You're in luck — coach three, seat twelve. Is there a student discount card?" },
      { role: 0, t: "Yes, here it is. How much is the fare then?" },
      { role: 1, t: "Two-forty after discount. Departs from platform two." },
    ],
  },
  {
    id: "market", title: "Market", setting: "Haggling for vegetables at a street market.", roles: ["Shopper", "Vendor"],
    phrases: [{ t: "How much is this per kilo?", ipa: "/haʊ mʌtʃ ɪz ðɪs pɜː ˈkiːləʊ/" }, { t: "Can you give it for less?", ipa: "/kən juː ɡɪv ɪt fə les/" }],
    lines: [
      { role: 0, t: "How much are the tomatoes per kilo?", tip: "'are the' → /ə ðə/." },
      { role: 1, t: "Forty rupees, fresh from the farm this morning." },
      { role: 0, t: "Forty? Can you give it for less — I'm buying two kilos." },
      { role: 1, t: "For two kilos, thirty-five. Final price." },
      { role: 0, t: "Make it thirty and I'll take coriander too." },
      { role: 1, t: "Deal — thirty, with a free bunch of coriander!" },
    ],
  },
  {
    id: "grocery", title: "Grocery Shop", setting: "Finding items and paying at the counter.", roles: ["Customer", "Shopkeeper"],
    phrases: [{ t: "Where can I find the rice?", ipa: "/weə kən aɪ faɪnd ðə raɪs/" }, { t: "Do you take cards?", ipa: "/duː juː teɪk kɑːdz/" }],
    lines: [
      { role: 0, t: "Excuse me — where can I find the rice and the dal?" },
      { role: 1, t: "Aisle three, on the left. The dal is next to the flour." },
      { role: 0, t: "Thank you. Do you have fresh milk as well?" },
      { role: 1, t: "Yes, in the fridge by the counter. Anything else?" },
      { role: 0, t: "That's all. Do you take cards, or only cash?" },
      { role: 1, t: "Cards are fine. That comes to four-sixty, please." },
    ],
  },
  {
    id: "hospital", title: "Hospital", setting: "A patient describes symptoms at reception.", roles: ["Patient", "Nurse"],
    phrases: [{ t: "I have a terrible headache.", ipa: "/aɪ həv ə ˈterəbl ˈhedeɪk/" }, { t: "How long have you had it?", ipa: "/haʊ lɒŋ həv juː həd ɪt/" }],
    lines: [
      { role: 0, t: "I'd like to see a doctor — I have a terrible headache." },
      { role: 1, t: "I'm sorry to hear that. How long have you had it?", tip: "Link 'had it': /həd ɪt/." },
      { role: 0, t: "Since yesterday evening. And a slight fever too." },
      { role: 1, t: "Take a seat, please. Dr Menon will see you shortly." },
      { role: 0, t: "Thank you. Should I wait here?" },
      { role: 1, t: "Yes — we'll call your name in a few minutes." },
    ],
  },
  {
    id: "court", title: "Court", setting: "A witness answers questions calmly.", roles: ["Lawyer", "Witness"],
    phrases: [{ t: "Please state your name for the record.", ipa: "/pliːz steɪt jɔː neɪm fə ðə ˈrekɔːd/" }, { t: "I saw it clearly.", ipa: "/aɪ sɔː ɪt ˈklɪəli/" }],
    lines: [
      { role: 0, t: "Please state your name for the record.", tip: "Formal register — full, careful speech." },
      { role: 1, t: "My name is Lakshmi Narayanan." },
      { role: 0, t: "And where were you on the evening of the fifth?" },
      { role: 1, t: "I was at the bus stop opposite the park." },
      { role: 0, t: "Did you see the accused at any point?" },
      { role: 1, t: "I saw him clearly — at about seven o'clock." },
    ],
  },
  {
    id: "library", title: "Library", setting: "Borrowing and renewing books.", roles: ["Reader", "Librarian"],
    phrases: [{ t: "Could I borrow this for two weeks?", ipa: "/kʊd aɪ ˈbɒrəʊ ðɪs fə tuː wiːks/" }, { t: "Is it available?", ipa: "/ɪz ɪt əˈveɪləbl/" }],
    lines: [
      { role: 0, t: "Excuse me — is 'The Guide' by R.K. Narayan available?" },
      { role: 1, t: "Let me check… yes, one copy is on the shelf." },
      { role: 0, t: "Wonderful. Could I borrow this for two weeks?" },
      { role: 1, t: "Of course. May I see your library card?" },
      { role: 0, t: "Here you are. And could I renew my other book too?" },
      { role: 1, t: "Done — both are due on the twenty-fourth." },
    ],
  },
  {
    id: "postoffice", title: "Post Office", setting: "Sending a parcel by speed post.", roles: ["Customer", "Clerk"],
    phrases: [{ t: "I'd like to send this parcel by speed post.", ipa: "/aɪd laɪk tə send ðɪs ˈpɑːsl baɪ spiːd pəʊst/" }, { t: "How long will it take?", ipa: "/haʊ lɒŋ wɪl ɪt teɪk/" }],
    lines: [
      { role: 0, t: "I'd like to send this parcel to Delhi by speed post." },
      { role: 1, t: "Certainly. Have you filled in the address label?" },
      { role: 0, t: "Yes, it's on the box. How long will it take?" },
      { role: 1, t: "Two working days. Please place it on the scale." },
      { role: 0, t: "Here you go. Is that under two kilos?" },
      { role: 1, t: "Just under — the charge is a hundred and ten." },
    ],
  },
  {
    id: "bus", title: "Bus", setting: "Asking the conductor for a stop and fare.", roles: ["Passenger", "Conductor"],
    phrases: [{ t: "Does this bus go to Majestic?", ipa: "/dʌz ðɪs bʌs ɡəʊ tə məˈdʒestɪk/" }, { t: "Please tell me when we get there.", ipa: "/pliːz tel miː wen wi ɡet ðeə/" }],
    lines: [
      { role: 0, t: "Does this bus go to Majestic, please?" },
      { role: 1, t: "It does — it's the last stop. Where are you boarding to?" },
      { role: 0, t: "I'm getting on here. How much is the fare?" },
      { role: 1, t: "Twenty-five rupees, please." },
      { role: 0, t: "Here you are. Please tell me when we get there." },
      { role: 1, t: "Don't worry — I'll call out every stop.", tip: "'call out' links: /kɔː laʊt/." },
    ],
  },
  {
    id: "train", title: "Train", setting: "Finding a seat and checking the arrival time.", roles: ["Traveller", "Co-passenger"],
    phrases: [{ t: "Is this seat taken?", ipa: "/ɪz ðɪs siːt ˈteɪkən/" }, { t: "What time do we reach?", ipa: "/wɒt taɪm duː wi riːtʃ/" }],
    lines: [
      { role: 0, t: "Excuse me — is this seat taken?" },
      { role: 1, t: "No, go ahead. Window side, best view on this route." },
      { role: 0, t: "Thanks. Do you know what time we reach Mysore?" },
      { role: 1, t: "Around half past nine, if we're not delayed." },
      { role: 0, t: "Good — that gives me time for dinner." },
      { role: 1, t: "The pantry car passes through at eight.", tip: "'pantry car' — beat PANtry." },
    ],
  },
  {
    id: "aeroplane", title: "Aeroplane", setting: "A passenger's requests during a flight.", roles: ["Passenger", "Crew"],
    phrases: [{ t: "Could I have a window seat, please?", ipa: "/kʊd aɪ həv ə ˈwɪndəʊ siːt pliːz/" }, { t: "How much longer is the flight?", ipa: "/haʊ mʌtʃ ˈlɒŋɡər ɪz ðə flaɪt/" }],
    lines: [
      { role: 0, t: "Excuse me — could I have a window seat instead?" },
      { role: 1, t: "Let me check… yes, 14A is free. I'll move you." },
      { role: 0, t: "Thank you. And could I get a glass of water?" },
      { role: 1, t: "Right away. Still or sparkling?" },
      { role: 0, t: "Still, please. How much longer is the flight?" },
      { role: 1, t: "About forty minutes — we're starting our descent soon." },
    ],
  },
  {
    id: "coffeeshop", title: "Coffee Shop", setting: "Ordering coffee and a slice of cake.", roles: ["Customer", "Barista"],
    phrases: [{ t: "I'll have a filter coffee, please.", ipa: "/aɪl həv ə ˈfɪltə ˈkɒfi pliːz/" }, { t: "For here or to go?", ipa: "/fə hɪə ɔː tə ɡəʊ/" }],
    lines: [
      { role: 1, t: "Hi there! What can I get you?", tip: "'get you' → /ɡetʃu/." },
      { role: 0, t: "I'll have a filter coffee, and a slice of the carrot cake." },
      { role: 1, t: "Good choice. For here or to go?" },
      { role: 0, t: "For here, please — by the window if I may." },
      { role: 1, t: "Of course. Anything else with that?" },
      { role: 0, t: "No, that's everything. Thank you." },
    ],
  },
  {
    id: "bank", title: "Bank", setting: "Opening a savings account at the counter.", roles: ["Customer", "Banker"],
    phrases: [{ t: "I'd like to open a savings account.", ipa: "/aɪd laɪk tə ˈəʊpən ə ˈseɪvɪŋz əˈkaʊnt/" }, { t: "What documents do I need?", ipa: "/wɒt ˈdɒkjumənts duː aɪ niːd/" }],
    lines: [
      { role: 0, t: "Good morning — I'd like to open a savings account." },
      { role: 1, t: "Certainly. What documents have you brought with you?" },
      { role: 0, t: "My ID, two photographs and the address proof." },
      { role: 1, t: "Perfect. Please fill in this form and sign at the bottom." },
      { role: 0, t: "Done. How soon will the account be active?" },
      { role: 1, t: "By this evening — your passbook is ready now." },
    ],
  },
  {
    id: "taxi", title: "Taxi", setting: "Giving directions and settling the fare.", roles: ["Passenger", "Driver"],
    phrases: [{ t: "Take the second left after the signal.", ipa: "/teɪk ðə ˈsekənd left ˈɑːftə ðə ˈsɪɡnl/" }, { t: "How much do I owe you?", ipa: "/haʊ mʌtʃ duː aɪ əʊ juː/" }],
    lines: [
      { role: 0, t: "To the railway station, please — I'm in a hurry." },
      { role: 1, t: "No problem. The main road or the shortcut?" },
      { role: 0, t: "Whichever is faster. Take the second left after the signal." },
      { role: 1, t: "Understood — we'll be there in ten minutes." },
      { role: 0, t: "Great. How much do I owe you?" },
      { role: 1, t: "A hundred and eighty, by the meter." },
    ],
  },
  {
    id: "interview", title: "Job Interview", setting: "Answering the classic opening questions.", roles: ["Interviewer", "Candidate"],
    phrases: [{ t: "Tell me about yourself.", ipa: "/tel miː əˈbaʊt jɔːˈself/" }, { t: "Where do you see yourself in five years?", ipa: "/weə duː juː siː jɔːˈself ɪn faɪv jɪəz/" }],
    lines: [
      { role: 0, t: "Good morning. Tell me a little about yourself.", tip: "Warm, unhurried opening." },
      { role: 1, t: "I teach English and run a small phonetics club for students." },
      { role: 0, t: "Impressive. Why do you want to join our institute?" },
      { role: 1, t: "Your lab-based approach matches how I believe language is learned." },
      { role: 0, t: "And where do you see yourself in five years?" },
      { role: 1, t: "Leading a full speech laboratory — exactly like this one." },
    ],
  },
];
