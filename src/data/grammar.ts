export type GrammarExerciseType =
  | "mcq"
  | "fill"
  | "error"
  | "transform"
  | "rearrange"
  | "matching"
  | "identify";

export interface GrammarQuestion {
  id: string;
  type: GrammarExerciseType;
  concept: string;
  topic: string;
  title: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  tokens?: string[];
  pairs?: { left: string; right: string }[];
}

export interface GrammarLevel {
  id: string;
  name: string;
  classes: string;
  blurb: string;
  color: string;
  concepts: string[];
  questions: GrammarQuestion[];
}

const conceptForTopic = (topic: string): string => {
  const rules: [RegExp, string][] = [
    [/noun|naming|singular|plural|possessive|gender|countable/i, "Nouns"],
    [/pronoun/i, "Pronouns"],
    [/article/i, "Articles"],
    [/determiner/i, "Determiners"],
    [/adjective|comparison/i, "Adjectives"],
    [/adverb/i, "Adverbs"],
    [/preposition/i, "Prepositions"],
    [/conjunction|connector|cohesion/i, "Conjunctions and connectors"],
    [/tense|present|past|future/i, "Tenses"],
    [/modal/i, "Modals"],
    [/agreement|concord/i, "Subject–verb agreement"],
    [/phrase/i, "Phrases"],
    [/clause|relative/i, "Clauses"],
    [/non-finite|infinitive|gerund|participial/i, "Non-finite verbs"],
    [/question tag/i, "Question tags"],
    [/voice/i, "Active and passive voice"],
    [/speech|reporting/i, "Direct and indirect speech"],
    [/conditional/i, "Conditionals"],
    [/modifier/i, "Modifiers"],
    [/parallel/i, "Parallelism"],
    [/inversion|emphasis/i, "Emphasis and inversion"],
    [/punctuation|capital/i, "Punctuation and capitalization"],
    [/sentence|transformation/i, "Sentence structure and transformation"],
    [/subject|object|complement|predicate/i, "Sentence elements"],
    [/formal|academic|hedg|proofread|editing/i, "Formal and academic grammar"],
  ];
  return rules.find(([pattern]) => pattern.test(topic))?.[1] ?? "Grammar foundations";
};

const q = (
  id: string,
  type: GrammarExerciseType,
  title: string,
  prompt: string,
  answer: string,
  explanation: string,
  extra: Pick<GrammarQuestion, "options" | "tokens" | "pairs"> & { topic?: string; concept?: string } = {}
): GrammarQuestion => ({
  id,
  type,
  concept: extra.concept ?? conceptForTopic(extra.topic ?? title),
  title,
  topic: extra.topic ?? title,
  prompt,
  answer,
  explanation,
  ...extra,
});

type PrePrimarySpec = {
  concept: string;
  topic: string;
  instruction: string;
  examples: string[];
};

const PRE_PRIMARY_SPECS: PrePrimarySpec[] = [
  { concept: "Naming Words / Nouns", topic: "Naming people", instruction: "Find the word that names a person.", examples: ["Asha::Asha smiles.", "teacher::The teacher reads.", "Ravi::Ravi has a red kite.", "doctor::The doctor helps.", "Mina::Mina waves.", "farmer::The farmer plants seeds.", "mother::My mother hugs me.", "uncle::My uncle sings.", "driver::The driver stops.", "friend::My friend shares crayons."] },
  { concept: "Naming Words / Nouns", topic: "Naming animals", instruction: "Find the word that names an animal.", examples: ["cat::The cat sleeps.", "dog::The dog runs.", "rabbit::A rabbit hops.", "parrot::The parrot talks.", "fish::The fish swims.", "horse::The horse trots.", "cow::The cow eats grass.", "duck::The duck splashes.", "tiger::The tiger roars.", "ant::An ant is tiny."] },
  { concept: "Naming Words / Nouns", topic: "Naming places", instruction: "Find the word that names a place.", examples: ["park::We play in the park.", "school::I go to school.", "home::We are safe at home.", "zoo::The zoo has lions.", "shop::Dad visits the shop.", "garden::Flowers grow in the garden.", "beach::We build a sandcastle at the beach.", "library::The library has books.", "farm::The farm has cows.", "hospital::The doctor works at the hospital."] },
  { concept: "Naming Words / Nouns", topic: "Naming things", instruction: "Find the word that names a thing.", examples: ["ball::The ball is round.", "book::I read a book.", "cup::The cup is full.", "pencil::My pencil is yellow.", "chair::The chair is small.", "bag::My bag is blue.", "clock::The clock ticks.", "shoe::My shoe is clean.", "drum::The drum is loud.", "umbrella::The umbrella is open."] },
  { concept: "Naming Words / Nouns", topic: "Identifying naming words", instruction: "Choose the naming word in the sentence.", examples: ["bird::The bird can fly.", "baby::The baby laughs.", "tree::The tree is tall.", "apple::I eat an apple.", "moon::The moon shines.", "boat::The boat floats.", "rain::The rain falls.", "house::The house is white.", "toy::This toy is new.", "bell::The bell rings."] },
  { concept: "Action Words / Verbs", topic: "Everyday action words", instruction: "Find the word that tells what someone does.", examples: ["run::Children run in the park.", "eat::We eat lunch.", "sleep::The baby can sleep.", "jump::I jump over the line.", "read::Maya can read.", "write::I write my name.", "wash::We wash our hands.", "clap::The children clap.", "drink::I drink water.", "smile::The baby smiles."] },
  { concept: "Action Words / Verbs", topic: "Identifying action words", instruction: "Choose the action word.", examples: ["fly::Birds fly.", "swim::Fish swim.", "bark::Dogs bark.", "hop::The frog can hop.", "sing::We sing a song.", "draw::I draw a sun.", "kick::I kick the ball.", "open::Please open the box.", "close::Please close the door.", "laugh::Friends laugh together."] },
  { concept: "Action Words / Verbs", topic: "Using action words in simple sentences", instruction: "Choose the action word that completes the sentence.", examples: ["runs::The boy ___ fast.", "eats::The puppy ___ its food.", "plays::Mina ___ with a doll.", "reads::Dad ___ a book.", "jumps::The frog ___.", "sings::The girl ___ a song.", "drinks::The cat ___ milk.", "writes::Ravi ___ a card.", "sleeps::The baby ___.", "throws::Sam ___ the ball."] },
  { concept: "Describing Words / Adjectives", topic: "Colour", instruction: "Choose the colour word.", examples: ["red::The red apple is sweet.", "blue::The blue kite flies.", "green::The green leaf is soft.", "yellow::The yellow sun shines.", "pink::She has a pink dress.", "brown::The brown bear is big.", "black::The black cat sits.", "white::The white cloud floats.", "orange::I eat an orange fruit.", "purple::The purple flower blooms."] },
  { concept: "Describing Words / Adjectives", topic: "Size", instruction: "Choose the word that tells about size.", examples: ["big::The big bus stops.", "small::A small ant walks.", "tall::The tall tree grows.", "short::The short ruler is here.", "long::The long rope bends.", "tiny::A tiny seed grows.", "huge::The huge elephant walks.", "little::The little bird sings.", "large::The large box is heavy.", "thin::The thin book is light."] },
  { concept: "Describing Words / Adjectives", topic: "Shape", instruction: "Choose the word that tells about shape.", examples: ["round::The round ball rolls.", "square::The square box is red.", "flat::The flat plate is clean.", "long::The long line is straight.", "curved::The curved road turns.", "oval::The oval egg is white.", "triangle::The triangle sign is bright.", "straight::The straight stick is brown.", "wide::The wide door is open.", "thin::The thin line is blue."] },
  { concept: "Describing Words / Adjectives", topic: "Number", instruction: "Choose the word that tells how many.", examples: ["one::I have one nose.", "two::I see two eyes.", "three::Three birds sit there.", "four::Four legs help the dog run.", "five::I can count five fingers.", "many::Many stars shine.", "few::A few drops fell.", "first::The first child smiles.", "second::The second bell rings.", "seven::Seven crayons are here."] },
  { concept: "Describing Words / Adjectives", topic: "Simple describing words", instruction: "Choose the word that describes the noun.", examples: ["happy::The happy child laughs.", "soft::The soft pillow is cosy.", "hot::The hot soup steams.", "cold::The cold ice melts.", "clean::My clean hands sparkle.", "loud::The loud drum bangs.", "quiet::The quiet mouse hides.", "sweet::The sweet mango tastes good.", "bright::The bright star shines.", "kind::The kind girl helps."] },
  { concept: "One and Many", topic: "Singular nouns", instruction: "Choose the word for one.", examples: ["one cat::I see one cat.", "one book::This is one book.", "one apple::She has one apple.", "one child::One child is smiling.", "one box::The box is small.", "one bus::One bus stops.", "one leaf::A leaf falls.", "one toy::This is one toy.", "one bird::One bird sings.", "one cup::I need one cup."] },
  { concept: "One and Many", topic: "Plural nouns", instruction: "Choose the word for more than one.", examples: ["cats::Two cats sleep.", "books::These books are new.", "apples::We eat three apples.", "children::The children play.", "boxes::The boxes are brown.", "birds::Many birds fly.", "toys::My toys are bright.", "leaves::The leaves fall.", "cups::There are two cups.", "dogs::The dogs bark."] },
  { concept: "One and Many", topic: "Basic plural formation", instruction: "Choose the plural word that completes the sentence.", examples: ["cats::I see two ___.", "buses::Three ___ are waiting.", "boxes::Put the toys in the ___.", "wishes::We make birthday ___.", "dishes::The clean ___ are ready.", "babies::The ___ are sleeping.", "children::The ___ are laughing.", "feet::My two ___ are clean.", "mice::The ___ hide in the hole.", "leaves::Green ___ grow on trees."] },
  { concept: "Pronouns", topic: "I / You", instruction: "Choose I or you for the sentence.", examples: ["I::___ can draw a house.", "you::Can ___ pass the ball?", "I::___ like mangoes.", "you::___ are my friend.", "I::___ have a blue bag.", "you::Can ___ sing?", "I::___ wash my hands.", "you::___ can sit here.", "I::___ see a bird.", "you::___ can help me."] },
  { concept: "Pronouns", topic: "He / She", instruction: "Choose he or she for the sentence.", examples: ["he::Ravi is a boy. ___ can run.", "she::Mina is a girl. ___ can read.", "he::Dad is here. ___ is smiling.", "she::Mum is kind. ___ helps me.", "he::The boy fell. ___ is safe.", "she::The girl sings. ___ is happy.", "he::Arun has a kite. ___ flies it.", "she::Anu has a doll. ___ hugs it.", "he::My brother swims. ___ is fast.", "she::My sister draws. ___ is clever."] },
  { concept: "Pronouns", topic: "It", instruction: "Choose it to talk about one thing or animal.", examples: ["It::The ball is red. ___ can roll.", "It::The cat is soft. ___ is sleeping.", "It::The sun is hot. ___ shines.", "It::The kite is high. ___ is blue.", "It::The dog is small. ___ can bark.", "It::The book is open. ___ has pictures.", "It::The apple is sweet. ___ is red.", "It::The bird is tiny. ___ can fly.", "It::The cup is full. ___ may spill.", "It::The toy is new. ___ is mine."] },
  { concept: "Pronouns", topic: "We / They", instruction: "Choose we or they for the sentence.", examples: ["we::Ravi and I are friends. ___ play.", "they::The birds are hungry. ___ eat seeds.", "we::Mum and I cook. ___ make soup.", "they::The children run. ___ are happy.", "we::My sister and I read. ___ share a book.", "they::The dogs bark. ___ hear a sound.", "we::You and I sing. ___ know the song.", "they::The stars shine. ___ are bright.", "we::Our team wins. ___ cheer.", "they::The flowers grow. ___ need water."] },
  { concept: "This / That / These / Those", topic: "This", instruction: "Choose this for one thing near you.", examples: ["This::___ is my pencil.", "This::___ apple is sweet.", "This::___ is a red ball.", "This::___ book is mine.", "This::___ cup is full.", "This::___ flower smells nice.", "This::___ toy is soft.", "This::___ bag is heavy.", "This::___ chair is empty.", "This::___ crayon is blue."] },
  { concept: "This / That / These / Those", topic: "That", instruction: "Choose that for one thing far away.", examples: ["That::___ is the school gate.", "That::___ bird is high.", "That::___ tree is tall.", "That::___ bus is yellow.", "That::___ star is bright.", "That::___ kite is mine.", "That::___ house is white.", "That::___ dog is barking.", "That::___ cloud is grey.", "That::___ boat is far away."] },
  { concept: "This / That / These / Those", topic: "These", instruction: "Choose these for more than one thing near you.", examples: ["These::___ are my shoes.", "These::___ apples are red.", "These::___ books are new.", "These::___ crayons are bright.", "These::___ flowers smell nice.", "These::___ cups are clean.", "These::___ toys are mine.", "These::___ pencils are sharp.", "These::___ balls are round.", "These::___ leaves are green."] },
  { concept: "This / That / These / Those", topic: "Those", instruction: "Choose those for more than one thing far away.", examples: ["Those::___ are tall trees.", "Those::___ birds are flying.", "Those::___ houses are small.", "Those::___ stars are bright.", "Those::___ children are playing.", "Those::___ buses are yellow.", "Those::___ kites are high.", "Those::___ clouds are grey.", "Those::___ boats are far away.", "Those::___ flowers are in the garden."] },
  { concept: "Simple Sentence Formation", topic: "Word-to-sentence formation", instruction: "Put the words into a short sentence.", examples: ["I see a cat::see / cat / I / a", "The sun is hot::hot / The / is / sun", "Mum can cook::cook / can / Mum", "Birds can fly::fly / Birds / can", "The dog runs::runs / dog / The", "I like milk::milk / like / I", "A fish swims::swims / A / fish", "The baby smiles::smiles / baby / The", "We play games::games / play / We", "Dad reads books::books / Dad / reads"] },
  { concept: "Simple Sentence Formation", topic: "Subject + verb", instruction: "Choose the action word to finish the sentence.", examples: ["runs::The boy ___.", "rests::The baby ___.", "flies::The bird ___.", "hops::The frog ___.", "smiles::Mum ___.", "swims::The fish ___.", "barks::The dog ___.", "sings::The girl ___.", "rolls::The ball ___.", "grows::The plant ___."] },
  { concept: "Simple Sentence Formation", topic: "Subject + verb + object", instruction: "Choose the object that completes the sentence.", examples: ["a ball::The boy kicks ___.", "milk::The baby drinks ___.", "a book::Mum reads ___.", "the door::Dad opens ___.", "a picture::I draw ___.", "an apple::She eats ___.", "the bell::He rings ___.", "a song::We sing ___.", "the ball::They throw ___.", "water::The plant needs ___."] },
  { concept: "Simple Sentence Formation", topic: "Sentence completion", instruction: "Choose the word that makes a complete short sentence.", examples: ["shines::The sun ___.", "red::The apple is ___.", "play::We ___ outside.", "small::The ant is ___.", "flies::The kite ___.", "happy::I am ___.", "reads::She ___ a book.", "cold::The ice is ___.", "barks::The puppy ___.", "green::The leaf is ___."] },
  { concept: "Capital Letters and Basic Punctuation", topic: "Capital letters", instruction: "Choose the sentence with the correct capital letter.", examples: ["My name is Ria.::my name is Ria.", "The sun is hot.::the sun is hot.", "I like toys.::i like toys.", "Mum is kind.::mum is kind.", "Ravi can run.::ravi can run.", "We see a dog.::we see a dog.", "Anu has a kite.::anu has a kite.", "The cat sleeps.::the cat sleeps.", "Dad reads.::dad reads.", "India is a country.::india is a country."] },
  { concept: "Capital Letters and Basic Punctuation", topic: "Full stop", instruction: "Choose the sentence that ends with a full stop.", examples: ["I see a bird.::I see a bird", "The dog runs.::The dog runs", "Mum cooks.::Mum cooks", "We play.::We play", "The sun shines.::The sun shines", "I like apples.::I like apples", "Ravi is here.::Ravi is here", "The baby sleeps.::The baby sleeps", "This is my bag.::This is my bag", "Birds can fly.::Birds can fly"] },
  { concept: "Capital Letters and Basic Punctuation", topic: "Question mark", instruction: "Choose the question that ends with a question mark.", examples: ["Where is my ball?::Where is my ball", "Are you happy?::Are you happy", "Can I play?::Can I play", "What is this?::What is this", "Who is there?::Who is there", "Is the cat asleep?::Is the cat asleep", "Do you like milk?::Do you like milk", "Where is Mum?::Where is Mum", "Can you help me?::Can you help me", "What is your name?::What is your name"] },
  { concept: "Capital Letters and Basic Punctuation", topic: "Basic sentence punctuation", instruction: "Choose the correctly written sentence.", examples: ["The cat is small.::the cat is small", "Where is Dad?::where is Dad.", "I like red apples.::I like red apples", "Can we play?::can we play.", "Mina has a kite.::mina has a kite", "Is this your cup?::is this your cup.", "The sun is hot.::The sun is hot", "What is it?::what is it.", "We read books.::we read books", "Are you ready?::are you ready."] },
];

const prePrimarySlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const buildPrePrimaryQuestions = (): GrammarQuestion[] =>
  PRE_PRIMARY_SPECS.flatMap((spec) =>
    spec.examples.map((example, index) => {
      const [answer, context] = example.split("::");
      const activityNumber = index + 1;
      const id = `pre-primary-${prePrimarySlug(spec.topic)}-${activityNumber}`;
      const type: GrammarExerciseType = (["mcq", "fill", "matching", "identify", "rearrange", "mcq", "fill", "identify", "matching", "fill"] as GrammarExerciseType[])[index];
      const distractors = spec.examples.filter((_, itemIndex) => itemIndex !== index).slice(0, 2).map((item) => item.split("::")[0]);
      if (type === "mcq") {
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `${spec.instruction} ${context}`, answer, `${answer} is the correct ${spec.topic.toLowerCase()} word or sentence part.`, { concept: spec.concept, topic: spec.topic, options: [answer, ...distractors] });
      }
      if (type === "fill") {
        const blanked = context.replace(answer, "___");
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Complete the sentence: ${blanked}`, answer, `The word ${answer} makes the ${spec.topic.toLowerCase()} sentence complete and clear.`, { concept: spec.concept, topic: spec.topic });
      }
      if (type === "matching") {
        const pairItems = [example, ...spec.examples.filter((_, itemIndex) => itemIndex !== index).slice(0, 2)];
        const pairs = pairItems.map((item) => {
          const [left, right] = item.split("::");
          return { left, right };
        });
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Match each ${spec.topic.toLowerCase()} word or sentence part to its sentence.`, pairs.map((pair) => `${pair.left}=${pair.right}`).join("|"), `Each match shows how the ${spec.topic.toLowerCase()} idea works in a short sentence.`, { concept: spec.concept, topic: spec.topic, pairs });
      }
      if (type === "identify") {
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `${spec.instruction} ${context}`, answer, `${answer} is the part that shows ${spec.topic.toLowerCase()}.`, { concept: spec.concept, topic: spec.topic, options: [answer, ...distractors] });
      }
      const sentence = spec.topic === "Word-to-sentence formation" ? answer : context;
      const tokens = sentence.replace(/[?.!]$/, "").split(/\s+/);
      const completedSentence = /[?.!]$/.test(sentence) ? sentence : `${sentence}.`;
      return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Put the words in order to show ${spec.topic.toLowerCase()}.`, completedSentence, `The words make a clear short sentence about ${spec.topic.toLowerCase()}.`, { concept: spec.concept, topic: spec.topic, tokens: [...tokens].reverse().map((token) => token === tokens[tokens.length - 1] ? `${token}.` : token) });
    })
  );

type PrimaryTopicSpec = { concept: string; topic: string; examples: string[] };

const PRIMARY_TOPIC_SPECS: PrimaryTopicSpec[] = [
  { concept: "Nouns", topic: "Common nouns", examples: ["teacher|The teacher reads a story.", "river|The river flows past our village.", "market|We bought fruit at the market.", "puppy|The puppy wagged its tail.", "bicycle|Anita rides her bicycle to school.", "window|Please open the window.", "garden|Grandmother waters the garden.", "pencil|My pencil has a sharp tip.", "mountain|The mountain is covered with snow.", "library|Our library has colourful books."] },
  { concept: "Nouns", topic: "Proper nouns", examples: ["Meera|Meera won the drawing prize.", "India|India has many languages.", "Monday|Our music lesson is on Monday.", "Delhi|Uncle lives in Delhi.", "Ganga|The Ganga is a famous river.", "January|January begins the new year.", "Ravi|Ravi carried the blue folder.", "Asia|Asia is a very large continent.", "Diwali|We visit our cousins at Diwali.", "Friday|The class test is on Friday."] },
  { concept: "Nouns", topic: "Collective nouns", examples: ["team|The team practised before the match.", "flock|A flock of birds crossed the sky.", "herd|The herd of elephants moved slowly.", "bouquet|Mother received a bouquet of roses.", "class|Our class planted two trees.", "library|A library of books filled the shelf.", "pack|A pack of dogs ran down the lane.", "swarm|A swarm of bees circled the hive.", "fleet|The fleet of boats returned at sunset.", "bunch|He carried a bunch of grapes."] },
  { concept: "Nouns", topic: "Abstract nouns", examples: ["kindness|Kindness makes a classroom friendly.", "honesty|Honesty is valued by everyone.", "courage|The firefighter showed great courage.", "joy|The children shouted with joy.", "freedom|Everyone hopes to live with freedom.", "wisdom|Grandfather shared his wisdom.", "patience|Learning a skill requires patience.", "friendship|Their friendship grew stronger.", "beauty|The beauty of the sunrise amazed us.", "anger|Deep breathing can calm anger."] },
  { concept: "Nouns", topic: "Identifying nouns", examples: ["doctor|The doctor checked Kabir's arm.", "school|Our school has a new playground.", "rain|The rain filled the small pond.", "music|The music made everyone dance.", "basket|She placed the apples in a basket.", "brother|My brother fixed the kite.", "parrot|The parrot copied the sound.", "honesty|Honesty builds trust.", "Mumbai|Auntie travelled to Mumbai.", "sand|The sand felt warm."] },
  { concept: "Pronouns", topic: "Personal pronouns", examples: ["She|Rina is early, so ___ can help.", "They|The children finished, and ___ went outside.", "We|My cousin and I said ___ would return.", "It|The puppy is tired, so ___ is sleeping.", ["He","Arun is kind, and ___ shares his lunch."].join("|"), "I|___ am ready for the spelling test.", "You|Can ___ carry these books?", "Us|The coach called ___ to the field.", "Them|I saw the players and waved to ___.", "Me|Please give the note to ___."] },
  { concept: "Pronouns", topic: "Possessive pronouns", examples: ["mine|This blue water bottle is ___.", "yours|Is the red umbrella ___?", "his|The football is ___.", "hers|That scarf is ___.", "ours|The winning project is ___.", "theirs|Those seats are ___.", "mine|The pencil on my desk is ___.", "yours|The choice is ___.", "hers|The silver bicycle is ___.", "ours|This classroom is ___."] },
  { concept: "Pronouns", topic: "Demonstrative pronouns", examples: ["This|___ is the shell I found.", "That|___ is the bus we need.", "These|___ are my new shoes.", "Those|___ are ripe mangoes.", "This|___ tastes sweeter than the other one.", "That|___ was a loud thunderclap.", "These|___ belong in the art cupboard.", "Those|___ are the tallest trees.", "This|___ is the answer I chose.", "That|___ looks like our kite."] },
  { concept: "Pronouns", topic: "Reflexive pronouns", examples: ["herself|Maya packed the bag by ___.", "himself|The boy taught ___ to juggle.", "myself|I reminded ___ to be patient.", "ourselves|We enjoyed ___ at the picnic.", "themselves|The players organised ___ into teams.", "yourself|Please introduce ___ to the visitor.", "itself|The door closed by ___.", "himself|Rohan blamed ___ for the mistake.", "herself|The dancer saw ___ in the mirror.", "ourselves|We prepared ___ for the quiz."] },
  { concept: "Pronouns", topic: "Indefinite pronouns", examples: ["someone|___ left a lunchbox near the gate.", "everyone|___ enjoyed the puppet show.", "nobody|___ knew the answer at first.", "anything|You may choose ___ from the box.", "something|I heard ___ outside.", "each|___ of the pupils received a badge.", "many|___ have visited the museum.", "few|Only a ___ remembered the rule.", "none|___ of the milk was wasted.", "somebody|___ has knocked on the door."] },
  { concept: "Articles", topic: "A", examples: ["a|We saw ___ rabbit near the hedge.", "a|She packed ___ sandwich.", "a|He found ___ coin.", "a|I need ___ ruler.", "a|There is ___ rainbow outside.", "a|Mina drew ___ house.", "a|Dad bought ___ newspaper.", "a|We heard ___ strange noise.", "a|He wants ___ uniform.", "a|She planted ___ seed."] },
  { concept: "Articles", topic: "An", examples: ["an|We saw ___ eagle above the hill.", "an|She ate ___ orange.", "an|He drew ___ elephant.", "an|I waited for ___ hour.", "an|There is ___ umbrella by the door.", "an|Ravi found ___ old coin.", "an|She is ___ honest child.", "an|We heard ___ unusual sound.", "an|He packed ___ egg.", "an|They adopted ___ energetic puppy."] },
  { concept: "Articles", topic: "The", examples: ["the|Please close ___ classroom door.", "the|___ moon shone brightly.", "the|We crossed ___ bridge near the park.", "the|She returned ___ book I lent her.", "the|___ sun warms the Earth.", "the|He fed ___ cat next door.", "the|We visited ___ museum on Sunday.", "the|___ tallest tree is behind the house.", "the|Put the cups on ___ table.", "the|They watched ___ final match."] },
  { concept: "Articles", topic: "Basic article usage", examples: ["an|I saw ___ owl in a tree.", "a|She wants ___ new pencil.", "the|Please pass me ___ salt.", "zero|Children need ___ fresh air.", "a|He is ___ useful helper.", "an|It was ___ exciting journey.", "the|___ Earth moves around the Sun.", "zero|We drink ___ water every day.", "a|She told us ___ funny story.", "the|We cleaned ___ kitchen after lunch."] },
  { concept: "Number", topic: "Singular nouns", examples: ["leaf|One ___ fell from the tree.", "child|A ___ is reading quietly.", "tooth|The dentist checked one ___.", "mouse|A ___ hid under the cupboard.", "box|There is one ___ on the shelf.", "woman|One ___ helped the lost child.", "knife|The chef sharpened one ___.", "foot|He hurt one ___.", "story|I read one ___ before bed.", "baby|A ___ smiled at the nurse."] },
  { concept: "Number", topic: "Plural nouns", examples: ["leaves|The autumn ___ covered the path.", "children|The ___ sang together.", "teeth|Brush your ___ twice daily.", "mice|The ___ hid behind the sack.", "boxes|Three ___ arrived today.", "women|The ___ planted flowers.", "knives|The kitchen ___ are clean.", "feet|Their ___ were muddy.", "stories|We shared funny ___.", "babies|The ___ slept peacefully."] },
  { concept: "Number", topic: "Regular plurals", examples: ["cats|Two ___ slept on the mat.", "buses|The ___ stopped outside school.", "dishes|Please wash the ___.", "classes|Our ___ begin at nine.", "wishes|She wrote three birthday ___.", "potatoes|We bought five ___.", "foxes|The ___ live near the wood.", "toys|The children packed their ___.", "oranges|The basket held six ___.", "benches|The park has wooden ___."] },
  { concept: "Number", topic: "Irregular plurals", examples: ["geese|The ___ flew over the lake.", "men|Three ___ repaired the road.", "women|The ___ organised the fair.", "feet|My ___ are cold.", "mice|Several ___ live in the barn.", "children|The ___ built a sandcastle.", "people|Many ___ joined the parade.", "oxen|The farmer watched the ___.", "teeth|The baby's first ___ appeared.", "knives|Keep sharp ___ away from children."] },
  { concept: "Gender", topic: "Masculine", examples: ["king|The ___ wore a golden crown.", "uncle|My ___ visits us on Sundays.", "rooster|The ___ crowed at dawn.", "father|Her ___ drives the school bus.", "prince|The ___ helped the villagers.", "son|Their ___ won the race.", "nephew|My ___ likes painting.", "horse|The ___ pulled the cart.", "brother|Her ___ plays the flute.", "actor|The ___ received an award."] },
  { concept: "Gender", topic: "Feminine", examples: ["queen|The ___ waved to the crowd.", "aunt|My ___ baked a cake.", "hen|The ___ guarded her chicks.", "mother|His ___ teaches science.", "princess|The ___ visited the garden.", "daughter|Their ___ won the medal.", "niece|My ___ enjoys swimming.", "mare|The ___ ran across the field.", "sister|Her ___ plays the violin.", "actress|The ___ received an award."] },
  { concept: "Gender", topic: "Common gender", examples: ["teacher|The ___ checked our homework.", "doctor|The ___ treated the patient.", "friend|My ___ shared a snack.", "parent|A ___ signed the form.", "student|Every ___ brought a notebook.", "artist|The ___ painted a mural.", "singer|The ___ performed on stage.", "relative|A ___ called yesterday.", "neighbour|Our ___ grows roses.", "leader|The ___ welcomed the visitors."] },
  { concept: "Gender", topic: "Neuter gender", examples: ["table|The ___ is made of wood.", "book|This ___ has a torn cover.", "bottle|The ___ is full of water.", "computer|The ___ needs charging.", "garden|The ___ looks bright after rain.", "mountain|The ___ is far away.", "clock|The ___ stopped at noon.", "window|The ___ is open.", "school|The ___ closes at four.", "river|The ___ flows to the sea."] },
  { concept: "Verbs", topic: "Action verbs", examples: ["sprinted|The athlete ___ towards the finish line.", "whispered|Neha ___ the answer to her partner.", "painted|We ___ a mural for the corridor.", "lifted|Dad ___ the heavy parcel.", "crawled|The baby ___ across the mat.", "planted|The class ___ saplings.", "clapped|The audience ___ after the song.", "measured|Ravi ___ the table carefully.", "balanced|The gymnast ___ on one foot.", "searched|They ___ for the missing key."] },
  { concept: "Verbs", topic: "Main verbs", examples: ["writes|Asha ___ in her diary.", "build|We ___ models in science class.", "opened|The guard ___ the gate.", "carries|He ___ his lunch box.", "watched|They ___ the match together.", "grows|The plant ___ near the window.", "choose|Please ___ one book.", "returned|Mina ___ the library book.", "solves|Arun ___ puzzles quickly.", "listen|We ___ to the instructions."] },
  { concept: "Verbs", topic: "Helping verbs", examples: ["is|The puppy ___ sleeping.", "have|We ___ finished our work.", "was|She ___ drawing a map.", "will|They ___ visit the zoo.", "can|I ___ solve this sum.", "does|He ___ not like spinach.", "were|The boys ___ playing cricket.", "has|Rita ___ packed her bag.", "should|You ___ speak politely.", "are|The flowers ___ blooming."] },
  { concept: "Verbs", topic: "Verb forms", examples: ["went|Yesterday we ___ to the museum.", "eaten|The birds have ___ all the seeds.", "running|The dog is ___ across the field.", "written|She has ___ a letter.", "sang|The choir ___ beautifully.", "broken|The cup was ___.", "swimming|They are ___ in the pool.", "taken|He has ___ the photograph.", "drove|Uncle ___ us home.", "spoken|Maya has ___ clearly."] },
  { concept: "Tenses", topic: "Present Simple", examples: ["walks|Every morning, Tara ___ to school.", "drink|We ___ water after games.", "rises|The sun ___ in the east.", "read|I ___ before bedtime.", "flies|The kite ___ high on windy days.", "teach|Our teachers ___ us patiently.", "needs|The plant ___ sunlight.", "play|The children ___ in the park.", "opens|The shop ___ at eight.", "wash|We ___ our hands before lunch."] },
  { concept: "Tenses", topic: "Present Continuous", examples: ["is cooking|Mum ___ dinner right now.", "are running|The athletes ___ on the track.", "am reading|I ___ a mystery book today.", "is shining|The sun ___ brightly this morning.", "are building|We ___ a model bridge.", "is ringing|The bell ___ for assembly.", "are singing|The children ___ a welcome song.", "am writing|I ___ an invitation.", "is raining|It ___ outside.", "are planting|The pupils ___ seeds."] },
  { concept: "Tenses", topic: "Present Perfect", examples: ["has finished|Rohan ___ his homework already.", "have visited|We ___ the science museum twice.", "has broken|The wind ___ the branch.", "have eaten|They ___ their lunch.", "has lost|Mina ___ her pencil.", "have seen|I ___ that film before.", "has arrived|The bus ___ at the stop.", "have cleaned|We ___ the classroom.", "has won|Our team ___ the final.", "have learned|The pupils ___ a new song."] },
  { concept: "Tenses", topic: "Past Simple", examples: ["visited|Last Sunday, we ___ the fort.", "bought|Dad ___ fresh fruit yesterday.", "played|The children ___ chess after school.", "saw|I ___ a rainbow in the morning.", "carried|She ___ the books upstairs.", "wrote|Arun ___ a thank-you note.", "ran|The dog ___ across the garden.", "made|We ___ paper boats.", "found|Maya ___ a shell on the beach.", "slept|The baby ___ peacefully."] },
  { concept: "Tenses", topic: "Past Continuous", examples: ["was reading|At six o'clock, I ___ a comic.", "were playing|The children ___ in the rain.", "was cooking|Grandmother ___ soup when we arrived.", "were travelling|We ___ to Jaipur that evening.", "was shining|The moon ___ above the trees.", "were waiting|The passengers ___ for the train.", "was drawing|Ria ___ a portrait.", "were singing|The birds ___ at dawn.", "was repairing|Uncle ___ the bicycle.", "were studying|They ___ for the test."] },
  { concept: "Tenses", topic: "Future Simple", examples: ["will visit|We ___ the planetarium tomorrow.", "will help|I ___ you with the project.", "will arrive|The train ___ at noon.", "will plant|The class ___ trees next week.", "will call|Auntie ___ after dinner.", "will win|Our team ___ the match.", "will bring|He ___ his camera.", "will learn|You ___ a new poem.", "will cook|Dad ___ pasta tonight.", "will start|The show ___ soon."] },
  { concept: "Subject–Verb Agreement", topic: "Singular subjects", examples: ["is|The basket of apples ___ heavy.", "runs|The little boy ___ fast.", "has|My sister ___ a blue umbrella.", "was|The dog ___ tired.", "needs|The plant ___ water.", "does|The engine ___ not start.", "flies|A bright kite ___ above us.", "likes|Ravi ___ mangoes.", "makes|This machine ___ a loud noise.", "belongs|That book ___ to Meera."] },
  { concept: "Subject–Verb Agreement", topic: "Plural subjects", examples: ["are|The books ___ on the shelf.", "run|The boys ___ across the field.", "have|My friends ___ new bicycles.", "were|The puppies ___ asleep.", "need|These plants ___ sunlight.", "do|The players ___ not complain.", "fly|Several kites ___ above us.", "like|The children ___ mangoes.", "make|These machines ___ useful tools.", "belong|Those bags ___ to the pupils."] },
  { concept: "Subject–Verb Agreement", topic: "I / You / He / She / It / They", examples: ["am|I ___ ready for the lesson.", "are|You ___ welcome here.", "is|He ___ my cousin.", "is|She ___ carrying a basket.", "is|It ___ raining outside.", "are|They ___ waiting near the gate.", "do|I ___ my homework after tea.", "does|She ___ her work carefully.", "have|They ___ enough pencils.", "has|He ___ a green cap."] },
  { concept: "Adjectives", topic: "Adjectives of quality", examples: ["bright|The ___ stars filled the sky.", "gentle|The ___ nurse comforted the child.", "ancient|We explored an ___ fort.", "crispy|The baker made ___ biscuits.", "brave|The ___ girl rescued the kitten.", "narrow|We walked along a ___ lane.", "cheerful|A ___ song began the programme.", "careful|The ___ driver slowed down.", "colourful|The artist used ___ paints.", "honest|An ___ answer earns trust."] },
  { concept: "Adjectives", topic: "Adjectives of quantity", examples: ["much|There is ___ rice in the bowl.", "many|___ pupils joined the club.", "little|There is ___ milk left.", "few|Only a ___ stars were visible.", "enough|We have ___ chairs for everyone.", "some|Please add ___ sugar.", "several|___ birds sat on the wall.", "plenty|There is ___ time before lunch.", "all|___ the water was clean.", "no|There is ___ noise in the library."] },
  { concept: "Adjectives", topic: "Adjectives of number", examples: ["three|I packed ___ notebooks.", "first|Maya won the ___ prize.", "several|We solved ___ questions.", "both|___ teams played fairly.", "second|He lives on the ___ floor.", "many|___ visitors entered the museum.", "tenth|The ___ runner crossed the line.", "two|She has ___ brothers.", "last|Arun caught the ___ bus.", "five|There are ___ candles."] },
  { concept: "Adjectives", topic: "Demonstrative adjectives", examples: ["this|___ book belongs to me.", "that|___ mountain looks snowy.", "these|___ mangoes are sweet.", "those|___ houses are across the river.", "this|___ pencil is blunt.", "that|___ painting won the prize.", "these|___ flowers need water.", "those|___ clouds promise rain.", "this|___ answer is correct.", "that|___ road leads to the village."] },
  { concept: "Adjectives", topic: "Degrees of comparison", examples: ["taller|A giraffe is ___ than a horse.", "tallest|Mount Everest is the ___ mountain.", "better|This plan is ___ than the old one.", "best|She gave her ___ performance.", "faster|The new train is ___ than the bus.", "fastest|Cheetahs are among the ___ animals.", "more careful|Be ___ on the wet floor.", "most exciting|That was the ___ match.", "smaller|This box is ___ than that one.", "smallest|The ___ seed began to grow."] },
  { concept: "Adverbs", topic: "Adverbs of manner", examples: ["quietly|The baby slept ___.", "carefully|Ravi carried the glass ___.", "bravely|The firefighter acted ___.", "happily|The children danced ___.", "slowly|The tortoise moved ___.", "neatly|She folded the clothes ___.", "angrily|The coach spoke ___.", "easily|Mina solved the puzzle ___.", "loudly|The crowd cheered ___.", "politely|He answered the visitor ___."] },
  { concept: "Adverbs", topic: "Adverbs of time", examples: ["today|We are visiting the museum ___.", "tomorrow|The test will begin ___.", "yesterday|I finished the book ___.", "soon|The bus will arrive ___.", "now|Please come here ___.", "later|We can discuss it ___.", "already|She has ___ eaten.", "recently|They moved here ___.", "always|He ___ remembers his keys.", "never|I have ___ seen snow."] },
  { concept: "Adverbs", topic: "Adverbs of place", examples: ["here|Please put the bag ___.", "there|The children are waiting ___.", "outside|The birds are singing ___.", "inside|It is warm ___.", "nearby|A small shop is ___.", "everywhere|We looked ___ for the puppy.", "upstairs|Grandfather is resting ___.", "downstairs|The guests are sitting ___.", "away|The boat sailed ___.", "abroad|Her aunt works ___."] },
  { concept: "Adverbs", topic: "Adverbs of frequency", examples: ["often|We ___ visit the library.", "usually|Ria ___ walks to school.", "sometimes|They ___ play carrom.", "rarely|He ___ eats sweets.", "always|The sun ___ rises in the east.", "never|I ___ forget my lunch.", "daily|The nurse checks the ward ___.", "weekly|Our team practises ___.", "frequently|The bell rings ___ during the drill.", "occasionally|We ___ eat at that restaurant."] },
  { concept: "Prepositions", topic: "Prepositions of place", examples: ["under|The cat is hiding ___ the table.", "between|The ball rolled ___ two chairs.", "behind|The shed stands ___ the house.", "beside|Mina sat ___ her friend.", "above|A lamp hangs ___ the desk.", "inside|The keys are ___ the drawer.", "against|The ladder rests ___ the wall.", "near|Our school is ___ the park.", "across|The shop is ___ the road.", "among|A blue flower grew ___ the weeds."] },
  { concept: "Prepositions", topic: "Prepositions of time", examples: ["at|The film starts ___ seven o'clock.", "on|Our holiday begins ___ Monday.", "in|Flowers bloom ___ spring.", "since|She has lived here ___ 2020.", "for|We waited ___ an hour.", "before|Wash your hands ___ dinner.", "after|We played ___ the rain stopped.", "during|No one spoke ___ the test.", "until|The shop stays open ___ nine.", "by|Please finish this ___ Friday."] },
  { concept: "Prepositions", topic: "Prepositions of direction", examples: ["to|We walked ___ the playground.", "towards|The puppy ran ___ its owner.", "into|The bird flew ___ the room.", "onto|The child climbed ___ the stage.", "through|The train passed ___ the tunnel.", "across|They swam ___ the pool.", "along|We cycled ___ the river.", "around|The Earth moves ___ the Sun.", "from|A letter arrived ___ Chennai.", "out of|The rabbit jumped ___ the box."] },
  { concept: "Conjunctions", topic: "And", examples: ["and|Ravi ___ Meera planted seeds.", "and|I packed a ruler ___ a pencil.", "and|The dog barked ___ wagged its tail.", "and|We sang ___ clapped together.", "and|She is kind ___ helpful.", "and|Bring your book ___ notebook.", "and|The sun rose ___ birds sang.", "and|He washed ___ dried the dishes.", "and|Mum bought apples ___ bananas.", "and|Read the question ___ answer it."] },
  { concept: "Conjunctions", topic: "But", examples: ["but|The bag is small ___ strong.", "but|I was tired, ___ I finished.", "but|She likes tea ___ not coffee.", "but|The road is long ___ safe.", "but|He ran fast ___ missed the bus.", "but|It rained, ___ we played indoors.", "but|The puzzle looks hard ___ is fun.", "but|Maya is young ___ very wise.", "but|I called, ___ nobody answered.", "but|The box is old ___ useful."] },
  { concept: "Conjunctions", topic: "Or", examples: ["or|Would you like tea ___ juice?", "or|Choose a pencil ___ a pen.", "or|We can walk ___ take the bus.", "or|Is the bag red ___ blue?", "or|Study now ___ revise later.", "or|Would you like rice ___ bread?", "or|Call me ___ send a message.", "or|Can Arun ___ Meera lead?", "or|Wear a cap ___ carry an umbrella.", "or|Do you want apples ___ grapes?"] },
  { concept: "Conjunctions", topic: "Because", examples: ["because|We stayed inside ___ it was raining.", "because|She smiled ___ she won.", "because|The plant died ___ it lacked water.", "because|I wore a coat ___ it was cold.", "because|He apologised ___ he was late.", "because|They hurried ___ the bell rang.", "because|Mina rested ___ she felt tired.", "because|We used a torch ___ it was dark.", "because|The road closed ___ a tree fell.", "because|I packed lunch ___ the trip was long."] },
  { concept: "Conjunctions", topic: "So", examples: ["so|It was hot, ___ we drank water.", "so|The bus was late, ___ we walked.", "so|I studied hard, ___ I felt ready.", "so|The glass fell, ___ it broke.", "so|She was hungry, ___ she ate fruit.", "so|It rained, ___ the match moved indoors.", "so|He saved money, ___ he bought a bicycle.", "so|The path was muddy, ___ we wore boots.", "so|The light was red, ___ we stopped.", "so|The baby was sleepy, ___ Mum rocked him."] },
  { concept: "Sentence Types", topic: "Declarative sentences", examples: ["The Earth is round.|The Earth is round.", "Our class starts at nine.|Our class starts at nine.", "Maya likes mangoes.|Maya likes mangoes.", "The river is deep.|The river is deep.", "We finished the project.|We finished the project.", "My brother plays chess.|My brother plays chess.", "The garden looks beautiful.|The garden looks beautiful.", "Birds build nests.|Birds build nests.", "The soup is warm.|The soup is warm.", "I packed my bag.|I packed my bag."] },
  { concept: "Sentence Types", topic: "Interrogative sentences", examples: ["Where is the library?|Where is the library?", "Are you ready?|Are you ready?", "What time is lunch?|What time is lunch?", "Can we play outside?|Can we play outside?", "Who left this note?|Who left this note?", "Did you finish the task?|Did you finish the task?", "Why is the sky blue?|Why is the sky blue?", "Have they arrived?|Have they arrived?", "Which book is yours?|Which book is yours?", "May I borrow your ruler?|May I borrow your ruler?"] },
  { concept: "Sentence Types", topic: "Imperative sentences", examples: ["Please close the gate.|Please close the gate.", "Bring your notebook.|Bring your notebook.", "Do not touch the wet paint.|Do not touch the wet paint.", "Turn left at the corner.|Turn left at the corner.", "Listen to the instructions.|Listen to the instructions.", "Share the crayons.|Share the crayons.", "Please wait here.|Please wait here.", "Write your name clearly.|Write your name clearly.", "Keep the room tidy.|Keep the room tidy.", "Look both ways before crossing.|Look both ways before crossing."] },
  { concept: "Sentence Types", topic: "Exclamatory sentences", examples: ["What a beautiful rainbow!|What a beautiful rainbow!", "How quickly the time passed!|How quickly the time passed!", "What a clever idea!|What a clever idea!", "That was an amazing goal!|That was an amazing goal!", "How bright the stars are!|How bright the stars are!", "What a huge elephant!|What a huge elephant!", "How delicious this cake is!|How delicious this cake is!", "What a wonderful surprise!|What a wonderful surprise!", "The view is spectacular!|The view is spectacular!", "How exciting the match was!|How exciting the match was!"] },
  { concept: "Punctuation", topic: "Capitalization", examples: ["Rohan|___ visited Chennai in June.", "Monday|Our test is on ___.", "India|___ is my home country.", "Meera|___ reads every evening.", "Diwali|We celebrate ___ with lamps.", "Delhi|Uncle works in ___.", "January|The year begins in ___.", "English|We study ___ at school.", "Ganga|The ___ is a long river.", "Friday|The play is on ___."] },
  { concept: "Punctuation", topic: "Full stop", examples: ["The dog is sleeping.|The dog is sleeping", "We planted a tree.|We planted a tree", "Mina likes music.|Mina likes music", "The sky is clear.|The sky is clear", "I finished my work.|I finished my work", "The bus has arrived.|The bus has arrived", "Our team won.|Our team won", "The baby is smiling.|The baby is smiling", "Please bring a pencil.|Please bring a pencil", "The flowers are fresh.|The flowers are fresh"] },
  { concept: "Punctuation", topic: "Comma", examples: ["After lunch, we read.|After lunch we read.", "Ravi, please sit down.|Ravi please sit down.", "We bought apples, bananas and pears.|We bought apples bananas and pears.", "First, wash your hands.|First wash your hands.", "Mum packed books, pencils and crayons.|Mum packed books pencils and crayons.", "Yes, I know the answer.|Yes I know the answer.", "In the evening, we played.|In the evening we played.", "My friend, Anu, lives nearby.|My friend Anu lives nearby.", "Bring a hat, coat and scarf.|Bring a hat coat and scarf.", "Finally, the bell rang.|Finally the bell rang."] },
  { concept: "Punctuation", topic: "Question mark", examples: ["Where is my bag?|Where is my bag.", "Can you help me?|Can you help me.", "What is your name?|What is your name.", "Are we late?|Are we late.", "Who won the race?|Who won the race.", "Did you see the film?|Did you see the film.", "Why are you laughing?|Why are you laughing.", "Is this your pencil?|Is this your pencil.", "When does school start?|When does school start.", "May I come in?|May I come in."] },
  { concept: "Punctuation", topic: "Exclamation mark", examples: ["Watch out!|Watch out.", "What a surprise!|What a surprise.", "Hurray, we won!|Hurray, we won.", "That is fantastic!|That is fantastic.", "Oh no!|Oh no.", "How beautiful!|How beautiful.", "Stop!|Stop.", "Well done!|Well done.", "What a loud noise!|What a loud noise.", "Help!|Help."] },
];

const primarySlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const primarySentence = (context: string, answer: string) =>
  context.includes("___") ? context.replace("___", answer) : context;

const primaryIncorrectSentence = (spec: PrimaryTopicSpec, context: string, answer: string, otherAnswer: string) => {
  const corrected = primarySentence(context, answer);
  if (corrected !== context) return context;
  if (corrected.includes(answer) && answer.length > 0) return corrected.replace(answer, otherAnswer);
  if (/capitalization/i.test(spec.topic)) return `${corrected.charAt(0).toLowerCase()}${corrected.slice(1)}`;
  if (/full stop|question mark|exclamation mark/i.test(spec.topic)) {
    return corrected.replace(/[.!?]$/, corrected.endsWith(".") ? "?" : ".");
  }
  if (/[.!?]$/.test(corrected)) return corrected.replace(/[.!?]$/, "");
  return `${corrected} (incorrect)`;
};

const primaryTransformation = (spec: PrimaryTopicSpec, context: string, answer: string, otherAnswer: string) => {
  const source = primarySentence(context, answer);
  if (/singular nouns/i.test(spec.topic)) return { source: `Change to plural: ${source}`, result: source.replace(answer, otherAnswer) };
  if (/plural nouns/i.test(spec.topic)) return { source: `Change to singular: ${source}`, result: source.replace(answer, otherAnswer) };
  if (/regular plurals|irregular plurals/i.test(spec.topic)) return { source: `Change the number: ${source}`, result: source.replace(answer, otherAnswer) };
  if (/masculine/i.test(spec.topic)) return { source: `Change to the feminine form: ${source}`, result: source.replace(answer, otherAnswer) };
  if (/feminine/i.test(spec.topic)) return { source: `Change to the masculine form: ${source}`, result: source.replace(answer, otherAnswer) };
  if (/capitalization/i.test(spec.topic)) return { source: `Rewrite with correct capital letters: ${primaryIncorrectSentence(spec, source, answer, otherAnswer)}`, result: source };
  if (/full stop|question mark|exclamation mark|comma/i.test(spec.topic)) return { source: `Rewrite with the correct ${spec.topic.toLowerCase()}: ${primaryIncorrectSentence(spec, source, answer, otherAnswer)}`, result: source };
  if (/declarative sentences/i.test(spec.topic)) return { source: `Change this statement into a question: ${source}`, result: source.replace(/[.!]$/, "?").replace(/^([A-Z][^?]*)$/, "Do you think $1") };
  if (/interrogative sentences/i.test(spec.topic)) return { source: `Change this question into a statement: ${source}`, result: source.replace(/\?$/, ".").replace(/^((Where|What|Who|Why|When) )/, "The answer is ") };
  if (/imperative sentences/i.test(spec.topic)) return { source: `Make this instruction polite: ${source}`, result: `Please ${source.charAt(0).toLowerCase()}${source.slice(1)}` };
  if (/exclamatory sentences/i.test(spec.topic)) return { source: `Rewrite this with an exclamation: ${source.replace("!", ".")}`, result: source };
  if (/present simple/i.test(spec.topic)) return { source: `Make negative: ${source}`, result: `The subject does not ${source.replace(answer, otherAnswer).toLowerCase()}` };
  if (/present continuous/i.test(spec.topic)) return { source: `Make negative: ${source}`, result: source.replace(/\b(is|are|am)\b/, "$1 not") };
  if (/past simple/i.test(spec.topic)) return { source: `Make negative: ${source}`, result: `The subject did not ${source.replace(answer, otherAnswer).toLowerCase()}` };
  if (/future simple/i.test(spec.topic)) return { source: `Make negative: ${source}`, result: source.replace(/\bwill\b/, "will not") };
  if (/adjectives of quality|degrees of comparison/i.test(spec.topic)) return { source: `Use a different describing word: ${source}`, result: source.replace(answer, otherAnswer) };
  if (/adverbs/i.test(spec.concept)) return { source: `Move the ${spec.topic.toLowerCase()} to the end: ${source}`, result: `${source.replace(answer, "").replace(/\s+/g, " ").trim().replace(/[.!?]$/, "")} ${answer}.` };
  return {
    source: `Replace the highlighted ${spec.topic.toLowerCase()} example with "${otherAnswer}" while keeping the sentence structure: ${source}`,
    result: source.replace(answer, otherAnswer),
  };
};

const buildPrimaryQuestions = (): GrammarQuestion[] =>
  PRIMARY_TOPIC_SPECS.flatMap((spec) =>
    spec.examples.map((entry, index) => {
      const [answer, context] = entry.split("|");
      const activityNumber = index + 1;
      const type = (["mcq", "fill", "error", "transform", "rearrange", "matching", "identify", "mcq", "fill", "identify"] as GrammarExerciseType[])[index];
      const id = `primary-${primarySlug(spec.concept)}-${primarySlug(spec.topic)}-${activityNumber}`;
      const otherAnswers = spec.examples.filter((_, itemIndex) => itemIndex !== index).slice(0, 2).map((item) => item.split("|")[0]);
      const options = [answer, ...otherAnswers];
      if (type === "matching") {
        const pairs = [entry, ...spec.examples.filter((_, itemIndex) => itemIndex !== index).slice(0, 2)].map((item) => {
          const [left, right] = item.split("|");
          return { left, right };
        });
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Match each ${spec.topic.toLowerCase()} example to its sentence or meaning.`, pairs.map((pair) => `${pair.left}=${pair.right}`).join("|"), `Each example shows how ${spec.topic.toLowerCase()} works in a clear Class 1–5 context.`, { concept: spec.concept, topic: spec.topic, pairs });
      }
      if (type === "rearrange") {
        const sentence = context.endsWith(".") || context.endsWith("?") || context.endsWith("!") ? context : `${context}.`;
        const tokens = sentence.replace(/[?.!]$/, "").split(/\s+/);
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Arrange the shuffled words to make a correct ${spec.topic.toLowerCase()} sentence.`, sentence, `The words form a complete sentence demonstrating ${spec.topic.toLowerCase()}.`, { concept: spec.concept, topic: spec.topic, tokens: [...tokens].reverse() });
      }
      if (type === "error") {
        const corrected = primarySentence(context, answer);
        const incorrect = primaryIncorrectSentence(spec, corrected, answer, otherAnswers[0]);
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Correct the ${spec.topic.toLowerCase()} mistake: ${incorrect}`, corrected, `The corrected sentence follows the ${spec.topic.toLowerCase()} rule.`, { concept: spec.concept, topic: spec.topic });
      }
      if (type === "transform") {
        const transformation = primaryTransformation(spec, context, answer, otherAnswers[0]);
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, transformation.source, transformation.result, `The transformation preserves the meaning while testing ${spec.topic.toLowerCase()}.`, { concept: spec.concept, topic: spec.topic });
      }
      if (type === "identify") {
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Identify the ${spec.topic.toLowerCase()} answer in: ${context}`, answer, `${answer} is the correct ${spec.topic.toLowerCase()} example in this sentence.`, { concept: spec.concept, topic: spec.topic, options });
      }
      if (type === "fill") {
        return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Complete the sentence: ${context.replace(answer, "___")}`, answer, `${answer} completes this ${spec.topic.toLowerCase()} sentence correctly.`, { concept: spec.concept, topic: spec.topic });
      }
      return q(id, type, `${spec.topic}: activity ${activityNumber}`, `Choose the correct ${spec.topic.toLowerCase()} answer for: ${context}`, answer, `${answer} is the correct choice for this ${spec.topic.toLowerCase()} example.`, { concept: spec.concept, topic: spec.topic, options });
    })
  );

type MiddleNounPronounActivity = {
  type: GrammarExerciseType;
  title: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  tokens?: string[];
  pairs?: { left: string; right: string }[];
};

const MIDDLE_NOUN_PRONOUN_TOPICS: {
  topic: string;
  activities: MiddleNounPronounActivity[];
}[] = [
  {
    topic: "Abstract nouns",
    activities: [
      { type: "mcq", title: "Name the abstract noun", prompt: "Which word names an idea rather than something that can be touched?", answer: "honesty", explanation: "Honesty is a quality or idea, so it is an abstract noun.", options: ["honesty", "helmet", "river"] },
      { type: "fill", title: "Form an abstract noun", prompt: "Complete the sentence: The team's ___ impressed the judges. (brave)", answer: "bravery", explanation: "Bravery is the abstract noun formed from brave.", },
      { type: "error", title: "Use the abstract noun", prompt: "Correct this sentence: Her kind impressed everyone.", answer: "Her kindness impressed everyone.", explanation: "Kindness is the noun naming the quality; kind is an adjective.", },
      { type: "transform", title: "Noun from adjective", prompt: "Rewrite using an abstract noun: The scientist was patient during the long test.", answer: "The scientist showed patience during the long test.", explanation: "Patience names the quality shown by someone who is patient.", },
      { type: "rearrange", title: "Place the abstract noun", prompt: "Arrange the words into a sentence about a quality.", answer: "Patience helps us solve difficult problems.", explanation: "Patience is the abstract subject, followed by the verb and its object.", tokens: ["difficult", "Patience", "problems.", "helps", "us", "solve"] },
      { type: "matching", title: "Match qualities and nouns", prompt: "Match each adjective to its abstract noun.", answer: "honest=honesty|wise=wisdom|strong=strength", explanation: "Each noun names the quality expressed by its adjective.", pairs: [{ left: "honest", right: "honesty" }, { left: "wise", right: "wisdom" }, { left: "strong", right: "strength" }] },
      { type: "identify", title: "Find the abstract noun", prompt: "In “Their friendship survived the disagreement,” which word is an abstract noun?", answer: "friendship", explanation: "Friendship names a relationship, not a physical object.", options: ["Their", "friendship", "survived"] },
      { type: "mcq", title: "Abstract or concrete", prompt: "Which sentence contains an abstract noun?", answer: "Justice should be fair to everyone.", explanation: "Justice is an idea or principle, so it is abstract.", options: ["Justice should be fair to everyone.", "The judge lifted the book.", "The wooden desk is brown."] },
      { type: "fill", title: "Complete with an abstract noun", prompt: "Complete the sentence: We admired Maya's ___ when she admitted the mistake. (honest)", answer: "honesty", explanation: "Honesty is the noun for the quality of being honest.", },
      { type: "transform", title: "Nominalise a quality", prompt: "Replace the adjective with an abstract noun: The volunteers were generous to the shelter.", answer: "The volunteers showed generosity to the shelter.", explanation: "Generosity is the abstract noun corresponding to generous.", },
    ],
  },
  {
    topic: "Collective nouns",
    activities: [
      { type: "mcq", title: "Choose the collective noun", prompt: "Which collective noun best completes the sentence? A ___ of bees moved around the hive.", answer: "swarm", explanation: "A swarm is a group of bees.", options: ["swarm", "flock", "fleet"] },
      { type: "fill", title: "Group of musicians", prompt: "Complete the sentence: The ___ performed three songs at the festival.", answer: "band", explanation: "Band is a collective noun for a group of musicians.", },
      { type: "error", title: "Correct the group noun", prompt: "Correct this sentence: A pack of wolves are moving through the forest.", answer: "A pack of wolves is moving through the forest.", explanation: "The singular collective noun pack is the subject, so formal agreement uses is.", },
      { type: "transform", title: "Use a collective noun", prompt: "Rewrite using one collective noun: Many ships waited in the harbour.", answer: "A fleet waited in the harbour.", explanation: "Fleet names a group of ships and replaces the plural noun phrase.", },
      { type: "rearrange", title: "Build a collective-noun sentence", prompt: "Arrange the words into a sentence about birds.", answer: "A flock of birds crossed the valley.", explanation: "Flock is the collective noun for the birds.", tokens: ["valley.", "of", "A", "crossed", "birds", "flock", "the"] },
      { type: "matching", title: "Match groups and collective nouns", prompt: "Match each group with its usual collective noun.", answer: "cattle=herd|players=team|stars=cluster", explanation: "These collective nouns identify the groups precisely.", pairs: [{ left: "cattle", right: "herd" }, { left: "players", right: "team" }, { left: "stars", right: "cluster" }] },
      { type: "identify", title: "Find the collective noun", prompt: "In “The jury reached its decision,” which word names the group?", answer: "jury", explanation: "Jury names a group of people who make a decision together.", options: ["jury", "reached", "decision"] },
      { type: "mcq", title: "Select the precise group", prompt: "Which sentence uses a collective noun correctly?", answer: "The committee has approved the plan.", explanation: "Committee is a collective noun for people making a decision together.", options: ["The committee has approved the plan.", "The committee are a plan.", "The committee approving plans."] },
      { type: "fill", title: "Collective noun for soldiers", prompt: "Complete the sentence: A ___ of soldiers marched past the school.", answer: "regiment", explanation: "Regiment is a collective noun for a military unit of soldiers.", },
      { type: "transform", title: "Replace a group phrase", prompt: "Rewrite with a collective noun: A group of dancers practised backstage.", answer: "A troupe of dancers practised backstage.", explanation: "Troupe is a collective noun for performers such as dancers.", },
    ],
  },
  {
    topic: "Compound nouns",
    activities: [
      { type: "mcq", title: "Recognise a compound noun", prompt: "Which word is a compound noun made from two smaller words?", answer: "raincoat", explanation: "Raincoat combines rain and coat to name one thing.", options: ["raincoat", "quickly", "blue"] },
      { type: "fill", title: "Join two nouns", prompt: "Complete the sentence with one compound noun: We ate lunch in the ___ (school + room).", answer: "schoolroom", explanation: "Schoolroom combines school and room into one noun.", },
      { type: "error", title: "Spell the compound noun", prompt: "Correct this sentence: Please put the books on the book shelf.", answer: "Please put the books on the bookshelf.", explanation: "Bookshelf is normally written as one closed compound noun.", },
      { type: "transform", title: "Form a compound noun", prompt: "Combine the words to name the object: a board used for surfing.", answer: "surfboard", explanation: "Surfboard combines surf and board.", },
      { type: "rearrange", title: "Use a compound noun", prompt: "Arrange the words into a sentence using a compound noun.", answer: "The firefighter carried a flashlight.", explanation: "Flashlight is the compound noun naming the portable light.", tokens: ["a", "carried", "The", "flashlight.", "firefighter"] },
      { type: "matching", title: "Match compound parts", prompt: "Match the word parts to make common compound nouns.", answer: "tooth=brush|news=paper|foot=ball", explanation: "Each pair forms a familiar compound noun.", pairs: [{ left: "tooth", right: "brush" }, { left: "news", right: "paper" }, { left: "foot", right: "ball" }] },
      { type: "identify", title: "Find the compound noun", prompt: "In “The sunflower turned towards the light,” which word is a compound noun?", answer: "sunflower", explanation: "Sunflower combines sun and flower.", options: ["sunflower", "turned", "towards"] },
      { type: "mcq", title: "Choose the correct form", prompt: "Which spelling is correct for a case used to hold books?", answer: "bookcase", explanation: "Bookcase combines book and case into one closed compound noun.", options: ["bookcase", "book case", "book-case"] },
      { type: "fill", title: "Complete with a compound noun", prompt: "Complete the sentence: Wear a ___ when you ride your bicycle. (head + gear)", answer: "headgear", explanation: "Headgear is the compound noun for protective items worn on the head.", },
      { type: "transform", title: "Expand a compound noun", prompt: "Replace the description with a compound noun: The child watched the machine that washes dishes.", answer: "The child watched the dishwasher.", explanation: "Dishwasher combines dish and washer to name the machine.", },
    ],
  },
  {
    topic: "Personal pronouns",
    activities: [
      { type: "mcq", title: "Choose the subject pronoun", prompt: "___ and I will present our model to the class.", answer: "She", explanation: "She is the subject pronoun used with I in this compound subject.", options: ["Her", "She", "Hers"] },
      { type: "fill", title: "Choose the object pronoun", prompt: "The coach congratulated ___ after the race. (we)", answer: "us", explanation: "Us is the object form of the personal pronoun we.", },
      { type: "error", title: "Correct the pronoun case", prompt: "Correct this sentence: Me and Rohan finished the poster.", answer: "Rohan and I finished the poster.", explanation: "I is the subject form; placing Rohan first is the polite standard order.", },
      { type: "transform", title: "Replace a repeated noun", prompt: "Rewrite with personal pronouns: Aisha told Aisha's brother that Aisha would help.", answer: "Aisha told her brother that she would help.", explanation: "Her shows possession and she replaces the repeated subject Aisha.", },
      { type: "rearrange", title: "Place personal pronouns", prompt: "Arrange the words into a clear sentence.", answer: "They invited us to their science club.", explanation: "They is the subject, us the object, and their the possessive determiner.", tokens: ["science", "their", "They", "club.", "invited", "us", "to"] },
      { type: "matching", title: "Match pronoun forms", prompt: "Match each subject pronoun to its object form.", answer: "I=me|he=him|they=them", explanation: "Object pronouns follow verbs or prepositions.", pairs: [{ left: "I", right: "me" }, { left: "he", right: "him" }, { left: "they", right: "them" }] },
      { type: "identify", title: "Find the personal pronoun", prompt: "In “We sent her the photographs,” which word is a personal pronoun referring to the receiver?", answer: "her", explanation: "Her is the object pronoun receiving the photographs.", options: ["We", "sent", "her"] },
      { type: "mcq", title: "Use personal pronouns clearly", prompt: "Which sentence uses personal pronouns with clear reference?", answer: "Priya thanked the teacher because Priya was grateful.", explanation: "Repeating Priya avoids an unclear she and makes the meaning precise.", options: ["Priya thanked the teacher because Priya was grateful.", "Priya thanked her because she was grateful.", "They thanked her because it was grateful."] },
      { type: "fill", title: "Pronoun after a preposition", prompt: "The librarian spoke to Ravi and ___. (I)", answer: "me", explanation: "The preposition to requires the object pronoun me.", },
      { type: "transform", title: "Use a subject pronoun", prompt: "Rewrite without repeating the nouns: The girls said the girls had finished the girls' project.", answer: "The girls said they had finished their project.", explanation: "They replaces the repeated subject and their shows possession.", },
    ],
  },
  {
    topic: "Possessive pronouns",
    activities: [
      { type: "mcq", title: "Choose the possessive pronoun", prompt: "This blue backpack is ___.", answer: "mine", explanation: "Mine stands alone and shows that the backpack belongs to the speaker.", options: ["my", "mine", "me"] },
      { type: "fill", title: "Complete with a possessive pronoun", prompt: "That calculator belongs to Neha; it is ___.", answer: "hers", explanation: "Hers is the possessive pronoun referring to Neha.", },
      { type: "error", title: "Separate the pronoun", prompt: "Correct this sentence: The winning idea was their's.", answer: "The winning idea was theirs.", explanation: "Possessive pronouns such as theirs never take an apostrophe.", },
      { type: "transform", title: "Replace a possessive phrase", prompt: "Rewrite using a possessive pronoun: This notebook belongs to Arjun.", answer: "This notebook is his.", explanation: "His replaces the phrase belongs to Arjun.", },
      { type: "rearrange", title: "Use a possessive pronoun", prompt: "Arrange the words into a sentence.", answer: "The seats near the window are ours.", explanation: "Ours stands alone after are and refers to the seats belonging to us.", tokens: ["ours.", "near", "The", "are", "window", "seats", "the"] },
      { type: "matching", title: "Match possessive forms", prompt: "Match each possessive determiner to its independent pronoun.", answer: "my=mine|our=ours|their=theirs", explanation: "The first word comes before a noun; the second stands alone.", pairs: [{ left: "my", right: "mine" }, { left: "our", right: "ours" }, { left: "their", right: "theirs" }] },
      { type: "identify", title: "Find the possessive pronoun", prompt: "In “The red umbrella is yours,” which word is the possessive pronoun?", answer: "yours", explanation: "Yours stands alone and identifies the owner's umbrella.", options: ["red", "umbrella", "yours"] },
      { type: "mcq", title: "Choose the correct possessive form", prompt: "Which sentence uses a possessive pronoun correctly?", answer: "The final decision was theirs.", explanation: "Theirs is an independent possessive pronoun and needs no apostrophe.", options: ["The final decision was theirs.", "The final decision was their's.", "The final decision was their."] },
      { type: "fill", title: "Complete with a possessive pronoun", prompt: "The responsibility for the display is ___. (they)", answer: "theirs", explanation: "Theirs stands alone and shows that the responsibility belongs to them.", },
      { type: "transform", title: "Change determiner to pronoun", prompt: "Rewrite without repeating the noun: Our project is more detailed than your project.", answer: "Our project is more detailed than yours.", explanation: "Yours replaces your project and stands independently.", },
    ],
  },
  {
    topic: "Reflexive pronouns",
    activities: [
      { type: "mcq", title: "Choose the reflexive pronoun", prompt: "Riya taught ___ to play the keyboard.", answer: "herself", explanation: "Herself refers back to the subject Riya.", options: ["her", "herself", "hers"] },
      { type: "fill", title: "Complete the reflexive sentence", prompt: "We organised the exhibition by ___.", answer: "ourselves", explanation: "Ourselves refers back to the subject we.", },
      { type: "error", title: "Avoid an unnecessary reflexive", prompt: "Correct this sentence: Please send the form to myself.", answer: "Please send the form to me.", explanation: "Use the object pronoun me after to; myself is reflexive and needs an appropriate antecedent.", },
      { type: "transform", title: "Add emphasis with a reflexive", prompt: "Rewrite to emphasise that the principal opened the exhibition: The principal opened the exhibition.", answer: "The principal herself opened the exhibition.", explanation: "Herself is an emphatic reflexive pronoun referring back to the principal.", },
      { type: "rearrange", title: "Place the reflexive pronoun", prompt: "Arrange the words into a sentence about independent work.", answer: "The students prepared themselves for the debate.", explanation: "Themselves refers back to the plural subject students.", tokens: ["themselves", "for", "The", "debate.", "prepared", "students", "the"] },
      { type: "matching", title: "Match subjects and reflexives", prompt: "Match each subject with its reflexive pronoun.", answer: "I=myself|you=yourself|they=themselves", explanation: "Reflexive forms agree with the person and number of the subject.", pairs: [{ left: "I", right: "myself" }, { left: "you", right: "yourself" }, { left: "they", right: "themselves" }] },
      { type: "identify", title: "Find the reflexive pronoun", prompt: "In “The cat cleaned itself after the rain,” which word is reflexive?", answer: "itself", explanation: "Itself refers back to the subject cat.", options: ["cat", "cleaned", "itself"] },
      { type: "mcq", title: "Use the correct number", prompt: "The two teams congratulated ___ after the match.", answer: "themselves", explanation: "The plural subject teams requires themselves.", options: ["itself", "himself", "themselves"] },
      { type: "fill", title: "Reflexive after an action", prompt: "She reminded ___ to check the map before leaving.", answer: "herself", explanation: "Herself refers back to she as the person being reminded.", },
      { type: "transform", title: "Add reflexive emphasis", prompt: "Rewrite to emphasise that I packed the equipment: I packed the equipment.", answer: "I myself packed the equipment.", explanation: "Myself can emphasise the subject I when it refers back to that subject.", },
    ],
  },
  {
    topic: "Relative pronouns",
    activities: [
      { type: "mcq", title: "Choose the relative pronoun", prompt: "The athlete ___ won the race trains every morning.", answer: "who", explanation: "Who introduces a relative clause about a person.", options: ["who", "which", "where"] },
      { type: "fill", title: "Relative pronoun for a thing", prompt: "The telescope, ___ we borrowed, belongs to the science club.", answer: "which", explanation: "Which refers to the thing telescope in this non-defining clause.", },
      { type: "error", title: "Correct the relative pronoun", prompt: "Correct this sentence: The village which I was born is near the coast.", answer: "The village where I was born is near the coast.", explanation: "Where refers to a place; which cannot directly replace the place relation here.", },
      { type: "transform", title: "Join with a relative clause", prompt: "Combine the sentences using who: Asha designed the poster. Asha won the art prize.", answer: "Asha, who designed the poster, won the art prize.", explanation: "Who joins the extra information about Asha in a non-defining relative clause.", },
      { type: "rearrange", title: "Build a relative clause", prompt: "Arrange the words into a sentence with a relative clause.", answer: "I thanked the neighbour who found my bicycle.", explanation: "Who introduces the clause describing the neighbour.", tokens: ["bicycle.", "who", "I", "found", "thanked", "my", "the", "neighbour"] },
      { type: "matching", title: "Match relative pronouns and uses", prompt: "Match each relative word to the use it normally introduces.", answer: "who=people|which=things|where=places", explanation: "These relative words connect information to the appropriate noun.", pairs: [{ left: "who", right: "people" }, { left: "which", right: "things" }, { left: "where", right: "places" }] },
      { type: "identify", title: "Find the relative pronoun", prompt: "In “The book that you recommended was fascinating,” which word begins the relative clause?", answer: "that", explanation: "That introduces the clause describing the book.", options: ["book", "that", "recommended"] },
      { type: "mcq", title: "Choose a defining relative", prompt: "Which sentence correctly identifies the one student who solved the puzzle?", answer: "The student who solved the puzzle explained the method.", explanation: "The defining clause who solved the puzzle identifies the student.", options: ["The student who solved the puzzle explained the method.", "The student which solved the puzzle explained the method.", "The student where solved the puzzle explained the method."] },
      { type: "fill", title: "Relative pronoun for possession", prompt: "The inventor ___ machine won the award thanked her team.", answer: "whose", explanation: "Whose shows that the machine belongs to the inventor.", },
      { type: "transform", title: "Join with which", prompt: "Combine the sentences using which: We visited the museum. It displays ancient coins.", answer: "We visited the museum, which displays ancient coins.", explanation: "Which adds information about the museum in a non-defining relative clause.", },
    ],
  },
];

const middleNounPronounSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const buildMiddleNounPronounQuestions = (): GrammarQuestion[] =>
  MIDDLE_NOUN_PRONOUN_TOPICS.flatMap(({ topic, activities }) =>
    activities.map((activity, index) =>
      q(
        `middle-nouns-advanced-pronouns-${middleNounPronounSlug(topic)}-${index + 1}`,
        activity.type,
        `${topic}: ${activity.title}`,
        activity.prompt,
        activity.answer,
        activity.explanation,
        {
          concept: "Nouns and advanced pronouns",
          topic,
          options: activity.options,
          tokens: activity.tokens,
          pairs: activity.pairs,
        }
      )
    )
  );

type MiddleDeterminerActivity = Omit<MiddleNounPronounActivity, "title"> & { title: string };

const MIDDLE_DETERMINER_TOPICS: { topic: string; activities: MiddleDeterminerActivity[] }[] = [
  {
    topic: "Articles",
    activities: [
      { type: "mcq", title: "Choose a before a consonant sound", prompt: "Mira borrowed ___ history book from the library.", answer: "a", explanation: "History begins with a consonant sound, so use a.", options: ["a", "an", "the"] },
      { type: "fill", title: "Choose an before a vowel sound", prompt: "The science club built ___ electric car.", answer: "an", explanation: "Electric begins with a vowel sound, so an is needed." },
      { type: "error", title: "Correct the article", prompt: "Correct this sentence: We watched a eclipse after sunset.", answer: "We watched an eclipse after sunset.", explanation: "Eclipse begins with a vowel sound; use an." },
      { type: "transform", title: "Make the noun specific", prompt: "Rewrite with the definite article: I returned a novel you recommended.", answer: "I returned the novel you recommended.", explanation: "The relative clause identifies one particular novel, so the is appropriate." },
      { type: "rearrange", title: "Place the articles correctly", prompt: "Arrange the words into a sentence about an experiment.", answer: "The student recorded an unusual result.", explanation: "Use the for the identified student and an before unusual.", tokens: ["unusual", "recorded", "The", "result.", "an", "student"] },
      { type: "matching", title: "Match article contexts", prompt: "Match each noun phrase to the article that fits.", answer: "___ honest answer=an|___ principal=the|___ uniform=a", explanation: "Article choice follows sound or whether the noun is specific.", pairs: [{ left: "___ honest answer", right: "an" }, { left: "___ principal", right: "the" }, { left: "___ uniform", right: "a" }] },
      { type: "identify", title: "Identify the zero article", prompt: "Which phrase uses no article for a general uncountable noun?", answer: "Water is essential for life.", explanation: "Water is used generally here, so no article is needed.", options: ["Water is essential for life.", "The water in this bottle is cold.", "A water bottle is on the desk."] },
      { type: "mcq", title: "Choose the article by sound", prompt: "Our class invited ___ university professor to speak.", answer: "a", explanation: "University begins with the /y/ consonant sound, so use a.", options: ["a", "an", "the"] },
      { type: "fill", title: "Use the for a unique noun", prompt: "___ Earth moves around the Sun.", answer: "The", explanation: "The names a unique planet in this context." },
      { type: "transform", title: "Change general to specific", prompt: "Make the noun phrase specific: I need a calculator. The calculator is on the desk.", answer: "I need a calculator; the calculator is on the desk.", explanation: "The second mention refers to the already identified calculator." },
    ],
  },
  {
    topic: "Demonstratives",
    activities: [
      { type: "mcq", title: "Choose this for one nearby item", prompt: "Hold up the model beside you: ___ is our volcano model.", answer: "This", explanation: "This points to one thing that is near the speaker.", options: ["This", "That", "These"] },
      { type: "fill", title: "Choose those for distant plural items", prompt: "Can you see ___ hills beyond the river?", answer: "those", explanation: "Those points to more than one thing at a distance." },
      { type: "error", title: "Correct number agreement", prompt: "Correct this sentence: This pencils belong to the art group.", answer: "These pencils belong to the art group.", explanation: "Pencils is plural, so use these, not this." },
      { type: "transform", title: "Change near to far", prompt: "Rewrite to show the bicycle is far away: This bicycle needs repair.", answer: "That bicycle needs repair.", explanation: "That replaces this when one item is farther from the speaker." },
      { type: "rearrange", title: "Arrange a demonstrative sentence", prompt: "Put the words in order to point to nearby objects.", answer: "These charts explain the water cycle.", explanation: "These agrees with plural charts and points to nearby items.", tokens: ["explain", "These", "cycle.", "the", "charts", "water"] },
      { type: "matching", title: "Match demonstratives to meanings", prompt: "Match each demonstrative to its use.", answer: "this=one near|that=one far|these=several near", explanation: "Demonstratives show both number and distance.", pairs: [{ left: "this", right: "one near" }, { left: "that", right: "one far" }, { left: "these", right: "several near" }] },
      { type: "identify", title: "Identify the demonstrative", prompt: "Which word points to objects far from the speaker? “Those stars are bright.”", answer: "Those", explanation: "Those is the demonstrative determiner for plural distant objects.", options: ["Those", "stars", "bright"] },
      { type: "mcq", title: "Choose these for plural nearby items", prompt: "___ two maps on my desk show the hiking route.", answer: "These", explanation: "These is used with plural nouns that are near.", options: ["This", "That", "These"] },
      { type: "fill", title: "Choose that for one distant item", prompt: "Look at ___ lighthouse across the bay.", answer: "that", explanation: "That points to one noun at a distance." },
      { type: "transform", title: "Change singular to plural", prompt: "Rewrite the sentence for several nearby objects: This seed is ready to plant.", answer: "These seeds are ready to plant.", explanation: "Change this/is/seed to these/are/seeds for a nearby plural subject." },
    ],
  },
  {
    topic: "Some and any",
    activities: [
      { type: "mcq", title: "Use some in an affirmative sentence", prompt: "The lab has ___ spare batteries for the microphones.", answer: "some", explanation: "Some commonly introduces an indefinite amount in an affirmative sentence.", options: ["some", "any", "much"] },
      { type: "fill", title: "Use any in a negative sentence", prompt: "There aren't ___ clean beakers in the cupboard.", answer: "any", explanation: "Any is used with plural countable nouns in negative sentences." },
      { type: "error", title: "Correct the negative determiner", prompt: "Correct this sentence: We do not have some glue left.", answer: "We do not have any glue left.", explanation: "Use any, not some, after a negative do not have." },
      { type: "transform", title: "Turn a statement into a question", prompt: "Ask whether there are some seats near the window.", answer: "Are there any seats near the window?", explanation: "Any is usual in a neutral yes/no question about plural countable nouns." },
      { type: "rearrange", title: "Arrange a quantity question", prompt: "Put the words in order to ask about notebooks.", answer: "Do you have any spare notebooks?", explanation: "Any fits a neutral question about an unspecified number.", tokens: ["spare", "Do", "notebooks?", "any", "you", "have"] },
      { type: "matching", title: "Match some and any contexts", prompt: "Match each sentence beginning to the determiner that completes it.", answer: "I bought ___ apples=some|Did you find ___ errors?=any|She has not made ___ notes=any", explanation: "Some suits affirmative statements; any suits questions and negatives.", pairs: [{ left: "I bought ___ apples", right: "some" }, { left: "Did you find ___ errors?", right: "any" }, { left: "She has not made ___ notes", right: "any" }] },
      { type: "identify", title: "Identify the indefinite quantity", prompt: "In “Could I have some more paper?”, which word is the determiner?", answer: "some", explanation: "Some introduces an unspecified amount of paper.", options: ["Could", "some", "more"] },
      { type: "mcq", title: "Use some in a polite offer", prompt: "Would you like ___ orange juice?", answer: "some", explanation: "Offers commonly use some when the speaker expects the answer may be yes.", options: ["some", "any", "many"] },
      { type: "fill", title: "Use any after hardly", prompt: "Hardly ___ students had finished the optional puzzle.", answer: "any", explanation: "Hardly has a negative meaning, so any is appropriate." },
      { type: "transform", title: "Make the amount indefinite", prompt: "Rewrite using any: We have zero questions about the instructions.", answer: "We do not have any questions about the instructions.", explanation: "A negative sentence with plural questions uses any." },
    ],
  },
  {
    topic: "Much and many",
    activities: [
      { type: "mcq", title: "Choose many with a countable noun", prompt: "How ___ experiments did the group complete?", answer: "many", explanation: "Experiments are countable plural nouns, so use many.", options: ["much", "many", "little"] },
      { type: "fill", title: "Choose much with an uncountable noun", prompt: "There is not ___ information in the old file.", answer: "much", explanation: "Information is uncountable, so use much in this negative sentence." },
      { type: "error", title: "Correct the countable determiner", prompt: "Correct this sentence: How much students joined the quiz?", answer: "How many students joined the quiz?", explanation: "Students can be counted, so the question needs many." },
      { type: "transform", title: "Replace a number with many", prompt: "Rewrite using many: A large number of visitors saw the exhibition.", answer: "Many visitors saw the exhibition.", explanation: "Many can replace a large number of with a plural countable noun." },
      { type: "rearrange", title: "Arrange a much question", prompt: "Put the words in order to ask about time.", answer: "How much time do we have?", explanation: "Time is uncountable, so the question uses how much.", tokens: ["do", "How", "we", "time", "have?", "much"] },
      { type: "matching", title: "Match nouns to much or many", prompt: "Match each noun phrase to the determiner it takes.", answer: "___ homework=much|___ questions=many|___ advice=much", explanation: "Homework and advice are uncountable; questions are countable.", pairs: [{ left: "___ homework", right: "much" }, { left: "___ questions", right: "many" }, { left: "___ advice", right: "much" }] },
      { type: "identify", title: "Identify the quantity determiner", prompt: "Which word shows a large number in “Many teams entered the tournament”?", answer: "Many", explanation: "Many quantifies the plural countable noun teams.", options: ["Many", "teams", "entered"] },
      { type: "mcq", title: "Choose much in a negative", prompt: "We do not need ___ equipment for this simple demonstration.", answer: "much", explanation: "Equipment is uncountable, so much is correct.", options: ["much", "many", "few"] },
      { type: "fill", title: "Use many with plural count nouns", prompt: "The museum displays ___ ancient coins.", answer: "many", explanation: "Coins are plural countable objects, so many fits." },
      { type: "transform", title: "Turn a positive quantity into a question", prompt: "Ask about the amount of water: The tank contains much water.", answer: "How much water does the tank contain?", explanation: "Use how much for a question about an uncountable amount." },
    ],
  },
  {
    topic: "Few and a few",
    activities: [
      { type: "mcq", title: "Choose a few for a small useful number", prompt: "I have ___ ideas for improving our class noticeboard.", answer: "a few", explanation: "A few means a small number, but enough to be useful.", options: ["few", "a few", "little"] },
      { type: "fill", title: "Use few for an almost empty group", prompt: "Few students understood the difficult riddle, so the teacher explained it again.", answer: "few", explanation: "Few emphasises that almost none of the students understood." },
      { type: "error", title: "Correct the intended meaning", prompt: "Correct this sentence to mean that some volunteers can help: Few volunteers can help us today.", answer: "A few volunteers can help us today.", explanation: "A few gives the positive meaning of a small but sufficient number." },
      { type: "transform", title: "Change negative shortage to a positive small number", prompt: "Rewrite with a few: Almost no teams submitted entries.", answer: "A few teams submitted entries.", explanation: "A few changes the meaning to some, though not many." },
      { type: "rearrange", title: "Arrange a few sentence", prompt: "Put the words in order about available seats.", answer: "A few seats remain near the stage.", explanation: "A few shows that some seats, but not many, are still available.", tokens: ["near", "remain", "A", "stage.", "seats", "few", "the"] },
      { type: "matching", title: "Match meaning and phrase", prompt: "Match each phrase with its meaning.", answer: "few questions=almost none|a few questions=some|few errors=not many, disappointing", explanation: "The article a changes the tone from shortage to a small positive amount.", pairs: [{ left: "few questions", right: "almost none" }, { left: "a few questions", right: "some" }, { left: "few errors", right: "not many, disappointing" }] },
      { type: "identify", title: "Identify the positive small quantity", prompt: "In “A few parents attended the meeting,” which phrase means some but not many?", answer: "A few", explanation: "A few expresses a small positive number of countable parents.", options: ["A few", "parents", "attended"] },
      { type: "mcq", title: "Choose few for a shortage", prompt: "___ buses ran during the strike, so many people walked.", answer: "Few", explanation: "Few means not many and highlights the shortage.", options: ["Few", "A few", "Much"] },
      { type: "fill", title: "Use a few with plural nouns", prompt: "Please give me ___ minutes to finish the diagram.", answer: "a few", explanation: "Minutes are countable, and a few means a small amount of time that is available." },
      { type: "transform", title: "Show an insufficient number", prompt: "Rewrite using few: Some clues were available, and they were enough to solve it.", answer: "Few clues were available, so they were not enough to solve it.", explanation: "Few presents the number as too small, unlike a few." },
    ],
  },
  {
    topic: "Little and a little",
    activities: [
      { type: "mcq", title: "Choose a little for a small amount", prompt: "There is ___ milk left, enough for one cup of tea.", answer: "a little", explanation: "A little means a small but usable amount of an uncountable noun.", options: ["little", "a little", "a few"] },
      { type: "fill", title: "Use little for an insufficient amount", prompt: "We had ___ time to revise, so we could not cover every chapter.", answer: "little", explanation: "Little emphasises that the uncountable amount was hardly enough." },
      { type: "error", title: "Correct the intended amount", prompt: "Correct this sentence to mean that some paint remains: There is little paint left, so we can finish the poster.", answer: "There is a little paint left, so we can finish the poster.", explanation: "A little gives a positive meaning: a small usable amount remains." },
      { type: "transform", title: "Show almost no amount", prompt: "Rewrite with little: We have a small amount of evidence, but it is not enough.", answer: "We have little evidence, so it is not enough.", explanation: "Little means not much and signals an insufficient amount." },
      { type: "rearrange", title: "Arrange a little sentence", prompt: "Put the words in order about remaining water.", answer: "A little water remains in the bottle.", explanation: "A little modifies the uncountable noun water and means some remains.", tokens: ["bottle.", "A", "remains", "water", "little", "the", "in"] },
      { type: "matching", title: "Match little expressions", prompt: "Match each quantity phrase with its meaning.", answer: "little hope=almost none|a little hope=some hope|little information=not enough", explanation: "The article a changes a negative shortage into a small positive amount.", pairs: [{ left: "little hope", right: "almost none" }, { left: "a little hope", right: "some hope" }, { left: "little information", right: "not enough" }] },
      { type: "identify", title: "Identify the small amount", prompt: "In “A little practice will improve your score,” which phrase quantifies practice?", answer: "A little", explanation: "A little modifies the uncountable noun practice.", options: ["A little", "practice", "improve"] },
      { type: "mcq", title: "Choose little for a lack", prompt: "There is ___ chance of rain today, according to the forecast.", answer: "little", explanation: "Little means the chance is very small or almost absent.", options: ["little", "a little", "few"] },
      { type: "fill", title: "Use a little with an uncountable noun", prompt: "Add ___ salt to the soup, but do not add too much.", answer: "a little", explanation: "Salt is uncountable, and a little means a small amount." },
      { type: "transform", title: "Change shortage to possibility", prompt: "Rewrite using a little: There is hardly any light in the room.", answer: "There is a little light in the room.", explanation: "A little states positively that a small amount of light exists." },
    ],
  },
  {
    topic: "Each and every",
    activities: [
      { type: "mcq", title: "Choose each for individual focus", prompt: "The coach spoke to ___ player about the practice plan.", answer: "each", explanation: "Each highlights the players one by one.", options: ["each", "every", "many"] },
      { type: "fill", title: "Use every for a repeated routine", prompt: "Our class checks the weather ___ morning.", answer: "every", explanation: "Every refers to all mornings as a repeated series." },
      { type: "error", title: "Correct singular agreement", prompt: "Correct this sentence: Every student have a library card.", answer: "Every student has a library card.", explanation: "Every takes a singular noun and singular verb." },
      { type: "transform", title: "Replace every with each", prompt: "Rewrite to focus on the members individually: Every team received a certificate.", answer: "Each team received a certificate.", explanation: "Each can replace every when referring to the members individually." },
      { type: "rearrange", title: "Arrange each with a singular noun", prompt: "Put the words in order about lab safety.", answer: "Each student wears a safety badge.", explanation: "Each takes a singular countable noun and a singular verb.", tokens: ["a", "wears", "Each", "badge.", "student", "safety"] },
      { type: "matching", title: "Match determiner and use", prompt: "Match each phrase to its best description.", answer: "each child=one at a time|every Friday=all Fridays|each of the books=individual books", explanation: "Each focuses on individuals; every covers a complete repeated set.", pairs: [{ left: "each child", right: "one at a time" }, { left: "every Friday", right: "all Fridays" }, { left: "each of the books", right: "individual books" }] },
      { type: "identify", title: "Identify the distributive determiner", prompt: "Which word distributes the action in “Each diagram has a clear label”?", answer: "Each", explanation: "Each refers separately to every individual diagram.", options: ["Each", "diagram", "clear"] },
      { type: "mcq", title: "Choose every for a complete series", prompt: "The school bus arrives ___ ten minutes during the morning rush.", answer: "every", explanation: "Every is used for the repeated interval as a whole.", options: ["each", "every", "either"] },
      { type: "fill", title: "Use each of with a plural group", prompt: "___ the two solutions has a different advantage.", answer: "Each of", explanation: "Each of is followed by a plural noun phrase but takes a singular verb." },
      { type: "transform", title: "Change a plural generalisation", prompt: "Rewrite with each: All the runners received a numbered bib.", answer: "Each runner received a numbered bib.", explanation: "Each changes the focus to the runners individually and uses a singular noun." },
    ],
  },
  {
    topic: "Either and neither",
    activities: [
      { type: "mcq", title: "Choose one of two", prompt: "You may choose ___ route to reach the museum.", answer: "either", explanation: "Either means one or the other of two choices.", options: ["either", "neither", "every"] },
      { type: "fill", title: "Choose neither for zero of two", prompt: "___ answer matches the clues; both contain a mistake.", answer: "Neither", explanation: "Neither means not one and not the other of two answers." },
      { type: "error", title: "Correct neither agreement", prompt: "Correct this sentence: Neither of the engines are working.", answer: "Neither of the engines is working.", explanation: "In formal school grammar, neither is singular and takes is." },
      { type: "transform", title: "Join two negative choices", prompt: "Rewrite using neither...nor: The blue key does not open the lock. The red key does not open it.", answer: "Neither the blue key nor the red key opens the lock.", explanation: "Neither...nor joins two negative alternatives; the singular subject takes opens." },
      { type: "rearrange", title: "Arrange either...or", prompt: "Put the words in order to show two possible presenters.", answer: "Either Sana or Vikram will present the project.", explanation: "Either...or introduces two alternatives in a balanced structure.", tokens: ["will", "or", "Sana", "project.", "Either", "present", "Vikram", "the"] },
      { type: "matching", title: "Match choice determiners", prompt: "Match each expression to its meaning.", answer: "either option=one of two|neither option=not one of two|either...or=two alternatives", explanation: "Either selects one possibility; neither rejects both.", pairs: [{ left: "either option", right: "one of two" }, { left: "neither option", right: "not one of two" }, { left: "either...or", right: "two alternatives" }] },
      { type: "identify", title: "Identify the negative determiner", prompt: "Which word means not one of two in “Neither answer is complete”?", answer: "Neither", explanation: "Neither rejects both answers.", options: ["Neither", "answer", "complete"] },
      { type: "mcq", title: "Choose neither for both rejected", prompt: "___ of the two batteries has enough charge.", answer: "Neither", explanation: "Neither is used when both members of a pair are excluded.", options: ["Either", "Neither", "Each"] },
      { type: "fill", title: "Complete an either...or choice", prompt: "We can meet ___ on Tuesday or Wednesday.", answer: "either", explanation: "Either introduces one of two possible meeting days." },
      { type: "transform", title: "Turn a positive pair into a choice", prompt: "Rewrite with either...or: We can use the red marker. We can use the blue marker.", answer: "We can use either the red marker or the blue marker.", explanation: "Either...or presents the two markers as alternative choices." },
    ],
  },
];

const buildMiddleDeterminerQuestions = (): GrammarQuestion[] =>
  MIDDLE_DETERMINER_TOPICS.flatMap(({ topic, activities }) =>
    activities.map((activity, index) =>
      q(
        `middle-determiners-${middleNounPronounSlug(topic)}-${index + 1}`,
        activity.type,
        `${topic}: ${activity.title}`,
        activity.prompt,
        activity.answer,
        activity.explanation,
        { concept: "Determiners", topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs }
      )
    )
  );

type TenseActivity = {
  type: GrammarExerciseType;
  title: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  tokens?: string[];
  pairs?: { left: string; right: string }[];
};

const tenseActivity = (topic: string, index: number, activity: TenseActivity) =>
  q(`middle-tenses-${middleNounPronounSlug(topic)}-${index}`, activity.type, `${topic}: ${activity.title}`, activity.prompt, activity.answer, activity.explanation, {
    concept: "Tenses",
    topic,
    options: activity.options,
    tokens: activity.tokens,
    pairs: activity.pairs,
  });

const MIDDLE_TENSE_EXPANSION: Record<string, TenseActivity[]> = {
  "Present Simple": [
    { type: "mcq", title: "Habitual action", prompt: "Nila ___ the school bus at 7:15 every morning.", answer: "catches", explanation: "A repeated routine takes the present simple; Nila is singular, so catch becomes catches.", options: ["catches", "is catching", "has caught"] },
    { type: "fill", title: "Scientific fact", prompt: "Water ___ (boil) at 100°C at sea level.", answer: "boils", explanation: "The present simple states a general scientific fact, and water takes boils.", },
    { type: "error", title: "Fix third-person -s", prompt: "Correct this sentence: My brother play the tabla after dinner.", answer: "My brother plays the tabla after dinner.", explanation: "A singular present-simple subject needs the -s form plays.", },
    { type: "transform", title: "Make a routine negative", prompt: "Make negative: The library opens on Sundays.", answer: "The library does not open on Sundays.", explanation: "Use does not plus the base verb open with the singular subject library.", },
    { type: "rearrange", title: "Order a routine", prompt: "Arrange the words: homework / checks / every evening / Farah / her", answer: "Farah checks her homework every evening.", explanation: "The subject comes before the present-simple verb, followed by the object and time phrase.", tokens: ["every", "Farah", "her", "checks", "evening.", "homework"] },
    { type: "matching", title: "Match subjects and forms", prompt: "Match each subject to the correct present-simple form.", answer: "the moon=shines|we=carry|I=watch", explanation: "He, she and it subjects take -s; I and we use the base form.", pairs: [{ left: "the moon", right: "shines" }, { left: "we", right: "carry" }, { left: "I", right: "watch" }] },
    { type: "identify", title: "Spot the routine verb", prompt: "In “Our coach gives us a warm-up before practice,” identify the present-simple verb.", answer: "gives", explanation: "Gives describes a regular action and agrees with the singular subject coach.", options: ["coach", "gives", "practice"] },
    { type: "mcq", title: "Frequency adverb", prompt: "Which sentence correctly places usually with a present-simple verb?", answer: "We usually walk home.", explanation: "Frequency adverbs normally come before the main verb in the present simple.", options: ["We walk usually home.", "We usually walk home.", "Usually we walking home."] },
    { type: "fill", title: "Question auxiliary", prompt: "___ your cousins ___ (enjoy) board games?", answer: "Do, enjoy", explanation: "Plural you/cousins take do, followed by the base verb enjoy.", },
    { type: "transform", title: "Ask about a habit", prompt: "Change to a question: Arjun cycles to school.", answer: "Does Arjun cycle to school?", explanation: "Use does with a singular subject and return cycles to the base form cycle.", },
  ],
  "Present Continuous": [
    { type: "mcq", title: "Action happening now", prompt: "Look! The puppy ___ the red ball across the garden.", answer: "is chasing", explanation: "Look signals an action happening now, so use is plus the -ing form.", options: ["chases", "is chasing", "has chased"] },
    { type: "fill", title: "Temporary project", prompt: "This week, our class ___ (prepare) a play.", answer: "is preparing", explanation: "This week describes a temporary activity in progress: is preparing.", },
    { type: "error", title: "Add the auxiliary", prompt: "Correct this sentence: The musicians practising in the hall now.", answer: "The musicians are practising in the hall now.", explanation: "A plural subject needs are before the -ing form practising.", },
    { type: "transform", title: "Make an interrupted action negative", prompt: "Make negative: I am using the blue microscope.", answer: "I am not using the blue microscope.", explanation: "Place not after am in the present continuous.", },
    { type: "rearrange", title: "Order a current action", prompt: "Arrange the words: are / quietly / the / reading / students / now", answer: "The students are reading quietly now.", explanation: "Present continuous uses subject + are + verb-ing.", tokens: ["quietly", "students", "are", "now.", "reading", "The"] },
    { type: "matching", title: "Match subjects and auxiliaries", prompt: "Match each subject to its present-continuous form.", answer: "I=am sketching|she=is measuring|they=are planting", explanation: "Use am with I, is with he/she/it, and are with plural subjects.", pairs: [{ left: "I", right: "am sketching" }, { left: "she", right: "is measuring" }, { left: "they", right: "are planting" }] },
    { type: "identify", title: "Find the -ing verb", prompt: "In “The rain is falling heavily,” identify the present-continuous verb phrase.", answer: "is falling", explanation: "Is plus falling describes an action in progress now.", options: ["The rain", "is falling", "heavily"] },
    { type: "mcq", title: "Temporary versus habit", prompt: "Which sentence describes a temporary activity rather than a routine?", answer: "Maya is staying with her aunt this month.", explanation: "This month gives a temporary period, so the present continuous is appropriate.", options: ["Maya stays with her aunt every summer.", "Maya is staying with her aunt this month.", "Maya stayed with her aunt last month."] },
    { type: "fill", title: "Spelling -ing", prompt: "The dog is ___ (run) after a butterfly.", answer: "running", explanation: "Run doubles its final consonant before -ing: running.", },
    { type: "transform", title: "Make a current-action question", prompt: "Ask about the science team: The science team is testing the battery.", answer: "Is the science team testing the battery?", explanation: "Move is to the front to form a present-continuous yes/no question.", },
  ],
  "Present Perfect": [
    { type: "mcq", title: "Unfinished time", prompt: "We ___ three chapters this week.", answer: "have read", explanation: "This week is unfinished, so present perfect links the completed reading to the present.", options: ["read", "have read", "were reading"] },
    { type: "fill", title: "Recent result", prompt: "The nurse ___ (just arrive) at the clinic.", answer: "has just arrived", explanation: "Just signals a recent event with a present result; a singular nurse takes has arrived.", },
    { type: "error", title: "Avoid finished-time conflict", prompt: "Correct this sentence: I have met the author yesterday.", answer: "I met the author yesterday.", explanation: "Yesterday is a finished past time, so use past simple, not present perfect.", },
    { type: "transform", title: "Turn experience into a question", prompt: "Ask whether Leena has ever flown in a plane: Leena has flown in a plane.", answer: "Has Leena ever flown in a plane?", explanation: "Present perfect questions use has before the subject; ever asks about experience at any time.", },
    { type: "rearrange", title: "Order a present result", prompt: "Arrange the words: has / the / just / bell / rung", answer: "The bell has just rung.", explanation: "Present perfect is subject + has/have + past participle; just comes before the participle.", tokens: ["just", "rung.", "The", "has", "bell"] },
    { type: "matching", title: "Match time expressions", prompt: "Match each expression to the present-perfect use it signals.", answer: "already=completed by now|yet=up to now in a question|ever=at any time", explanation: "Already, yet and ever connect an unspecified past time with the present.", pairs: [{ left: "already", right: "completed by now" }, { left: "yet", right: "up to now in a question" }, { left: "ever", right: "at any time" }] },
    { type: "identify", title: "Find the auxiliary", prompt: "In “They have forgotten the map,” identify the present-perfect verb phrase.", answer: "have forgotten", explanation: "Have plus the past participle forgotten forms the present perfect.", options: ["They", "have forgotten", "the map"] },
    { type: "mcq", title: "Choose the participle", prompt: "Which sentence is correct?", answer: "She has written a careful report.", explanation: "Written is the past participle needed after has.", options: ["She has wrote a careful report.", "She has written a careful report.", "She has writing a careful report."] },
    { type: "fill", title: "Negative experience", prompt: "Our team ___ (not win) a final yet.", answer: "has not won", explanation: "Use has not plus the past participle won with singular team.", },
    { type: "transform", title: "Use never", prompt: "Rewrite with never: I did not visit a desert at any time.", answer: "I have never visited a desert.", explanation: "Never expresses no experience up to now with have plus visited.", },
  ],
  "Present Perfect Continuous": [
    { type: "mcq", title: "Duration up to now", prompt: "Sana ___ the violin since breakfast.", answer: "has been practising", explanation: "Since breakfast gives a starting point for an activity continuing to now.", options: ["practised", "has been practising", "was practising"] },
    { type: "fill", title: "Use for with duration", prompt: "The children ___ (wait) for forty minutes.", answer: "have been waiting", explanation: "For forty minutes measures duration; have been waiting shows an ongoing activity.", },
    { type: "error", title: "Fix the auxiliary", prompt: "Correct this sentence: He have been studying since dawn.", answer: "He has been studying since dawn.", explanation: "A singular subject he takes has, not have.", },
    { type: "transform", title: "Make the duration negative", prompt: "Make negative: We have been using the old computer.", answer: "We have not been using the old computer.", explanation: "Put not after have in the present-perfect continuous.", },
    { type: "rearrange", title: "Order a duration sentence", prompt: "Arrange the words: been / the / has / for / machine / humming / an hour", answer: "The machine has been humming for an hour.", explanation: "Use has been plus the -ing form, followed by the duration phrase.", tokens: ["for", "humming", "The", "an", "has", "hour.", "machine", "been"] },
    { type: "matching", title: "Match since and for", prompt: "Match each phrase to its kind of time reference.", answer: "since Monday=starting point|for three days=length of time|since 8 a.m.=starting point", explanation: "Since names when an activity began; for names how long it has lasted.", pairs: [{ left: "since Monday", right: "starting point" }, { left: "for three days", right: "length of time" }, { left: "since 8 a.m.", right: "starting point" }] },
    { type: "identify", title: "Find the continuous phrase", prompt: "In “The workers have been repairing the bridge,” identify the tense phrase.", answer: "have been repairing", explanation: "Have been plus repairing shows an activity continuing over a period.", options: ["The workers", "have been repairing", "the bridge"] },
    { type: "mcq", title: "Evidence of a recent activity", prompt: "Why are your hands dirty? — I ___.", answer: "have been gardening", explanation: "The present-perfect continuous explains a recent activity whose result is visible now.", options: ["garden", "have been gardening", "was gardening yesterday"] },
    { type: "fill", title: "Spelling a continuous form", prompt: "The baby ___ (cry) for ten minutes.", answer: "has been crying", explanation: "Cry changes to crying after has been; ten minutes gives duration.", },
    { type: "transform", title: "Ask about duration", prompt: "Ask about the length of time Priya has been reading: Priya has been reading the novel.", answer: "How long has Priya been reading the novel?", explanation: "How long asks for duration and keeps has before the subject.", },
  ],
  "Past Simple": [
    { type: "mcq", title: "Finished past event", prompt: "The class ___ the planetarium last Friday.", answer: "visited", explanation: "Last Friday is a finished past time, so use the past simple visited.", options: ["visits", "visited", "has visited"] },
    { type: "fill", title: "Irregular past form", prompt: "Asha ___ (bring) a torch during the hike.", answer: "brought", explanation: "Brought is the past simple form of bring.", },
    { type: "error", title: "Use the past form", prompt: "Correct this sentence: We see a peacock at the farm yesterday.", answer: "We saw a peacock at the farm yesterday.", explanation: "Yesterday requires the past form saw.", },
    { type: "transform", title: "Make a past question", prompt: "Ask about the match: The Tigers won the match.", answer: "Did the Tigers win the match?", explanation: "Past-simple questions use did plus the base verb win.", },
    { type: "rearrange", title: "Order a completed event", prompt: "Arrange the words: last night / wrote / Kabir / a poem", answer: "Kabir wrote a poem last night.", explanation: "The past verb wrote describes a completed event; the time phrase can follow the object.", tokens: ["a", "last", "Kabir", "poem", "wrote", "night."] },
    { type: "matching", title: "Match base and past forms", prompt: "Match each base verb to its past form.", answer: "take=took|build=built|choose=chose", explanation: "These irregular verbs change form rather than adding -ed.", pairs: [{ left: "take", right: "took" }, { left: "build", right: "built" }, { left: "choose", right: "chose" }] },
    { type: "identify", title: "Find the past verb", prompt: "In “The wind knocked over the sign,” identify the past-simple verb.", answer: "knocked", explanation: "Knocked names the completed action in the past.", options: ["wind", "knocked", "sign"] },
    { type: "mcq", title: "Past time marker", prompt: "Which sentence correctly uses a finished-time expression?", answer: "They moved house in 2022.", explanation: "In 2022 is a finished past period and pairs with past simple moved.", options: ["They have moved house in 2022.", "They moved house in 2022.", "They are moving house in 2022."] },
    { type: "fill", title: "Negative past", prompt: "Mina ___ (not understand) the riddle yesterday.", answer: "did not understand", explanation: "Use did not plus the base verb understand for a past negative.", },
    { type: "transform", title: "Make a past statement negative", prompt: "Make negative: The bus arrived on time.", answer: "The bus did not arrive on time.", explanation: "Did not takes the base verb arrive in a past negative.", },
  ],
  "Past Continuous": [
    { type: "mcq", title: "Action in progress", prompt: "At 9 p.m., the engineers ___ the bridge model.", answer: "were testing", explanation: "At a particular past moment, an ongoing action takes past continuous.", options: ["tested", "were testing", "have tested"] },
    { type: "fill", title: "Singular past auxiliary", prompt: "When I called, Neeraj ___ (sleep).", answer: "was sleeping", explanation: "Neeraj is singular, so use was plus sleeping for the action in progress.", },
    { type: "error", title: "Fix was and were", prompt: "Correct this sentence: The birds was flying over the lake.", answer: "The birds were flying over the lake.", explanation: "The plural subject birds takes were.", },
    { type: "transform", title: "Show an interrupted action", prompt: "Join with when: I cooked dinner. The lights went out.", answer: "I was cooking dinner when the lights went out.", explanation: "Past continuous gives the background action; past simple gives the interruption.", },
    { type: "rearrange", title: "Order a background action", prompt: "Arrange the words: were / while / we / the / raining / walking / heavily", answer: "It was raining heavily while we were walking.", explanation: "Both actions were in progress together, so use was raining and were walking.", tokens: ["walking.", "heavily", "were", "It", "while", "raining", "we", "was"] },
    { type: "matching", title: "Match past forms", prompt: "Match each subject to the correct past-continuous form.", answer: "I=was drawing|they=were laughing|the cat=was hiding", explanation: "Was goes with I and singular nouns; were goes with plural subjects.", pairs: [{ left: "I", right: "was drawing" }, { left: "they", right: "were laughing" }, { left: "the cat", right: "was hiding" }] },
    { type: "identify", title: "Find the background verb", prompt: "In “While the choir was singing, the audience clapped,” identify the past-continuous phrase.", answer: "was singing", explanation: "Was singing describes the action already in progress.", options: ["While", "was singing", "clapped"] },
    { type: "mcq", title: "Two simultaneous actions", prompt: "While Dad was cooking, I ___.", answer: "was setting the table", explanation: "Two actions happening at the same past time can both use past continuous.", options: ["set the table yesterday", "was setting the table", "have set the table"] },
    { type: "fill", title: "Past continuous spelling", prompt: "The goalkeeper ___ (watch) the ball closely when it slipped.", answer: "was watching", explanation: "Was watching marks the action in progress before the past event slipped.", },
    { type: "transform", title: "Make an interrupted question", prompt: "Ask what Lata was doing: Lata was painting the backdrop.", answer: "What was Lata painting?", explanation: "Move was before Lata and use what for the object of painting.", },
  ],
  "Past Perfect": [
    { type: "mcq", title: "Earlier past action", prompt: "The film ___ before we reached the hall.", answer: "had started", explanation: "Had started happened first; reached is the later past event.", options: ["starts", "had started", "has started"] },
    { type: "fill", title: "Past participle", prompt: "By the time the bell rang, I ___ (finish) the test.", answer: "had finished", explanation: "Past perfect uses had plus the past participle finished for the earlier action.", },
    { type: "error", title: "Use had correctly", prompt: "Correct this sentence: She had went home before sunset.", answer: "She had gone home before sunset.", explanation: "Had must be followed by the past participle gone, not went.", },
    { type: "transform", title: "Show the earlier event", prompt: "Combine with after: The guests ate. They washed their hands.", answer: "After the guests had washed their hands, they ate.", explanation: "Past perfect marks washing as earlier than eating.", },
    { type: "rearrange", title: "Order two past events", prompt: "Arrange the words: had / before / left / arrived / the / train / we", answer: "The train had left before we arrived.", explanation: "Had left is the earlier event; arrived is the later past event.", tokens: ["arrived.", "had", "The", "we", "before", "train", "left"] },
    { type: "matching", title: "Match connectors and order", prompt: "Match each connector to its time relationship.", answer: "before=earlier than|after=later than|by the time=completed before a point", explanation: "These connectors help show which past event happened first.", pairs: [{ left: "before", right: "earlier than" }, { left: "after", right: "later than" }, { left: "by the time", right: "completed before a point" }] },
    { type: "identify", title: "Find the earlier verb", prompt: "In “Maya had packed her bag before the taxi arrived,” identify the past-perfect phrase.", answer: "had packed", explanation: "Had packed shows the bag was ready before the taxi arrived.", options: ["Maya", "had packed", "arrived"] },
    { type: "mcq", title: "Choose the correct sequence", prompt: "When we entered, the concert ___.", answer: "had begun", explanation: "The concert began before our entry, so past perfect is needed.", options: ["has begun", "had begun", "was begin"] },
    { type: "fill", title: "Past perfect negative", prompt: "The shop ___ (not open) when we got there.", answer: "had not opened", explanation: "Had not plus opened shows the shop was still closed at that past time.", },
    { type: "transform", title: "Make the earlier action a question", prompt: "Ask whether the team had practised before the match: The team had practised before the match.", answer: "Had the team practised before the match?", explanation: "Place had before the subject in a past-perfect question.", },
  ],
  "Past Perfect Continuous": [
    { type: "mcq", title: "Duration before a past event", prompt: "The road was muddy because it ___ all night.", answer: "had been raining", explanation: "Had been raining shows an ongoing earlier activity and explains the past result.", options: ["rained", "had been raining", "has been raining"] },
    { type: "fill", title: "Duration before noon", prompt: "By noon, the hikers ___ (walk) for five hours.", answer: "had been walking", explanation: "For five hours measures an activity continuing up to a past point.", },
    { type: "error", title: "Fix the perfect continuous form", prompt: "Correct this sentence: They had been wait for the doctor for an hour.", answer: "They had been waiting for the doctor for an hour.", explanation: "Had been must be followed by the -ing form waiting.", },
    { type: "transform", title: "Explain a past result", prompt: "Join with because: The floor was wet. Someone had been mopping it.", answer: "The floor was wet because someone had been mopping it.", explanation: "Past perfect continuous links the earlier ongoing activity to the past result.", },
    { type: "rearrange", title: "Order a duration clause", prompt: "Arrange the words: had / for / been / before / studying / dinner / Ritu", answer: "Ritu had been studying before dinner.", explanation: "Ritu had been studying places the ongoing earlier activity before the past time.", tokens: ["studying", "Ritu", "before", "had", "dinner.", "been", "for"] },
    { type: "matching", title: "Match tense and focus", prompt: "Match each form to what it emphasises.", answer: "had been running=duration before past|had run=completed earlier action|was running=action in progress then", explanation: "The continuous form highlights duration, while the other forms focus on completion or a moment.", pairs: [{ left: "had been running", right: "duration before past" }, { left: "had run", right: "completed earlier action" }, { left: "was running", right: "action in progress then" }] },
    { type: "identify", title: "Find the duration phrase", prompt: "In “She had been waiting when the bus finally came,” identify the past-perfect-continuous phrase.", answer: "had been waiting", explanation: "Had been waiting shows the waiting started earlier and continued until the bus came.", options: ["She", "had been waiting", "came"] },
    { type: "mcq", title: "Cause of a past symptom", prompt: "His eyes were tired because he ___.", answer: "had been reading for hours", explanation: "The continuous form explains the duration that caused the past result.", options: ["read tomorrow", "had been reading for hours", "has read for hours"] },
    { type: "fill", title: "Negative duration", prompt: "Before the coach arrived, we ___ (not practise) for long.", answer: "had not been practising", explanation: "Use had not been plus the -ing form to make a past-perfect-continuous negative.", },
    { type: "transform", title: "Ask about earlier duration", prompt: "Ask how long the workers had been digging: The workers had been digging the trench.", answer: "How long had the workers been digging the trench?", explanation: "How long asks about duration and had comes before the subject.", },
  ],
  "Future Simple": [
    { type: "mcq", title: "Prediction", prompt: "I think the clouds ___ soon.", answer: "will clear", explanation: "I think introduces a prediction, so use will plus the base verb.", options: ["cleared", "will clear", "are clearing yesterday"] },
    { type: "fill", title: "Instant decision", prompt: "The phone is ringing; I ___ (answer) it.", answer: "will answer", explanation: "Will can express a decision made at the moment of speaking.", },
    { type: "error", title: "Keep the base verb", prompt: "Correct this sentence: She will studies medicine one day.", answer: "She will study medicine one day.", explanation: "Will is followed by the base form study, never studies.", },
    { type: "transform", title: "Make a promise", prompt: "Rewrite as a promise: I send you the notes tomorrow.", answer: "I will send you the notes tomorrow.", explanation: "Will expresses a promise about a future action.", },
    { type: "rearrange", title: "Order a prediction", prompt: "Arrange the words: will / our / probably / win / team / tonight", answer: "Our team will probably win tonight.", explanation: "Will comes before the base verb; probably can come after will.", tokens: ["tonight.", "probably", "Our", "win", "will", "team"] },
    { type: "matching", title: "Match future meanings", prompt: "Match each sentence to the meaning of will.", answer: "I will help you=offer|It will rain=prediction|I will be careful=promise", explanation: "Will can make offers, predictions and promises.", pairs: [{ left: "I will help you", right: "offer" }, { left: "It will rain", right: "prediction" }, { left: "I will be careful", right: "promise" }] },
    { type: "identify", title: "Find the future verb", prompt: "In “The museum will reopen next month,” identify the future verb phrase.", answer: "will reopen", explanation: "Will plus reopen points to a future event.", options: ["museum", "will reopen", "month"] },
    { type: "mcq", title: "Future time marker", prompt: "Which sentence correctly describes a future plan or prediction?", answer: "The results will arrive tomorrow.", explanation: "Tomorrow refers to the future and pairs with will arrive.", options: ["The results arrived tomorrow.", "The results will arrive tomorrow.", "The results have arrived tomorrow."] },
    { type: "fill", title: "Future negative", prompt: "Our class ___ (not forget) the safety rules.", answer: "will not forget", explanation: "Will not plus the base verb forms a future negative.", },
    { type: "transform", title: "Ask about a future event", prompt: "Make a question: The parcel will reach us on Friday.", answer: "Will the parcel reach us on Friday?", explanation: "Move will before the subject to form a future-simple question.", },
  ],
  "Future Continuous": [
    { type: "mcq", title: "Action at a future time", prompt: "At this time tomorrow, we ___ over the mountains.", answer: "will be flying", explanation: "At this time tomorrow identifies an action in progress at a future moment.", options: ["fly", "will be flying", "have flown"] },
    { type: "fill", title: "Future activity in progress", prompt: "At 6 p.m., the orchestra ___ (rehearse).", answer: "will be rehearsing", explanation: "Will be plus the -ing form shows an activity in progress at a future time.", },
    { type: "error", title: "Fix the future continuous", prompt: "Correct this sentence: This time next week, I will travelling in Kerala.", answer: "This time next week, I will be travelling in Kerala.", explanation: "Future continuous needs will be plus the -ing form.", },
    { type: "transform", title: "Make a future continuous question", prompt: "Ask whether the team will be practising at noon: The team will be practising at noon.", answer: "Will the team be practising at noon?", explanation: "Move will before the subject and keep be practising together.", },
    { type: "rearrange", title: "Order a future scene", prompt: "Arrange the words: will / be / at / tomorrow / studying / seven / I", answer: "I will be studying at seven tomorrow.", explanation: "The future continuous form is will be studying.", tokens: ["tomorrow.", "be", "I", "at", "will", "studying", "seven"] },
    { type: "matching", title: "Match future moments", prompt: "Match each time phrase to the action in progress.", answer: "at 8 tonight=will be eating|this time next year=will be studying|when you arrive=will be waiting", explanation: "Each phrase points to a future moment when an action will already be in progress.", pairs: [{ left: "at 8 tonight", right: "will be eating" }, { left: "this time next year", right: "will be studying" }, { left: "when you arrive", right: "will be waiting" }] },
    { type: "identify", title: "Find the future-continuous phrase", prompt: "In “They will be playing the final tomorrow,” identify the tense phrase.", answer: "will be playing", explanation: "Will be playing describes an action in progress at a future time.", options: ["They", "will be playing", "tomorrow"] },
    { type: "mcq", title: "Polite future inquiry", prompt: "Which question asks about an activity that will be in progress?", answer: "Will you be using the computer at 4?", explanation: "Will you be using asks about an action ongoing at a specified future time.", options: ["Did you use the computer at 4?", "Will you be using the computer at 4?", "Have you used the computer at 4?"] },
    { type: "fill", title: "Future continuous spelling", prompt: "At midnight, the sailors ___ (sail) across the bay.", answer: "will be sailing", explanation: "Sail takes the -ing form sailing after will be.", },
    { type: "transform", title: "Describe a future interruption", prompt: "Join with when: I will be taking the test. The bell will ring.", answer: "I will be taking the test when the bell rings.", explanation: "Use future continuous for the action in progress; a time clause uses present simple after when.", },
  ],
  "Future Perfect": [
    { type: "mcq", title: "Completed by a deadline", prompt: "By Friday, the builders ___ the roof.", answer: "will have repaired", explanation: "By Friday sets a future deadline; will have repaired shows completion before it.", options: ["repair", "will have repaired", "were repairing"] },
    { type: "fill", title: "Future completion", prompt: "By sunset, we ___ (reach) the campsite.", answer: "will have reached", explanation: "Future perfect uses will have plus the past participle reached.", },
    { type: "error", title: "Use the participle", prompt: "Correct this sentence: By noon, she will have wrote the report.", answer: "By noon, she will have written the report.", explanation: "Will have must be followed by the past participle written.", },
    { type: "transform", title: "Make a future deadline question", prompt: "Ask whether the train will have left by 9: The train will have left by 9.", answer: "Will the train have left by 9?", explanation: "Move will before the subject in a future-perfect question.", },
    { type: "rearrange", title: "Order a deadline", prompt: "Arrange the words: will / by / have / finished / we / Monday", answer: "We will have finished by Monday.", explanation: "Will have finished expresses completion before a future deadline.", tokens: ["Monday.", "finished", "will", "by", "We", "have"] },
    { type: "matching", title: "Match deadlines and completions", prompt: "Match each deadline to a suitable future-perfect sentence.", answer: "by 5 p.m.=will have submitted the form|by next June=will have completed the course|before the guests arrive=will have cooked dinner", explanation: "Future perfect connects a completed action with a future reference point.", pairs: [{ left: "by 5 p.m.", right: "will have submitted the form" }, { left: "by next June", right: "will have completed the course" }, { left: "before the guests arrive", right: "will have cooked dinner" }] },
    { type: "identify", title: "Find the completed-by form", prompt: "In “By tomorrow, the river will have fallen,” identify the future-perfect phrase.", answer: "will have fallen", explanation: "Will have fallen shows the change will be complete by tomorrow.", options: ["By tomorrow", "will have fallen", "the river"] },
    { type: "mcq", title: "Choose the correct deadline tense", prompt: "By the time you call, I ___.", answer: "will have reached home", explanation: "The action will be complete before the future call.", options: ["reach home yesterday", "will have reached home", "am reaching home last night"] },
    { type: "fill", title: "Future-perfect negative", prompt: "The parcel ___ (not arrive) by lunchtime.", answer: "will not have arrived", explanation: "Will not have plus the past participle arrived forms the negative.", },
    { type: "transform", title: "Use before with a deadline", prompt: "Combine: We will finish the poster. The exhibition opens.", answer: "We will have finished the poster before the exhibition opens.", explanation: "Future perfect highlights completion before the future event; the time clause uses present simple.", },
  ],
  "Future Perfect Continuous": [
    { type: "mcq", title: "Duration up to a future point", prompt: "By August, I ___ at this school for three years.", answer: "will have been studying", explanation: "For three years measures duration continuing up to a future point.", options: ["study", "will have been studying", "studied"] },
    { type: "fill", title: "Future duration", prompt: "By 10 a.m., the team ___ (travel) for six hours.", answer: "will have been travelling", explanation: "Future perfect continuous uses will have been plus the -ing form.", },
    { type: "error", title: "Complete the future form", prompt: "Correct this sentence: By noon, they will have working for four hours.", answer: "By noon, they will have been working for four hours.", explanation: "The future perfect continuous requires been before the -ing form.", },
    { type: "transform", title: "Ask about future duration", prompt: "Ask how long the scientist will have been observing the birds by July: The scientist will have been observing the birds by July.", answer: "How long will the scientist have been observing the birds by July?", explanation: "How long asks about duration; will comes before the subject.", },
    { type: "rearrange", title: "Order a future duration", prompt: "Arrange the words: will / have / been / for / practising / months / they / six", answer: "They will have been practising for six months.", explanation: "The form will have been practising expresses duration up to a future point.", tokens: ["six", "will", "practising.", "have", "They", "for", "been", "months"] },
    { type: "matching", title: "Match duration phrases", prompt: "Match each phrase to the future-perfect-continuous form.", answer: "by noon for two hours=will have been working|by June for a year=will have been training|by the finish for ten minutes=will have been running", explanation: "Each pairing names a future point and the duration leading up to it.", pairs: [{ left: "by noon for two hours", right: "will have been working" }, { left: "by June for a year", right: "will have been training" }, { left: "by the finish for ten minutes", right: "will have been running" }] },
    { type: "identify", title: "Find future duration", prompt: "In “By December, she will have been volunteering for a year,” identify the tense phrase.", answer: "will have been volunteering", explanation: "Will have been volunteering shows an activity continuing for a duration to a future date.", options: ["By December", "will have been volunteering", "for a year"] },
    { type: "mcq", title: "Explain a future result", prompt: "By the end of the hike, our legs will be tired because we ___.", answer: "will have been climbing for hours", explanation: "The continuous perfect form explains the duration causing the future result.", options: ["climb yesterday", "will have been climbing for hours", "have climbed tomorrow"] },
    { type: "fill", title: "Future-perfect-continuous negative", prompt: "By July, he ___ (not live) there for a full year.", answer: "will not have been living", explanation: "Use will not have been plus the -ing form for a negative duration.", },
    { type: "transform", title: "State a future duration", prompt: "Rewrite with by next month: I will practise the guitar for two years by next month.", answer: "By next month, I will have been practising the guitar for two years.", explanation: "Future perfect continuous emphasises the two-year duration up to next month.", },
  ],
  "Tense Contrast": [
    { type: "mcq", title: "Habit or action now", prompt: "Ravi usually ___ tea, but today he ___ lemonade.", answer: "drinks; is drinking", explanation: "Usually calls for present simple; today describes a temporary action in progress.", options: ["drinks; is drinking", "is drinking; drinks", "drank; has drunk"] },
    { type: "fill", title: "Finished time or present link", prompt: "I ___ (lose) my key yesterday, but I ___ (find) it now.", answer: "lost; have found", explanation: "Yesterday takes past simple; now links the recent result to the present perfect.", },
    { type: "error", title: "Contrast finished and unfinished time", prompt: "Correct this sentence: We have visited the fort last summer, and we are planning another trip now.", answer: "We visited the fort last summer, and we are planning another trip now.", explanation: "Last summer is finished, so visited must be past simple.", },
    { type: "transform", title: "Contrast a routine and a current action", prompt: "Join with but: Meera walks to school every day. Today her father is driving her.", answer: "Meera walks to school every day, but today her father is driving her.", explanation: "Present simple contrasts the routine with present continuous for today's exception.", },
    { type: "rearrange", title: "Order a tense contrast", prompt: "Arrange the words: has / never / but / climbed / is / she / now / a / mountain / training", answer: "She has never climbed a mountain, but she is training now.", explanation: "Present perfect describes experience up to now; present continuous describes current training.", tokens: ["training", "She", "a", "but", "has", "now.", "never", "is", "climbed", "mountain,"] },
    { type: "matching", title: "Match time clues and tenses", prompt: "Match each clue to the most suitable tense.", answer: "every Saturday=present simple|at the moment=present continuous|two days ago=past simple", explanation: "Time expressions help distinguish routines, current actions and finished past events.", pairs: [{ left: "every Saturday", right: "present simple" }, { left: "at the moment", right: "present continuous" }, { left: "two days ago", right: "past simple" }] },
    { type: "identify", title: "Spot the contrast", prompt: "In “I have finished my work, but my partner is still writing,” which phrase is present continuous?", answer: "is still writing", explanation: "Is still writing describes an action continuing now, unlike the completed present-perfect work.", options: ["have finished", "but", "is still writing"] },
    { type: "mcq", title: "Past event versus background", prompt: "When the lights went out, the audience ___.", answer: "was watching the play", explanation: "Was watching is the longer background action; went out is the interrupting past event.", options: ["watched the play tomorrow", "was watching the play", "has watched the play"] },
    { type: "fill", title: "Past perfect contrast", prompt: "The teacher ___ (start) the lesson after the late pupils ___ (arrive).", answer: "started; had arrived", explanation: "Started is the later past event; had arrived marks the earlier event.", },
    { type: "transform", title: "Contrast two future forms", prompt: "Combine: At 8 p.m. I will be travelling. By midnight I will have reached home.", answer: "At 8 p.m. I will be travelling, but by midnight I will have reached home.", explanation: "Future continuous shows an action in progress; future perfect shows completion by a deadline.", },
  ],
  "Sequence of Tenses": [
    { type: "mcq", title: "Reported present to past", prompt: "Nadia said, “I am tired.” Nadia said that she ___.", answer: "was tired", explanation: "After a past reporting verb, present am normally backshifts to was.", options: ["is tired", "was tired", "has been tired"] },
    { type: "fill", title: "Reported past perfect", prompt: "Arun said, “I have finished.” Arun said that he ___ (finish).", answer: "had finished", explanation: "Present perfect commonly backshifts to past perfect after said in the past.", },
    { type: "error", title: "Fix reported tense", prompt: "Correct this: The guide said that the museum opens at ten yesterday.", answer: "The guide said that the museum opened at ten yesterday.", explanation: "The past reporting context and yesterday call for opened; the sentence is about that past day.", },
    { type: "transform", title: "Report a future plan", prompt: "Report this: “We will return tomorrow,” the hikers said.", answer: "The hikers said that they would return the next day.", explanation: "Will backshifts to would and tomorrow changes to the next day in reported speech.", },
    { type: "rearrange", title: "Order a reported sentence", prompt: "Arrange the words: said / had / that / the / coach / won / they / match / the", answer: "The coach said that they had won the match.", explanation: "Past perfect had won reports a result completed before the coach spoke.", tokens: ["won", "The", "that", "coach", "match.", "had", "said", "they", "the"] },
    { type: "matching", title: "Match original and reported forms", prompt: "Match each direct form to its usual reported form.", answer: "am=was|have seen=had seen|will go=would go", explanation: "A past reporting verb usually shifts the tense one step back.", pairs: [{ left: "am", right: "was" }, { left: "have seen", right: "had seen" }, { left: "will go", right: "would go" }] },
    { type: "identify", title: "Find the backshifted verb", prompt: "In “Mira explained that she had forgotten the key,” identify the backshifted verb phrase.", answer: "had forgotten", explanation: "Had forgotten reports an earlier present-perfect idea from a past viewpoint.", options: ["explained", "had forgotten", "key"] },
    { type: "mcq", title: "General truth exception", prompt: "The science teacher said that water ___ at 100°C.", answer: "boils", explanation: "A timeless scientific fact can remain in the present even after a past reporting verb.", options: ["boiled", "boils", "had boiled"] },
    { type: "fill", title: "Reported past continuous", prompt: "Leah said, “I was reading.” Leah said that she ___ (read).", answer: "had been reading", explanation: "Past continuous commonly backshifts to past perfect continuous in a past report.", },
    { type: "transform", title: "Report a present statement", prompt: "Report: “I can solve the puzzle,” Dev said.", answer: "Dev said that he could solve the puzzle.", explanation: "Can changes to could after a past reporting verb, and I changes to he.", },
  ],
  "Uses of since and for": [
    { type: "mcq", title: "Starting point", prompt: "We have lived in this town ___ 2018.", answer: "since", explanation: "Since is followed by a starting point such as 2018.", options: ["since", "for", "during"] },
    { type: "fill", title: "Length of time", prompt: "The players have been practising ___ two hours.", answer: "for", explanation: "For introduces the length of an activity: two hours.", },
    { type: "error", title: "Correct the time phrase", prompt: "Correct this sentence: I have known Priya for Monday.", answer: "I have known Priya since Monday.", explanation: "Monday is a starting point, so use since, not for.", },
    { type: "transform", title: "Change since to for", prompt: "Rewrite without since: We have waited since 3 o’clock.", answer: "We have waited for three hours.", explanation: "Three hours expresses the length from 3 o’clock until now.", },
    { type: "rearrange", title: "Order a since sentence", prompt: "Arrange the words: has / since / lived / 2020 / here / Omar", answer: "Omar has lived here since 2020.", explanation: "Since 2020 names when Omar's residence began.", tokens: ["2020.", "has", "Omar", "since", "here", "lived"] },
    { type: "matching", title: "Match time expressions", prompt: "Match each expression to since or for.", answer: "last Tuesday=since|five months=for|I was ten=since", explanation: "Dates and ages are starting points; periods such as five months are durations.", pairs: [{ left: "last Tuesday", right: "since" }, { left: "five months", right: "for" }, { left: "I was ten", right: "since" }] },
    { type: "identify", title: "Identify the duration word", prompt: "In “They have been rehearsing for a week,” which word introduces the length of time?", answer: "for", explanation: "For introduces a period, here a week.", options: ["have", "rehearsing", "for"] },
    { type: "mcq", title: "Choose the correct pair", prompt: "Which sentence uses since with a starting point?", answer: "She has worked here since May.", explanation: "May is a starting point and therefore follows since.", options: ["She has worked here for May.", "She has worked here since May.", "She has worked here during May since."] },
    { type: "fill", title: "Negative duration question", prompt: "How long ___ you ___ (wait) for the bus?", answer: "have, been waiting", explanation: "How long asks about duration continuing to now: have you been waiting.", },
    { type: "transform", title: "Ask with since", prompt: "Ask when the museum has been closed: The museum has been closed since Monday.", answer: "Since when has the museum been closed?", explanation: "Since when asks for the starting point of an ongoing state.", },
  ],
  "Tenses in questions and negatives": [
    { type: "mcq", title: "Present simple question", prompt: "___ your sister ___ (play) badminton on Fridays?", answer: "Does, play", explanation: "A singular subject takes does and the main verb returns to play.", options: ["Does, play", "Do, plays", "Is, play"] },
    { type: "fill", title: "Past negative", prompt: "The students ___ (not hear) the announcement yesterday.", answer: "did not hear", explanation: "Past negatives use did not plus the base verb hear.", },
    { type: "error", title: "Correct a perfect question", prompt: "Correct this sentence: Have she finished the model?", answer: "Has she finished the model?", explanation: "She takes has in a present-perfect question.", },
    { type: "transform", title: "Make a future negative", prompt: "Make negative: They will attend the workshop.", answer: "They will not attend the workshop.", explanation: "Place not after will; the main verb remains in the base form.", },
    { type: "rearrange", title: "Order a perfect question", prompt: "Arrange the words: you / have / ever / seen / a / comet", answer: "Have you ever seen a comet?", explanation: "Have comes first, followed by the subject and past participle seen.", tokens: ["ever", "Have", "a", "seen", "you", "comet?"] },
    { type: "matching", title: "Match auxiliaries to tenses", prompt: "Match each auxiliary pattern to its tense.", answer: "do + base=present simple question|did + base=past simple question|will + base=future simple question", explanation: "Do, did and will form questions without changing the main verb from its base form.", pairs: [{ left: "do + base", right: "present simple question" }, { left: "did + base", right: "past simple question" }, { left: "will + base", right: "future simple question" }] },
    { type: "identify", title: "Find the negative marker", prompt: "In “We have not completed the survey,” identify the word that makes the sentence negative.", answer: "not", explanation: "Not changes the affirmative have completed into a negative statement.", options: ["have", "not", "completed"] },
    { type: "mcq", title: "Continuous question", prompt: "Which question asks about an action happening now?", answer: "Are the lights flickering?", explanation: "Are plus flickering forms a present-continuous question about now.", options: ["Did the lights flicker?", "Are the lights flickering?", "Have the lights flickered yesterday?"] },
    { type: "fill", title: "Past-perfect question", prompt: "___ the guests ___ (leave) before the storm began?", answer: "Had, left", explanation: "Past-perfect questions begin with had and use the past participle left.", },
    { type: "transform", title: "Turn negative into a question", prompt: "Ask about the negative statement: Priya has not submitted the form.", answer: "Has Priya submitted the form?", explanation: "Move has before Priya and remove not to ask the corresponding yes/no question.", },
  ],
};

const buildMiddleTenseQuestions = (): GrammarQuestion[] =>
  Object.entries(MIDDLE_TENSE_EXPANSION).flatMap(([topic, activities]) =>
    activities.map((activity, index) => tenseActivity(topic, index + 1, activity))
  );

export const GRAMMAR_LEVELS: GrammarLevel[] = [
  {
    id: "pre-primary",
    name: "Pre-Primary",
    classes: "Nursery · LKG · UKG",
    blurb: "Build confidence with naming words, action words, sounds and simple sentences.",
    color: "#d24a2b",
    concepts: [
      "Naming words / Nouns",
      "Action words / Verbs",
      "Describing words / Adjectives",
      "One and many",
      "Pronouns",
      "This / That / These / Those",
      "Simple sentence formation",
      "Capital letters and basic punctuation",
    ],
    questions: [
      q("mc-1", "mcq", "Naming words", "Which word names an animal?", "cat", "A cat is a naming word for an animal.", { options: ["run", "cat", "blue"] }),
      q("fill-1", "fill", "A simple sentence", "The sun is ___.", "hot", "We use an adjective to tell us about the sun."),
      q("error-1", "error", "Fix the sentence", "Correct this: the ball are red.", "The ball is red.", "Ball is one thing, so it takes 'is'. Begin a sentence with a capital letter."),
      q("transform-1", "transform", "Make it plural", "Change to more than one: This is a star.", "These are stars.", "Use 'these are' and add -s to the naming word."),
      q("rearrange-1", "rearrange", "Put it in order", "Make a sentence from the words.", "I like mangoes.", "A sentence starts with a capital letter and ends with a full stop.", { tokens: ["mangoes.", "I", "like"] }),
      q("matching-1", "matching", "Match the opposites", "Choose the correct match for each word.", "big=small|up=down|hot=cold", "Opposites are words with contrasting meanings.", { pairs: [{ left: "big", right: "small" }, { left: "up", right: "down" }, { left: "hot", right: "cold" }] }),
      q("identify-1", "identify", "Find the action word", "In “Birds fly.”, which word is the action word?", "fly", "Fly tells us what the birds do.", { options: ["Birds", "fly", "the"] }),
      q("mc-2", "mcq", "Describing words", "Which word describes the flower?", "red", "Red tells us what the flower looks like, so it is a describing word.", { topic: "Describing words", options: ["jump", "red", "flower"] }),
      q("fill-2", "fill", "Singular and plural", "There are two ___.", "dogs", "Use the plural form dogs when there is more than one.", { topic: "Singular and plural" }),
      q("error-2", "error", "Capital letters", "Correct this: my name is anu.", "My name is Anu.", "Start the sentence and the person's name with capital letters.", { topic: "Capitalization" }),
      q("transform-2", "transform", "This and that", "Change to show one object near you: Those are books.", "This is a book.", "Use this for one nearby object and change books to the singular form.", { topic: "This and that" }),
      q("rearrange-2", "rearrange", "Simple sentence", "Make a sentence from the words.", "The boy runs.", "A simple sentence needs a subject and an action, and it ends with a full stop.", { topic: "Simple sentences", tokens: ["runs.", "boy", "The"] }),
      q("matching-2", "matching", "Match pronouns", "Match each name to a pronoun.", "Ravi=he|Mina=she|the children=they", "Pronouns can take the place of names or groups of people.", { topic: "Pronouns", pairs: [{ left: "Ravi", right: "he" }, { left: "Mina", right: "she" }, { left: "the children", right: "they" }] }),
      q("identify-2", "identify", "Find the naming word", "In “The puppy sleeps.”, which word is the naming word?", "puppy", "Puppy names an animal, so it is a naming word.", { topic: "Naming words", options: ["The", "puppy", "sleeps"] }),
      q("mc-3", "mcq", "Possessive words", "Which word shows that the toy belongs to Sam?", "Sam's", "An apostrophe and s can show that one person owns something.", { topic: "Possessive nouns", options: ["Sam", "Sam's", "Sams"] }),
      q("fill-3", "fill", "Describing words", "The ___ puppy wagged its tail.", "small", "Small describes the puppy.", { topic: "Describing words" }),
      q("error-3", "error", "Full stops", "Correct this: I like apples", "I like apples.", "A simple statement ends with a full stop.", { topic: "Capitalization and punctuation" }),
      q("transform-3", "transform", "Pronouns", "Replace the name with a pronoun: Riya is happy.", "She is happy.", "She can replace the girl's name.", { topic: "Pronouns" }),
      q("rearrange-3", "rearrange", "This and that", "Make a sentence from the words.", "That is my bag.", "That points to one object farther away.", { topic: "This and that", tokens: ["bag.", "my", "That", "is"] }),
      q("matching-3", "matching", "Match singular and plural", "Match each singular word to its plural.", "one box=two boxes|one child=two children|one leaf=two leaves", "Plural forms can add -s, change the word, or change the ending.", { topic: "Singular and plural", pairs: [{ left: "one box", right: "two boxes" }, { left: "one child", right: "two children" }, { left: "one leaf", right: "two leaves" }] }),
      q("identify-3", "identify", "Find the describing word", "In “The yellow bus stops.”, which word describes the bus?", "yellow", "Yellow tells us the colour of the bus.", { topic: "Describing words", options: ["The", "yellow", "stops"] }),
      ...buildPrePrimaryQuestions(),
    ],
  },
  {
    id: "primary",
    name: "Primary",
    classes: "Classes 1–5",
    blurb: "Strengthen nouns, pronouns, verbs, punctuation and the building blocks of clear writing.",
    color: "#0e7c6b",
    concepts: [
      "Nouns and noun types",
      "Pronouns",
      "Articles",
      "Singular and plural",
      "Gender",
      "Verbs and tenses",
      "Subject–verb agreement",
      "Adjectives and adverbs",
      "Prepositions and conjunctions",
      "Sentence types and punctuation",
    ],
    questions: [
      q("mc-1", "mcq", "Subject–verb agreement", "Choose the correct sentence.", "The children are playing.", "The plural subject 'children' takes the plural verb 'are'.", { options: ["The children is playing.", "The children are playing.", "The children am playing."] }),
      q("fill-1", "fill", "Articles", "I saw ___ elephant at the zoo.", "an", "Use 'an' before a vowel sound, as in elephant."),
      q("error-1", "error", "Past tense", "Correct this: Yesterday I go to school.", "Yesterday I went to school.", "The time word 'yesterday' calls for the past form 'went'."),
      q("transform-1", "transform", "Make it negative", "Change to negative: Ria likes tea.", "Ria does not like tea.", "Use does not with a singular subject, then keep the main verb in its base form."),
      q("rearrange-1", "rearrange", "Build a question", "Make a question from the words.", "Where do you live?", "Question words come first and a question ends with '?'.", { tokens: ["live?", "Where", "you", "do"] }),
      q("matching-1", "matching", "Match word classes", "Match each word to its word class.", "quickly=adverb|garden=noun|bright=adjective", "A noun names, an adjective describes and an adverb often tells how.", { pairs: [{ left: "quickly", right: "adverb" }, { left: "garden", right: "noun" }, { left: "bright", right: "adjective" }] }),
      q("identify-1", "identify", "Find the pronoun", "In “They carried their bags.”, identify the pronoun.", "They", "They stands in place of people's names, so it is a pronoun.", { options: ["carried", "their", "They"] }),
      q("mc-2", "mcq", "Parts of speech", "Which word is a preposition?", "under", "Under shows the relationship between the cat and the table.", { topic: "Parts of speech", options: ["under", "quickly", "happy"] }),
      q("fill-2", "fill", "Present tense", "She ___ to school every day.", "walks", "A singular subject in the simple present takes a verb ending in -s.", { topic: "Basic tenses" }),
      q("error-2", "error", "Punctuation", "Correct this: where are you going.", "Where are you going?", "A question begins with a capital letter and ends with a question mark.", { topic: "Sentence types and punctuation" }),
      q("transform-2", "transform", "Sentence types", "Change into an exclamation: The cake is very lovely.", "What a lovely cake!", "An exclamation can begin with What a and ends with an exclamation mark.", { topic: "Sentence types" }),
      q("rearrange-2", "rearrange", "Prepositions", "Make a sentence from the words.", "The book is on the table.", "The preposition on tells where the book is.", { topic: "Prepositions", tokens: ["table.", "is", "The", "on", "book", "the"] }),
      q("matching-2", "matching", "Match conjunctions", "Match each conjunction to its use.", "and=addition|but=contrast|because=reason", "Conjunctions join words or ideas and show how they are related.", { topic: "Conjunctions", pairs: [{ left: "and", right: "addition" }, { left: "but", right: "contrast" }, { left: "because", right: "reason" }] }),
      q("identify-2", "identify", "Find the adverb", "In “The turtle moved slowly.”, which word is the adverb?", "slowly", "Slowly tells us how the turtle moved.", { topic: "Adverbs", options: ["turtle", "moved", "slowly"] }),
      q("mc-3", "mcq", "Countable nouns", "Which noun can be counted?", "apples", "We can say one apple, two apples, so apple is countable.", { topic: "Countable and uncountable nouns", options: ["water", "apples", "rice"] }),
      q("fill-3", "fill", "Determiners", "There aren't ___ biscuits left.", "any", "Use any in negative sentences with plural countable nouns.", { topic: "Some and any" }),
      q("error-3", "error", "Subject–verb agreement", "Correct this: The basket of mangoes are heavy.", "The basket of mangoes is heavy.", "The head noun basket is singular, so it takes is.", { topic: "Subject–verb agreement" }),
      q("transform-3", "transform", "Comparison", "Make the adjective comparative: This road is narrow.", "This road is narrower.", "Use the comparative form narrower to compare two roads.", { topic: "Comparison of adjectives" }),
      q("rearrange-3", "rearrange", "Adverb position", "Make a sentence from the words.", "She often reads books.", "Frequency adverbs usually come before the main verb.", { topic: "Adverbs of frequency", tokens: ["books.", "often", "She", "reads"] }),
      q("matching-3", "matching", "Match article use", "Match each phrase to the article it needs.", "___ apple=an|___ sun=the|___ water=zero article", "Use an before a vowel sound, the for a specific unique object, and no article for water in a general sense.", { topic: "Articles", pairs: [{ left: "___ apple", right: "an" }, { left: "___ sun", right: "the" }, { left: "___ water", right: "zero article" }] }),
      q("identify-3", "identify", "Find the conjunction", "In “Either Arun or Meera will lead.”, identify the first conjunction.", "Either", "Either...or is a correlative conjunction pair.", { topic: "Correlative conjunctions", options: ["Arun", "Either", "lead"] }),
      q("tense-1", "transform", "Present simple: routines", "Make negative: Asha plays chess every Sunday.", "Asha does not play chess every Sunday.", "Present simple formula: subject + do/does not + base verb. Every Sunday signals a routine.", { topic: "Present Simple" }),
      q("tense-2", "fill", "Present continuous: now", "Listen! The baby ___ (cry).", "is crying", "Present continuous formula: am/is/are + verb-ing. Listen! shows an action happening now.", { topic: "Present Continuous" }),
      q("tense-3", "mcq", "Present perfect: experience", "Which sentence uses the present perfect correctly for life experience?", "I have visited Jaipur twice.", "Present perfect formula: have/has + past participle. It links a past experience to the present without a finished time.", { topic: "Present Perfect", options: ["I visited Jaipur yesterday.", "I have visited Jaipur twice.", "I was visiting Jaipur twice."] }),
      q("tense-4", "error", "Past simple: finished time", "Correct this: We have watched that film last night.", "We watched that film last night.", "Past simple uses the past form for a completed action at a finished time such as last night.", { topic: "Past Simple" }),
      ...buildPrimaryQuestions(),
    ],
  },
  {
    id: "middle",
    name: "Middle School",
    classes: "Classes 6–8",
    blurb: "Explore tense, clauses, modifiers, voice and the choices that make sentences precise.",
    color: "#0a8b9e",
    concepts: [
      "Nouns and advanced pronouns",
      "Determiners",
      "Tenses",
      "Modals",
      "Subject–verb agreement",
      "Degrees of comparison",
      "Adverbs and prepositions",
      "Conjunctions",
      "Phrases and clauses",
      "Non-finite verbs",
      "Question tags",
      "Active and passive voice",
      "Direct and indirect speech",
    ],
    questions: [
      q("mc-1", "mcq", "Perfect tense", "By noon, the team ___ the work.", "had completed", "The past perfect shows an action completed before another past time.", { options: ["completes", "had completed", "will complete"] }),
      q("fill-1", "fill", "Prepositions", "She has lived here ___ 2019.", "since", "Use 'since' with the starting point of a period of time."),
      q("error-1", "error", "Modifier placement", "Correct this: Walking to school, the rain soaked Arun.", "Walking to school, Arun was soaked by the rain.", "The opening phrase must describe Arun, not the rain."),
      q("transform-1", "transform", "Active to passive", "Change to passive: The chef cooked the meal.", "The meal was cooked by the chef.", "The object becomes the passive subject and the verb uses was + past participle."),
      q("rearrange-1", "rearrange", "Order the clause", "Make a complex sentence from the words.", "Although it rained, we played.", "A dependent clause can introduce the independent clause and needs a comma.", { tokens: ["played.", "Although", "it", "rained,", "we"] }),
      q("matching-1", "matching", "Match clause types", "Match each clause to its type.", "because she was late=dependent|the bell rang=independent|who won the race=relative", "An independent clause stands alone; a dependent or relative clause does not.", { pairs: [{ left: "because she was late", right: "dependent" }, { left: "the bell rang", right: "independent" }, { left: "who won the race", right: "relative" }] }),
      q("identify-1", "identify", "Find the conjunction", "In “I stayed home because it rained.”, identify the conjunction.", "because", "Because joins the reason clause to the main clause.", { options: ["stayed", "home", "because"] }),
      q("mc-2", "mcq", "Modal verbs", "You ___ wear a helmet when cycling.", "should", "Should expresses advice or a sensible recommendation.", { topic: "Modals", options: ["should", "has", "did"] }),
      q("fill-2", "fill", "Future tense", "This time tomorrow, we ___ to Delhi.", "will travel", "Will travel describes an action expected in the future.", { topic: "Major tenses" }),
      q("error-2", "error", "Question tags", "Correct this: You are coming, are you?", "You are coming, aren't you?", "A positive statement usually takes a negative question tag.", { topic: "Question tags" }),
      q("transform-2", "transform", "Reported speech", "Report this: Ravi said, “I am tired.”", "Ravi said that he was tired.", "In reported speech, present am changes to past was and I changes to he.", { topic: "Reported speech" }),
      q("rearrange-2", "rearrange", "Non-finite verbs", "Make a sentence from the words.", "She went to the library to study.", "The to-infinitive phrase to study explains the purpose of going.", { topic: "Non-finite verbs", tokens: ["study.", "She", "to", "went", "the", "library", "to"] }),
      q("matching-2", "matching", "Match voice forms", "Match each active sentence to its passive form.", "The dog chased the cat=The cat was chased by the dog|They built the bridge=The bridge was built by them|Maya wrote the poem=The poem was written by Maya", "In passive voice, the object becomes the subject and the verb uses a past participle.", { topic: "Active and passive voice", pairs: [{ left: "The dog chased the cat", right: "The cat was chased by the dog" }, { left: "They built the bridge", right: "The bridge was built by them" }, { left: "Maya wrote the poem", right: "The poem was written by Maya" }] }),
      q("identify-2", "identify", "Find the phrase", "In “After the match, we went home.”, which words form the prepositional phrase?", "After the match", "After the match begins with a preposition and does not contain a finite verb.", { topic: "Phrases", options: ["After the match", "we went", "home"] }),
      q("mc-3", "mcq", "Perfect continuous tense", "She ___ for two hours when I called.", "had been studying", "The past perfect continuous shows an ongoing action before another past event.", { topic: "Perfect and continuous tenses", options: ["studies", "had been studying", "will study"] }),
      q("fill-3", "fill", "Determiners of quantity", "There is not ___ time to wait.", "much", "Much is used with the uncountable noun time in a negative sentence.", { topic: "Much and many" }),
      q("error-3", "error", "Either and neither", "Correct this: Neither of the answers are correct.", "Neither of the answers is correct.", "Neither is treated as singular in formal agreement.", { topic: "Subject–verb agreement" }),
      q("transform-3", "transform", "Modal passive", "Change to passive: They must finish the work.", "The work must be finished.", "A modal passive uses modal + be + past participle.", { topic: "Passive voice with modals" }),
      q("rearrange-3", "rearrange", "Indirect question", "Make a polite question from the words.", "Could you tell me where the station is?", "An indirect question keeps statement word order after where.", { topic: "Indirect questions", tokens: ["is?", "Could", "you", "tell", "me", "where", "the", "station"] }),
      q("matching-3", "matching", "Match non-finite functions", "Match each form to its function.", "to learn=purpose|Swimming is healthy=subject|broken window=description", "Infinitives can express purpose, gerunds can act as subjects, and participles can describe nouns.", { topic: "Infinitives, gerunds and participles", pairs: [{ left: "to learn", right: "purpose" }, { left: "Swimming is healthy", right: "subject" }, { left: "broken window", right: "description" }] }),
      q("identify-3", "identify", "Find the object", "In “The teacher praised Anil.”, identify the object.", "Anil", "Anil receives the action of praised.", { topic: "Subject and object", options: ["The teacher", "praised", "Anil"] }),
      q("tense-1", "rearrange", "Past continuous: interrupted action", "Put the chunks in order.", "I was reading when the phone rang.", "Past continuous formula: was/were + verb-ing. It describes an action in progress when another past action occurred.", { topic: "Past Continuous", tokens: ["rang.", "I", "was", "reading", "when", "the", "phone"] }),
      q("tense-2", "identify", "Past perfect: earlier past", "In “The train had left before we arrived.”, identify the past perfect verb phrase.", "had left", "Past perfect formula: had + past participle. Before marks the action completed earlier in the past.", { topic: "Past Perfect", options: ["The train", "had left", "we arrived"] }),
      q("tense-3", "fill", "Future simple: prediction", "I think our team ___ (win) the match.", "will win", "Future simple formula: will + base verb. I think introduces a prediction about the future.", { topic: "Future Simple" }),
      q("tense-4", "fill", "Future continuous: action in progress", "At 8 p.m. tomorrow, we ___ (travel) home.", "will be travelling", "Future continuous formula: will be + verb-ing. At 8 p.m. tomorrow gives a specific future moment.", { topic: "Future Continuous" }),
      ...buildMiddleNounPronounQuestions(),
      ...buildMiddleDeterminerQuestions(),
      ...buildMiddleTenseQuestions(),
    ],
  },
  {
    id: "secondary",
    name: "Secondary",
    classes: "Classes 9–10",
    blurb: "Master reported speech, conditionals, clauses and formal sentence control for school writing.",
    color: "#a8720a",
    concepts: [
      "Advanced tense usage",
      "Conditionals and modals",
      "Determiners",
      "Phrases and clauses",
      "Non-finite verbs",
      "Active and passive voice",
      "Reported speech",
      "Sentence transformation and combining",
      "Error correction and editing",
      "Punctuation",
      "Subject–verb agreement",
    ],
    questions: [
      q("mc-1", "mcq", "Conditionals", "If I had known, I ___ you.", "would have told", "This third conditional refers to an unreal past condition and result.", { options: ["tell", "would tell", "would have told"] }),
      q("fill-1", "fill", "Reported speech", "Maya said that she ___ tired.", "was", "Backshift 'is' to 'was' when reporting a past statement."),
      q("error-1", "error", "Parallel structure", "Correct this: He enjoys reading, to swim and cycling.", "He enjoys reading, swimming and cycling.", "Items in a series should use the same grammatical form."),
      q("transform-1", "transform", "Combine ideas", "Join with although: It was late. We continued working.", "Although it was late, we continued working.", "Although introduces a contrast and the dependent clause is followed by a comma."),
      q("rearrange-1", "rearrange", "Formal order", "Make a formal sentence from the words.", "The results clearly demonstrate the need for change.", "Adverbs can be placed before the main verb for a clear formal statement.", { tokens: ["change.", "clearly", "The", "need", "results", "demonstrate", "for", "the"] }),
      q("matching-1", "matching", "Match rhetorical devices", "Match each example to its device.", "as brave as a lion=simile|the wind whispered=personification|I have told you a million times=hyperbole", "A simile compares, personification gives human qualities and hyperbole exaggerates.", { pairs: [{ left: "as brave as a lion", right: "simile" }, { left: "the wind whispered", right: "personification" }, { left: "a million times", right: "hyperbole" }] }),
      q("identify-1", "identify", "Find the relative pronoun", "In “The book which you lent me is useful.”, identify the relative pronoun.", "which", "Which introduces the relative clause and refers back to book.", { options: ["book", "which", "useful"] }),
      q("mc-2", "mcq", "Advanced tenses", "By next July, she ___ her degree.", "will have completed", "The future perfect describes an action completed before a future time.", { topic: "Advanced tenses", options: ["completed", "will complete", "will have completed"] }),
      q("fill-2", "fill", "Conditionals", "If I were you, I ___ the opportunity.", "would accept", "The second conditional uses would plus the base verb for an unreal or hypothetical result.", { topic: "Conditionals" }),
      q("error-2", "error", "Punctuation", "Correct this: The answer however was not convincing.", "The answer, however, was not convincing.", "A parenthetical connector such as however is set off with commas.", { topic: "Punctuation" }),
      q("transform-2", "transform", "Complex sentence", "Combine with unless: You must hurry. You will miss the bus.", "Unless you hurry, you will miss the bus.", "Unless means if not and introduces a conditional clause.", { topic: "Sentence transformation" }),
      q("rearrange-2", "rearrange", "Sentence structure", "Make a clear sentence from the words.", "The students who revised passed the examination.", "The relative clause who revised identifies which students passed.", { topic: "Sentence structure", tokens: ["examination.", "who", "The", "passed", "students", "revised", "the"] }),
      q("matching-2", "matching", "Match clause functions", "Match each clause to its function.", "when the bell rang=time|because she practised=reason|that he was honest=content", "Adverb clauses can express time or reason, while a noun clause can express content.", { topic: "Clauses", pairs: [{ left: "when the bell rang", right: "time" }, { left: "because she practised", right: "reason" }, { left: "that he was honest", right: "content" }] }),
      q("identify-2", "identify", "Find the conditional clause", "In “If it rains, the match will be cancelled.”, identify the conditional clause.", "If it rains", "The if-clause states the condition for the result.", { topic: "Conditionals", options: ["If it rains", "the match", "will be cancelled"] }),
      q("mc-3", "mcq", "Mixed conditionals", "If she had trained harder, she ___ fitter now.", "would be", "A past condition can have a present result in a mixed conditional.", { topic: "Mixed conditionals", options: ["would be", "will be", "is"] }),
      q("fill-3", "fill", "Reflexive pronouns", "He taught ___ to play the guitar.", "himself", "Use the reflexive pronoun himself when the subject and object are the same person.", { topic: "Reflexive pronouns" }),
      q("error-3", "error", "Relative clauses", "Correct this: The woman which lives next door is a doctor.", "The woman who lives next door is a doctor.", "Use who for a person in a defining relative clause.", { topic: "Relative pronouns" }),
      q("transform-3", "transform", "Direct to indirect speech", "Report the command: “Close the door,” she said to me.", "She told me to close the door.", "Commands are reported with told + object + to-infinitive.", { topic: "Reported commands and requests" }),
      q("rearrange-3", "rearrange", "Correlative conjunctions", "Make a sentence from the words.", "Neither the coach nor the players were ready.", "Neither...nor joins two alternatives and the verb agrees with the nearer subject in this sentence.", { topic: "Correlative conjunctions", tokens: ["ready.", "Neither", "the", "coach", "nor", "the", "players", "were"] }),
      q("matching-3", "matching", "Match phrase types", "Match each phrase to its type.", "the old house=noun phrase|very quickly=adverb phrase|full of hope=adjective phrase", "Phrases are named by the word they are built around.", { topic: "Phrases", pairs: [{ left: "the old house", right: "noun phrase" }, { left: "very quickly", right: "adverb phrase" }, { left: "full of hope", right: "adjective phrase" }] }),
      q("identify-3", "identify", "Find the complement", "In “The soup tastes delicious.”, identify the complement.", "delicious", "Delicious completes the meaning of the linking verb tastes and describes the soup.", { topic: "Complements and predicates", options: ["The soup", "tastes", "delicious"] }),
      q("secondary-advanced-tense-consistency-1", "error", "Tense consistency in narration", "Correct this: The scientist recorded the result and explains it to the panel.", "The scientist recorded the result and explained it to the panel.", "Both coordinated actions belong to the past narrative, so explained must match recorded.", { concept: "Advanced tense usage", topic: "Tense consistency" }),
      q("secondary-advanced-tense-consistency-2", "mcq", "Tense consistency in a report", "Choose the consistent version for a report of yesterday’s experiment.", "The sample was heated and then cooled.", "A finished sequence in a past report needs the past simple for both linked actions.", { concept: "Advanced tense usage", topic: "Tense consistency", options: ["The sample was heated and then is cooled.", "The sample was heated and then cooled.", "The sample is heated and then cooled."] }),
      q("secondary-advanced-tense-consistency-3", "transform", "Keep a consistent time frame", "Rewrite in the past: The team checks the figures, finds an error and corrected it.", "The team checked the figures, found an error and corrected it.", "A series of completed past actions should keep the past form throughout rather than switching to present.", { concept: "Advanced tense usage", topic: "Tense consistency" }),
      q("secondary-advanced-tense-consistency-4", "fill", "Consistent verb in a narrative", "When the lights failed, the audience ___ (remain) silent and waited.", "remained", "The past-time marker when the lights failed sets a past narrative frame, so remained agrees with waited.", { concept: "Advanced tense usage", topic: "Tense consistency" }),
      q("secondary-advanced-tense-consistency-5", "rearrange", "Order a consistent account", "Put the words in order to make a consistent past-tense account.", "The witness described what she had seen and answered every question.", "Described and answered report completed actions in the past; had seen marks the still earlier observation.", { concept: "Advanced tense usage", topic: "Tense consistency", tokens: ["question.", "every", "answered", "and", "seen", "had", "she", "what", "described", "The", "witness"] }),
      q("secondary-advanced-perfect-contrasts-1", "mcq", "Present perfect or past simple", "Which sentence correctly refers to a finished time?", "I submitted the form on Monday.", "The definite finished time on Monday requires the past simple, not the present perfect.", { concept: "Advanced tense usage", topic: "Present and past perfect contrasts", options: ["I have submitted the form on Monday.", "I submitted the form on Monday.", "I had submitted the form on Monday."] }),
      q("secondary-advanced-perfect-contrasts-2", "fill", "Past perfect before a past event", "By the time the ambulance arrived, the neighbours ___ (carry) the child outside.", "had carried", "Past perfect shows that carrying was completed before the later past event arrived.", { concept: "Advanced tense usage", topic: "Present and past perfect contrasts" }),
      q("secondary-advanced-perfect-contrasts-3", "error", "Contrast present perfect and past simple", "Correct this: I have met the principal yesterday, but I have not spoken to her today.", "I met the principal yesterday, but I have not spoken to her today.", "Yesterday is finished time and takes past simple; today remains connected to the present and can take present perfect.", { concept: "Advanced tense usage", topic: "Present and past perfect contrasts" }),
      q("secondary-advanced-perfect-contrasts-4", "transform", "Show an earlier past action", "Combine using after: The engineer tested the bridge. She submitted her report.", "After the engineer had tested the bridge, she submitted her report.", "Past perfect had tested makes the earlier of two past actions explicit.", { concept: "Advanced tense usage", topic: "Present and past perfect contrasts" }),
      q("secondary-advanced-perfect-contrasts-5", "matching", "Match perfect forms to meanings", "Match each sentence to the meaning of its perfect form.", "I have lost my key=present result|She had left before noon=earlier past|They visited Agra last summer=finished past time", "Present perfect connects a past event to now; past perfect places one past event before another; past simple names a finished time.", { concept: "Advanced tense usage", topic: "Present and past perfect contrasts", pairs: [{ left: "I have lost my key", right: "present result" }, { left: "She had left before noon", right: "earlier past" }, { left: "They visited Agra last summer", right: "finished past time" }] }),
      q("secondary-advanced-perfect-continuous-1", "mcq", "Present perfect continuous", "The pavement is wet because it ___ all morning.", "has been raining", "Present perfect continuous links an activity continuing up to now with present evidence.", { concept: "Advanced tense usage", topic: "Perfect continuous forms", options: ["rained", "has been raining", "had rained"] }),
      q("secondary-advanced-perfect-continuous-2", "fill", "Past perfect continuous duration", "Before the coach arrived, the players ___ (practise) for an hour.", "had been practising", "Had been practising shows an ongoing activity and its duration before another past event.", { concept: "Advanced tense usage", topic: "Perfect continuous forms" }),
      q("secondary-advanced-perfect-continuous-3", "error", "Use a continuous perfect form", "Correct this: She was tired because she had worked since dawn.", "She was tired because she had been working since dawn.", "The activity continued over a period before the past result, so past perfect continuous is more precise.", { concept: "Advanced tense usage", topic: "Perfect continuous forms" }),
      q("secondary-advanced-perfect-continuous-4", "transform", "Emphasise ongoing duration", "Rewrite using present perfect continuous: The students started revising three hours ago and are still revising.", "The students have been revising for three hours.", "Have been revising expresses an activity that began in the past and continues now, while for gives its duration.", { concept: "Advanced tense usage", topic: "Perfect continuous forms" }),
      q("secondary-advanced-perfect-continuous-5", "identify", "Identify the perfect continuous phrase", "In “By 6 p.m., he will have been driving for ten hours.”, identify the verb phrase.", "will have been driving", "Future perfect continuous combines will have been with the -ing form to show duration up to a future point.", { concept: "Advanced tense usage", topic: "Perfect continuous forms", options: ["By 6 p.m.", "will have been driving", "for ten hours"] }),
      q("secondary-advanced-future-forms-1", "mcq", "Future form for an arrangement", "The train ___ at 6:15 tomorrow morning.", "leaves", "Present simple can express a fixed timetable or schedule, unlike a personal intention.", { concept: "Advanced tense usage", topic: "Future forms and future-in-the-past", options: ["leaves", "is leaving", "will have left"] }),
      q("secondary-advanced-future-forms-2", "fill", "Future continuous at a stated time", "Please do not call at nine; I ___ (present) my project then.", "will be presenting", "Future continuous describes an action that will be in progress at a particular future time.", { concept: "Advanced tense usage", topic: "Future forms and future-in-the-past" }),
      q("secondary-advanced-future-forms-3", "error", "Correct future-in-the-past", "Correct this: Neha said that she will email the photographs that evening.", "Neha said that she would email the photographs that evening.", "In a past reporting frame, would expresses a future action viewed from that earlier time.", { concept: "Advanced tense usage", topic: "Future forms and future-in-the-past" }),
      q("secondary-advanced-future-forms-4", "transform", "Report a future plan from the past", "Report this: “I am going to apply for the scholarship,” Arun said.", "Arun said that he was going to apply for the scholarship.", "Was going to is the backshifted form of am going to when the plan is reported in the past.", { concept: "Advanced tense usage", topic: "Future forms and future-in-the-past" }),
      q("secondary-advanced-future-forms-5", "rearrange", "Order a future-in-the-past sentence", "Put the words in order.", "The forecast said that the storm would reach the coast by midnight.", "Would reach describes an event that was future relative to the time of the forecast.", { concept: "Advanced tense usage", topic: "Future forms and future-in-the-past", tokens: ["midnight.", "by", "coast", "the", "reach", "would", "storm", "the", "that", "said", "forecast", "The"] }),
      q("secondary-advanced-sequence-1", "mcq", "Sequence of tenses in a that-clause", "Choose the best completion: The historian explained that the fort ___ in 1650.", "had been built", "The reporting verb is past and the building occurred earlier, so past perfect passive gives the clearest sequence.", { concept: "Advanced tense usage", topic: "Sequence of tenses", options: ["is built", "was built", "had been built"] }),
      q("secondary-advanced-sequence-2", "fill", "Backshift after a past reporting verb", "The guide said that the museum ___ (close) at five every day.", "closed", "A present fact can be backshifted to past simple after a past reporting verb when the whole account is placed in the past.", { concept: "Advanced tense usage", topic: "Sequence of tenses" }),
      q("secondary-advanced-sequence-3", "error", "Correct a sequence-of-tenses shift", "Correct this: The researcher discovered that water boiled at 100°C and records the result.", "The researcher discovered that water boils at 100°C and recorded the result.", "The scientific fact remains present (boils), while recorded keeps the completed research action in the past.", { concept: "Advanced tense usage", topic: "Sequence of tenses" }),
      q("secondary-advanced-sequence-4", "transform", "Sequence two past events", "Rewrite with before: The author finished the draft. She sent it to the editor.", "The author had finished the draft before she sent it to the editor.", "Past perfect marks the completed draft as earlier than the later past action sent.", { concept: "Advanced tense usage", topic: "Sequence of tenses" }),
      q("secondary-advanced-sequence-5", "matching", "Match clauses in a time sequence", "Match each main clause to the most logical completing clause.", "When the bell rang=the students had already left|She said that=the results were reliable|By next June=the team will have completed the survey", "The forms show earlier past, reported past and completion before a future deadline respectively.", { concept: "Advanced tense usage", topic: "Sequence of tenses", pairs: [{ left: "When the bell rang", right: "the students had already left" }, { left: "She said that", right: "the results were reliable" }, { left: "By next June", right: "the team will have completed the survey" }] }),
      q("secondary-conditionals-zero-1", "mcq", "Zero conditional: scientific fact", "Choose the correct result: If water reaches 100°C at sea level, it ___.", "boils", "The zero conditional states a general fact, so both clauses use the present simple.", { concept: "Conditionals and modals", topic: "Zero conditional", options: ["boils", "will boil", "would boil"] }),
      q("secondary-conditionals-zero-2", "fill", "Zero conditional: routine result", "If the school bell ___ (ring) twice, the assembly begins.", "rings", "A repeated rule uses the present simple in the if-clause: if + present simple, present simple.", { concept: "Conditionals and modals", topic: "Zero conditional" }),
      q("secondary-conditionals-zero-3", "error", "Correct a zero conditional", "Correct this general rule: If metal will get hot, it expands.", "If metal gets hot, it expands.", "General truths do not use will in the if-clause; the present simple is needed in both clauses.", { concept: "Conditionals and modals", topic: "Zero conditional" }),
      q("secondary-conditionals-zero-4", "transform", "Turn a fact into a zero conditional", "Rewrite using if: Plants need light. They grow well.", "If plants get light, they grow well.", "The zero conditional links a condition and its usual result with present-simple verbs.", { concept: "Conditionals and modals", topic: "Zero conditional" }),
      q("secondary-conditionals-zero-5", "rearrange", "Order a zero conditional", "Put the words in order to state a rule.", "If you mix blue and yellow, you get green.", "Both clauses use the present simple because this is a predictable result, not a future promise.", { concept: "Conditionals and modals", topic: "Zero conditional", tokens: ["green.", "get", "you", "yellow,", "and", "blue", "mix", "If", "you"] }),
      q("secondary-conditionals-first-1", "mcq", "First conditional: likely plan", "If the rain stops before noon, our class ___ the outdoor survey.", "will conduct", "The first conditional describes a real future possibility with present simple after if and will in the result clause.", { concept: "Conditionals and modals", topic: "First conditional", options: ["will conduct", "conducted", "would conduct"] }),
      q("secondary-conditionals-first-2", "fill", "First conditional: warning", "Unless you ___ (save) your work, you may lose the changes.", "save", "Unless means if not, and its clause takes the present simple even though the warning concerns the future.", { concept: "Conditionals and modals", topic: "First conditional" }),
      q("secondary-conditionals-first-3", "error", "Correct a first conditional", "Correct this possible future: If the bus will arrive soon, we will leave together.", "If the bus arrives soon, we will leave together.", "Use present simple in the if-clause; will belongs in the likely result clause.", { concept: "Conditionals and modals", topic: "First conditional" }),
      q("secondary-conditionals-first-4", "transform", "Join a future condition", "Combine with if: The laboratory is open. We will finish the experiment today.", "If the laboratory is open, we will finish the experiment today.", "The first conditional joins a possible present condition to its future consequence.", { concept: "Conditionals and modals", topic: "First conditional" }),
      q("secondary-conditionals-first-5", "rearrange", "Order a first conditional", "Put the words in order to make a sensible prediction.", "If Mira studies tonight, she will pass the quiz tomorrow.", "The if-clause gives the condition and the will-clause gives the likely future result.", { concept: "Conditionals and modals", topic: "First conditional", tokens: ["tomorrow.", "quiz", "the", "pass", "will", "she", "tonight,", "studies", "Mira", "If"] }),
      q("secondary-conditionals-second-1", "mcq", "Second conditional: imagined choice", "If I had a free month, I ___ across the country by train.", "would travel", "The second conditional uses past simple in the if-clause and would plus the base verb for an unlikely or imaginary result.", { concept: "Conditionals and modals", topic: "Second conditional", options: ["would travel", "will travel", "travelled"] }),
      q("secondary-conditionals-second-2", "fill", "Second conditional: advice", "If Rohan ___ (be) more organised, he would finish his projects earlier.", "were", "In formal second-conditionals, were is used with singular subjects for an unreal situation: If Rohan were...", { concept: "Conditionals and modals", topic: "Second conditional" }),
      q("secondary-conditionals-second-3", "error", "Correct an unreal present", "Correct this imaginary situation: If I would know the answer, I told you.", "If I knew the answer, I would tell you.", "The if-clause takes past simple, while would belongs in the result clause; the result must also be a conditional form.", { concept: "Conditionals and modals", topic: "Second conditional" }),
      q("secondary-conditionals-second-4", "transform", "Express an unlikely result", "Rewrite using if: I do not own a telescope, so I cannot see the distant planet.", "If I owned a telescope, I could see the distant planet.", "The second conditional presents a contrary-to-fact condition; could expresses its possible result.", { concept: "Conditionals and modals", topic: "Second conditional" }),
      q("secondary-conditionals-second-5", "rearrange", "Order a second conditional", "Put the words in order to describe an imaginary project.", "If we lived near the coast, we would study marine life every weekend.", "The past form lived signals that the situation is imagined, not necessarily a past event.", { concept: "Conditionals and modals", topic: "Second conditional", tokens: ["weekend.", "every", "life", "marine", "study", "would", "we", "coast,", "the", "near", "lived", "If", "we"] }),
      q("secondary-conditionals-third-1", "mcq", "Third conditional: missed opportunity", "If the driver had seen the sign, she ___ before the bridge.", "would have stopped", "The third conditional imagines a different past: past perfect in the condition and would have plus a past participle in the result.", { concept: "Conditionals and modals", topic: "Third conditional", options: ["would have stopped", "would stop", "will stop"] }),
      q("secondary-conditionals-third-2", "fill", "Third conditional: earlier preparation", "If the team had checked the map, they ___ (not get) lost.", "would not have got", "Would not have got describes the unreal past result of failing to check the map.", { concept: "Conditionals and modals", topic: "Third conditional" }),
      q("secondary-conditionals-third-3", "error", "Correct a past regret", "Correct this regret: If Leena had left earlier, she would catch the train.", "If Leena had left earlier, she would have caught the train.", "A third-conditional result needs would have plus the past participle to match the unreal past condition.", { concept: "Conditionals and modals", topic: "Third conditional" }),
      q("secondary-conditionals-third-4", "transform", "Rewrite a past alternative", "Rewrite using if: The battery was flat, so the camera did not record the finish.", "If the battery had not been flat, the camera would have recorded the finish.", "Past perfect in the if-clause and would have recorded show an alternative outcome that did not happen.", { concept: "Conditionals and modals", topic: "Third conditional" }),
      q("secondary-conditionals-third-5", "rearrange", "Order a third conditional", "Put the words in order to explain a past result.", "If they had booked earlier, they would have found cheaper seats.", "Both parts refer to an unreal past event: had booked and would have found.", { concept: "Conditionals and modals", topic: "Third conditional", tokens: ["seats.", "cheaper", "found", "have", "would", "they", "earlier,", "booked", "had", "If", "they"] }),
      q("secondary-conditionals-mixed-1", "mcq", "Mixed conditional: past cause, present result", "If Anika had followed the training plan, she ___ confident in the final now.", "would feel", "A past condition can explain a present result: had followed pairs with would feel.", { concept: "Conditionals and modals", topic: "Mixed conditionals", options: ["would feel", "would have felt", "will feel"] }),
      q("secondary-conditionals-mixed-2", "fill", "Mixed conditional: present cause, past result", "If I were more careful with batteries, I ___ (not damage) the camera yesterday.", "would not have damaged", "A present character or habit can explain an unreal past result, so were pairs with would have damaged.", { concept: "Conditionals and modals", topic: "Mixed conditionals" }),
      q("secondary-conditionals-mixed-3", "error", "Correct a mixed conditional", "Correct this connection between past and present: If Omar had accepted the scholarship, he would study abroad now.", "If Omar had accepted the scholarship, he would be studying abroad now.", "The past condition had accepted leads to a present ongoing result, would be studying.", { concept: "Conditionals and modals", topic: "Mixed conditionals" }),
      q("secondary-conditionals-mixed-4", "transform", "Combine different time frames", "Combine with if: I am not patient, so I interrupted the speaker yesterday.", "If I were patient, I would not have interrupted the speaker yesterday.", "The present trait were patient explains the unreal past consequence would not have interrupted.", { concept: "Conditionals and modals", topic: "Mixed conditionals" }),
      q("secondary-conditionals-mixed-5", "rearrange", "Order a mixed conditional", "Put the words in order to connect a past choice with today’s situation.", "If Priya had practised more, she would be ready for the audition now.", "Had practised refers to the past choice; would be ready gives its present result.", { concept: "Conditionals and modals", topic: "Mixed conditionals", tokens: ["now.", "audition", "the", "for", "ready", "be", "would", "she", "more,", "practised", "had", "Priya", "If"] }),
      q("secondary-modals-1", "mcq", "Modals of obligation", "Which sentence expresses a school rule?", "Students must wear their identity cards.", "Must expresses strong obligation imposed by a rule.", { concept: "Conditionals and modals", topic: "Modals of obligation, permission, possibility and deduction", options: ["Students might wear their identity cards.", "Students must wear their identity cards.", "Students could wear their identity cards."] }),
      q("secondary-modals-2", "fill", "Modals of permission", "You ___ (may/can) use the reference atlas during the test; the teacher has allowed it.", "may", "May is a formal modal of permission, suitable for an explicit classroom allowance.", { concept: "Conditionals and modals", topic: "Modals of obligation, permission, possibility and deduction" }),
      q("secondary-modals-3", "error", "Correct a modal of deduction", "Correct this conclusion from the evidence: The lights are on, so the caretaker must be left.", "The lights are on, so the caretaker must have left.", "Must have plus a past participle expresses a strong deduction about an earlier action; must be left changes the meaning.", { concept: "Conditionals and modals", topic: "Modals of obligation, permission, possibility and deduction" }),
      q("secondary-modals-4", "transform", "Show possibility with a modal", "Rewrite using might: It is possible that the parcel will arrive this afternoon.", "The parcel might arrive this afternoon.", "Might expresses an uncertain possibility without claiming that the arrival is certain.", { concept: "Conditionals and modals", topic: "Modals of obligation, permission, possibility and deduction" }),
      q("secondary-modals-5", "matching", "Match modal meanings", "Match each sentence to its modal meaning.", "You must submit the form today=obligation|May I borrow your ruler?=permission|That must be the new coach=deduction", "Must can impose a requirement or show a strong conclusion; may can ask for permission.", { concept: "Conditionals and modals", topic: "Modals of obligation, permission, possibility and deduction", pairs: [{ left: "You must submit the form today", right: "obligation" }, { left: "May I borrow your ruler?", right: "permission" }, { left: "That must be the new coach", right: "deduction" }] }),
    ],
  },
  {
    id: "senior",
    name: "Senior Secondary",
    classes: "Classes 11–12",
    blurb: "Work with nuance: modality, inversion, non-finite clauses and academic precision.",
    color: "#8a44a6",
    concepts: [
      "Advanced tense distinctions",
      "Perfect and perfect-continuous forms",
      "Modality and conditionals",
      "Relative clauses and complex sentences",
      "Non-finite constructions",
      "Inversion",
      "Parallelism and modifiers",
      "Connectors and cohesion",
      "Formal and informal grammar",
      "Editing and proofreading",
      "Academic grammar",
    ],
    questions: [
      q("mc-1", "mcq", "Modal nuance", "The report ___ be submitted by Friday; it is compulsory.", "must", "Must expresses strong obligation, which fits a compulsory deadline.", { options: ["might", "must", "could"] }),
      q("fill-1", "fill", "Subjunctive mood", "It is essential that every applicant ___ present.", "be", "Formal mandative subjunctive uses the base form 'be' after essential that."),
      q("error-1", "error", "Agreement in a complex subject", "Correct this: The quality of the essays have improved.", "The quality of the essays has improved.", "The head noun quality is singular, so the verb is has."),
      q("transform-1", "transform", "Nominalisation", "Rewrite formally: The committee decided quickly.", "The committee made a quick decision.", "Nominalisation changes the verb decided into the noun decision."),
      q("rearrange-1", "rearrange", "Inversion", "Make the emphatic sentence from the words.", "Rarely have we seen such dedication.", "Negative adverbs such as rarely trigger subject–auxiliary inversion.", { tokens: ["dedication.", "Rarely", "such", "have", "we", "seen"] }),
      q("matching-1", "matching", "Match academic connectors", "Match each connector to its function.", "however=contrast|therefore=result|moreover=addition", "Connectors signal the logical relationship between ideas.", { pairs: [{ left: "however", right: "contrast" }, { left: "therefore", right: "result" }, { left: "moreover", right: "addition" }] }),
      q("identify-1", "identify", "Find the non-finite clause", "In “To understand the issue, read the report.”, identify the non-finite clause.", "To understand the issue", "The to-infinitive clause has no tense and explains purpose.", { options: ["read the report", "To understand the issue", "the issue"] }),
      q("mc-2", "mcq", "Inversion", "___ had the lecture begun when the fire alarm rang.", "Hardly", "Hardly at the beginning of a sentence triggers subject–auxiliary inversion.", { topic: "Inversion", options: ["Hardly", "Because", "Usually"] }),
      q("fill-2", "fill", "Parallelism", "The course aims to develop writing, speaking and ___ skills.", "listening", "Items in a series should use parallel -ing forms.", { topic: "Parallelism" }),
      q("error-2", "error", "Dangling modifier", "Correct this: To reduce errors, the report was proofread twice.", "To reduce errors, the researcher proofread the report twice.", "The person who intends to reduce errors must be the subject of the introductory infinitive.", { topic: "Modifiers and proofreading" }),
      q("transform-2", "transform", "Cohesion", "Combine with a relative clause: The proposal was accepted. It addressed the main concern.", "The proposal that addressed the main concern was accepted.", "A relative clause connects the second idea directly to the noun it describes.", { topic: "Cohesion" }),
      q("rearrange-2", "rearrange", "Academic grammar", "Make a formal sentence from the words.", "There is considerable evidence to support this conclusion.", "There is introduces the evidence before the infinitive phrase explains its purpose.", { topic: "Academic grammar", tokens: ["conclusion.", "There", "considerable", "is", "evidence", "to", "support", "this"] }),
      q("matching-2", "matching", "Match proofreading issues", "Match each sentence to the issue it illustrates.", "The results is clear=agreement|She enjoys read=verb form|He is more taller=comparison", "Proofreading checks agreement, verb forms and comparative structure.", { topic: "Proofreading", pairs: [{ left: "The results is clear", right: "agreement" }, { left: "She enjoys read", right: "verb form" }, { left: "He is more taller", right: "comparison" }] }),
      q("identify-2", "identify", "Find the noun clause", "In “We know that the plan will work.”, identify the noun clause.", "that the plan will work", "The that-clause acts as the object of know.", { topic: "Advanced clauses", options: ["We know", "that the plan will work", "will work"] }),
      q("mc-3", "mcq", "Deduction", "The lights are on; they ___ be at home.", "must", "Must expresses a strong logical deduction from evidence.", { topic: "Modals of deduction", options: ["must", "might", "should"] }),
      q("fill-3", "fill", "Relative clauses", "My sister, ___ lives in Pune, is visiting us.", "who", "Use who for a person in a non-defining relative clause set off by commas.", { topic: "Defining and non-defining relatives" }),
      q("error-3", "error", "Word order", "Correct this: Always I check my work carefully.", "I always check my work carefully.", "Frequency adverbs usually come before the main verb, not before the subject.", { topic: "Word order and adverb position" }),
      q("transform-3", "transform", "Negative emphasis", "Rewrite with hardly: I had just arrived when the meeting began.", "Hardly had I arrived when the meeting began.", "Hardly at the beginning requires subject–auxiliary inversion.", { topic: "Negative structures and emphasis" }),
      q("rearrange-3", "rearrange", "Formal and informal grammar", "Make the formal sentence from the words.", "I would appreciate your response at your earliest convenience.", "Formal writing prefers complete, polite structures rather than conversational shortcuts.", { topic: "Formal and informal grammar", tokens: ["convenience.", "your", "I", "would", "appreciate", "response", "at", "earliest", "your"] }),
      q("matching-3", "matching", "Match connector relationships", "Match each connector to its relationship.", "although=concession|so that=purpose|whereas=contrast", "Subordinating connectors show the logical relationship between clauses.", { topic: "Subordinating conjunctions", pairs: [{ left: "although", right: "concession" }, { left: "so that", right: "purpose" }, { left: "whereas", right: "contrast" }] }),
      q("identify-3", "identify", "Find the predicate", "In “The committee approved the proposal.”, identify the predicate.", "approved the proposal", "The predicate tells what the subject committee did.", { topic: "Subject and predicate", options: ["The committee", "approved the proposal", "proposal"] }),
      q("tense-1", "transform", "Future perfect: deadline", "Rewrite with the future perfect: She will finish the report by Friday.", "She will have finished the report by Friday.", "Future perfect formula: will have + past participle. By Friday gives the completion deadline.", { topic: "Future Perfect" }),
      q("tense-2", "fill", "Future perfect continuous: duration", "By June, they ___ (work) here for ten years.", "will have been working", "Future perfect continuous formula: will have been + verb-ing. For ten years measures duration up to a future point.", { topic: "Future Perfect Continuous" }),
      q("tense-3", "mcq", "Future in the past simple", "She said she ___ the next day.", "would return", "Future in the past simple uses would + base verb to report a future plan from a past viewpoint.", { topic: "Future in the Past Simple", options: ["will return", "would return", "returned"] }),
      q("tense-4", "rearrange", "Future in the past continuous", "Put the chunks in order.", "He said he would be waiting outside.", "Future in the past continuous uses would be + verb-ing for an action that would be in progress later from a past viewpoint.", { topic: "Future in the Past Continuous", tokens: ["outside.", "He", "said", "he", "would", "be", "waiting"] }),
    ],
  },
  {
    id: "graduation",
    name: "Graduation",
    classes: "Undergraduate · Advanced",
    blurb: "Polish advanced grammar for research, professional communication and critical writing.",
    color: "#2460c0",
    concepts: [
      "Advanced sentence structure",
      "Academic grammar",
      "Hedging and modality",
      "Nominalisation",
      "Cohesion and coherence",
      "Reporting structures",
      "Complex clauses",
      "Advanced non-finite constructions",
      "Inversion and emphasis",
      "Parallelism and modifier accuracy",
      "Formal academic register",
      "Academic editing and proofreading",
    ],
    questions: [
      q("mc-1", "mcq", "Cohesion", "Choose the sentence with the clearest reference.", "The study was revised after the reviewers' comments.", "The possessive noun makes the source of the comments explicit and avoids an ambiguous pronoun.", { options: ["It was revised after they commented.", "The study was revised after the reviewers' comments.", "This was revised after their comments."] }),
      q("fill-1", "fill", "Concessive clauses", "Much ___ the evidence suggests otherwise, the claim remains unproven.", "as", "The pattern 'much as' introduces a formal concessive clause."),
      q("error-1", "error", "Dangling participle", "Correct this: Having reviewed the data, the conclusion was rewritten.", "Having reviewed the data, the researcher rewrote the conclusion.", "The person who reviewed the data must be the grammatical subject of the opening phrase."),
      q("transform-1", "transform", "Hedging a claim", "Make this cautious: This method proves the theory.", "This method appears to support the theory.", "Academic writing often hedges claims with appears to when evidence is suggestive rather than absolute."),
      q("rearrange-1", "rearrange", "Academic emphasis", "Make a coherent sentence from the words.", "Only after replication can the finding be considered reliable.", "Only + an initial time phrase triggers inversion in the main clause.", { tokens: ["reliable.", "Only", "the", "finding", "after", "replication", "can", "be", "considered"] }),
      q("matching-1", "matching", "Match discourse functions", "Match each phrase to its function.", "in other words=reformulation|nevertheless=concession|in contrast=comparison", "These markers help readers follow reformulation, concession and comparison.", { pairs: [{ left: "in other words", right: "reformulation" }, { left: "nevertheless", right: "concession" }, { left: "in contrast", right: "comparison" }] }),
      q("identify-1", "identify", "Find the adjunct", "In “The findings were, in all likelihood, inconclusive.”, identify the adjunct.", "in all likelihood", "This removable phrase comments on the speaker's level of certainty.", { options: ["The findings", "in all likelihood", "inconclusive"] }),
      q("mc-2", "mcq", "Academic modality", "The findings ___ indicate a relationship, but more evidence is needed.", "may", "May appropriately hedges a claim when the evidence is possible but not certain.", { topic: "Academic grammar", options: ["must", "may", "will"] }),
      q("fill-2", "fill", "Concession", "___ the limitations, the study offers useful evidence.", "Despite", "Despite is followed by a noun phrase and introduces a contrast.", { topic: "Advanced clauses" }),
      q("error-2", "error", "Cohesion and reference", "Correct this: The participants completed the survey. This were analysed.", "The participants completed the survey. This was analysed.", "The pronoun this is singular and therefore takes was.", { topic: "Cohesion" }),
      q("transform-2", "transform", "Impersonal style", "Rewrite formally: We think the result is important.", "The result is considered important.", "An impersonal passive removes the informal first-person subject.", { topic: "Academic grammar" }),
      q("rearrange-2", "rearrange", "Fronted emphasis", "Make a coherent sentence from the words.", "Not only did the method save time, but it also reduced costs.", "Not only at the beginning requires inversion and is paired with but also.", { topic: "Inversion", tokens: ["costs.", "Not", "only", "did", "the", "method", "save", "time,", "but", "it", "also", "reduced"] }),
      q("matching-2", "matching", "Match reporting verbs", "Match each reporting verb to its usual function.", "argue=present a position|demonstrate=show evidence|suggest=make a cautious claim", "Reporting verbs signal the strength and purpose of an academic statement.", { topic: "Academic grammar", pairs: [{ left: "argue", right: "present a position" }, { left: "demonstrate", right: "show evidence" }, { left: "suggest", right: "make a cautious claim" }] }),
      q("identify-2", "identify", "Find the reduced clause", "In “Having considered the evidence, the panel reached a decision.”, identify the reduced clause.", "Having considered the evidence", "The perfect participle clause shows an earlier action without a finite subject and verb.", { topic: "Non-finite constructions", options: ["Having considered the evidence", "the panel", "reached a decision"] }),
      q("mc-3", "mcq", "Hedging probability", "The results ___ suggest that the intervention was effective.", "appear to", "Appear to hedges the claim and signals that the evidence is suggestive rather than certain.", { topic: "Academic hedging", options: ["appear to", "must definitely", "prove"] }),
      q("fill-3", "fill", "Indefinite pronouns", "___ of the evidence was reliable.", "None", "None can refer to an amount of evidence and takes a singular verb here.", { topic: "Indefinite pronouns and agreement" }),
      q("error-3", "error", "Parallelism", "Correct this: The role requires planning, to organise and communicating.", "The role requires planning, organising and communicating.", "Items in a series should use parallel gerund forms.", { topic: "Parallelism" }),
      q("transform-3", "transform", "Passive reporting", "Rewrite formally: Researchers believe that the policy will help.", "The policy is believed to help.", "A reporting passive presents the claim impersonally and concisely.", { topic: "Passive reporting structures" }),
      q("rearrange-3", "rearrange", "Academic cohesion", "Make a coherent sentence from the words.", "Nevertheless, the evidence remains inconclusive.", "Nevertheless signals a contrast with the preceding argument.", { topic: "Cohesion and connectors", tokens: ["inconclusive.", "Nevertheless,", "the", "evidence", "remains"] }),
      q("matching-3", "matching", "Match determiner meaning", "Match each determiner to its meaning.", "each=individual members|enough=sufficient amount|either=one of two", "Determiners specify quantity or choice in a noun phrase.", { topic: "Determiners", pairs: [{ left: "each", right: "individual members" }, { left: "enough", right: "sufficient amount" }, { left: "either", right: "one of two" }] }),
      q("identify-3", "identify", "Find the participial phrase", "In “Concerned about costs, the board delayed the launch.”, identify the participial phrase.", "Concerned about costs", "The participial phrase modifies the board and explains its reason for delaying.", { topic: "Participial phrases and modifiers", options: ["Concerned about costs", "the board", "delayed the launch"] }),
      q("tense-1", "fill", "Future in the past perfect", "By the end of the day, she knew she ___ (complete) the task.", "would have completed", "Future in the past perfect uses would have + past participle for a future completion viewed from the past.", { topic: "Future in the Past Perfect" }),
      q("tense-2", "error", "Future in the past perfect continuous", "Correct this: He expected that by noon he would work for six hours.", "He expected that by noon he would have been working for six hours.", "Future in the past perfect continuous uses would have been + verb-ing to express duration up to a later point viewed from the past.", { topic: "Future in the Past Perfect Continuous" }),
      q("tense-3", "mcq", "Present perfect continuous: unfinished duration", "Which sentence best describes an activity that began in the past and is still continuing?", "They have been waiting since noon.", "Present perfect continuous formula: have/has been + verb-ing. Since noon gives the starting point of an unfinished duration.", { topic: "Present Perfect Continuous", options: ["They waited at noon.", "They have been waiting since noon.", "They had waited before noon."] }),
      q("tense-4", "matching", "Past perfect continuous: duration before past", "Match the form to its use.", "had been raining=ongoing before a past event|had rained=completed before a past event|was raining=ongoing at a past moment", "Had been + verb-ing emphasizes duration before another past event; had + participle emphasizes completion.", { topic: "Past Perfect Continuous", pairs: [{ left: "had been raining", right: "ongoing before a past event" }, { left: "had rained", right: "completed before a past event" }, { left: "was raining", right: "ongoing at a past moment" }] }),
      q("secondary-determiners-articles-1", "mcq", "Articles with specific references", "The committee reviewed ___ proposal submitted by the science team.", "the", "The proposal is identified by the phrase submitted by the science team, so the definite article is appropriate.", { concept: "Determiners", topic: "Articles", options: ["a", "an", "the"] }),
      q("secondary-determiners-articles-2", "fill", "Article before a silent h", "The historian gave ___ honest account of the expedition.", "an", "Honest begins with a vowel sound because its h is silent, so it takes an.", { concept: "Determiners", topic: "Articles" }),
      q("secondary-determiners-articles-3", "error", "Correct an unnecessary article", "Correct this sentence: The education is essential for social progress.", "Education is essential for social progress.", "Education is used as an uncountable idea in a general statement, so it does not need the.", { concept: "Determiners", topic: "Articles" }),
      q("secondary-determiners-articles-4", "transform", "Introduce a noun with an article", "Rewrite to introduce one previously unmentioned object: We found old map in the archive.", "We found an old map in the archive.", "An introduces one singular countable noun beginning with a vowel sound when it is mentioned for the first time.", { concept: "Determiners", topic: "Articles" }),
      q("secondary-determiners-articles-5", "rearrange", "Order a specific article phrase", "Put the words in order to describe a known landmark.", "The ancient fort overlooks the river.", "The is used because the sentence refers to a particular fort understood from the context.", { concept: "Determiners", topic: "Articles", tokens: ["overlooks", "river.", "ancient", "the", "fort", "The"] }),
      q("secondary-determiners-demonstratives-1", "mcq", "Demonstratives and distance", "The speaker is pointing to two photographs on a wall across the room: ___ photographs show our fieldwork.", "Those", "Those refers to plural nouns that are relatively far from the speaker.", { concept: "Determiners", topic: "Demonstratives", options: ["This", "That", "Those"] }),
      q("secondary-determiners-demonstratives-2", "fill", "Demonstrative number agreement", "___ analysis on this page supports the conclusion.", "This", "This is used with one singular noun that is near or currently being indicated.", { concept: "Determiners", topic: "Demonstratives" }),
      q("secondary-determiners-demonstratives-3", "error", "Correct a demonstrative determiner", "Correct this sentence: Those argument is not supported by evidence.", "That argument is not supported by evidence.", "Argument is singular, so the singular demonstrative that is required.", { concept: "Determiners", topic: "Demonstratives" }),
      q("secondary-determiners-demonstratives-4", "transform", "Change demonstrative distance", "Rewrite to show that the results are on the speaker's desk: Those results need checking.", "These results need checking.", "These replaces those when the plural results are near the speaker.", { concept: "Determiners", topic: "Demonstratives" }),
      q("secondary-determiners-demonstratives-5", "rearrange", "Order a demonstrative noun phrase", "Put the words in order to refer to one distant building.", "That building houses the local archive.", "That agrees with the singular noun building and points to something at a distance.", { concept: "Determiners", topic: "Demonstratives", tokens: ["archive.", "the", "building", "houses", "That", "local"] }),
      q("secondary-determiners-quantifiers-1", "mcq", "Quantifiers with countable nouns", "Only ___ applicants met every requirement for the scholarship.", "a few", "A few means a small but positive number and is used with plural countable nouns such as applicants.", { concept: "Determiners", topic: "Quantifiers", options: ["much", "a few", "little"] }),
      q("secondary-determiners-quantifiers-2", "fill", "Quantifiers with uncountable nouns", "There is not ___ evidence to support that conclusion.", "enough", "Enough can modify an uncountable noun when the required amount is sufficient.", { concept: "Determiners", topic: "Quantifiers" }),
      q("secondary-determiners-quantifiers-3", "error", "Correct much and many", "Correct this sentence: The survey received much responses from local residents.", "The survey received many responses from local residents.", "Responses is a plural countable noun, so many is used instead of much.", { concept: "Determiners", topic: "Quantifiers" }),
      q("secondary-determiners-quantifiers-4", "transform", "Change quantity precisely", "Rewrite using fewer: The revised method produced less errors than the original.", "The revised method produced fewer errors than the original.", "Errors is countable, so the comparative quantifier fewer is more precise than less.", { concept: "Determiners", topic: "Quantifiers" }),
      q("secondary-determiners-quantifiers-5", "rearrange", "Order a quantifier phrase", "Put the words in order to describe a limited amount of reliable data.", "Only a little reliable data was available.", "A little modifies the uncountable noun data and means a small amount that exists.", { concept: "Determiners", topic: "Quantifiers", tokens: ["available.", "reliable", "was", "Only", "data", "a", "little"] }),
      q("secondary-determiners-distributives-1", "mcq", "Distributive each", "The supervisor checked ___ entry individually before publishing the list.", "each", "Each refers to members of a group one at a time and is followed here by the singular noun entry.", { concept: "Determiners", topic: "Distributives", options: ["each", "both", "all"] }),
      q("secondary-determiners-distributives-2", "fill", "Distributive either", "You may submit the form through ___ of the two approved portals.", "either", "Either means one or the other of two alternatives.", { concept: "Determiners", topic: "Distributives" }),
      q("secondary-determiners-distributives-3", "error", "Correct neither with agreement", "Correct this sentence: Neither of the explanations are convincing.", "Neither of the explanations is convincing.", "In formal usage, neither is singular and takes is even though it is followed by a plural noun.", { concept: "Determiners", topic: "Distributives" }),
      q("secondary-determiners-distributives-4", "transform", "Express two members together", "Rewrite using both: The two laboratories received safety certificates.", "Both laboratories received safety certificates.", "Both refers to the two laboratories together and replaces the explicit two.", { concept: "Determiners", topic: "Distributives" }),
      q("secondary-determiners-distributives-5", "rearrange", "Order a distributive construction", "Put the words in order to show separate responsibility.", "Each researcher recorded a separate observation.", "Each focuses on the members individually, so it takes the singular noun researcher.", { concept: "Determiners", topic: "Distributives", tokens: ["observation.", "a", "recorded", "researcher", "Each", "separate"] }),
      q("secondary-determiners-indefinite-1", "mcq", "Indefinite determiners in offers", "Would you like ___ more tea before the meeting begins?", "some", "Some is natural in an offer or request when the speaker expects the answer may be yes.", { concept: "Determiners", topic: "Indefinite determiners", options: ["some", "any", "every"] }),
      q("secondary-determiners-indefinite-2", "fill", "Indefinite determiner in a negative clause", "We could not find ___ suitable venue for the debate.", "any", "Any is used with a singular countable noun in a negative statement to mean one of no available options.", { concept: "Determiners", topic: "Indefinite determiners" }),
      q("secondary-determiners-indefinite-3", "error", "Correct an indefinite determiner", "Correct this sentence: Every students must submit a consent form.", "Every student must submit a consent form.", "Every is followed by a singular countable noun, so students must become student.", { concept: "Determiners", topic: "Indefinite determiners" }),
      q("secondary-determiners-indefinite-4", "transform", "Replace a definite quantity", "Rewrite using any to make the statement negative: We found some reliable sources.", "We did not find any reliable sources.", "Some changes to any in the negative sentence, and the affirmative verb becomes did not find.", { concept: "Determiners", topic: "Indefinite determiners" }),
      q("secondary-determiners-indefinite-5", "rearrange", "Order an indefinite determiner phrase", "Put the words in order to make a general statement about options.", "Any reasonable solution deserves consideration.", "Any can refer to one member of an unspecified group in a general statement.", { concept: "Determiners", topic: "Indefinite determiners", tokens: ["consideration.", "deserves", "solution", "reasonable", "Any"] }),
    ],
  },
];

type MiddleRemainingSpec = {
  concept: string;
  topic: string;
  rule: string;
  items: [string, string][];
};

const MIDDLE_REMAINING_SPECS: MiddleRemainingSpec[] = [
  { concept: "Modals", topic: "Can / Could", rule: "Can expresses present ability or permission; could commonly expresses past ability or a polite request.", items: [
    ["___ you solve this equation without a calculator?", "Could",],
    ["When I was seven, I ___ swim across the pool.", "could",],
    ["Correct this: She can to solve the puzzle.", "She can solve the puzzle.",],
    ["Make the request more polite: Pass me the atlas.", "Could you pass me the atlas, please?",],
    ["Arrange: can / our / We / recycle / bottles.", "We can recycle our bottles.",],
  ]},
  { concept: "Modals", topic: "May / Might", rule: "May and might express possibility; may is also used for formal permission.", items: [
    ["The dark clouds suggest that it ___ rain this evening.", "might",],
    ["___ I borrow your ruler for a moment?", "May",],
    ["Correct this: It may rains after lunch.", "It may rain after lunch.",],
    ["Show less certainty: The team will win.", "The team might win.",],
    ["Arrange: may / The / be / answer / correct.", "The answer may be correct.",],
  ]},
  { concept: "Modals", topic: "Must", rule: "Must expresses strong obligation or a logical conclusion based on evidence.", items: [
    ["Visitors ___ wear safety goggles in the laboratory.", "must",],
    ["The lights are off and the door is locked; they ___ be away.", "must",],
    ["Correct this: You must to return the library book.", "You must return the library book.",],
    ["Express a rule: Students keep their phones switched off.", "Students must keep their phones switched off.",],
    ["Arrange: must / We / the / follow / instructions.", "We must follow the instructions.",],
  ]},
  { concept: "Modals", topic: "Should", rule: "Should gives advice or describes what is expected to happen.", items: [
    ["You ___ label each beaker before the experiment.", "should",],
    ["Which sentence gives sensible advice?", "You should save your work often.",],
    ["Correct this: We should to check the answer.", "We should check the answer.",],
    ["Give advice about the wet floor: Walk carefully.", "You should walk carefully on the wet floor.",],
    ["Arrange: should / She / revise / tonight.", "She should revise tonight.",],
  ]},
  { concept: "Modals", topic: "Ought to", rule: "Ought to gives advice or expresses a duty, and is followed by the base verb.", items: [
    ["We ___ to thank the volunteers who helped us.", "ought",],
    ["Complete: You ought ___ apologise for the mistake.", "to",],
    ["Correct this: He ought study before the test.", "He ought to study before the test.",],
    ["Replace should with a similar expression: We should protect the wetland.", "We ought to protect the wetland.",],
    ["Arrange: ought / to / They / arrive / early.", "They ought to arrive early.",],
  ]},
  { concept: "Modals", topic: "Have to", rule: "Have to expresses an obligation imposed by a rule, timetable or outside circumstance.", items: [
    ["Because the bus leaves at six, I ___ have to wake up early.", "have to",],
    ["Complete: Mira ___ to wear a uniform at school.", "has",],
    ["Correct this: We has to submit the form today.", "We have to submit the form today.",],
    ["Express an external rule: Visitors show their passes.", "Visitors have to show their passes.",],
    ["Arrange: has / He / to / practise / daily.", "He has to practise daily.",],
  ]},
  { concept: "Modals", topic: "Need / Needn't", rule: "Need can express necessity; needn't means that an action is not necessary.", items: [
    ["You ___ bring a pencil; the museum provides one.", "needn't",],
    ["___ we book seats before the performance?", "Need",],
    ["Correct this: You needn't to wait outside.", "You needn't wait outside.",],
    ["Say that carrying an umbrella is unnecessary: It is sunny.", "You needn't carry an umbrella.",],
    ["Arrange: needn't / We / hurry / today.", "We needn't hurry today.",],
  ]},
  { concept: "Subject–verb agreement", topic: "Compound subjects", rule: "A subject joined by and is usually plural and takes a plural verb.", items: [
    ["Riya and Kabir ___ presenting the model.", "are",],
    ["Choose the correct sentence.", "The coach and the captain agree.",],
    ["Correct this: The map and compass is missing.", "The map and compass are missing.",],
    ["Join with and: The bell rang. The students left.", "The bell and the students were ready when the bell rang.",],
    ["Arrange: and / are / Maya / Arun / prepared.", "Maya and Arun are prepared.",],
  ]},
  { concept: "Subject–verb agreement", topic: "Collective nouns", rule: "A collective noun such as team or committee is normally singular when the group acts as one unit.", items: [
    ["The committee ___ meeting this afternoon.", "is",],
    ["Choose the sentence with formal agreement.", "The team has won the match.",],
    ["Correct this: The jury have reached its decision.", "The jury has reached its decision.",],
    ["Change the subject to a collective noun: A group of musicians performed.", "The band performed.",],
    ["Arrange: a / of / flock / birds / landed.", "A flock of birds landed.",],
  ]},
  { concept: "Subject–verb agreement", topic: "Either / Neither", rule: "Either and neither are singular when they are followed by of plus a plural noun.", items: [
    ["Neither of the explanations ___ clear.", "is",],
    ["___ of the two routes is shorter?", "Which",],
    ["Correct this: Either of these plans are possible.", "Either of these plans is possible.",],
    ["Rewrite formally: Neither answer is correct.", "Neither of the answers is correct.",],
    ["Arrange: either / is / answer / correct / Neither.", "Neither answer is correct.",],
  ]},
  { concept: "Subject–verb agreement", topic: "Indefinite pronouns", rule: "Everyone, someone, each and nobody are singular and take singular verbs.", items: [
    ["Everyone in the class ___ a copy.", "has",],
    ["Nobody ___ the hidden key.", "found",],
    ["Correct this: Each of the players have a medal.", "Each of the players has a medal.",],
    ["Replace the plural subject with an indefinite pronoun: All people enjoyed the show.", "Everyone enjoyed the show.",],
    ["Arrange: has / Someone / left / a / message.", "Someone has left a message.",],
  ]},
  { concept: "Subject–verb agreement", topic: "Complex subjects", rule: "The verb agrees with the head noun, not with a nearby phrase beginning with of, with or together with.", items: [
    ["The box of old photographs ___ in the attic.", "is",],
    ["A list of required materials ___ on the noticeboard.", "is",],
    ["Correct this: The quality of these apples are excellent.", "The quality of these apples is excellent.",],
    ["Choose the head noun: The basket of oranges was heavy.", "basket",],
    ["Arrange: of / the / is / The / full / jar / marbles.", "The jar is full of marbles.",],
  ]},
  { concept: "Degrees of comparison", topic: "Positive degree", rule: "The positive degree describes one person or thing without comparing it with another.", items: [
    ["The lake is ___ on a windless morning.", "calm",],
    ["Choose the positive-degree adjective.", "bright",],
    ["Correct this: This puzzle is as harder as the last one.", "This puzzle is as hard as the last one.",],
    ["Use the positive degree: The two routes are equally long.", "Both routes are long.",],
    ["Arrange: is / The / narrow / path.", "The path is narrow.",],
  ]},
  { concept: "Degrees of comparison", topic: "Comparative degree", rule: "The comparative degree compares two people or things and usually takes than.", items: [
    ["This route is ___ than the old road.", "shorter",],
    ["Which comparative form is correct for careful?", "more careful",],
    ["Correct this: The blue whale is more heavier than the elephant.", "The blue whale is heavier than the elephant.",],
    ["Compare the two books: Book A is interesting; Book B is more interesting.", "Book B is more interesting than Book A.",],
    ["Arrange: than / faster / The / train / is / bus / the.", "The train is faster than the bus.",],
  ]},
  { concept: "Degrees of comparison", topic: "Superlative degree", rule: "The superlative degree identifies the highest or lowest member of a group and normally takes the.", items: [
    ["June is the ___ month in this region.", "hottest",],
    ["Choose the superlative form of exciting.", "most exciting",],
    ["Correct this: That was the more difficult question.", "That was the most difficult question.",],
    ["Show the highest result: Neel scored 98; no one scored more.", "Neel scored the highest mark.",],
    ["Arrange: the / highest / She / received / score.", "She received the highest score.",],
  ]},
  { concept: "Degrees of comparison", topic: "Irregular comparison", rule: "Good, bad, far, little and many have irregular comparative and superlative forms.", items: [
    ["This solution is ___ than the first one.", "better",],
    ["The final chapter was the ___ of all.", "best",],
    ["Correct this: My result is gooder than yours.", "My result is better than yours.",],
    ["Change bad to its superlative form: This was a bad mistake.", "This was the worst mistake.",],
    ["Arrange: is / better / today / The / weather.", "The weather is better today.",],
  ]},
  { concept: "Adverbs", topic: "Adverbs of manner", rule: "Adverbs of manner explain how an action happens and often end in -ly.", items: [
    ["The nurse spoke ___ to the frightened child.", "gently",],
    ["Which word tells how the eagle flew?", "smoothly",],
    ["Correct this: He completed the task careful.", "He completed the task carefully.",],
    ["Turn the adjective into an adverb: The drummer was quick.", "The drummer played quickly.",],
    ["Arrange: carefully / She / the / glass / carried.", "She carried the glass carefully.",],
  ]},
  { concept: "Adverbs", topic: "Adverbs of time", rule: "Adverbs of time tell when an action happens, such as now, soon, yesterday or later.", items: [
    ["We will discuss the results ___.", "tomorrow",],
    ["Which adverb refers to the past?", "recently",],
    ["Correct this: I have finished already the project.", "I have already finished the project.",],
    ["Add a time adverb to show a future action: The bus arrives.", "The bus will arrive soon.",],
    ["Arrange: yesterday / visited / We / the / museum.", "We visited the museum yesterday.",],
  ]},
  { concept: "Adverbs", topic: "Adverbs of place", rule: "Adverbs of place show where an action happens or where something is located.", items: [
    ["The children searched ___ for the missing puppy.", "everywhere",],
    ["Which adverb shows place?", "nearby",],
    ["Correct this: Come here to quickly.", "Come here quickly.",],
    ["Replace the phrase with an adverb: The bird flew to a higher place.", "The bird flew upwards.",],
    ["Arrange: outside / are / The / waiting / visitors.", "The visitors are waiting outside.",],
  ]},
  { concept: "Adverbs", topic: "Adverbs of frequency", rule: "Frequency adverbs show how often an action occurs; they usually come before a main verb but after be.", items: [
    ["I ___ check the weather before cycling.", "usually",],
    ["She is ___ late for practice.", "never",],
    ["Correct this: They go often to the library.", "They often go to the library.",],
    ["Show a regular habit: Arun reads science magazines.", "Arun often reads science magazines.",],
    ["Arrange: always / is / Our / punctual / teacher.", "Our teacher is always punctual.",],
  ]},
  { concept: "Adverbs", topic: "Adverbs of degree", rule: "Adverbs of degree modify the strength of an adjective or adverb, as in very, quite, too and almost.", items: [
    ["The water is ___ cold to swim in.", "too",],
    ["Which word strengthens the adjective interesting?", "very",],
    ["Correct this: The answer is enough clear.", "The answer is clear enough.",],
    ["Soften the claim: The instructions are confusing.", "The instructions are rather confusing.",],
    ["Arrange: extremely / The / was / experiment / successful.", "The experiment was extremely successful.",],
  ]},
  { concept: "Adverbs", topic: "Position of adverbs", rule: "Adverb position depends on meaning; frequency adverbs usually precede the main verb, while manner often follows it.", items: [
    ["Choose the natural position: She ___ understands the diagram.", "usually",],
    ["Choose the clearest sentence.", "The runner crossed the line quickly.",],
    ["Correct this: He speaks English fluent.", "He speaks English fluently.",],
    ["Move the adverb to its usual position: They have completed already the survey.", "They have already completed the survey.",],
    ["Arrange: quietly / The / students / worked / today.", "The students worked quietly today.",],
  ]},
  { concept: "Prepositions", topic: "Prepositions of time", rule: "Use at for clock times, on for days and dates, and in for months, years and longer periods.", items: [
    ["The meeting begins ___ 9:30.", "at",],
    ["Our exam is ___ Monday.", "on",],
    ["Correct this: She was born at 2012.", "She was born in 2012.",],
    ["Complete with the correct preposition: We travel ___ December.", "in",],
    ["Arrange: on / starts / The / Friday / course.", "The course starts on Friday.",],
  ]},
  { concept: "Prepositions", topic: "Prepositions of place", rule: "Prepositions of place describe position, including in, on, under, beside, between and among.", items: [
    ["The keys are ___ the drawer.", "in",],
    ["The notice is pinned ___ the wall.", "on",],
    ["Correct this: The cat is sitting in the table.", "The cat is sitting under the table.",],
    ["Describe the position: The library is next to the laboratory.", "The library is beside the laboratory.",],
    ["Arrange: between / stands / The / statue / two / trees.", "The statue stands between two trees.",],
  ]},
  { concept: "Prepositions", topic: "Prepositions of movement", rule: "Movement prepositions show direction or destination, such as to, into, across, through, along and towards.", items: [
    ["The cyclist rode ___ the tunnel.", "through",],
    ["The pupils walked ___ the river on the bridge.", "across",],
    ["Correct this: She went in the room quietly.", "She went into the room quietly.",],
    ["Show movement towards the station: The group walked the station.", "The group walked towards the station.",],
    ["Arrange: into / The / poured / glass / water / the.", "The water poured into the glass.",],
  ]},
  { concept: "Prepositions", topic: "Prepositional phrases", rule: "A prepositional phrase begins with a preposition and includes its object; it can add detail about place, time or manner.", items: [
    ["Identify the prepositional phrase: The players rested after the match.", "after the match",],
    ["Complete: The map is ___ the noticeboard.", "beside",],
    ["Correct this: We met in the evening at the park.", "We met at the park in the evening.",],
    ["Add a place phrase: The owl waited.", "The owl waited on the branch.",],
    ["Arrange: under / The / bridge / flowed / stream / the.", "The stream flowed under the bridge.",],
  ]},
  { concept: "Conjunctions", topic: "Coordinating conjunctions", rule: "Coordinating conjunctions such as and, but, or, so and yet join equal words, phrases or clauses.", items: [
    ["The road was flooded, ___ we took another route.", "so",],
    ["Choose the conjunction showing contrast.", "but",],
    ["Correct this: I wanted to go, and it was raining heavily.", "I wanted to go, but it was raining heavily.",],
    ["Join with or: We can walk. We can take the bus.", "We can walk or take the bus.",],
    ["Arrange: but / was / The / difficult / task / interesting.", "The task was difficult but interesting.",],
  ]},
  { concept: "Conjunctions", topic: "Subordinating conjunctions", rule: "Subordinating conjunctions introduce dependent clauses and show relationships such as time, cause, condition or contrast.", items: [
    ["___ the bell rang, the pupils packed their bags.", "When",],
    ["We stayed inside ___ the storm passed.", "until",],
    ["Correct this: Although it was late but we continued.", "Although it was late, we continued.",],
    ["Join with because: The match was cancelled. It rained heavily.", "The match was cancelled because it rained heavily.",],
    ["Arrange: if / will / practise / You / improve / you.", "You will improve if you practise.",],
  ]},
  { concept: "Conjunctions", topic: "Correlative conjunctions", rule: "Correlative pairs such as either...or, neither...nor, both...and and not only...but also work together.", items: [
    ["___ the red pen nor the blue one works.", "Neither",],
    ["___ the coach and the players attended the meeting.", "Both",],
    ["Correct this: Either Rohan or Maya are presenting.", "Either Rohan or Maya is presenting.",],
    ["Join with not only...but also: The project is useful. It is affordable.", "The project is not only useful but also affordable.",],
    ["Arrange: both / are / The / reliable / cheap / and / buses.", "Both buses are cheap and reliable.",],
  ]},
  { concept: "Conjunctions", topic: "Conjunctions of cause and result", rule: "Because and since introduce causes, while so and therefore introduce results.", items: [
    ["The path was closed ___ a tree had fallen.", "because",],
    ["The battery was flat, ___ the torch did not work.", "so",],
    ["Correct this: It was raining, because the match was postponed.", "It was raining, so the match was postponed.",],
    ["Show the result: The alarm rang. Everyone left the building.", "The alarm rang, so everyone left the building.",],
    ["Arrange: therefore / missed / The / bus / I / was / late.", "I missed the bus; therefore, I was late.",],
  ]},
  { concept: "Conjunctions", topic: "Conjunctions of condition and contrast", rule: "If and unless introduce conditions; although, though and whereas contrast two ideas.", items: [
    ["You cannot enter ___ you show your identity card.", "unless",],
    ["___ the device is small, it is powerful.", "Although",],
    ["Correct this: Unless you do not hurry, you will miss the bus.", "Unless you hurry, you will miss the bus.",],
    ["Join with whereas: Tea is hot. Juice is served cold.", "Tea is served hot, whereas juice is served cold.",],
    ["Arrange: although / continued / It / raining / was / we.", "Although it was raining, we continued.",],
  ]},
  { concept: "Phrases", topic: "Noun phrases", rule: "A noun phrase is a noun and its modifiers; it functions as a subject, object or complement.", items: [
    ["Identify the noun phrase: The small wooden boat crossed the lake.", "The small wooden boat",],
    ["Complete the noun phrase: a ___ science project.", "challenging",],
    ["Correct this: She bought a red beautiful scarf.", "She bought a beautiful red scarf.",],
    ["Expand the noun: The bird sang.", "The colourful bird in the mango tree sang.",],
    ["Arrange: a / ancient / found / They / coin.", "They found an ancient coin.",],
  ]},
  { concept: "Phrases", topic: "Verb phrases", rule: "A verb phrase contains a main verb and any helping verbs, modals or perfect and continuous auxiliaries.", items: [
    ["Identify the verb phrase: The players have been practising daily.", "have been practising",],
    ["Complete: She ___ finished her homework.", "has",],
    ["Correct this: They is studying for the quiz.", "They are studying for the quiz.",],
    ["Change to a future verb phrase: The team plays tomorrow.", "The team will play tomorrow.",],
    ["Arrange: has / The / arrived / train / already.", "The train has already arrived.",],
  ]},
  { concept: "Phrases", topic: "Adjective phrases", rule: "An adjective phrase is headed by an adjective and gives more information about a noun or pronoun.", items: [
    ["Identify the adjective phrase: The box full of old letters was locked.", "full of old letters",],
    ["Complete: The sculpture is ___ to move.", "too heavy",],
    ["Correct this: The river is dangerous extremely after rain.", "The river is extremely dangerous after rain.",],
    ["Expand the adjective: The solution was useful.", "The solution was very useful for beginners.",],
    ["Arrange: proud / was / of / She / her / team.", "She was proud of her team.",],
  ]},
  { concept: "Phrases", topic: "Adverb phrases", rule: "An adverb phrase acts like an adverb and modifies a verb, adjective or adverb by explaining how, when, where or why.", items: [
    ["Identify the adverb phrase: The runner finished in great haste.", "in great haste",],
    ["Complete: The team practised ___ before the final.", "with great focus",],
    ["Correct this: He answered the question in confident.", "He answered the question with confidence.",],
    ["Replace the adverb with a phrase: She spoke politely.", "She spoke in a polite manner.",],
    ["Arrange: with / The / worked / great / care / artist.", "The artist worked with great care.",],
  ]},
  { concept: "Phrases", topic: "Prepositional phrases", rule: "A prepositional phrase begins with a preposition and can modify a noun or verb by adding precise detail.", items: [
    ["Identify the phrase modifying desk: The books on the desk are new.", "on the desk",],
    ["Complete: The hikers rested ___ the tall pine.", "beneath",],
    ["Correct this: The note was attached at the door.", "The note was attached to the door.",],
    ["Add a phrase of place: The cat slept.", "The cat slept under the sofa.",],
    ["Arrange: across / walked / We / the / bridge.", "We walked across the bridge.",],
  ]},
  { concept: "Clauses", topic: "Main clauses", rule: "A main clause contains a subject and finite verb and can stand alone as a complete sentence.", items: [
    ["Which is a main clause?", "The experiment succeeded.",],
    ["Complete the main clause: The students ___ the results.", "recorded",],
    ["Correct this fragment: Because the lights went out.", "The lesson stopped because the lights went out.",],
    ["Turn the fragment into a main clause: When the rain stopped.", "When the rain stopped, we continued the match.",],
    ["Arrange: finished / The / lesson / early.", "The lesson finished early.",],
  ]},
  { concept: "Clauses", topic: "Subordinate clauses", rule: "A subordinate clause has a subject and verb but cannot stand alone; it is introduced by a subordinating word.", items: [
    ["Identify the subordinate clause: We left when the rain started.", "when the rain started",],
    ["Complete: We will wait until the teacher ___.", "arrives",],
    ["Correct this: Although the road was narrow. We continued.", "Although the road was narrow, we continued.",],
    ["Add a subordinate clause: The plants grew well.", "The plants grew well because we watered them.",],
    ["Arrange: because / stayed / We / inside / it / rained.", "We stayed inside because it rained.",],
  ]},
  { concept: "Clauses", topic: "Noun clauses", rule: "A noun clause acts as a noun and can be the subject or object of a verb, often beginning with that, what, why or whether.", items: [
    ["Identify the noun clause: I know what the symbol means.", "what the symbol means",],
    ["Complete: Nobody knows ___ the keys are.", "where",],
    ["Correct this: She explained that why the machine stopped.", "She explained why the machine stopped.",],
    ["Combine with a noun clause: The guide explained it. The bridge was built in 1890.", "The guide explained that the bridge was built in 1890.",],
    ["Arrange: what / I / means / understand / this / do not.", "I do not understand what this means.",],
  ]},
  { concept: "Clauses", topic: "Relative/adjective clauses", rule: "A relative clause describes a noun and commonly begins with who, which, that, whose, where or when.", items: [
    ["Identify the relative clause: The book that you lent me is fascinating.", "that you lent me",],
    ["Complete: The scientist ___ won the prize visited our school.", "who",],
    ["Correct this: The park who we visited was crowded.", "The park that we visited was crowded.",],
    ["Join with which: I found a shell. It had a spiral pattern.", "I found a shell which had a spiral pattern.",],
    ["Arrange: lives / The / where / village / my / aunt.", "The village where my aunt lives is peaceful.",],
  ]},
  { concept: "Clauses", topic: "Adverb clauses", rule: "An adverb clause modifies a verb or whole clause and expresses time, reason, condition, purpose or contrast.", items: [
    ["Identify the adverb clause: We waited until the shop opened.", "until the shop opened",],
    ["Complete: Take notes so that you ___ remember the steps.", "can",],
    ["Correct this: We stayed home because of it was stormy.", "We stayed home because it was stormy.",],
    ["Show purpose: She carried a torch. She could see the path.", "She carried a torch so that she could see the path.",],
    ["Arrange: when / arrives / Call / the / bus / you.", "Call me when the bus arrives.",],
  ]},
  { concept: "Non-finite verbs", topic: "Infinitives", rule: "An infinitive is to plus the base verb, or a bare base verb after some modals; it does not show tense by itself.", items: [
    ["The team met ___ the project.", "to discuss",],
    ["Complete: You must ___ the safety notice.", "read",],
    ["Correct this: She decided going home early.", "She decided to go home early.",],
    ["Show purpose: He opened the window. He wanted fresh air.", "He opened the window to get fresh air.",],
    ["Arrange: to / wants / learn / He / coding.", "He wants to learn coding.",],
  ]},
  { concept: "Non-finite verbs", topic: "Gerunds", rule: "A gerund is an -ing form that acts as a noun, often after a preposition or as a sentence subject.", items: [
    ["___ regularly improves concentration.", "Reading",],
    ["She is interested in ___ wildlife.", "studying",],
    ["Correct this: Swimming are good exercise.", "Swimming is good exercise.",],
    ["Use a gerund as the subject: To recycle saves resources.", "Recycling saves resources.",],
    ["Arrange: enjoys / music / Listening / to / she.", "She enjoys listening to music.",],
  ]},
  { concept: "Non-finite verbs", topic: "Participles", rule: "Present participles end in -ing and past participles often end in -ed or have irregular forms; they can modify nouns or form verb phrases.", items: [
    ["The ___ leaves covered the path.", "fallen",],
    ["Which participle describes the noise?", "deafening",],
    ["Correct this: The brokened chair was unsafe.", "The broken chair was unsafe.",],
    ["Use a participial phrase: The boy was tired. He sat down.", "Tired from the race, the boy sat down.",],
    ["Arrange: shining / The / stars / looked / beautiful.", "The shining stars looked beautiful.",],
  ]},
  { concept: "Non-finite verbs", topic: "Identifying non-finite forms", rule: "Non-finite forms do not carry tense or agree with a subject; infinitives, gerunds and participles are common examples.", items: [
    ["Which is non-finite in “She hopes to win”?", "to win",],
    ["Identify the gerund: “Drawing relaxes me.”", "Drawing",],
    ["Correct this: He enjoys to read novels.", "He enjoys reading novels.",],
    ["Label the form: “The glowing lamp lit the desk.”", "glowing is a present participle.",],
    ["Arrange: to / decided / They / volunteer / locally.", "They decided to volunteer locally.",],
  ]},
  { concept: "Question tags", topic: "Positive statement → negative tag", rule: "A positive statement normally takes a negative question tag with the same auxiliary and subject.", items: [
    ["You have finished, ___?", "haven't you",],
    ["She is ready, ___?", "isn't she",],
    ["Correct this: They enjoyed the trip, did they?", "They enjoyed the trip, didn't they?",],
    ["Add a tag: The plan will work.", "The plan will work, won't it?",],
    ["Arrange: coming / aren't / You / you /?", "You are coming, aren't you?",],
  ]},
  { concept: "Question tags", topic: "Negative statement → positive tag", rule: "A negative statement normally takes a positive tag, using the auxiliary from the statement.", items: [
    ["You don't need help, ___?", "do you",],
    ["They weren't late, ___?", "were they",],
    ["Correct this: He hasn't called, hasn't he?", "He hasn't called, has he?",],
    ["Add a tag: We cannot enter yet.", "We cannot enter yet, can we?",],
    ["Arrange: did / She / not / forget / did / she /?", "She did not forget, did she?",],
  ]},
  { concept: "Question tags", topic: "Auxiliary-based tags", rule: "A tag repeats the statement's auxiliary; when there is no auxiliary in the simple present or past, use do, does or did.", items: [
    ["Maya plays chess, ___?", "doesn't she",],
    ["The boys visited us, ___?", "didn't they",],
    ["Correct this: Ravi likes music, isn't he?", "Ravi likes music, doesn't he?",],
    ["Add the tag: They have seen the notice.", "They have seen the notice, haven't they?",],
    ["Arrange: doesn't / work / This / it / machine /?", "This machine works, doesn't it?",],
  ]},
  { concept: "Question tags", topic: "Special cases such as I am → aren't I?", rule: "The special tag for I am is aren't I?; imperatives often take will you?, and let's takes shall we?", items: [
    ["I am early, ___?", "aren't I",],
    ["Let's check the answer, ___?", "shall we",],
    ["Correct this: Open the window, shall we?", "Open the window, will you?",],
    ["Add the special tag: I am responsible for the keys.", "I am responsible for the keys, aren't I?",],
    ["Arrange: shall / Let's / we / begin /?", "Let's begin, shall we?",],
  ]},
  { concept: "Active and passive voice", topic: "Present simple passive", rule: "The present simple passive uses am, is or are plus a past participle when the action happens regularly or generally.", items: [
    ["The uniforms ___ at this factory.", "are made",],
    ["Choose the passive sentence.", "The museum is visited by many tourists.",],
    ["Correct this: Fresh bread is bake here.", "Fresh bread is baked here.",],
    ["Change to passive: Workers recycle the bottles.", "The bottles are recycled by workers.",],
    ["Arrange: are / by / grown / Farmers / vegetables.", "Vegetables are grown by farmers.",],
  ]},
  { concept: "Active and passive voice", topic: "Past simple passive", rule: "The past simple passive uses was or were plus a past participle for a completed past action.", items: [
    ["The bridge ___ in 1920.", "was built",],
    ["Choose the passive sentence.", "The trophy was presented by the principal.",],
    ["Correct this: The letters were send yesterday.", "The letters were sent yesterday.",],
    ["Change to passive: The storm damaged the roof.", "The roof was damaged by the storm.",],
    ["Arrange: was / The / discovered / cave / in / 1901.", "The cave was discovered in 1901.",],
  ]},
  { concept: "Active and passive voice", topic: "Future passive", rule: "The future passive uses will be plus a past participle for an action expected to happen.", items: [
    ["The results ___ tomorrow.", "will be announced",],
    ["Choose the future passive.", "The new library will be opened in June.",],
    ["Correct this: The prizes will awarded next week.", "The prizes will be awarded next week.",],
    ["Change to passive: The school will publish the timetable.", "The timetable will be published by the school.",],
    ["Arrange: will / be / The / repaired / road / soon.", "The road will be repaired soon.",],
  ]},
  { concept: "Active and passive voice", topic: "Continuous passive", rule: "A continuous passive uses be plus being and a past participle to show an action in progress.", items: [
    ["The auditorium ___ being decorated for the concert.", "is",],
    ["Choose the continuous passive.", "The road is being widened this month.",],
    ["Correct this: The machine is being repair.", "The machine is being repaired.",],
    ["Change to passive: Workers are painting the hall.", "The hall is being painted by workers.",],
    ["Arrange: being / The / cleaned / is / pool.", "The pool is being cleaned.",],
  ]},
  { concept: "Active and passive voice", topic: "Perfect passive", rule: "A perfect passive uses has, have or had been plus a past participle to show a completed action.", items: [
    ["The forms have ___ checked by the clerk.", "been",],
    ["Choose the perfect passive.", "The parcel had been delivered before noon.",],
    ["Correct this: The work has completed by the team.", "The work has been completed by the team.",],
    ["Change to passive: They had repaired the engine.", "The engine had been repaired by them.",],
    ["Arrange: has / The / been / message / sent.", "The message has been sent.",],
  ]},
  { concept: "Direct and indirect speech", topic: "Reported statements", rule: "Reported statements use a reporting verb and often backshift tense and pronouns when the reporting time is past.", items: [
    ["Mina said, “I am tired.” Report it.", "Mina said that she was tired.",],
    ["Ravi said, “I have finished.” Report it.", "Ravi said that he had finished.",],
    ["Correct this: Anu said that I was ready. (Anu spoke about herself.)", "Anu said that she was ready.",],
    ["Report: “We will return tomorrow,” the hikers said.", "The hikers said that they would return the next day.",],
    ["Arrange: said / he / was / tired / that / Arun.", "Arun said that he was tired.",],
  ]},
  { concept: "Direct and indirect speech", topic: "Reported questions", rule: "Reported questions use statement word order and remove the question mark; yes/no questions use if or whether.", items: [
    ["Report: “Where do you live?” she asked me.", "She asked me where I lived.",],
    ["Report: “Are you ready?” he asked.", "He asked whether I was ready.",],
    ["Correct this: She asked me where did I live.", "She asked me where I lived.",],
    ["Report: “Have they arrived?” the teacher asked.", "The teacher asked if they had arrived.",],
    ["Arrange: asked / why / was / He / late / I.", "He asked why I was late.",],
  ]},
  { concept: "Direct and indirect speech", topic: "Reported commands", rule: "Reported commands commonly use told or ordered plus an object and to-infinitive; negative commands use not to.", items: [
    ["Report: “Close the gate,” the guard said.", "The guard told us to close the gate.",],
    ["Report: “Do not touch the switch,” she said.", "She told me not to touch the switch.",],
    ["Correct this: The coach told run faster.", "The coach told us to run faster.",],
    ["Report the instruction: “Write your name at the top.”", "The teacher told us to write our names at the top.",],
    ["Arrange: told / The / us / wait / to / guide.", "The guide told us to wait.",],
  ]},
  { concept: "Direct and indirect speech", topic: "Reported requests", rule: "Reported requests use ask or request plus an object and to-infinitive, often with please removed.", items: [
    ["Report: “Please lend me your notes,” Tara said.", "Tara asked me to lend her my notes.",],
    ["Report: “Please wait here,” the nurse said.", "The nurse asked us to wait there.",],
    ["Correct this: He asked that I to help him.", "He asked me to help him.",],
    ["Report politely: “Could you open the door, please?”", "She asked me to open the door.",],
    ["Arrange: asked / the / librarian / to / speak / quietly / us.", "The librarian asked us to speak quietly.",],
  ]},
  { concept: "Direct and indirect speech", topic: "Changes in tense/pronouns/time expressions", rule: "Reported speech may change tense, pronouns and time or place words to match the new speaker and viewpoint.", items: [
    ["Report: “I will finish this today,” Neha said.", "Neha said that she would finish that day.",],
    ["Change today in reported speech: “I am leaving today,” he said.", "He said that he was leaving that day.",],
    ["Correct this: Ravi said he would come tomorrow. (reported the next day)", "Ravi said he would come the next day.",],
    ["Report: “These are my books,” Lata said.", "Lata said that those were her books.",],
    ["Arrange: said / the / next / day / would / return / She / she.", "She said she would return the next day.",],
  ]},
];

const middleRemainingSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const buildMiddleRemainingQuestions = (): GrammarQuestion[] =>
  MIDDLE_REMAINING_SPECS.flatMap((spec) =>
    spec.items.map(([prompt, answer], index) => {
      const type = (["mcq", "fill", "error", "transform", "rearrange"] as GrammarExerciseType[])[index];
      const id = `middle-${middleRemainingSlug(spec.concept)}-${middleRemainingSlug(spec.topic)}-${index + 1}`;
      const options = type === "mcq"
        ? [answer, ...[...spec.items.filter((_, itemIndex) => itemIndex !== index).map((item) => item[1]), "might", "should", "are", "was", "were", "has", "have"]
          .filter((option, optionIndex, all) => option !== answer && all.indexOf(option) === optionIndex)
          .slice(0, 2)]
        : undefined;
      const tokens = type === "rearrange"
        ? answer.split(/\s+/).reverse()
        : undefined;
      const instruction = type === "mcq"
        ? `Choose the best answer for this ${spec.topic.toLowerCase()} example.`
        : type === "fill"
          ? `Complete this ${spec.topic.toLowerCase()} example.`
          : type === "error"
            ? `Correct the error in this ${spec.topic.toLowerCase()} example.`
            : type === "transform"
              ? `Rewrite this ${spec.topic.toLowerCase()} example as instructed.`
              : `Arrange the words to make a ${spec.topic.toLowerCase()} sentence.`;
      return q(
        id,
        type,
        `${spec.topic}: activity ${index + 1}`,
        `${instruction} ${prompt}`,
        answer,
        spec.rule,
        { concept: spec.concept, topic: spec.topic, options, tokens },
      );
    }),
  );

type SecondaryPhraseClauseActivity = {
  topic: string;
  type: GrammarExerciseType;
  title: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  tokens?: string[];
  pairs?: { left: string; right: string }[];
};

const SECONDARY_PHRASES_CLAUSES_EXPANSION: SecondaryPhraseClauseActivity[] = [
  { topic: "Noun phrases", type: "mcq", title: "Identify the head noun", prompt: "Which word is the head noun in “Those three remarkably detailed maps were displayed”?", answer: "maps", explanation: "Maps is the noun that the demonstrative, number and adverb modify; it is the head of the noun phrase.", options: ["Those", "detailed", "maps"] },
  { topic: "Noun phrases", type: "fill", title: "Complete a postmodifier", prompt: "Complete the noun phrase: “The students ___ the robotics club won the prize.”", answer: "from", explanation: "From the robotics club is a prepositional postmodifier identifying which students won.", },
  { topic: "Noun phrases", type: "error", title: "Order noun modifiers", prompt: "Correct this sentence: The school bought a metal small storage cabinet.", answer: "The school bought a small metal storage cabinet.", explanation: "Size normally precedes material when several adjectives modify the same noun.", },
  { topic: "Noun phrases", type: "transform", title: "Expand a noun phrase", prompt: "Expand “The proposal was accepted” by adding “for the community garden” as a postmodifier of proposal.", answer: "The proposal for the community garden was accepted.", explanation: "The prepositional phrase follows proposal and narrows which proposal was accepted.", },
  { topic: "Noun phrases", type: "rearrange", title: "Build a complex noun phrase", prompt: "Arrange the words: from / the / a / handwritten / diary / nineteenth century", answer: "a handwritten diary from the nineteenth century", explanation: "The article and adjective precede the head noun; the period phrase follows it as a postmodifier.", tokens: ["nineteenth", "a", "diary", "from", "handwritten", "century", "the"] },

  { topic: "Verb phrases", type: "mcq", title: "Choose the complete verb phrase", prompt: "Which is the verb phrase in “The volunteers should have been sorting the books”?", answer: "should have been sorting", explanation: "The modal, perfect auxiliary, continuous auxiliary and main verb together form the verb phrase.", options: ["The volunteers", "should have been sorting", "the books"] },
  { topic: "Verb phrases", type: "fill", title: "Complete a perfect continuous phrase", prompt: "By 6 p.m., the team ___ (work) for eight hours.", answer: "will have been working", explanation: "A duration continuing up to a future time takes will have been plus the -ing form.", },
  { topic: "Verb phrases", type: "error", title: "Keep auxiliaries in order", prompt: "Correct this sentence: She has writing the final paragraph.", answer: "She has written the final paragraph.", explanation: "Has in the present perfect must be followed by a past participle, written, not the -ing form.", },
  { topic: "Verb phrases", type: "transform", title: "Add a modal to the verb phrase", prompt: "Rewrite with might: The parcel arrives this evening.", answer: "The parcel might arrive this evening.", explanation: "Might is followed by the base verb arrive and expresses uncertain possibility.", },
  { topic: "Verb phrases", type: "rearrange", title: "Order a modal perfect phrase", prompt: "Arrange the words: have / The / missed / may / train / she", answer: "She may have missed the train.", explanation: "The subject comes first, followed by modal may, perfect have and the past participle missed.", tokens: ["train.", "may", "She", "missed", "have", "the"] },

  { topic: "Adjective phrases", type: "mcq", title: "Find the adjective phrase", prompt: "Which phrase describes the sculpture in “The sculpture, unusually bright for its age, attracted visitors”?", answer: "unusually bright for its age", explanation: "The phrase is headed by the adjective bright and gives extra information about the sculpture.", options: ["The sculpture", "unusually bright for its age", "attracted visitors"] },
  { topic: "Adjective phrases", type: "fill", title: "Complete an adjective complement", prompt: "The instructions were clear ___ every new volunteer.", answer: "to", explanation: "Clear to every new volunteer is an adjective phrase with a to-complement.", },
  { topic: "Adjective phrases", type: "error", title: "Place the intensifier", prompt: "Correct this sentence: The explanation was confusing very for the younger pupils.", answer: "The explanation was very confusing for the younger pupils.", explanation: "The degree adverb very comes before the adjective confusing.", },
  { topic: "Adjective phrases", type: "transform", title: "Add a reason to an adjective", prompt: "Rewrite with an adjective phrase: “The hikers were tired. They had walked since dawn.”", answer: "The hikers were tired from walking since dawn.", explanation: "From walking since dawn completes the adjective tired and explains the cause.", },
  { topic: "Adjective phrases", type: "rearrange", title: "Order an adjective phrase", prompt: "Arrange the words: enough / The / was / warm / for / water / swimming", answer: "The water was warm enough for swimming.", explanation: "Enough follows the adjective warm, and for swimming completes the degree phrase.", tokens: ["for", "water", "enough", "The", "swimming", "was", "warm"] },

  { topic: "Adverb phrases", type: "mcq", title: "Choose the manner phrase", prompt: "Which phrase tells how the engineer repaired the bicycle?", answer: "with great patience", explanation: "With great patience is an adverb phrase modifying repaired by describing manner.", options: ["The engineer", "repaired the bicycle", "with great patience"] },
  { topic: "Adverb phrases", type: "fill", title: "Complete a time phrase", prompt: "The exhibition opens ___ the school holidays.", answer: "during", explanation: "During the school holidays is an adverb phrase of time modifying opens.", },
  { topic: "Adverb phrases", type: "error", title: "Correct an adverb phrase", prompt: "Correct this sentence: The cyclist rode in a careful mannerly.", answer: "The cyclist rode in a careful manner.", explanation: "Manner is the noun required after in a careful; mannerly is not needed in this phrase.", },
  { topic: "Adverb phrases", type: "transform", title: "Replace an adverb with a phrase", prompt: "Replace “carefully” with an adverb phrase: “The curator handled the vase carefully.”", answer: "The curator handled the vase with great care.", explanation: "With great care is a prepositional adverb phrase expressing the same manner as carefully.", },
  { topic: "Adverb phrases", type: "rearrange", title: "Order a place phrase", prompt: "Arrange the words: at / waited / the / We / entrance / quietly", answer: "We waited quietly at the entrance.", explanation: "Quietly modifies waited, while at the entrance gives the place of the waiting.", tokens: ["entrance.", "quietly", "at", "We", "the", "waited"] },

  { topic: "Main and subordinate clauses", type: "mcq", title: "Distinguish a main clause", prompt: "Which clause can stand alone as a complete sentence?", answer: "the audience applauded", explanation: "The clause has a subject and finite verb and expresses a complete thought without a subordinating word.", options: ["although the speech was brief", "the audience applauded", "when the speaker arrived"] },
  { topic: "Main and subordinate clauses", type: "fill", title: "Complete a subordinate clause", prompt: "The match resumed after the referee ___ the field was safe.", answer: "confirmed", explanation: "After introduces the subordinate time clause after the referee confirmed the field was safe.", },
  { topic: "Main and subordinate clauses", type: "error", title: "Repair a sentence fragment", prompt: "Correct this fragment: While the students waited outside.", answer: "While the students waited outside, the teacher unlocked the hall.", explanation: "While introduces a subordinate clause, so it must be joined to a main clause.", },
  { topic: "Main and subordinate clauses", type: "transform", title: "Subordinate the reason", prompt: "Join with because: “The flight was delayed. Thick fog covered the runway.”", answer: "The flight was delayed because thick fog covered the runway.", explanation: "Because introduces the reason clause and joins it to the main clause without changing the meaning.", },
  { topic: "Main and subordinate clauses", type: "rearrange", title: "Order a complex sentence", prompt: "Arrange the words: the / Although / cancelled / was / continued / event / we", answer: "Although the event was cancelled, we continued.", explanation: "Although introduces the subordinate contrast clause, which is followed by a comma before the main clause.", tokens: ["continued.", "was", "Although", "we", "event", "cancelled,", "the"] },

  { topic: "Noun clauses", type: "mcq", title: "Identify the noun clause", prompt: "Which words act as the object of “wondered” in “We wondered whether the museum was open”?", answer: "whether the museum was open", explanation: "The whether-clause functions as the object of wondered, so it is a noun clause.", options: ["We wondered", "whether the museum was open", "the museum"] },
  { topic: "Noun clauses", type: "fill", title: "Complete an embedded question", prompt: "The committee has not decided ___ the field trip should be postponed.", answer: "whether", explanation: "Whether introduces an embedded yes-or-no question acting as the object of decided.", },
  { topic: "Noun clauses", type: "error", title: "Use statement order", prompt: "Correct this sentence: I do not know where is the nearest clinic.", answer: "I do not know where the nearest clinic is.", explanation: "An embedded question uses statement word order: subject before the verb.", },
  { topic: "Noun clauses", type: "transform", title: "Combine with a noun clause", prompt: "Combine the ideas using what: “The machine needs oil. This surprised the technician.”", answer: "What the machine needed surprised the technician.", explanation: "What the machine needed is a noun clause functioning as the subject of surprised.", },
  { topic: "Noun clauses", type: "rearrange", title: "Order an object noun clause", prompt: "Arrange the words: knows / nobody / why / the / changed / schedule", answer: "Nobody knows why the schedule changed.", explanation: "Why the schedule changed is an embedded noun clause after knows, so it keeps statement order.", tokens: ["changed.", "why", "Nobody", "schedule", "knows", "the"] },

  { topic: "Relative clauses", type: "mcq", title: "Choose the relative pronoun", prompt: "The architect ___ designed the bridge spoke to our class.", answer: "who", explanation: "Who refers to the person architect and introduces a defining relative clause.", options: ["who", "which", "where"] },
  { topic: "Relative clauses", type: "fill", title: "Complete a non-defining clause", prompt: "The old theatre, ___ was renovated last year, has reopened.", answer: "which", explanation: "Which refers to the non-human theatre in a non-defining clause set off by commas.", },
  { topic: "Relative clauses", type: "error", title: "Avoid a double relative marker", prompt: "Correct this sentence: The book which that won the prize is out of print.", answer: "The book that won the prize is out of print.", explanation: "A relative clause needs one relative marker, not both which and that together.", },
  { topic: "Relative clauses", type: "transform", title: "Join with a relative clause", prompt: "Combine using whose: “I met a dancer. Her costume was made by hand.”", answer: "I met a dancer whose costume was made by hand.", explanation: "Whose shows possession and links the costume to the dancer.", },
  { topic: "Relative clauses", type: "rearrange", title: "Order a defining relative clause", prompt: "Arrange the words: the / borrowed / I / book / recommended / you", answer: "I recommended the book you borrowed.", explanation: "You borrowed is a defining relative clause modifying the book; the relative pronoun may be omitted as object.", tokens: ["borrowed.", "book", "I", "you", "the", "recommended"] },

  { topic: "Adverb clauses", type: "mcq", title: "Choose the purpose clause", prompt: "Which sentence contains an adverb clause of purpose?", answer: "She saved the file so that nobody would lose the data.", explanation: "So that nobody would lose the data explains the purpose of saving the file.", options: ["She saved the file because it was old.", "She saved the file so that nobody would lose the data.", "She saved the file when the bell rang."] },
  { topic: "Adverb clauses", type: "fill", title: "Complete a concession clause", prompt: "___ the route was longer, the hikers chose it for its shade.", answer: "Although", explanation: "Although introduces a concession: the route was longer, but the hikers still chose it.", },
  { topic: "Adverb clauses", type: "error", title: "Use a clause after because", prompt: "Correct this sentence: We postponed the picnic because of it was raining.", answer: "We postponed the picnic because it was raining.", explanation: "Because is followed by a finite clause; because of would need a noun phrase such as the rain.", },
  { topic: "Adverb clauses", type: "transform", title: "Express a condition", prompt: "Join with unless: “You wear protective gloves. You cannot handle the chemical.”", answer: "Unless you wear protective gloves, you cannot handle the chemical.", explanation: "Unless means if not and introduces the condition required for safe handling.", },
  { topic: "Adverb clauses", type: "rearrange", title: "Order a time clause", prompt: "Arrange the words: after / we / had eaten / began / the / meeting", answer: "The meeting began after we had eaten.", explanation: "After introduces the earlier subordinate action, while the main clause states when the meeting began.", tokens: ["began", "after", "meeting.", "we", "had", "The", "eaten"] },

  { topic: "Sentence combining", type: "mcq", title: "Choose the best connector", prompt: "The road was flooded, ___ the buses used a different route.", answer: "so", explanation: "So correctly shows the result of the road being flooded.", options: ["but", "so", "although"] },
  { topic: "Sentence combining", type: "fill", title: "Combine with a relative clause", prompt: "Join the ideas: “The telescope is powerful. It belongs to our science club.” The telescope ___ belongs to our science club is powerful.", answer: "which", explanation: "Which introduces a relative clause describing the telescope.", },
  { topic: "Sentence combining", type: "error", title: "Remove a conjunction error", prompt: "Correct this sentence: Although the map was old, but it was accurate.", answer: "Although the map was old, it was accurate.", explanation: "Although already marks the contrast, so the extra but must be removed.", },
  { topic: "Sentence combining", type: "transform", title: "Combine with a participial phrase", prompt: "Combine the ideas: “The players were exhausted. They left the court.”", answer: "Exhausted after the match, the players left the court.", explanation: "The participial phrase gives the players’ condition and avoids repeating the subject.", },
  { topic: "Sentence combining", type: "rearrange", title: "Balance a compound sentence", prompt: "Arrange the words: and / The / revised / editor / the / published / article / it", answer: "The editor revised the article and published it.", explanation: "And joins two coordinated verb phrases with the shared subject the editor.", tokens: ["published", "The", "it.", "article", "and", "editor", "revised", "the"] },
];

const buildSecondaryPhrasesClausesQuestions = (): GrammarQuestion[] =>
  SECONDARY_PHRASES_CLAUSES_EXPANSION.map((activity, index) =>
    q(
      `secondary-phrases-clauses-${middleRemainingSlug(activity.topic)}-${index + 1}`,
      activity.type,
      `${activity.topic}: ${activity.title}`,
      activity.prompt,
      activity.answer,
      activity.explanation,
      { concept: "Phrases and clauses", topic: activity.topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs },
    ),
  );

type SecondaryAdditionalActivity = Omit<SecondaryPhraseClauseActivity, "topic">;

const SECONDARY_ADDITIONAL_TOPICS: { topic: string; activities: SecondaryAdditionalActivity[] }[] = [
  { topic: "Articles", activities: [
    { type: "mcq", title: "Article with an acronym", prompt: "The panel approved ___ UNESCO initiative after a long discussion.", answer: "the", explanation: "The initiative is a particular one already identified by the context, so it takes the definite article.", options: ["a", "an", "the"] },
    { type: "fill", title: "Article before a vowel sound", prompt: "The editor interviewed ___ experienced engineer about the bridge.", answer: "an", explanation: "Experienced begins with a vowel sound, so the indefinite article is an.", },
    { type: "error", title: "Correct a general plural", prompt: "Correct this sentence: The renewable sources can reduce pollution.", answer: "Renewable sources can reduce pollution.", explanation: "Plural nouns used generally do not need the definite article.", },
    { type: "transform", title: "Make the reference specific", prompt: "Rewrite with the: We discussed a proposal after lunch.", answer: "We discussed the proposal after lunch.", explanation: "The changes a newly introduced proposal into one that is now known to both speakers.", },
    { type: "rearrange", title: "Order an article contrast", prompt: "Arrange the words: an / unusual / was / It / experiment", answer: "It was an unusual experiment.", explanation: "An precedes the adjective unusual, which begins with a vowel sound, before the singular countable noun.", tokens: ["experiment.", "unusual", "was", "an", "It"] },
  ]},
  { topic: "Demonstratives", activities: [
    { type: "mcq", title: "Singular distance", prompt: "Pointing to one star far above the field, the guide said, “___ star is Vega.”", answer: "That", explanation: "That refers to one singular noun at a distance.", options: ["This", "That", "Those"] },
    { type: "fill", title: "Plural objects nearby", prompt: "___ samples beside me must be labelled before the lesson ends.", answer: "These", explanation: "These refers to more than one nearby sample.", },
    { type: "error", title: "Match number and demonstrative", prompt: "Correct this sentence: This results contradict the earlier survey.", answer: "These results contradict the earlier survey.", explanation: "The plural noun results requires the plural demonstrative these.", },
    { type: "transform", title: "Change singular to plural", prompt: "Rewrite for several nearby observations: This observation is important.", answer: "These observations are important.", explanation: "This observation becomes these observations, and the verb changes from is to are.", },
    { type: "rearrange", title: "Order a demonstrative statement", prompt: "Arrange the words: those / explain / results / the / variation", answer: "Those results explain the variation.", explanation: "The plural demonstrative those comes directly before the plural noun results.", tokens: ["variation.", "results", "Those", "the", "explain"] },
  ]},
  { topic: "Quantifiers", activities: [
    { type: "mcq", title: "Many with count nouns", prompt: "How ___ pages of the report have you checked?", answer: "many", explanation: "Pages is a plural countable noun, so the question uses many.", options: ["much", "many", "little"] },
    { type: "fill", title: "Enough for a requirement", prompt: "The evidence is not ___ to support the claim.", answer: "strong enough", explanation: "Enough follows the adjective strong to express the required degree.", },
    { type: "error", title: "Correct less and fewer", prompt: "Correct this sentence: The new design uses less components.", answer: "The new design uses fewer components.", explanation: "Components is a plural countable noun, so fewer is the precise quantifier.", },
    { type: "transform", title: "Reduce an amount", prompt: "Rewrite using little: The container contains a small amount of oil.", answer: "The container contains little oil.", explanation: "Little modifies the uncountable noun oil and presents the amount as small or insufficient.", },
    { type: "rearrange", title: "Order a quantifier question", prompt: "Arrange the words: evidence / how / remains / much / reliable /?", answer: "How much reliable evidence remains?", explanation: "How much modifies the uncountable noun evidence in a question about quantity.", tokens: ["reliable", "remains?", "much", "How", "evidence"] },
  ]},
  { topic: "Distributives", activities: [
    { type: "mcq", title: "Each takes singular agreement", prompt: "Each of the two witnesses ___ a separate statement.", answer: "gave", explanation: "Each focuses on members individually and takes a singular verb form.", options: ["gave", "give", "giving"] },
    { type: "fill", title: "Both for a pair", prompt: "___ answers were accepted because they expressed the same idea.", answer: "Both", explanation: "Both refers to the two answers together and takes a plural noun.", },
    { type: "error", title: "Correct either agreement", prompt: "Correct this sentence: Either of the routes lead to the station.", answer: "Either of the routes leads to the station.", explanation: "Either is singular in formal agreement, so the verb is leads.", },
    { type: "transform", title: "Distribute an action", prompt: "Rewrite with each: The three panels displayed a different colour.", answer: "Each panel displayed a different colour.", explanation: "Each makes the members individual and changes the plural noun phrase to singular.", },
    { type: "rearrange", title: "Order a distributive phrase", prompt: "Arrange the words: received / Each / participant / a / numbered / badge", answer: "Each participant received a numbered badge.", explanation: "Each precedes a singular countable noun and the sentence then takes singular participant.", tokens: ["badge.", "a", "received", "participant", "Each", "numbered"] },
  ]},
  { topic: "Indefinite determiners", activities: [
    { type: "mcq", title: "Any in a question", prompt: "Did you notice ___ unusual pattern in the data?", answer: "any", explanation: "Any is natural in a question asking whether one or more examples exist.", options: ["any", "every", "each"] },
    { type: "fill", title: "Every with singular nouns", prompt: "___ applicant must sign the declaration before the interview.", answer: "Every", explanation: "Every refers to all members individually and takes a singular countable noun.", },
    { type: "error", title: "Correct some and any", prompt: "Correct this sentence: We did not collect some useful responses.", answer: "We did not collect any useful responses.", explanation: "Any is normally used instead of some in a negative statement.", },
    { type: "transform", title: "Generalise with every", prompt: "Rewrite using every: All the individual page contains a reference.", answer: "Every page contains a reference.", explanation: "Every replaces the awkward all the individual and is followed by singular page.", },
    { type: "rearrange", title: "Order an indefinite phrase", prompt: "Arrange the words: solution / any / acceptable / is / better / than / none", answer: "Any acceptable solution is better than none.", explanation: "Any introduces one unspecified member of the group of acceptable solutions.", tokens: ["better", "acceptable", "none.", "Any", "is", "solution", "than"] },
  ]},
  { topic: "Noun phrases", activities: [
    { type: "mcq", title: "Head of a noun phrase", prompt: "In “Several extremely bright satellites crossed the sky,” what is the head noun?", answer: "satellites", explanation: "Satellites is the central noun; several and extremely bright modify it.", options: ["Several", "bright", "satellites"] },
    { type: "fill", title: "Add a determiner", prompt: "Complete the noun phrase: ___ series of careful measurements revealed a pattern.", answer: "A", explanation: "A introduces the singular countable noun phrase series of careful measurements.", },
    { type: "error", title: "Order postmodifiers", prompt: "Correct this sentence: We examined the samples collected carefully yesterday.", answer: "We examined the samples carefully collected yesterday.", explanation: "Carefully modifies collected and should sit next to the participle it modifies.", },
    { type: "transform", title: "Nominalise a clause", prompt: "Replace the clause with a noun phrase: The committee decided to postpone the vote.", answer: "The committee made a decision to postpone the vote.", explanation: "Made a decision is a noun phrase built around decision and preserves the meaning.", },
    { type: "rearrange", title: "Order a noun phrase", prompt: "Arrange the words: several / from / rare / the / archive / manuscripts", answer: "several rare manuscripts from the archive", explanation: "The quantifier and adjective precede the head noun; the prepositional phrase follows it.", tokens: ["archive", "rare", "manuscripts", "several", "from", "the"] },
  ]},
  { topic: "Verb phrases", activities: [
    { type: "mcq", title: "Modal perfect phrase", prompt: "Which verb phrase shows a past possibility? “The parcel ___ before noon.”", answer: "may have arrived", explanation: "May have arrived combines a modal with the perfect infinitive to express past possibility.", options: ["may arrive", "may have arrived", "is arriving"] },
    { type: "fill", title: "Passive verb phrase", prompt: "The final draft ___ (review) by two editors.", answer: "was reviewed", explanation: "Was reviewed is the past simple passive verb phrase for a singular draft.", },
    { type: "error", title: "Correct the auxiliary sequence", prompt: "Correct this sentence: The students have been wrote three drafts.", answer: "The students have written three drafts.", explanation: "Present perfect uses have plus the past participle written; been is not needed here.", },
    { type: "transform", title: "Make a verb phrase interrogative", prompt: "Change to a question: The team could have misread the graph.", answer: "Could the team have misread the graph?", explanation: "Move the modal could before the subject while keeping the perfect phrase intact.", },
    { type: "rearrange", title: "Order a progressive phrase", prompt: "Arrange the words: been / will / the / monitoring / have / sensors / continuously", answer: "The sensors will have been monitoring continuously.", explanation: "Future perfect continuous uses will have been followed by the -ing main verb.", tokens: ["continuously.", "sensors", "have", "monitoring", "The", "will", "been"] },
  ]},
  { topic: "Adjective phrases", activities: [
    { type: "mcq", title: "Adjective phrase complement", prompt: "Which phrase completes the adjective “responsible” in “The captain was responsible ___ the equipment”?", answer: "for the equipment", explanation: "Responsible takes the preposition for and its noun phrase complement.", options: ["for the equipment", "the equipment responsibly", "to equip"] },
    { type: "fill", title: "Degree phrase", prompt: "The revised explanation was clear ___ for younger readers.", answer: "enough", explanation: "Enough follows clear to express a sufficient degree.", },
    { type: "error", title: "Correct adjective order", prompt: "Correct this sentence: The solution was effective surprisingly.", answer: "The solution was surprisingly effective.", explanation: "The adverb surprisingly normally precedes the adjective effective.", },
    { type: "transform", title: "Expand with a complement", prompt: "Add a complement to make an adjective phrase: The result was uncertain.", answer: "The result was uncertain because the sample was contaminated.", explanation: "The because-clause completes uncertain by giving the reason for the uncertainty.", },
    { type: "rearrange", title: "Order a degree phrase", prompt: "Arrange the words: too / for / difficult / beginners / was / The / problem", answer: "The problem was too difficult for beginners.", explanation: "Too precedes the adjective difficult, followed by its for-complement.", tokens: ["beginners.", "too", "The", "difficult", "was", "problem", "for"] },
  ]},
  { topic: "Adverb phrases", activities: [
    { type: "mcq", title: "Adverb phrase of place", prompt: "Which phrase tells where the cyclists rested?", answer: "beside the fountain", explanation: "Beside the fountain is a prepositional adverb phrase modifying rested.", options: ["The cyclists", "rested briefly", "beside the fountain"] },
    { type: "fill", title: "Adverb phrase of manner", prompt: "The speaker answered the challenge ___ .", answer: "with calm confidence", explanation: "With calm confidence is a phrase of manner describing how the speaker answered.", },
    { type: "error", title: "Correct phrase structure", prompt: "Correct this sentence: The archive opens in weekdays.", answer: "The archive opens on weekdays.", explanation: "On weekdays is the conventional prepositional phrase for repeated days.", },
    { type: "transform", title: "Replace a manner adverb", prompt: "Replace carefully with an adverb phrase: The nurse labelled the samples carefully.", answer: "The nurse labelled the samples with great care.", explanation: "With great care is an adverb phrase expressing the same manner as carefully.", },
    { type: "rearrange", title: "Order an adverb phrase", prompt: "Arrange the words: during / worked / the / We / quietly / afternoon", answer: "We worked quietly during the afternoon.", explanation: "Quietly gives manner and during the afternoon gives the time of the work.", tokens: ["afternoon.", "quietly", "We", "during", "worked", "the"] },
  ]},
  { topic: "Main and subordinate clauses", activities: [
    { type: "mcq", title: "Find the independent clause", prompt: "Which clause can stand alone in “Because the road flooded, the match was cancelled”?", answer: "the match was cancelled", explanation: "The clause has a complete subject–verb meaning without the subordinating conjunction.", options: ["Because the road flooded", "the match was cancelled", "Because the match"] },
    { type: "fill", title: "Complete a main clause", prompt: "Although the forecast was poor, the organisers ___ the event.", answer: "continued", explanation: "The main clause needs a finite verb that completes the contrast introduced by although.", },
    { type: "error", title: "Join a subordinate clause", prompt: "Correct this fragment: Since the battery was flat.", answer: "Since the battery was flat, the torch could not work.", explanation: "Since introduces a subordinate clause that needs a main clause.", },
    { type: "transform", title: "Move the subordinate clause", prompt: "Begin with the main clause: When the bell rang, the pupils left the room.", answer: "The pupils left the room when the bell rang.", explanation: "Moving the subordinate clause to the end removes the opening comma while preserving the time relation.", },
    { type: "rearrange", title: "Order main and subordinate clauses", prompt: "Arrange the words: because / missed / We / the / bus / hurried", answer: "We hurried because we missed the bus.", explanation: "The main clause comes first, followed by the because-clause explaining its reason.", tokens: ["hurried.", "because", "bus", "We", "missed", "the", "we"] },
  ]},
  { topic: "Noun clauses", activities: [
    { type: "mcq", title: "Noun clause as subject", prompt: "Which words are the subject in “What the witness observed surprised the jury”?", answer: "What the witness observed", explanation: "The what-clause functions as a noun phrase and is the subject of surprised.", options: ["the witness", "What the witness observed", "the jury"] },
    { type: "fill", title: "Embedded yes-no question", prompt: "The researcher asked ___ the sample had been stored correctly.", answer: "whether", explanation: "Whether introduces an embedded yes-no question functioning as the object of asked.", },
    { type: "error", title: "Correct an embedded question", prompt: "Correct this sentence: Nobody knows what does the symbol mean.", answer: "Nobody knows what the symbol means.", explanation: "Noun clauses use statement order, with the subject before the verb.", },
    { type: "transform", title: "Nominalise an explanation", prompt: "Combine using why: The engine stopped. This remains unclear.", answer: "Why the engine stopped remains unclear.", explanation: "Why the engine stopped is a noun clause functioning as the subject.", },
    { type: "rearrange", title: "Order a noun clause", prompt: "Arrange the words: explained / how / the / works / guide / the / device", answer: "The guide explained how the device works.", explanation: "How the device works is the object noun clause after explained and keeps statement order.", tokens: ["device", "explained", "works.", "The", "how", "guide", "the"] },
  ]},
  { topic: "Relative clauses", activities: [
    { type: "mcq", title: "Relative adverb", prompt: "The year ___ the observatory opened was unusually dry.", answer: "when", explanation: "When refers to a time and introduces a relative clause modifying year.", options: ["when", "who", "whose"] },
    { type: "fill", title: "Possessive relative", prompt: "The artist ___ mural won the prize visited our school.", answer: "whose", explanation: "Whose expresses possession: the mural belongs to the artist.", },
    { type: "error", title: "Correct a relative pronoun", prompt: "Correct this sentence: The laboratory where we visited was closed.", answer: "The laboratory that we visited was closed.", explanation: "Where refers to a place adverbially; the object of visited needs that or which.", },
    { type: "transform", title: "Make a non-defining clause", prompt: "Join with which: The bridge reopened in May. It had been closed for repairs.", answer: "The bridge, which had been closed for repairs, reopened in May.", explanation: "Commas mark the extra, non-defining information about the bridge.", },
    { type: "rearrange", title: "Order a relative clause", prompt: "Arrange the words: the / solved / puzzle / I / was / difficult", answer: "The puzzle I solved was difficult.", explanation: "I solved is a defining relative clause modifying puzzle; the object relative pronoun is omitted.", tokens: ["difficult.", "solved", "The", "was", "I", "puzzle"] },
  ]},
  { topic: "Adverb clauses", activities: [
    { type: "mcq", title: "Adverb clause of reason", prompt: "Which sentence contains a reason clause?", answer: "We stayed indoors because the air quality was poor.", explanation: "Because the air quality was poor explains why we stayed indoors.", options: ["We stayed indoors when the bell rang.", "We stayed indoors because the air quality was poor.", "We stayed indoors so that we could read."] },
    { type: "fill", title: "Purpose clause", prompt: "The team repeated the test so that it ___ verify the result.", answer: "could", explanation: "Could expresses the purpose in a past context after so that.", },
    { type: "error", title: "Correct a conditional clause", prompt: "Correct this sentence: If the alarm will ring, leave the building.", answer: "If the alarm rings, leave the building.", explanation: "A first conditional uses the present simple in the if-clause, not will.", },
    { type: "transform", title: "Join with although", prompt: "Combine: The evidence was limited. The conclusion was reliable.", answer: "Although the evidence was limited, the conclusion was reliable.", explanation: "Although introduces the contrast between limited evidence and a reliable conclusion.", },
    { type: "rearrange", title: "Order an adverb clause", prompt: "Arrange the words: before / checked / we / left / the / map / carefully", answer: "We checked the map carefully before we left.", explanation: "Before introduces the subordinate time clause after the completed main action.", tokens: ["left.", "the", "before", "We", "carefully", "map", "we", "checked"] },
  ]},
  { topic: "Sentence combining", activities: [
    { type: "mcq", title: "Combine with contrast", prompt: "Choose the best combination: The route was longer. It was safer.", answer: "Although the route was longer, it was safer.", explanation: "Although clearly signals the contrast between length and safety.", options: ["Because the route was longer, it was safer.", "Although the route was longer, it was safer.", "The route was longer so it was safer."] },
    { type: "fill", title: "Combine with a result", prompt: "The river rose quickly, ___ the residents moved to higher ground.", answer: "so", explanation: "So joins the first event to its result.", },
    { type: "error", title: "Repair a run-on", prompt: "Correct this sentence: The bell rang the pupils left the hall.", answer: "The bell rang, so the pupils left the hall.", explanation: "A connector and comma are needed to join the two independent clauses clearly.", },
    { type: "transform", title: "Combine with a noun clause", prompt: "Combine using that: The report confirmed it. The bridge was safe.", answer: "The report confirmed that the bridge was safe.", explanation: "That introduces the content clause functioning as the object of confirmed.", },
    { type: "rearrange", title: "Order a complex combination", prompt: "Arrange the words: who / won / The / student / thanked / was / her / team", answer: "The student who won was thanked by her team.", explanation: "Who won modifies student, and the complete sentence uses the passive was thanked.", tokens: ["team.", "who", "her", "student", "won", "The", "was", "thanked", "by"] },
  ]},
  { topic: "Infinitives", activities: [
    { type: "mcq", title: "Infinitive of purpose", prompt: "The class visited the museum ___ about local history.", answer: "to learn", explanation: "To learn is an infinitive expressing the purpose of the visit.", options: ["learning", "to learn", "learned"] },
    { type: "fill", title: "Bare infinitive after a modal", prompt: "The volunteers must ___ the equipment before leaving.", answer: "check", explanation: "A modal such as must is followed by the bare base form check.", },
    { type: "error", title: "Correct an infinitive complement", prompt: "Correct this sentence: The witness agreed telling the truth.", answer: "The witness agreed to tell the truth.", explanation: "Agree is followed by a to-infinitive, not an -ing form.", },
    { type: "transform", title: "Express a result with too", prompt: "Combine using too...to: The box was very heavy. I could not lift it.", answer: "The box was too heavy for me to lift.", explanation: "Too heavy for me to lift expresses that the weight prevented the action.", },
    { type: "rearrange", title: "Order an infinitive phrase", prompt: "Arrange the words: hopes / to / The / finish / team / early", answer: "The team hopes to finish early.", explanation: "Hopes takes a to-infinitive, which expresses the team’s aim.", tokens: ["early.", "to", "team", "finish", "The", "hopes"] },
  ]},
  { topic: "Gerunds", activities: [
    { type: "mcq", title: "Gerund after a preposition", prompt: "The students succeeded by ___ the evidence carefully.", answer: "analysing", explanation: "A gerund follows the preposition by and names the method of succeeding.", options: ["analyse", "analysing", "to analyse"] },
    { type: "fill", title: "Gerund as object", prompt: "Our coach recommended ___ before the race.", answer: "stretching", explanation: "Recommend is followed by an -ing form when the activity is its object.", },
    { type: "error", title: "Correct a gerund subject", prompt: "Correct this sentence: Collecting old maps help historians.", answer: "Collecting old maps helps historians.", explanation: "The gerund phrase is singular as the subject, so the verb must be helps.", },
    { type: "transform", title: "Replace an infinitive subject", prompt: "Rewrite with a gerund: To recycle saves useful materials.", answer: "Recycling saves useful materials.", explanation: "The gerund recycling functions as the subject and keeps the original meaning.", },
    { type: "rearrange", title: "Order a gerund phrase", prompt: "Arrange the words: enjoys / analysing / She / historical / maps", answer: "She enjoys analysing historical maps.", explanation: "Enjoy is followed by a gerund phrase functioning as its object.", tokens: ["historical", "enjoys", "maps.", "analysing", "She"] },
  ]},
  { topic: "Participles", activities: [
    { type: "mcq", title: "Past participle adjective", prompt: "The ___ window needs replacing after the storm.", answer: "broken", explanation: "Broken is a past participle functioning as an adjective describing window.", options: ["breaking", "broken", "break"] },
    { type: "fill", title: "Present participle modifier", prompt: "The ___ lecture kept the audience interested.", answer: "engaging", explanation: "Engaging is a present participle describing the lecture’s effect.", },
    { type: "error", title: "Correct a dangling participle", prompt: "Correct this sentence: Walking through the gallery, the paintings impressed Mira.", answer: "Walking through the gallery, Mira admired the paintings.", explanation: "The opening participial phrase must describe Mira, not the paintings.", },
    { type: "transform", title: "Reduce a relative clause", prompt: "Reduce the clause: The documents that were signed yesterday are confidential.", answer: "The documents signed yesterday are confidential.", explanation: "The passive relative clause can be reduced to the past-participial phrase signed yesterday.", },
    { type: "rearrange", title: "Order a participial phrase", prompt: "Arrange the words: covered / The / path / fallen / leaves / was / with", answer: "The path was covered with fallen leaves.", explanation: "Fallen is a past participle modifying leaves inside the prepositional phrase.", tokens: ["leaves.", "covered", "with", "The", "fallen", "was", "path"] },
  ]},
  { topic: "Perfect and passive non-finite forms", activities: [
    { type: "mcq", title: "Perfect infinitive", prompt: "She claims ___ the instructions before the test began.", answer: "to have read", explanation: "To have read is a perfect infinitive showing an earlier completed action.", options: ["to read", "to have read", "reading"] },
    { type: "fill", title: "Passive infinitive", prompt: "The design is expected ___ (approve) next week.", answer: "to be approved", explanation: "The passive infinitive uses to be plus the past participle approved.", },
    { type: "error", title: "Correct a perfect gerund", prompt: "Correct this sentence: He apologised for to have missed the meeting.", answer: "He apologised for having missed the meeting.", explanation: "After the preposition for, use the perfect gerund having missed.", },
    { type: "transform", title: "Use a passive perfect form", prompt: "Rewrite formally with having been: The committee had reviewed the plan, so the plan was approved.", answer: "Having been reviewed by the committee, the plan was approved.", explanation: "Having been reviewed is a passive perfect participial clause showing that the plan received the earlier action.", },
    { type: "rearrange", title: "Order a passive non-finite phrase", prompt: "Arrange the words: to / ready / be / The / report / published / is", answer: "The report is ready to be published.", explanation: "To be published is a passive infinitive because the report receives the action.", tokens: ["published.", "ready", "The", "to", "is", "report", "be"] },
  ]},
];

const buildSecondaryAdditionalQuestions = (): GrammarQuestion[] =>
  SECONDARY_ADDITIONAL_TOPICS.flatMap(({ topic, activities }) =>
    activities.map((activity, index) =>
      q(
        `secondary-additional-${middleRemainingSlug(topic)}-${index + 1}`,
        activity.type,
        `${topic}: ${activity.title}`,
        activity.prompt,
        activity.answer,
        activity.explanation,
        { concept: ["Articles", "Demonstratives", "Quantifiers", "Distributives", "Indefinite determiners"].includes(topic) ? "Determiners" : ["Infinitives", "Gerunds", "Participles", "Perfect and passive non-finite forms"].includes(topic) ? "Non-finite verbs" : "Phrases and clauses", topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs },
      )
    )
  );

GRAMMAR_LEVELS.find((level) => level.id === "middle")?.questions.push(...buildMiddleRemainingQuestions());
GRAMMAR_LEVELS.find((level) => level.id === "secondary")?.questions.push(...buildSecondaryPhrasesClausesQuestions(), ...buildSecondaryAdditionalQuestions());

export const GRAMMAR_TOTAL = GRAMMAR_LEVELS.reduce((sum, level) => sum + level.questions.length, 0);

export const grammarKey = (levelId: string, questionId: string) => `grammar:${levelId}:${questionId}`;

export const grammarDone = (checks: Record<string, boolean>) =>
  Object.keys(checks).filter((key) => key.startsWith("grammar:") && checks[key]).length;

export interface GrammarTopicNode {
  topic: string;
  questionIds: string[];
  activities: GrammarExerciseType[];
}

export interface GrammarConceptNode {
  concept: string;
  topics: GrammarTopicNode[];
}

export interface GrammarCurriculumNode {
  levelId: string;
  concepts: GrammarConceptNode[];
}

/** Dynamic level → concept → topic → activity navigation data for future browsing UI. */
export const GRAMMAR_CURRICULUM: GrammarCurriculumNode[] = GRAMMAR_LEVELS.map((level) => ({
  levelId: level.id,
  concepts: Array.from(new Set(level.questions.map((question) => question.concept))).map((concept) => ({
    concept,
    topics: Array.from(new Set(level.questions.filter((question) => question.concept === concept).map((question) => question.topic))).map((topic) => {
      const questions = level.questions.filter((question) => question.concept === concept && question.topic === topic);
      return {
        topic,
        questionIds: questions.map((question) => question.id),
        activities: Array.from(new Set(questions.map((question) => question.type))),
      };
    }),
  })),
}));
