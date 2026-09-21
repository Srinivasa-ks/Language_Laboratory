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

type SecondaryExpansionActivity = {
  type: GrammarExerciseType;
  title: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  tokens?: string[];
  pairs?: { left: string; right: string }[];
};

type SecondaryExpansionSpec = {
  topic: string;
  concept: string;
  activities: SecondaryExpansionActivity[];
};

const SECONDARY_FIGURES_OF_SPEECH_SPECS: SecondaryExpansionSpec[] = [
  { concept: "Figures of Speech", topic: "Simile", activities: [
    { type: "mcq", title: "Recognise a simile", prompt: "Which sentence makes an explicit comparison using like or as?", answer: "The moon hung like a silver lantern.", explanation: "Like directly compares the moon with a silver lantern, making this a simile.", options: ["The moon lit the courtyard.", "The moon hung like a silver lantern.", "The moon was bright tonight."] },
    { type: "identify", title: "Find the compared images", prompt: "In “Her patience was as steady as a lighthouse beam,” identify the two things compared.", answer: "Her patience and a lighthouse beam", explanation: "The phrase as steady as links patience to the steady beam of a lighthouse.", options: ["her patience and a lighthouse beam", "her patience and the sea", "a beam and a harbour"] },
    { type: "fill", title: "Complete a vivid simile", prompt: "The old gate creaked ___ a tired violin.", answer: "like", explanation: "Like introduces the comparison between the gate's sound and a tired violin.", },
    { type: "transform", title: "Create a simile", prompt: "Rewrite vividly using as...as: The river was very calm.", answer: "The river was as calm as a sheet of glass.", explanation: "The comparison with a sheet of glass turns the plain description into a simile.", },
    { type: "matching", title: "Match similes to effects", prompt: "Match each simile with the quality it suggests.", answer: "as quick as a sparrow=swift|like a furnace=very hot|as quiet as snowfall=silent", explanation: "Each image supplies a clear quality: speed, heat or silence.", pairs: [{ left: "as quick as a sparrow", right: "swift" }, { left: "like a furnace", right: "very hot" }, { left: "as quiet as snowfall", right: "silent" }] },
  ] },
  { concept: "Figures of Speech", topic: "Metaphor", activities: [
    { type: "mcq", title: "Recognise a metaphor", prompt: "Which sentence presents one thing as another without like or as?", answer: "The classroom was a furnace by noon.", explanation: "The classroom is directly called a furnace to suggest overwhelming heat.", options: ["The classroom was hot.", "The classroom was like a furnace.", "The classroom was a furnace by noon."] },
    { type: "identify", title: "Interpret a metaphor", prompt: "In “A flood of memories returned,” what does flood suggest?", answer: "Many memories arriving suddenly and forcefully", explanation: "Flood transfers the force and abundance of rushing water to the speaker's memories.", options: ["Memories caused a real flood", "Many memories arriving suddenly and forcefully", "The memories were about rain"] },
    { type: "fill", title: "Complete a metaphor", prompt: "After the debate, her argument was a sharp ___ that exposed the weakness.", answer: "sword", explanation: "Sword metaphorically presents the argument as powerful and cutting.", },
    { type: "transform", title: "Turn description into metaphor", prompt: "Rewrite as a metaphor: The city was busy and noisy at dawn.", answer: "At dawn, the city was a restless drum.", explanation: "A restless drum conveys the city's constant movement and noise in one image.", },
    { type: "matching", title: "Match metaphors to meanings", prompt: "Match each metaphor with its intended meaning.", answer: "the backbone of the team=main support|a curtain of rain=heavy falling rain|her words were ice=emotionally cold words", explanation: "Metaphors invite readers to transfer a concrete image to an abstract quality.", pairs: [{ left: "the backbone of the team", right: "main support" }, { left: "a curtain of rain", right: "heavy falling rain" }, { left: "her words were ice", right: "emotionally cold words" }] },
  ] },
  { concept: "Figures of Speech", topic: "Personification", activities: [
    { type: "mcq", title: "Spot personification", prompt: "Which sentence gives a human action to something non-human?", answer: "The shy wind tiptoed through the reeds.", explanation: "Tiptoeing and shyness are human qualities attributed to the wind.", options: ["The wind moved through the reeds.", "The shy wind tiptoed through the reeds.", "The reeds bent in the wind."] },
    { type: "identify", title: "Identify the human quality", prompt: "In “The ancient stairs groaned beneath our feet,” what human quality is given to the stairs?", answer: "The ability to groan in discomfort", explanation: "Groaning is a human or animal expression of pain, used to make the stairs seem alive.", options: ["The ability to grow", "The ability to groan in discomfort", "The ability to climb"] },
    { type: "fill", title: "Complete personification", prompt: "The jealous clouds ___ the sun from the village.", answer: "hid", explanation: "Jealous clouds that hide the sun are imagined as having human motives and actions.", },
    { type: "transform", title: "Personify nature", prompt: "Rewrite with personification: The leaves fell across the path.", answer: "The leaves danced across the path.", explanation: "Danced gives the falling leaves a lively human action and creates movement.", },
    { type: "matching", title: "Match personification effects", prompt: "Match each image to the feeling it creates.", answer: "the moon watched us=comforting presence|the angry sea=threatening storm|the flowers nodded gently=peaceful breeze", explanation: "Human actions make natural scenes feel watchful, threatening or calm.", pairs: [{ left: "the moon watched us", right: "comforting presence" }, { left: "the angry sea", right: "threatening storm" }, { left: "the flowers nodded gently", right: "peaceful breeze" }] },
  ] },
  { concept: "Figures of Speech", topic: "Alliteration", activities: [
    { type: "mcq", title: "Recognise alliteration", prompt: "Which phrase repeats an initial consonant sound?", answer: "silver streams softly singing", explanation: "The repeated s sound at the beginnings of the words creates alliteration.", options: ["bright and beautiful", "silver streams softly singing", "a stream in the valley"] },
    { type: "identify", title: "Find the repeated sound", prompt: "In “Wild winds whipped the window,” which sound is repeated?", answer: "w", explanation: "Wild, winds, whipped and window begin with the consonant sound w.", options: ["d", "w", "t"] },
    { type: "fill", title: "Complete an alliterative line", prompt: "The ___ moon made the marsh mysterious.", answer: "misty", explanation: "Misty moon repeats the initial m sound and suits the mysterious atmosphere.", },
    { type: "transform", title: "Add alliteration", prompt: "Rewrite poetically with repeated initial sounds: The small boat crossed the blue bay.", answer: "The small sailboat slipped across the blue bay.", explanation: "Small, sailboat and slipped repeat s, while blue bay adds a second soft sound pattern.", },
    { type: "matching", title: "Match alliteration to purpose", prompt: "Match each alliterative phrase with its likely effect.", answer: "busy bees buzzing=cheerful activity|dark, distant drums=ominous tension|crisp, clean corners=careful neatness", explanation: "Repeated sounds can reinforce mood and make a phrase memorable.", pairs: [{ left: "busy bees buzzing", right: "cheerful activity" }, { left: "dark, distant drums", right: "ominous tension" }, { left: "crisp, clean corners", right: "careful neatness" }] },
  ] },
  { concept: "Figures of Speech", topic: "Onomatopoeia", activities: [
    { type: "mcq", title: "Recognise onomatopoeia", prompt: "Which word imitates the sound it describes?", answer: "The saucepan hissed on the stove.", explanation: "Hissed echoes the sharp sound made by steam or hot liquid.", options: ["The saucepan rested on the stove.", "The saucepan hissed on the stove.", "The saucepan was very hot."] },
    { type: "identify", title: "Interpret a sound word", prompt: "In “The shutters banged in the storm,” what does banged contribute?", answer: "A loud, abrupt sound", explanation: "Banged imitates and emphasises the sudden noise of the shutters.", options: ["A soft colour", "A loud, abrupt sound", "A slow movement"] },
    { type: "fill", title: "Complete a sound image", prompt: "The little stream went ___ over the stones.", answer: "babble", explanation: "Babble imitates the lively, continuous sound of running water.", },
    { type: "transform", title: "Add onomatopoeia", prompt: "Rewrite with a sound word: The old door closed loudly.", answer: "The old door slammed shut.", explanation: "Slammed gives the closing action a forceful, recognisable sound.", },
    { type: "matching", title: "Match sound words", prompt: "Match each onomatopoeic word to its source.", answer: "buzz=bee|clang=metal|drip=water", explanation: "These words echo characteristic sounds made by insects, metal and drops of water.", pairs: [{ left: "buzz", right: "bee" }, { left: "clang", right: "metal" }, { left: "drip", right: "water" }] },
  ] },
  { concept: "Figures of Speech", topic: "Hyperbole", activities: [
    { type: "mcq", title: "Recognise hyperbole", prompt: "Which sentence deliberately exaggerates for emphasis?", answer: "I have a mountain of homework tonight.", explanation: "A mountain of homework is an impossible exaggeration that stresses the amount.", options: ["I have three assignments tonight.", "I have a mountain of homework tonight.", "I will finish my homework tonight."] },
    { type: "identify", title: "Interpret exaggeration", prompt: "In “The queue stretched to the edge of the universe,” what is implied?", answer: "The queue felt extremely long", explanation: "The universe is used impossibly to intensify the speaker's frustration with the queue.", options: ["The queue left Earth", "The queue felt extremely long", "The queue was carefully measured"] },
    { type: "fill", title: "Complete a hyperbole", prompt: "That tiny backpack weighs a ___!", answer: "ton", explanation: "Calling a light backpack a ton exaggerates its weight for humorous emphasis.", },
    { type: "transform", title: "Strengthen a plain statement", prompt: "Rewrite with hyperbole: The runner was very tired after the race.", answer: "After the race, the runner was so tired he could sleep for a century.", explanation: "A century of sleep is an impossible duration that highlights extreme tiredness.", },
    { type: "matching", title: "Match hyperboles to meanings", prompt: "Match each exaggeration with its intended meaning.", answer: "I am drowning in paperwork=I have too much paperwork|she cried an ocean=her tears were plentiful|this bag weighs a planet=the bag feels extremely heavy", explanation: "Hyperbole is not literal; it magnifies a real feeling or condition.", pairs: [{ left: "I am drowning in paperwork", right: "I have too much paperwork" }, { left: "she cried an ocean", right: "her tears were plentiful" }, { left: "this bag weighs a planet", right: "the bag feels extremely heavy" }] },
  ] },
  { concept: "Figures of Speech", topic: "Oxymoron", activities: [
    { type: "mcq", title: "Recognise an oxymoron", prompt: "Which phrase combines apparently contradictory words?", answer: "deafening silence", explanation: "Deafening and silence conflict literally, but together they suggest an overwhelming quiet.", options: ["quiet library", "deafening silence", "silent reading"] },
    { type: "identify", title: "Interpret an oxymoron", prompt: "What does “bittersweet victory” suggest?", answer: "A success mixed with sadness or loss", explanation: "Bitter and sweet combine to show that the victory brings both pleasure and pain.", options: ["A victory involving sweets", "A success mixed with sadness or loss", "A victory that was easy"] },
    { type: "fill", title: "Complete a contrasting phrase", prompt: "The abandoned station held a strange ___ calm.", answer: "restless", explanation: "Restless calm combines unease with stillness to create an oxymoron.", },
    { type: "transform", title: "Create an oxymoron", prompt: "Rewrite to show a noisy crowd that suddenly feels quiet: The crowd was silent.", answer: "The crowd fell into a noisy silence.", explanation: "Noisy silence captures the tension of a crowd that is quiet but still full of suppressed sound.", },
    { type: "matching", title: "Match oxymorons to meanings", prompt: "Match each oxymoron with its likely meaning.", answer: "open secret=widely known secret|living death=joyless existence|seriously funny=humorous but important", explanation: "The contradiction makes a nuanced meaning more vivid than a plain description.", pairs: [{ left: "open secret", right: "widely known secret" }, { left: "living death", right: "joyless existence" }, { left: "seriously funny", right: "humorous but important" }] },
  ] },
  { concept: "Figures of Speech", topic: "Irony", activities: [
    { type: "mcq", title: "Recognise situational irony", prompt: "Which event is ironic?", answer: "A fire station burns down.", explanation: "A place devoted to preventing fires suffering a fire creates an unexpected reversal.", options: ["A fire station answers an alarm.", "A fire station burns down.", "A firefighter checks a hose."] },
    { type: "identify", title: "Interpret spoken irony", prompt: "After missing the bus, Ravi says, “Perfect timing!” What does he really mean?", answer: "The timing was very poor", explanation: "The praise contradicts the situation, signalling criticism rather than genuine approval.", options: ["The timing was excellent", "The timing was very poor", "He arrived early"] },
    { type: "fill", title: "Complete an ironic response", prompt: "When the power failed during the electricity lecture, the teacher said, “How ___.”", answer: "convenient", explanation: "Convenient is deliberately opposite to the inconvenient event, creating verbal irony.", },
    { type: "transform", title: "Write verbal irony", prompt: "Write an ironic two-word response to a disastrously messy desk.", answer: "Immaculately organised.", explanation: "The overly positive description clearly conflicts with the messy desk and therefore becomes ironic.", },
    { type: "matching", title: "Match irony to meaning", prompt: "Match each ironic comment with what it really conveys.", answer: "What a lovely storm=the storm is unpleasant|A genius move=the move was foolish|Just what I needed=the event is unwelcome", explanation: "Irony depends on readers recognising the gap between words and intended meaning.", pairs: [{ left: "What a lovely storm", right: "the storm is unpleasant" }, { left: "A genius move", right: "the move was foolish" }, { left: "Just what I needed", right: "the event is unwelcome" }] },
  ] },
  { concept: "Figures of Speech", topic: "Repetition", activities: [
    { type: "mcq", title: "Recognise purposeful repetition", prompt: "Which line repeats a word to build urgency?", answer: "Run, run, before the gates close!", explanation: "Repeating run makes the command urgent and energetic.", options: ["Run before the gates close.", "Run, run, before the gates close!", "The gates close at six."] },
    { type: "identify", title: "Explain repeated wording", prompt: "In “Never, never give up,” what does repetition emphasise?", answer: "The speaker's absolute determination", explanation: "Repeating never strengthens the command and leaves no room for surrender.", options: ["A precise time", "The speaker's absolute determination", "A quiet description"] },
    { type: "fill", title: "Complete a refrain", prompt: "“We shall rise, we shall ___, we shall rebuild.”", answer: "rise", explanation: "Repeating rise creates a refrain that reinforces resilience and hope.", },
    { type: "transform", title: "Add emphatic repetition", prompt: "Rewrite for dramatic emphasis: The bell rang across the valley.", answer: "The bell rang and rang across the valley.", explanation: "Repeating rang suggests the sound continued and makes the moment more dramatic.", },
    { type: "matching", title: "Match repetition to effect", prompt: "Match each repeated pattern with its effect.", answer: "again and again=persistence|gone, gone, gone=irreversible loss|who will listen? who will listen?=desperation", explanation: "Repeated words can stress duration, finality or emotional urgency.", pairs: [{ left: "again and again", right: "persistence" }, { left: "gone, gone, gone", right: "irreversible loss" }, { left: "who will listen? who will listen?", right: "desperation" }] },
  ] },
  { concept: "Figures of Speech", topic: "Apostrophe", activities: [
    { type: "mcq", title: "Recognise apostrophe", prompt: "Which line directly addresses something absent or non-human?", answer: "O moon, guide my lonely journey.", explanation: "The speaker addresses the moon as if it could hear and respond.", options: ["The moon guided my journey.", "O moon, guide my lonely journey.", "I watched the moon rise."] },
    { type: "identify", title: "Identify the addressee", prompt: "In “Time, why do you hurry?” who is being addressed?", answer: "Time", explanation: "The speaker directly calls on the abstract idea of time as though it were a listener.", options: ["the speaker", "Time", "the listener's friend"] },
    { type: "fill", title: "Complete an apostrophe", prompt: "___, dear Hope, stay with me through the night.", answer: "O", explanation: "O is a conventional vocative opening when a speaker addresses an absent idea or being.", },
    { type: "transform", title: "Address an absent idea", prompt: "Rewrite as apostrophe: I wish courage would return to me.", answer: "O Courage, return to me.", explanation: "Addressing Courage directly turns the abstract quality into an imagined listener.", },
    { type: "matching", title: "Match apostrophes to purpose", prompt: "Match each direct address with the feeling it conveys.", answer: "O Justice, hear us=appeal for fairness|Sleep, come gently=longing for rest|Dear Memory, do not fade=wish to preserve the past", explanation: "Apostrophe gives an absent or abstract addressee a voice in the speaker's thought.", pairs: [{ left: "O Justice, hear us", right: "appeal for fairness" }, { left: "Sleep, come gently", right: "longing for rest" }, { left: "Dear Memory, do not fade", right: "wish to preserve the past" }] },
  ] },
  { concept: "Figures of Speech", topic: "Pun", activities: [
    { type: "mcq", title: "Recognise a pun", prompt: "Which sentence uses a word with two related meanings for humour?", answer: "The maths teacher has too many problems.", explanation: "Problems means both maths questions and difficulties, creating the joke.", options: ["The maths teacher explains fractions.", "The maths teacher has too many problems.", "The maths teacher marks our work."] },
    { type: "identify", title: "Interpret a pun", prompt: "Why is “The bicycle could not stand on its own because it was two-tired” a pun?", answer: "Tired sounds like two-tired and means exhausted, while two wheels support the bicycle", explanation: "The joke plays on the sound of tired and the bicycle's two tyres.", options: ["It compares a bicycle with a person", "Tired sounds like two-tired and means exhausted, while two wheels support the bicycle", "It repeats the word bicycle"] },
    { type: "fill", title: "Complete a wordplay joke", prompt: "The calendar was nervous because its days were ___.", answer: "numbered", explanation: "Numbered means labelled with numbers and hints that the calendar's days are under pressure.", },
    { type: "transform", title: "Make a pun", prompt: "Write a short pun about a book that is difficult to put down.", answer: "That gripping novel really has me hooked.", explanation: "Hooked means fascinated and caught, allowing the sentence to play with physical and figurative meanings.", },
    { type: "matching", title: "Match puns to double meanings", prompt: "Match each pun with the two meanings it plays on.", answer: "The baker kneaded a break=needed and kneaded dough|The gardener had a growing concern=plant growth and increasing worry|The musician was in treble=trouble and musical treble", explanation: "Puns create humour by bringing two meanings or similar sounds together.", pairs: [{ left: "The baker kneaded a break", right: "needed and kneaded dough" }, { left: "The gardener had a growing concern", right: "plant growth and increasing worry" }, { left: "The musician was in treble", right: "trouble and musical treble" }] },
  ] },
  { concept: "Figures of Speech", topic: "Antithesis", activities: [
    { type: "mcq", title: "Recognise antithesis", prompt: "Which sentence balances sharply contrasting ideas?", answer: "We must learn to live, not live to learn.", explanation: "The balanced structure contrasts live to learn with learn to live for emphasis.", options: ["We learn many things at school.", "We must learn to live, not live to learn.", "Learning takes patience and practice."] },
    { type: "identify", title: "Find the contrasted ideas", prompt: "In “Small in size, great in courage,” which ideas are set against each other?", answer: "small in size and great in courage", explanation: "The parallel phrases contrast physical smallness with moral greatness.", options: ["size and courage as similar qualities", "small in size and great in courage", "the speaker and the audience"] },
    { type: "fill", title: "Complete a balanced contrast", prompt: "The speech urged us to choose cooperation over ___ and service over pride.", answer: "conflict", explanation: "Conflict contrasts with cooperation, creating a balanced antithetical pair.", },
    { type: "transform", title: "Build antithesis", prompt: "Rewrite with a balanced contrast: The night was dark, but the stars were bright.", answer: "The night was dark, yet the stars were bright.", explanation: "The paired clauses place dark and bright in a concise, balanced contrast.", },
    { type: "matching", title: "Match antitheses to their contrasts", prompt: "Match each balanced phrase with the idea it sets against.", answer: "speech is silver, silence is golden=speaking versus silence|many are called, few are chosen=large number versus small number|to err is human, to forgive divine=human weakness versus divine mercy", explanation: "Antithesis places opposites or strongly contrasting ideas in parallel form.", pairs: [{ left: "speech is silver, silence is golden", right: "speaking versus silence" }, { left: "many are called, few are chosen", right: "large number versus small number" }, { left: "to err is human, to forgive divine", right: "human weakness versus divine mercy" }] },
  ] },
];

const SECONDARY_EXPANSION_SPECS: SecondaryExpansionSpec[] = [
  {
    concept: "Active and passive voice",
    topic: "Present and past passive",
    activities: [
      { type: "mcq", title: "Present passive in a notice", prompt: "The school garden ___ by the eco-club every Friday.", answer: "is watered", explanation: "A regular passive action uses is plus the past participle watered.", options: ["waters", "is watered", "was watering"] },
      { type: "fill", title: "Past passive report", prompt: "The winning design ___ (choose) by the judges yesterday.", answer: "was chosen", explanation: "Yesterday sets a past time, so the passive form is was chosen.", },
      { type: "error", title: "Fix the passive auxiliary", prompt: "Correct this sentence: The invitations is printed by the office.", answer: "The invitations are printed by the office.", explanation: "Invitations is plural, so the present passive auxiliary must be are.", },
      { type: "transform", title: "Make a present passive", prompt: "Change to passive: Volunteers collect the library books.", answer: "The library books are collected by volunteers.", explanation: "The object becomes the subject and present passive uses are collected.", },
      { type: "rearrange", title: "Order a past passive sentence", prompt: "Arrange the words to describe the damaged footbridge.", answer: "The footbridge was repaired by the council.", explanation: "Past passive follows subject + was/were + past participle, with the agent after by.", tokens: ["council.", "repaired", "was", "The", "by", "footbridge", "the"] },
    ],
  },
  {
    concept: "Active and passive voice",
    topic: "Future passive",
    activities: [
      { type: "mcq", title: "Future passive announcement", prompt: "The final timetable ___ online next Monday.", answer: "will be published", explanation: "Future passive uses will be followed by the past participle published.", options: ["will publish", "will be published", "is publishing"] },
      { type: "fill", title: "Future passive prediction", prompt: "The old bridge ___ (replace) before the monsoon.", answer: "will be replaced", explanation: "A future event received by the bridge takes will be replaced.", },
      { type: "error", title: "Correct future passive form", prompt: "Correct this sentence: The results will announced after lunch.", answer: "The results will be announced after lunch.", explanation: "The future passive needs be between will and the past participle announced.", },
      { type: "transform", title: "Report a planned action", prompt: "Change to passive: The committee will review every application.", answer: "Every application will be reviewed by the committee.", explanation: "Every application becomes the passive subject; will be reviewed keeps the future meaning.", },
      { type: "rearrange", title: "Order a future notice", prompt: "Arrange the words for a school announcement.", answer: "The winners will be announced at assembly.", explanation: "Will be announced is the future passive verb phrase.", tokens: ["assembly.", "be", "winners", "at", "will", "announced", "The"] },
    ],
  },
  {
    concept: "Active and passive voice",
    topic: "Continuous passive",
    activities: [
      { type: "mcq", title: "Action in progress", prompt: "At noon, the stage ___ for the annual play.", answer: "was being decorated", explanation: "A past action in progress in passive voice uses was being plus the participle.", options: ["decorated", "was being decorated", "has decorated"] },
      { type: "fill", title: "Present continuous passive", prompt: "The new sports hall ___ (build) beside the school.", answer: "is being built", explanation: "An action happening now uses is being built in the passive voice.", },
      { type: "error", title: "Repair a continuous passive", prompt: "Correct this sentence: The road is being repair this week.", answer: "The road is being repaired this week.", explanation: "After being, passive voice requires the past participle repaired.", },
      { type: "transform", title: "Change an ongoing action", prompt: "Change to passive: Workers are painting the corridor.", answer: "The corridor is being painted by workers.", explanation: "The present continuous passive is is being plus painted.", },
      { type: "rearrange", title: "Order a continuous passive", prompt: "Arrange the words to describe work during the storm.", answer: "The damaged roof was being inspected by engineers.", explanation: "Was being inspected shows an inspection in progress in the past.", tokens: ["engineers.", "being", "roof", "was", "by", "inspected", "The", "damaged"] },
    ],
  },
  {
    concept: "Active and passive voice",
    topic: "Perfect passive",
    activities: [
      { type: "mcq", title: "Completed work with a present result", prompt: "The safety checks ___ before the laboratory opened.", answer: "had been completed", explanation: "Past perfect passive shows completion before another past event.", options: ["had completed", "had been completed", "were completing"] },
      { type: "fill", title: "Present perfect passive", prompt: "The missing files ___ (recover) from the backup.", answer: "have been recovered", explanation: "The plural subject files takes have been recovered.", },
      { type: "error", title: "Correct a perfect passive", prompt: "Correct this sentence: The report has submit to the principal.", answer: "The report has been submitted to the principal.", explanation: "Present perfect passive needs has been plus the past participle submitted.", },
      { type: "transform", title: "Use past perfect passive", prompt: "Change to passive: The technician had tested the alarm before the inspection.", answer: "The alarm had been tested by the technician before the inspection.", explanation: "Had been tested marks the earlier completed action in passive voice.", },
      { type: "rearrange", title: "Order a perfect passive", prompt: "Arrange the words about completed preparations.", answer: "All the seats have been reserved for guests.", explanation: "Have been reserved is the present perfect passive for plural seats.", tokens: ["reserved", "guests.", "have", "for", "All", "been", "the", "seats"] },
    ],
  },
  {
    concept: "Active and passive voice",
    topic: "Modal passive",
    activities: [
      { type: "mcq", title: "Rule with a modal", prompt: "Mobile phones ___ switched off during the examination.", answer: "must be", explanation: "Modal passive uses must be plus the past participle; switched is understood from the sentence.", options: ["must", "must be", "must being"] },
      { type: "fill", title: "Advice in passive voice", prompt: "The seedlings ___ (should / plant) in shallow trays.", answer: "should be planted", explanation: "Should be planted expresses advice about an action received by seedlings.", },
      { type: "error", title: "Fix a modal passive", prompt: "Correct this sentence: The form can be fill in blue ink.", answer: "The form can be filled in blue ink.", explanation: "After can be, use the past participle filled.", },
      { type: "transform", title: "Make a modal passive", prompt: "Change to passive: Students must submit the consent form.", answer: "The consent form must be submitted by students.", explanation: "The modal stays unchanged and the passive pattern is must be submitted.", },
      { type: "rearrange", title: "Order a modal passive", prompt: "Arrange the words to state a safety rule.", answer: "Protective glasses should be worn in the workshop.", explanation: "Should be worn expresses advice in modal passive voice.", tokens: ["workshop.", "be", "Protective", "in", "worn", "should", "glasses", "the"] },
    ],
  },
  {
    concept: "Reported speech",
    topic: "Reported statements",
    activities: [
      { type: "mcq", title: "Backshift a statement", prompt: "Maya said, “I need the atlas.” Choose the report.", answer: "Maya said that she needed the atlas.", explanation: "In a past reporting frame, need changes to needed and I changes to she.", options: ["Maya said that I need the atlas.", "Maya said that she needed the atlas.", "Maya says that she needed the atlas."] },
      { type: "fill", title: "Report a past statement", prompt: "Kabir said, “We finished the model.” Kabir said that they ___ the model.", answer: "had finished", explanation: "Past simple commonly backshifts to past perfect after said in reported speech.", },
      { type: "error", title: "Correct a reported statement", prompt: "Correct this: Anu said that she is feeling tired after the hike.", answer: "Anu said that she was feeling tired after the hike.", explanation: "Was feeling backshifts the original present continuous in a past report.", },
      { type: "transform", title: "Report a direct statement", prompt: "Report this: “The river is rising,” the guide said.", answer: "The guide said that the river was rising.", explanation: "Is rising changes to was rising after the past reporting verb said.", },
      { type: "rearrange", title: "Order a reported statement", prompt: "Arrange the words to report Leena's words.", answer: "Leena said that she had lost her notebook.", explanation: "The pronoun changes to she and past simple lost backshifts to had lost.", tokens: ["notebook.", "said", "had", "Leena", "that", "her", "she", "lost"] },
    ],
  },
  {
    concept: "Reported speech",
    topic: "Reported questions",
    activities: [
      { type: "mcq", title: "Report a yes-no question", prompt: "Ravi asked, “Are you joining the quiz?” Choose the report.", answer: "Ravi asked whether I was joining the quiz.", explanation: "Whether introduces a reported yes-no question, with statement word order and backshift.", options: ["Ravi asked was I joining the quiz.", "Ravi asked whether I was joining the quiz.", "Ravi asked whether was I joining the quiz."] },
      { type: "fill", title: "Report a wh-question", prompt: "The visitor asked, “Where does the bus stop?” The visitor asked where the bus ___.", answer: "stopped", explanation: "Reported questions use statement order and the present verb can backshift to stopped.", },
      { type: "error", title: "Fix reported question order", prompt: "Correct this: She asked me where was the auditorium.", answer: "She asked me where the auditorium was.", explanation: "A reported question uses subject before verb: where the auditorium was.", },
      { type: "transform", title: "Report a question", prompt: "Report this: “Have you completed the survey?” the teacher asked Neel.", answer: "The teacher asked Neel whether he had completed the survey.", explanation: "Whether reports the yes-no question; have completed backshifts to had completed.", },
      { type: "rearrange", title: "Order a reported wh-question", prompt: "Arrange the words to report the librarian's question.", answer: "The librarian asked why I was whispering.", explanation: "Why introduces the report and the clause keeps statement order.", tokens: ["whispering.", "asked", "was", "why", "I", "The", "librarian"] },
    ],
  },
  {
    concept: "Reported speech",
    topic: "Reported commands",
    activities: [
      { type: "mcq", title: "Report a command", prompt: "The coach said, “Run two laps.” Choose the report.", answer: "The coach told us to run two laps.", explanation: "Commands are reported with told + object + to-infinitive.", options: ["The coach told us running two laps.", "The coach told us to run two laps.", "The coach said us run two laps."] },
      { type: "fill", title: "Report a negative command", prompt: "The guard said, “Do not touch the display.” The guard warned us ___ touch the display.", answer: "not to", explanation: "A negative command uses object + not to-infinitive.", },
      { type: "error", title: "Correct a reported command", prompt: "Correct this: The captain told the players practise quietly.", answer: "The captain told the players to practise quietly.", explanation: "Told needs an object followed by to and the base verb.", },
      { type: "transform", title: "Report an instruction", prompt: "Report this command: “Close the windows before the storm,” Dad said to us.", answer: "Dad told us to close the windows before the storm.", explanation: "Told us to close accurately reports the instruction.", },
      { type: "rearrange", title: "Order a reported command", prompt: "Arrange the words to report the nurse's instruction.", answer: "The nurse told him to wash his hands.", explanation: "The pattern is told + object + to-infinitive.", tokens: ["hands.", "him", "to", "The", "wash", "nurse", "told", "his"] },
    ],
  },
  {
    concept: "Reported speech",
    topic: "Reported requests",
    activities: [
      { type: "mcq", title: "Report a polite request", prompt: "Nila said, “Please lend me your ruler.” Choose the report.", answer: "Nila asked me to lend her my ruler.", explanation: "Asked + object + to-infinitive reports a polite request, with pronouns adjusted.", options: ["Nila asked me lend her my ruler.", "Nila asked me to lend her my ruler.", "Nila told me lending her my ruler."] },
      { type: "fill", title: "Report a request for help", prompt: "“Please help me with this map,” Arjun said to Priya. Arjun asked Priya ___ him with the map.", answer: "to help", explanation: "A request is reported with asked plus the object and to help.", },
      { type: "error", title: "Fix a reported request", prompt: "Correct this: The student requested the librarian giving her another book.", answer: "The student requested the librarian to give her another book.", explanation: "Request takes an object followed by to and the base verb.", },
      { type: "transform", title: "Report a courteous request", prompt: "Report this: “Could you check my answer, please?” Meera said to the tutor.", answer: "Meera asked the tutor to check her answer.", explanation: "A polite could request becomes asked + object + to-infinitive.", },
      { type: "rearrange", title: "Order a reported request", prompt: "Arrange the words to report the visitor's request.", answer: "The visitor asked us to show our tickets.", explanation: "Asked us to show reports the requested action and its receiver.", tokens: ["tickets.", "asked", "visitor", "to", "our", "The", "show", "us"] },
    ],
  },
  {
    concept: "Reported speech",
    topic: "Tense, pronoun and time-expression changes",
    activities: [
      { type: "mcq", title: "Change a time expression", prompt: "On Monday, Isha said, “I will finish this tomorrow.” Which report is correct?", answer: "Isha said that she would finish it the next day.", explanation: "Will changes to would, I to she, this to it and tomorrow to the next day.", options: ["Isha said that I will finish this tomorrow.", "Isha said that she would finish it the next day.", "Isha said that she will finish this yesterday."] },
      { type: "fill", title: "Backshift with a pronoun change", prompt: "Rohan said, “I saw your cousin yesterday.” Rohan said that he ___ my cousin the day before.", answer: "had seen", explanation: "I changes to he, your to my, yesterday to the day before, and saw backshifts to had seen.", },
      { type: "error", title: "Correct several reported changes", prompt: "Correct this: Tara said that I am leaving here tomorrow.", answer: "Tara said that she was leaving there the next day.", explanation: "The report changes I to she, am to was, here to there and tomorrow to the next day.", },
      { type: "transform", title: "Apply reported-speech changes", prompt: "Report this said on Friday: “We are meeting here next week,” the players said.", answer: "The players said that they were meeting there the following week.", explanation: "We, are, here and next week change to they, were, there and the following week.", },
      { type: "rearrange", title: "Order a time-shifted report", prompt: "Arrange the words to report the message accurately.", answer: "Sita said that she had submitted the form the day before.", explanation: "The past report changes I to she, submitted to had submitted and yesterday to the day before.", tokens: ["before.", "said", "the", "had", "Sita", "form", "she", "submitted", "day", "that", "the"] },
    ],
  },
  {
    concept: "Sentence transformation and combining",
    topic: "Simple, compound and complex sentence conversion",
    activities: [
      { type: "mcq", title: "Identify a compound sentence", prompt: "Which sentence is compound?", answer: "The bell rang, and the pupils left.", explanation: "Two independent clauses are joined by the coordinating conjunction and.", options: ["Because the bell rang, the pupils left.", "The bell rang, and the pupils left.", "Ringing loudly, the bell startled us."] },
      { type: "fill", title: "Make a complex sentence", prompt: "Join with because: The match was postponed. It rained heavily.", answer: "The match was postponed because it rained heavily.", explanation: "Because introduces the dependent reason clause.", },
      { type: "error", title: "Repair a sentence conversion", prompt: "Correct this run-on compound sentence: The lights failed we used torches.", answer: "The lights failed, so we used torches.", explanation: "A coordinating conjunction and comma are needed to join the two independent clauses.", },
      { type: "transform", title: "Convert complex to compound", prompt: "Change to a compound sentence: Although the road was steep, the cyclists continued.", answer: "The road was steep, but the cyclists continued.", explanation: "But joins the two independent clauses while preserving the contrast.", },
      { type: "rearrange", title: "Order a sentence conversion", prompt: "Arrange the words as a complex sentence.", answer: "Although the recipe was long, Mina followed it.", explanation: "Although introduces the dependent clause, followed by a comma and the main clause.", tokens: ["followed", "long,", "it.", "the", "Although", "was", "Mina", "recipe"] },
    ],
  },
  {
    concept: "Sentence transformation and combining",
    topic: "Combining with conjunctions",
    activities: [
      { type: "mcq", title: "Choose a cause conjunction", prompt: "The plants wilted ___ nobody watered them.", answer: "because", explanation: "Because introduces the reason the plants wilted.", options: ["because", "or", "although"] },
      { type: "fill", title: "Join alternatives", prompt: "Combine with or: You can submit the essay online. You can hand it in.", answer: "You can submit the essay online or hand it in.", explanation: "Or joins two alternative actions without unnecessarily repeating the subject.", },
      { type: "error", title: "Correct a conjunction choice", prompt: "Correct this: Although the box was heavy, but we carried it upstairs.", answer: "Although the box was heavy, we carried it upstairs.", explanation: "Although already marks contrast, so the extra but must be removed.", },
      { type: "transform", title: "Combine with so", prompt: "Join the sentences using so: The path was flooded. We took a different route.", answer: "The path was flooded, so we took a different route.", explanation: "So introduces the result of the flooded path.", },
      { type: "rearrange", title: "Order a conjunction sentence", prompt: "Arrange the words to combine two ideas with while.", answer: "While Asha cooked, her brother set the table.", explanation: "While introduces the simultaneous dependent action and a comma separates the clauses.", tokens: ["table.", "cooked,", "brother", "While", "set", "her", "Asha", "the"] },
    ],
  },
  {
    concept: "Sentence transformation and combining",
    topic: "Combining with participles and infinitives",
    activities: [
      { type: "mcq", title: "Use an infinitive for purpose", prompt: "The class visited the museum ___ ancient coins.", answer: "to study", explanation: "To study is an infinitive phrase expressing purpose.", options: ["studying", "to study", "studied"] },
      { type: "fill", title: "Combine with a participle", prompt: "Combine: The boy saw the signal. He stopped the bicycle. ___ the signal, the boy stopped the bicycle.", answer: "Seeing", explanation: "The -ing participle Seeing makes the first action an introductory phrase.", },
      { type: "error", title: "Fix a dangling participle", prompt: "Correct this sentence: Walking through the park, the rain began to fall.", answer: "Walking through the park, I felt the rain begin to fall.", explanation: "The person walking, not the rain, must be the subject of the main clause.", },
      { type: "transform", title: "Reduce with an infinitive", prompt: "Combine using to: Neha went to the library. She wanted to research volcanoes.", answer: "Neha went to the library to research volcanoes.", explanation: "The infinitive to research expresses Neha's purpose for going.", },
      { type: "rearrange", title: "Order a participial phrase", prompt: "Arrange the words to combine the actions.", answer: "Having finished the experiment, the students cleaned the bench.", explanation: "Having finished shows the experiment ended before the cleaning action.", tokens: ["bench.", "students", "the", "Having", "cleaned", "finished", "the", "experiment,", "the"] },
    ],
  },
  {
    concept: "Sentence transformation and combining",
    topic: "Active/passive transformation",
    activities: [
      { type: "mcq", title: "Choose the passive equivalent", prompt: "Which is the passive form of “The storm damaged the roof”?", answer: "The roof was damaged by the storm.", explanation: "The object roof becomes the subject of the past passive was damaged.", options: ["The roof damaged the storm.", "The roof was damaged by the storm.", "The storm was damaged by the roof."] },
      { type: "fill", title: "Transform a passive clause", prompt: "Change to active: The winning goal was scored by Kavya.", answer: "Kavya scored the winning goal.", explanation: "The agent Kavya becomes the active subject and was scored becomes scored.", },
      { type: "error", title: "Correct a voice transformation", prompt: "Correct this: The poem was wrote by the student.", answer: "The poem was written by the student.", explanation: "Passive voice requires the past participle written, not the simple past wrote.", },
      { type: "transform", title: "Change active to passive", prompt: "Change to passive: The volunteers will distribute the food packets.", answer: "The food packets will be distributed by the volunteers.", explanation: "The future passive is will be distributed, with the object promoted to subject.", },
      { type: "rearrange", title: "Order an active transformation", prompt: "Arrange the words as an active sentence.", answer: "The mechanic repaired the bicycle before sunset.", explanation: "The agent mechanic is the active subject performing repaired on bicycle.", tokens: ["bicycle", "the", "sunset.", "repaired", "before", "The", "mechanic", "the"] },
    ],
  },
  {
    concept: "Sentence transformation and combining",
    topic: "Direct/indirect speech transformation",
    activities: [
      { type: "mcq", title: "Choose the indirect form", prompt: "“I am busy,” Noor said. Which indirect sentence is correct?", answer: "Noor said that she was busy.", explanation: "Indirect speech changes I to she and am to was after said.", options: ["Noor said that I am busy.", "Noor said that she was busy.", "Noor said she is busy yesterday."] },
      { type: "fill", title: "Turn direct into indirect speech", prompt: "“We have finished,” the players said. The players said that they ___ finished.", answer: "had", explanation: "Have finished backshifts to had finished in a past report.", },
      { type: "error", title: "Correct an indirect question", prompt: "Correct this transformation: He asked me where did I live.", answer: "He asked me where I lived.", explanation: "Indirect questions use statement order, so the subject comes before lived.", },
      { type: "transform", title: "Turn indirect into direct speech", prompt: "Change to direct speech: Asha said that she was reading a novel.", answer: "Asha said, “I am reading a novel.”", explanation: "The reported pronoun and backshift are restored to the speaker's original words.", },
      { type: "rearrange", title: "Order an indirect command", prompt: "Arrange the words to report the direct command “Wait outside.”", answer: "The officer told us to wait outside.", explanation: "An indirect command uses told + object + to-infinitive.", tokens: ["outside.", "told", "us", "to", "officer", "The", "wait"] },
    ],
  },
  {
    concept: "Error correction and editing",
    topic: "Tense errors",
    activities: [
      { type: "mcq", title: "Choose the correct tense", prompt: "By the time we reached the station, the train ___.", answer: "had left", explanation: "Past perfect shows the train left before the later past action reached.", options: ["has left", "had left", "leaves"] },
      { type: "fill", title: "Repair a past-tense error", prompt: "Yesterday, Leela ___ (write) a letter to her cousin.", answer: "wrote", explanation: "Yesterday requires the past simple; the past form of write is wrote.", },
      { type: "error", title: "Correct a tense shift", prompt: "Correct this: The guide explained the route and points to the bridge.", answer: "The guide explained the route and pointed to the bridge.", explanation: "The two completed actions in the past should use explained and pointed.", },
      { type: "transform", title: "Make the time frame future", prompt: "Rewrite in the future: The team tests the new software tomorrow.", answer: "The team will test the new software tomorrow.", explanation: "Will plus the base verb expresses the planned future action.", },
      { type: "rearrange", title: "Order a consistent narrative", prompt: "Arrange the words as a clear past account.", answer: "After she had packed her bag, Rina caught the bus.", explanation: "Had packed marks the earlier past action before caught.", tokens: ["caught", "bag,", "the", "After", "bus.", "Rina", "had", "packed", "she", "her"] },
    ],
  },
  {
    concept: "Error correction and editing",
    topic: "Agreement errors",
    activities: [
      { type: "mcq", title: "Choose the agreeing verb", prompt: "The list of ingredients ___ on the noticeboard.", answer: "is", explanation: "The head noun list is singular; the phrase of ingredients does not change the verb.", options: ["are", "is", "were"] },
      { type: "fill", title: "Plural subject agreement", prompt: "The players ___ ( practise) after school each day.", answer: "practise", explanation: "The plural subject players takes the base-form verb practise.", },
      { type: "error", title: "Correct subject-verb agreement", prompt: "Correct this: Neither of the explanations are convincing.", answer: "Neither of the explanations is convincing.", explanation: "Neither is treated as singular in formal agreement.", },
      { type: "transform", title: "Change singular to plural", prompt: "Rewrite in the plural: The child carries a heavy box.", answer: "The children carry heavy boxes.", explanation: "The plural subject children takes carry, and the nouns change to boxes.", },
      { type: "rearrange", title: "Order an agreement sentence", prompt: "Arrange the words with the correct verb.", answer: "The results of the survey show a clear trend.", explanation: "Results is the plural head noun and therefore takes show.", tokens: ["trend.", "show", "of", "The", "a", "survey", "clear", "results", "the"] },
    ],
  },
  {
    concept: "Error correction and editing",
    topic: "Modifier errors",
    activities: [
      { type: "mcq", title: "Choose the clear modifier", prompt: "Which sentence clearly shows who was carrying the microscope?", answer: "Carrying the microscope, I walked carefully.", explanation: "The introductory participle must modify the subject I, the person carrying it.", options: ["Carrying the microscope, the corridor seemed narrow.", "Carrying the microscope, I walked carefully.", "The microscope, carrying me, walked carefully."] },
      { type: "fill", title: "Place the adverb correctly", prompt: "Rewrite with usually: The library is quiet after lunch.", answer: "The library is usually quiet after lunch.", explanation: "Usually comes before the adjective quiet after the linking verb is.", },
      { type: "error", title: "Fix a misplaced modifier", prompt: "Correct this: She almost drove her friends to school every day.", answer: "She drove her friends to school almost every day.", explanation: "Almost should modify the frequency phrase, not the action drove.", },
      { type: "transform", title: "Clarify a modifier", prompt: "Rewrite clearly: Covered in paint, the teacher praised the mural.", answer: "The teacher praised the mural covered in paint.", explanation: "The revised sentence makes the mural, not the teacher, the thing covered in paint.", },
      { type: "rearrange", title: "Order a clear modifier", prompt: "Arrange the words so the participial phrase has the right subject.", answer: "Excited by the result, the researchers repeated the test.", explanation: "The researchers are excited, so they must follow the introductory modifier.", tokens: ["the", "repeated", "Excited", "test.", "by", "researchers", "the", "result,"] },
    ],
  },
  {
    concept: "Error correction and editing",
    topic: "Article and determiner errors",
    activities: [
      { type: "mcq", title: "Choose the article", prompt: "We watched ___ eagle circle above the valley.", answer: "an", explanation: "Eagle begins with a vowel sound, so it takes an.", options: ["a", "an", "the"] },
      { type: "fill", title: "Use a specific determiner", prompt: "Please return ___ book I lent you yesterday.", answer: "the", explanation: "The identifies a particular book already specified by the relative clause.", },
      { type: "error", title: "Correct an article error", prompt: "Correct this: She is a honest representative of our class.", answer: "She is an honest representative of our class.", explanation: "Honest begins with a vowel sound because the h is silent, so use an.", },
      { type: "transform", title: "Change an indefinite reference", prompt: "Rewrite with a suitable article: I saw unusual bird near the lake.", answer: "I saw an unusual bird near the lake.", explanation: "An comes before unusual because it begins with a vowel sound.", },
      { type: "rearrange", title: "Order a determiner sentence", prompt: "Arrange the words with the correct article.", answer: "Those three paintings belong in the gallery.", explanation: "Those identifies the paintings and three gives their number.", tokens: ["gallery.", "three", "belong", "Those", "paintings", "in", "the"] },
    ],
  },
  {
    concept: "Error correction and editing",
    topic: "Preposition errors",
    activities: [
      { type: "mcq", title: "Choose the time preposition", prompt: "The science fair begins ___ Monday morning.", answer: "on", explanation: "On is used with a particular day or date.", options: ["at", "on", "in"] },
      { type: "fill", title: "Choose the correct place preposition", prompt: "The keys are ___ the drawer beside the desk.", answer: "in", explanation: "In shows that the keys are inside the drawer.", },
      { type: "error", title: "Correct a preposition error", prompt: "Correct this: We arrived to the auditorium before noon.", answer: "We arrived at the auditorium before noon.", explanation: "Arrive takes at for a specific place, not to.", },
      { type: "transform", title: "Add a precise preposition", prompt: "Rewrite using beneath: The cat slept under the wooden bench.", answer: "The cat slept beneath the wooden bench.", explanation: "Beneath is a precise preposition meaning under.", },
      { type: "rearrange", title: "Order a prepositional phrase", prompt: "Arrange the words to make a clear location sentence.", answer: "The notice is pinned beside the main entrance.", explanation: "Beside introduces the location phrase modifying pinned.", tokens: ["entrance.", "pinned", "main", "The", "beside", "is", "notice", "the"] },
    ],
  },
];

const buildSecondaryExpansionQuestions = (): GrammarQuestion[] =>
  SECONDARY_EXPANSION_SPECS.flatMap(({ concept, topic, activities }) =>
    activities.map((activity, index) =>
      q(
        `secondary-expansion-${middleNounPronounSlug(topic)}-${index + 1}`,
        activity.type,
        `${topic}: ${activity.title}`,
        activity.prompt,
        activity.answer,
        activity.explanation,
        { concept, topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs }
      )
    )
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
      "Figures of Speech",
      "Phrasal Verbs",
      "Idioms and Expressions",
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
      ...buildSecondaryExpansionQuestions(),
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
      q("senior-advanced-tense-1", "mcq", "Present-time contrast in analysis", "The observatory generally ___ faint galaxies, but this week its team ___ a supernova remnant.", "catalogues; is examining", "The present simple states a regular institutional activity, while the present continuous highlights a temporary project in progress.", { concept: "Advanced tense distinctions", topic: "Present simple, present continuous and present perfect contrasts", options: ["catalogues; is examining", "is cataloguing; examines", "has catalogued; examines"] }),
      q("senior-advanced-tense-2", "fill", "Present perfect for current relevance", "The review panel ___ (identify) three gaps that still affect the proposal.", "has identified", "The present perfect links the completed identification to its present consequence: the gaps still affect the proposal.", { concept: "Advanced tense distinctions", topic: "Present simple, present continuous and present perfect contrasts" }),
      q("senior-advanced-tense-3", "error", "Distinguish repeated work from current work", "Correct the report sentence: The research group is publishing six papers since January.", "The research group has published six papers since January.", "A completed number of papers over a period continuing to the present takes the present perfect, not the present continuous.", { concept: "Advanced tense distinctions", topic: "Present simple, present continuous and present perfect contrasts" }),
      q("senior-advanced-tense-4", "transform", "Contrast policy and recent change", "Rewrite to contrast an established policy with a recent revision: The journal accepts open data. It has revised its submission rules this month.", "The journal accepts open data, but it has revised its submission rules this month.", "The simple present presents the standing policy; the present perfect presents a recent change with current relevance.", { concept: "Advanced tense distinctions", topic: "Present simple, present continuous and present perfect contrasts" }),
      q("senior-advanced-tense-5", "rearrange", "Order a present-time contrast", "Arrange the words to distinguish a habitual finding from a current investigation.", "The survey usually reveals a pattern, but the current analysis is testing its limits.", "Usually reveals describes a repeated result, whereas is testing frames the temporary investigation now under way.", { concept: "Advanced tense distinctions", topic: "Present simple, present continuous and present perfect contrasts", tokens: ["limits.", "its", "testing", "is", "analysis", "current", "the", "but", "pattern,", "a", "reveals", "usually", "survey", "The"] }),
      q("senior-advanced-tense-6", "mcq", "Past event sequence", "When the archivist arrived, the curator ___ the catalogue and ___ the disputed entries.", "was examining; had flagged", "Past continuous sets the scene at arrival; past perfect places the flagging earlier than that past moment.", { concept: "Advanced tense distinctions", topic: "Past simple, past continuous and past perfect contrasts", options: ["was examining; had flagged", "examined; was flagging", "had examined; flagged"] }),
      q("senior-advanced-tense-7", "fill", "Past perfect before a finding", "The committee rejected the claim because the authors ___ (not disclose) the sampling limitation.", "had not disclosed", "The non-disclosure preceded the past decision, so past perfect makes the causal sequence explicit.", { concept: "Advanced tense distinctions", topic: "Past simple, past continuous and past perfect contrasts" }),
      q("senior-advanced-tense-8", "error", "Correct overlapping past actions", "Correct this account: While the data analyst checked the code, the server had crashed repeatedly.", "While the data analyst was checking the code, the server crashed repeatedly.", "Past continuous marks the background activity; the simple past reports the repeated events occurring during it.", { concept: "Advanced tense distinctions", topic: "Past simple, past continuous and past perfect contrasts" }),
      q("senior-advanced-tense-9", "transform", "Reconstruct an earlier past cause", "Rewrite with after: The trial ended. The investigators had recorded an unexpected reaction.", "After the investigators had recorded an unexpected reaction, the trial ended.", "Past perfect places the recording before the later past event, the trial ending.", { concept: "Advanced tense distinctions", topic: "Past simple, past continuous and past perfect contrasts" }),
      q("senior-advanced-tense-10", "identify", "Identify the temporal frame", "In “The witness was describing the sequence when the transcript revealed that she had omitted a crucial date,” identify the verb phrase that marks the earliest event.", "had omitted", "Past perfect marks the omission as earlier than both the ongoing description and the later revelation.", { concept: "Advanced tense distinctions", topic: "Past simple, past continuous and past perfect contrasts", options: ["was describing", "revealed", "had omitted"] }),
      q("senior-advanced-tense-11", "mcq", "Scheduled future versus prediction", "The senate ___ the amendment tomorrow, and analysts expect the vote ___ the market.", "is debating; will affect", "Present continuous suits a scheduled arrangement, while will expresses a prediction about its consequence.", { concept: "Advanced tense distinctions", topic: "Future forms and future-in-the-past contrasts", options: ["is debating; will affect", "will debate; is affecting", "debates; would affect"] }),
      q("senior-advanced-tense-12", "fill", "Future viewed from the past", "In her 2022 field notes, the researcher wrote that the glacier ___ (retreat) beyond the monitoring station by 2030.", "would have retreated", "Would have retreated is the future perfect in the past, viewing a completed future result from a past reference point.", { concept: "Advanced tense distinctions", topic: "Future forms and future-in-the-past contrasts" }),
      q("senior-advanced-tense-13", "error", "Correct a reported arrangement", "Correct the minutes: The dean said the visiting scholar will be delivering the keynote the following week.", "The dean said the visiting scholar would be delivering the keynote the following week.", "Backshift changes will to would in a past reporting frame; the continuous aspect preserves the arranged ongoing event.", { concept: "Advanced tense distinctions", topic: "Future forms and future-in-the-past contrasts" }),
      q("senior-advanced-tense-14", "transform", "Express an evidence-based prediction", "Rewrite with be going to: The pressure readings show that the valve will fail soon.", "The pressure readings show that the valve is going to fail soon.", "Be going to presents a predicted event grounded in present evidence, which the readings provide.", { concept: "Advanced tense distinctions", topic: "Future forms and future-in-the-past contrasts" }),
      q("senior-advanced-tense-15", "rearrange", "Order a future-in-the-past report", "Arrange the words to report a planned later inspection.", "The engineer said she would be inspecting the bridge the next morning.", "Would be inspecting backshifts a planned future activity when it is reported from a past viewpoint.", { concept: "Advanced tense distinctions", topic: "Future forms and future-in-the-past contrasts", tokens: ["morning.", "next", "the", "bridge", "inspecting", "be", "would", "she", "said", "engineer", "The"] }),
      q("senior-advanced-tense-16", "mcq", "Tense choice in formal method writing", "The experiment ___ three stages, each of which ___ a control sample.", "comprises; includes", "The simple present is conventional for describing an established method and its components.", { concept: "Advanced tense distinctions", topic: "Tense and aspect in formal writing", options: ["comprises; includes", "comprised; included", "is comprising; is including"] }),
      q("senior-advanced-tense-17", "fill", "Presenting completed research", "In the discussion section, we ___ (observe) a consistent association across all four models.", "observed", "The simple past reports a specific observation made during the completed investigation.", { concept: "Advanced tense distinctions", topic: "Tense and aspect in formal writing" }),
      q("senior-advanced-tense-18", "error", "Separate results from interpretation", "Correct this academic sentence: The analysis has shown a significant effect, and Table 2 presents its implications.", "The analysis showed a significant effect, and Table 2 presents its implications.", "Use simple past for the completed analysis and simple present for what the table currently shows to the reader.", { concept: "Advanced tense distinctions", topic: "Tense and aspect in formal writing" }),
      q("senior-advanced-tense-19", "transform", "Use cautious perfect reporting", "Make the claim appropriately academic: Earlier studies prove that the intervention works.", "Earlier studies have suggested that the intervention works.", "The present perfect connects prior studies to the current discussion, while suggested appropriately avoids an absolute claim.", { concept: "Advanced tense distinctions", topic: "Tense and aspect in formal writing" }),
      q("senior-advanced-tense-20", "matching", "Match tense to academic function", "Match each sentence to its function.", "The study examined 40 cases=completed procedure|The results indicate a trend=current interpretation|Previous work has identified a gap=research background", "Academic prose often uses the past for completed procedures, the present for claims in the text, and the present perfect for relevant research history.", { concept: "Advanced tense distinctions", topic: "Tense and aspect in formal writing", pairs: [{ left: "The study examined 40 cases", right: "completed procedure" }, { left: "The results indicate a trend", right: "current interpretation" }, { left: "Previous work has identified a gap", right: "research background" }] }),
      q("senior-advanced-tense-21", "mcq", "Backshift after a past reporting verb", "The original report stated that the samples ___ unstable at high temperatures.", "were", "Backshift from are to were is normal after a past reporting verb when the writer presents the earlier report as a past claim.", { concept: "Advanced tense distinctions", topic: "Sequence of tenses", options: ["were", "are", "have been"] }),
      q("senior-advanced-tense-22", "fill", "Retain a continuing truth", "The lecturer explained that water ___ (boil) at a lower temperature at high altitude.", "boils", "The simple present can remain unchanged in reported speech when the statement is a general scientific truth.", { concept: "Advanced tense distinctions", topic: "Sequence of tenses" }),
      q("senior-advanced-tense-23", "error", "Correct a past research report", "Correct this sentence: The 2019 survey found that respondents prefer online instruction.", "The 2019 survey found that respondents preferred online instruction.", "With a past reporting verb, preferred provides the expected backshift for a preference reported as situated in 2019.", { concept: "Advanced tense distinctions", topic: "Sequence of tenses" }),
      q("senior-advanced-tense-24", "transform", "Report a future commitment", "Report this statement from a past viewpoint: “I will submit the revised protocol tomorrow,” the investigator said.", "The investigator said that she would submit the revised protocol the next day.", "Would backshifts will, and the time expression tomorrow changes to the next day in the past reporting frame.", { concept: "Advanced tense distinctions", topic: "Sequence of tenses" }),
      q("senior-advanced-tense-25", "rearrange", "Order a sequence-of-tenses sentence", "Arrange the words to report an earlier discovery and its lasting implication.", "The historian noted that the archive had revealed a pattern that remains significant.", "Had revealed backshifts the earlier discovery, while remains stays present because its significance continues now.", { concept: "Advanced tense distinctions", topic: "Sequence of tenses", tokens: ["significant.", "remains", "that", "pattern", "a", "revealed", "had", "archive", "the", "that", "noted", "historian", "The"] }),
      q("senior-perfect-1", "mcq", "Result versus ongoing effort", "The engineering team ___ five prototypes this term, but it ___ the sixth one since Monday.", "has completed; has been testing", "The present perfect counts completed results, while the present perfect continuous foregrounds the ongoing activity.", { concept: "Perfect and perfect-continuous forms", topic: "Present perfect versus present perfect continuous", options: ["has completed; has been testing", "has been completing; has tested", "completed; is testing"] }),
      q("senior-perfect-2", "fill", "Duration up to now", "The policy committee ___ (review) the evidence for three months and has not reached a decision.", "has been reviewing", "The continuous perfect emphasizes the activity's duration and incompletion up to the present.", { concept: "Perfect and perfect-continuous forms", topic: "Present perfect versus present perfect continuous" }),
      q("senior-perfect-3", "error", "Correct a stative perfect form", "Correct this sentence: The archive has been containing the letters since 1980.", "The archive has contained the letters since 1980.", "Contain is stative here, so the present perfect is more idiomatic than the perfect continuous.", { concept: "Perfect and perfect-continuous forms", topic: "Present perfect versus present perfect continuous" }),
      q("senior-perfect-4", "transform", "Shift result to process", "Rewrite to emphasize the researchers' activity rather than the number of reports: The researchers have produced three reports this year.", "The researchers have been producing reports throughout this year.", "The present perfect continuous foregrounds an ongoing or repeated process instead of a completed total.", { concept: "Perfect and perfect-continuous forms", topic: "Present perfect versus present perfect continuous" }),
      q("senior-perfect-5", "identify", "Identify the perfect-continuous form", "In “The wetlands have been absorbing excess rainfall since the restoration began,” identify the verb phrase.", "have been absorbing", "Have been absorbing combines present perfect have, be in the past participle been, and the -ing participle absorbing.", { concept: "Perfect and perfect-continuous forms", topic: "Present perfect versus present perfect continuous", options: ["have been absorbing", "the restoration began", "excess rainfall"] }),
      q("senior-perfect-6", "mcq", "Earlier duration in a narrative", "Before the inspection began, the technicians ___ the instrument for several hours.", "had been calibrating", "Past perfect continuous emphasizes the duration of calibration before the later past inspection.", { concept: "Perfect and perfect-continuous forms", topic: "Past perfect versus past perfect continuous", options: ["had been calibrating", "had calibrated", "were calibrating"] }),
      q("senior-perfect-7", "fill", "Completed prior adjustment", "By the time the hearing opened, counsel ___ (prepare) the final submission.", "had prepared", "Past perfect presents the submission as completed before the later past event, the opening of the hearing.", { concept: "Perfect and perfect-continuous forms", topic: "Past perfect versus past perfect continuous" }),
      q("senior-perfect-8", "error", "Correct a prior ongoing action", "Correct this sentence: The machine stopped because it had operated continuously for eighteen hours.", "The machine stopped because it had been operating continuously for eighteen hours.", "The continuous form highlights the ongoing duration that led to the stoppage.", { concept: "Perfect and perfect-continuous forms", topic: "Past perfect versus past perfect continuous" }),
      q("senior-perfect-9", "transform", "Emphasize a completed past result", "Rewrite to emphasize completion: The curator had been restoring the manuscript before the exhibition opened.", "The curator had restored the manuscript before the exhibition opened.", "Past perfect shifts attention from the restoration process to its completed result before the exhibition.", { concept: "Perfect and perfect-continuous forms", topic: "Past perfect versus past perfect continuous" }),
      q("senior-perfect-10", "rearrange", "Order a past perfect contrast", "Arrange the words to show duration before a past interruption.", "The scholars had been debating the attribution when new evidence emerged.", "Had been debating presents an activity in progress before the simple-past interruption emerged.", { concept: "Perfect and perfect-continuous forms", topic: "Past perfect versus past perfect continuous", tokens: ["emerged.", "evidence", "new", "when", "attribution", "the", "debating", "been", "had", "scholars", "The"] }),
      q("senior-perfect-11", "mcq", "Completion by a future deadline", "By the accreditation visit, the university ___ the new laboratory wing.", "will have completed", "Future perfect expresses an action that will be complete by a specified future point.", { concept: "Perfect and perfect-continuous forms", topic: "Future perfect versus future perfect continuous", options: ["will have completed", "will have been completing", "is completing"] }),
      q("senior-perfect-12", "fill", "Future duration", "By September, the fellows ___ (work) on the longitudinal study for a full year.", "will have been working", "Future perfect continuous measures the duration of an activity up to a future reference point.", { concept: "Perfect and perfect-continuous forms", topic: "Future perfect versus future perfect continuous" }),
      q("senior-perfect-13", "error", "Correct a future perfect deadline", "Correct this projection: By next spring, the institute will have been published the dataset.", "By next spring, the institute will have published the dataset.", "A completed publication by a deadline takes will have plus the past participle published, not the continuous auxiliary.", { concept: "Perfect and perfect-continuous forms", topic: "Future perfect versus future perfect continuous" }),
      q("senior-perfect-14", "transform", "Change result to future duration", "Rewrite to emphasize duration up to December: The observatory will complete the survey by December.", "The observatory will have been conducting the survey for two years by December.", "Future perfect continuous foregrounds how long the activity will have continued by the future point.", { concept: "Perfect and perfect-continuous forms", topic: "Future perfect versus future perfect continuous" }),
      q("senior-perfect-15", "matching", "Match future perfect meanings", "Match each sentence to its meaning.", "By June, the team will have submitted the bid=completed result|By June, the team will have been preparing the bid for months=duration|By June, the team will submit the bid=event expected then", "The perfect marks completion by a deadline, the perfect continuous marks duration, and the simple future states the expected event.", { concept: "Perfect and perfect-continuous forms", topic: "Future perfect versus future perfect continuous", pairs: [{ left: "By June, the team will have submitted the bid", right: "completed result" }, { left: "By June, the team will have been preparing the bid for months", right: "duration" }, { left: "By June, the team will submit the bid", right: "event expected then" }] }),
      q("senior-perfect-16", "mcq", "Perfect infinitive after a modal", "The committee seems ___ the ethical implications before approving the protocol.", "to have considered", "The perfect infinitive to have considered places the consideration before the committee's apparent approval.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect infinitives and participles", options: ["to consider", "to have considered", "having considered"] }),
      q("senior-perfect-17", "fill", "Perfect gerund after a preposition", "The witness denied ___ (receive) the confidential memo.", "having received", "Having received is a perfect -ing form that places the alleged receipt before the denial.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect infinitives and participles" }),
      q("senior-perfect-18", "error", "Correct a perfect participle", "Correct this sentence: Having complete the audit, the team released its findings.", "Having completed the audit, the team released its findings.", "A perfect participle uses having followed by the past participle completed.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect infinitives and participles" }),
      q("senior-perfect-19", "transform", "Use a perfect infinitive for prior action", "Rewrite with a perfect infinitive: It is believed that the vessel sank before dawn.", "The vessel is believed to have sunk before dawn.", "The perfect infinitive expresses the vessel's earlier sinking relative to the present belief.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect infinitives and participles" }),
      q("senior-perfect-20", "identify", "Identify the perfect participial clause", "In “Having been warned about contamination, the technicians sealed the samples,” identify the perfect participial clause.", "Having been warned about contamination", "Having been warned is a perfect passive participle, showing that the warning preceded the sealing.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect infinitives and participles", options: ["Having been warned about contamination", "the technicians sealed the samples", "the samples"] }),
      q("senior-perfect-21", "mcq", "Reported prior experience", "The director said that the laboratory ___ its safety procedures after the earlier incident.", "had revised", "Past perfect places the revision before the director's past statement and links it to the reported incident.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect aspect in reported and academic contexts", options: ["had revised", "has revised", "would revise"] }),
      q("senior-perfect-22", "fill", "Academic research history", "Several scholars ___ (question) the assumption since the first edition appeared.", "have questioned", "Present perfect presents a line of research that began earlier and remains relevant to the current academic discussion.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect aspect in reported and academic contexts" }),
      q("senior-perfect-23", "error", "Correct reported perfect aspect", "Correct this sentence: The reviewer noted that the authors have omitted a control group in the submitted paper.", "The reviewer noted that the authors had omitted a control group in the submitted paper.", "After the past reporting verb noted, past perfect locates the omission earlier within the review episode.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect aspect in reported and academic contexts" }),
      q("senior-perfect-24", "transform", "Hedge a prior academic claim", "Rewrite impersonally with a perfect infinitive: Researchers believe that the method has improved reproducibility.", "The method is believed to have improved reproducibility.", "The passive reporting structure and perfect infinitive present the improvement as prior to the current belief.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect aspect in reported and academic contexts" }),
      q("senior-perfect-25", "rearrange", "Order an academic perfect construction", "Arrange the words to report a continuing scholarly contribution.", "Recent studies have provided evidence that the model remains robust.", "The present perfect connects completed studies with their continuing relevance, while remains states the current result.", { concept: "Perfect and perfect-continuous forms", topic: "Perfect aspect in reported and academic contexts", tokens: ["robust.", "remains", "model", "the", "that", "evidence", "provided", "have", "studies", "Recent"] }),
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

const SECONDARY_FOCUSED_SPECS: SecondaryExpansionSpec[] = [
  {
    concept: "Punctuation and capitalization",
    topic: "Commas",
    activities: [
      { type: "mcq", title: "Comma after an introductory phrase", prompt: "Which sentence uses a comma correctly after its introductory phrase?", answer: "After the assembly, the students returned to class.", explanation: "A comma separates the introductory prepositional phrase from the main clause.", options: ["After the assembly the students returned to class.", "After the assembly, the students returned to class.", "After, the assembly the students returned to class."] },
      { type: "fill", title: "Comma in a direct address", prompt: "Add the missing punctuation: Please check this calculation ___ Rohan.", answer: "Please check this calculation, Rohan.", explanation: "A comma sets off the name of the person being addressed.", },
      { type: "error", title: "Comma in a compound sentence", prompt: "Correct this sentence: The bell rang the pupils packed their books.", answer: "The bell rang, and the pupils packed their books.", explanation: "Two independent clauses need a comma and a coordinating conjunction between them.", },
      { type: "transform", title: "Set off a non-essential phrase", prompt: "Rewrite with commas around the extra information: My aunt who teaches biology visited our school.", answer: "My aunt, who teaches biology, visited our school.", explanation: "The non-defining relative clause adds extra information and must be enclosed by commas.", },
      { type: "rearrange", title: "Order a comma sentence", prompt: "Arrange the words to punctuate an introductory time phrase.", answer: "In the evening, we reviewed the survey results.", explanation: "The comma follows the introductory time phrase.", tokens: ["reviewed", "results.", "the", "In", "we", "survey", "evening,", "the"] },
    ],
  },
  {
    concept: "Punctuation and capitalization",
    topic: "Semicolons",
    activities: [
      { type: "mcq", title: "Join closely related clauses", prompt: "Which sentence correctly joins two independent clauses with a semicolon?", answer: "The road was flooded; the buses used another route.", explanation: "A semicolon can join two closely related independent clauses without a conjunction.", options: ["The road was flooded; because buses used another route.", "The road was flooded; the buses used another route.", "The road; was flooded, the buses used another route."] },
      { type: "fill", title: "Separate complex list items", prompt: "Insert the punctuation: The delegates came from Pune, India ___ Nairobi, Kenya ___ and Lima, Peru.", answer: "The delegates came from Pune, India; Nairobi, Kenya; and Lima, Peru.", explanation: "Semicolons separate list items that already contain internal commas.", },
      { type: "error", title: "Repair a semicolon splice", prompt: "Correct this sentence: Although the forecast changed; we continued the expedition.", answer: "Although the forecast changed, we continued the expedition.", explanation: "A semicolon cannot separate a dependent although-clause from its main clause; use a comma.", },
      { type: "transform", title: "Replace a coordinating conjunction", prompt: "Join the independent clauses with a semicolon: The data were incomplete, but the pattern was clear.", answer: "The data were incomplete; the pattern was clear.", explanation: "The semicolon links the two closely related complete clauses while removing but.", },
      { type: "rearrange", title: "Order a semicolon sentence", prompt: "Arrange the clauses and punctuation to show two related complete ideas.", answer: "The experiment ended; everyone recorded the results.", explanation: "A semicolon separates the two independent clauses.", tokens: ["recorded", "ended;", "results.", "everyone", "The", "the", "experiment"] },
    ],
  },
  {
    concept: "Punctuation and capitalization",
    topic: "Colons",
    activities: [
      { type: "mcq", title: "Introduce a list", prompt: "Choose the sentence with the colon used correctly.", answer: "Bring three items: a ruler, a pencil and an eraser.", explanation: "A colon can introduce a list after a complete clause.", options: ["Bring: three items a ruler, a pencil and an eraser.", "Bring three items: a ruler, a pencil and an eraser.", "Bring three: items a ruler, a pencil and an eraser."] },
      { type: "fill", title: "Colon before an explanation", prompt: "Complete the punctuation: The result was unexpected ___ the solution was colder than predicted.", answer: "The result was unexpected: the solution was colder than predicted.", explanation: "A colon can introduce an explanation of the preceding complete statement.", },
      { type: "error", title: "Remove an unnecessary colon", prompt: "Correct this sentence: The main reason is: the battery was flat.", answer: "The main reason is that the battery was flat.", explanation: "A colon should not separate the linking verb is from its complement; that introduces the explanation.", },
      { type: "transform", title: "Introduce examples with a colon", prompt: "Rewrite as one sentence using a colon: We studied three renewable sources. They were wind, solar and hydro power.", answer: "We studied three renewable sources: wind, solar and hydro power.", explanation: "The colon introduces the examples after a complete introductory clause.", },
      { type: "rearrange", title: "Order a colon sentence", prompt: "Arrange the words into a sentence that introduces a list.", answer: "The kit contains four tools: a torch, a compass, a whistle and a map.", explanation: "The complete clause before the colon introduces the list.", tokens: ["a", "contains", "a", "map.", "four", "The", "compass,", "kit", "tools:", "a", "whistle", "torch,", "and"] },
    ],
  },
  {
    concept: "Punctuation and capitalization",
    topic: "Quotation marks",
    activities: [
      { type: "mcq", title: "Punctuate direct speech", prompt: "Which direct-speech sentence has quotation marks and the speech tag punctuated correctly?", answer: "The guide said, “Stay with the group.”", explanation: "A comma introduces the spoken words, which begin with a capital letter inside quotation marks.", options: ["The guide said “Stay with the group”.", "The guide said, “Stay with the group.”", "The guide said, Stay with the group."] },
      { type: "fill", title: "Quote a question", prompt: "Add quotation marks and punctuation: Mira asked ___ Are we ready to leave? ___", answer: "Mira asked, “Are we ready to leave?”", explanation: "The question mark belongs inside the quotation marks because the quoted words are the question.", },
      { type: "error", title: "Correct a speech tag", prompt: "Correct this sentence: “I finished the model”, said Dev.", answer: "“I finished the model,” said Dev.", explanation: "A comma, not a full stop, separates a statement from a following speech tag.", },
      { type: "transform", title: "Convert reported speech to direct speech", prompt: "Write as direct speech: Leela said that she needed a larger canvas.", answer: "Leela said, “I need a larger canvas.”", explanation: "Direct speech uses quotation marks and changes the reported she needed to the speaker's I need.", },
      { type: "rearrange", title: "Order direct speech", prompt: "Arrange the words and punctuation so the imperative is quoted before its speech tag.", answer: "“Please label the samples,” said the technician.", explanation: "The quoted imperative comes before the comma and the reporting clause.", tokens: ["technician.", "the", "said", "samples,”", "“Please", "label", "the"] },
    ],
  },
  {
    concept: "Punctuation and capitalization",
    topic: "Apostrophes",
    activities: [
      { type: "mcq", title: "Show singular possession", prompt: "Choose the correct possessive phrase: the ___ notebook (student).", answer: "student's notebook", explanation: "A singular owner takes apostrophe plus s before the noun owned.", options: ["students notebook", "student's notebook", "students' notebook"] },
      { type: "fill", title: "Contract have not", prompt: "Write the contraction: The instruments ___ been calibrated.", answer: "haven't", explanation: "Haven't is the contraction of have not and needs an apostrophe.", },
      { type: "error", title: "Distinguish its and it's", prompt: "Correct this sentence: The machine lost it's power during the test.", answer: "The machine lost its power during the test.", explanation: "Its is the possessive determiner; it's means it is or it has.", },
      { type: "transform", title: "Show plural possession", prompt: "Rewrite with a possessive apostrophe: The projects of the three teams were displayed.", answer: "The three teams' projects were displayed.", explanation: "A plural owner ending in s takes an apostrophe after the s.", },
      { type: "rearrange", title: "Order an apostrophe sentence", prompt: "Arrange the words to show an irregular plural possessive.", answer: "The children's costumes were ready for the play.", explanation: "Children is an irregular plural, so its possessive form is children's.", tokens: ["ready", "play.", "children's", "for", "were", "costumes", "The", "the"] },
    ],
  },
  {
    concept: "Punctuation and capitalization",
    topic: "Punctuation in complex and reported sentences",
    activities: [
      { type: "mcq", title: "Comma after a dependent clause", prompt: "Choose the correctly punctuated complex sentence.", answer: "Because the path was icy, the hikers walked slowly.", explanation: "A comma follows an introductory dependent because-clause.", options: ["Because the path was icy the hikers walked slowly.", "Because the path was icy, the hikers walked slowly.", "Because, the path was icy the hikers walked slowly."] },
      { type: "fill", title: "Punctuate an embedded question", prompt: "Add the missing comma: The teacher asked whether we had finished the map ___ but nobody answered.", answer: "The teacher asked whether we had finished the map, but nobody answered.", explanation: "A comma separates the two independent clauses joined by but.", },
      { type: "error", title: "Correct reported speech punctuation", prompt: "Correct this sentence: Rina said, that the library was closed.", answer: "Rina said that the library was closed.", explanation: "A that-clause in reported speech is not placed inside quotation marks and does not need a comma after said.", },
      { type: "transform", title: "Combine a report and a reason", prompt: "Combine with because: Arjun explained that he was late. The bus had broken down.", answer: "Arjun explained that he was late because the bus had broken down.", explanation: "Because introduces the reason clause inside the reported statement without breaking the sentence incorrectly.", },
      { type: "rearrange", title: "Order a complex reported sentence", prompt: "Arrange the words and punctuation into a correctly punctuated report.", answer: "After she checked the figures, Nisha said that the total was correct.", explanation: "The introductory after-clause takes a comma before the main reported clause.", tokens: ["correct.", "figures,", "that", "Nisha", "the", "After", "said", "was", "she", "total", "checked"] },
    ],
  },
  {
    concept: "Subject–verb agreement",
    topic: "Compound subjects",
    activities: [
      { type: "mcq", title: "Agreement with and", prompt: "The captain and the goalkeeper ___ the same training schedule.", answer: "follow", explanation: "Two subjects joined by and normally form a plural subject and take follow.", options: ["follows", "follow", "following"] },
      { type: "fill", title: "Compound subject with or", prompt: "Either the coach or the players ___ (know) the final arrangement.", answer: "know", explanation: "With either...or, the verb agrees with the nearer subject, players, which is plural.", },
      { type: "error", title: "Correct a compound subject", prompt: "Correct this sentence: The map and the compass is in my bag.", answer: "The map and the compass are in my bag.", explanation: "The two nouns joined by and make a plural subject, so use are.", },
      { type: "transform", title: "Join two subjects", prompt: "Combine with and: The microscope was clean. The balance was ready.", answer: "The microscope and the balance were ready.", explanation: "The joined compound subject takes the plural verb were.", },
      { type: "rearrange", title: "Order a compound-subject sentence", prompt: "Arrange the words so the two subjects agree with their plural verb.", answer: "The librarian and the prefect organise the reading club.", explanation: "The two subjects joined by and take the plural verb organise.", tokens: ["reading", "organise", "The", "prefect", "club.", "and", "the", "librarian", "the"] },
    ],
  },
  {
    concept: "Subject–verb agreement",
    topic: "Collective nouns",
    activities: [
      { type: "mcq", title: "A group acting as one unit", prompt: "The committee ___ its decision after a long meeting.", answer: "announced", explanation: "A collective noun is singular when the group acts together as one unit.", options: ["announce", "announced", "announcing"] },
      { type: "fill", title: "Collective noun in the present", prompt: "The orchestra ___ (perform) a new piece tonight.", answer: "is performing", explanation: "The orchestra is treated as one performing group, so it takes the singular auxiliary is.", },
      { type: "error", title: "Correct collective agreement", prompt: "Correct this sentence: The team are celebrating its victory.", answer: "The team is celebrating its victory.", explanation: "The singular team acts as one unit and takes is with the singular possessive its.", },
      { type: "transform", title: "Show individual group members", prompt: "Rewrite to show separate actions: The jury is discussing the evidence.", answer: "The jury members are discussing the evidence separately.", explanation: "Jury members makes the individuals explicit and therefore takes the plural verb are.", },
      { type: "rearrange", title: "Order a collective-noun sentence", prompt: "Arrange the words so the collective noun agrees with its singular verb.", answer: "The flock of birds was moving towards the lake.", explanation: "The head noun flock is singular, so the verb is was.", tokens: ["lake.", "birds", "The", "towards", "was", "flock", "moving", "of", "the"] },
    ],
  },
  {
    concept: "Subject–verb agreement",
    topic: "Indefinite pronouns",
    activities: [
      { type: "mcq", title: "Singular indefinite pronoun", prompt: "Everyone in the debate club ___ a speaking turn.", answer: "has", explanation: "Everyone is grammatically singular and takes has.", options: ["have", "has", "having"] },
      { type: "fill", title: "Nobody takes a singular verb", prompt: "Nobody ___ (understand) the last clue at first.", answer: "understood", explanation: "Nobody is singular; the past-tense verb is understood.", },
      { type: "error", title: "Correct indefinite-pronoun agreement", prompt: "Correct this sentence: Each of the players have a numbered shirt.", answer: "Each of the players has a numbered shirt.", explanation: "Each is singular even though it is followed by the plural phrase of the players.", },
      { type: "transform", title: "Replace a plural subject", prompt: "Rewrite with everyone: All the students completed the safety quiz.", answer: "Everyone completed the safety quiz.", explanation: "Everyone replaces the plural subject and takes a singular form, completed in the past.", },
      { type: "rearrange", title: "Order an indefinite-pronoun sentence", prompt: "Arrange the words into a complete sentence.", answer: "Someone has left a message for the caretaker.", explanation: "Someone is singular, so the present perfect auxiliary is has.", tokens: ["message", "has", "the", "Someone", "caretaker.", "left", "a", "for"] },
    ],
  },
  {
    concept: "Subject–verb agreement",
    topic: "Either/neither",
    activities: [
      { type: "mcq", title: "Neither with a singular verb", prompt: "Neither of the two explanations ___ convincing.", answer: "is", explanation: "In formal agreement, neither is singular and takes is.", options: ["are", "is", "be"] },
      { type: "fill", title: "Either...or agreement", prompt: "Either the science teacher or the students ___ (present) the demonstration.", answer: "are presenting", explanation: "The nearer subject students is plural, so the verb is are presenting.", },
      { type: "error", title: "Correct either...or agreement", prompt: "Correct this sentence: Either the keys or the spare lock are in the drawer.", answer: "Either the keys or the spare lock is in the drawer.", explanation: "The nearer subject spare lock is singular, so formal agreement uses is.", },
      { type: "transform", title: "Join two negative alternatives", prompt: "Rewrite with neither...nor: The red switch does not start the motor. The blue switch does not start it.", answer: "Neither the red switch nor the blue switch starts the motor.", explanation: "Neither...nor joins two rejected alternatives; the singular compound takes starts.", },
      { type: "rearrange", title: "Order an either...or sentence", prompt: "Arrange the alternatives so the nearer subject controls agreement.", answer: "Either the principal or the teachers are attending the meeting.", explanation: "The nearer subject teachers is plural, so the verb is are attending.", tokens: ["meeting.", "are", "the", "Either", "attending", "teachers", "principal", "or", "the"] },
    ],
  },
  {
    concept: "Subject–verb agreement",
    topic: "Complex subjects and intervening phrases",
    activities: [
      { type: "mcq", title: "Find the head noun", prompt: "The box of old photographs ___ in the attic.", answer: "is", explanation: "The head noun box is singular; the intervening of old photographs does not change agreement.", options: ["are", "is", "were"] },
      { type: "fill", title: "Ignore an intervening phrase", prompt: "The list of required materials ___ (include) a compass.", answer: "includes", explanation: "List is the singular head noun, so the verb takes -s despite the plural materials.", },
      { type: "error", title: "Correct agreement across a phrase", prompt: "Correct this sentence: The quality of the samples vary considerably.", answer: "The quality of the samples varies considerably.", explanation: "Quality is the singular head noun; of the samples is only an intervening phrase.", },
      { type: "transform", title: "Change the head noun number", prompt: "Rewrite for several boxes: The box of tools is beside the bench.", answer: "The boxes of tools are beside the bench.", explanation: "Changing the head noun box to plural boxes requires the plural verb are.", },
      { type: "rearrange", title: "Order a complex-subject sentence", prompt: "Arrange the words so the head noun controls the verb across its intervening phrase.", answer: "The results from the final experiment show a clear pattern.", explanation: "Results is the plural head noun; from the final experiment does not control the verb.", tokens: ["pattern.", "from", "show", "a", "The", "experiment", "results", "final", "clear", "the"] },
    ],
  },
];

const buildSecondaryFocusedQuestions = (): GrammarQuestion[] =>
  SECONDARY_FOCUSED_SPECS.flatMap(({ concept, topic, activities }) =>
    activities.map((activity, index) =>
      q(
        `secondary-focused-${middleRemainingSlug(topic)}-${index + 1}`,
        activity.type,
        `${topic}: ${activity.title}`,
        activity.prompt,
        activity.answer,
        activity.explanation,
        { concept, topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs },
      )
    )
  );

const buildSecondaryFiguresOfSpeechQuestions = (): GrammarQuestion[] =>
  SECONDARY_FIGURES_OF_SPEECH_SPECS.flatMap(({ concept, topic, activities }) =>
    activities.map((activity, index) =>
      q(
        `secondary-figures-${middleRemainingSlug(topic)}-${index + 1}`,
        activity.type,
        `${topic}: ${activity.title}`,
        activity.prompt,
        activity.answer,
        activity.explanation,
        { concept, topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs },
      )
    )
  );

GRAMMAR_LEVELS.find((level) => level.id === "middle")?.questions.push(...buildMiddleRemainingQuestions());

const SECONDARY_PHRASAL_IDIOM_SPECS: SecondaryExpansionSpec[] = [
{ concept: "Phrasal Verbs", topic: "Common phrasal verbs", activities: [
  { type: "mcq", title: "Choose a familiar phrasal verb", prompt: "The school librarian asked us to ___ the borrowed books by Friday.", answer: "give back", explanation: "Give back means to return something to the person or place it came from.", options: ["give back", "look after", "turn up"] },
  { type: "identify", title: "Identify the phrasal verb", prompt: "In “Nisha ran into her cousin at the science fair,” identify the phrasal verb.", answer: "ran into", explanation: "Ran into is a two-word verb meaning met unexpectedly; it is not about physically running into a person here.", options: ["Nisha", "ran into", "science fair"] },
  { type: "fill", title: "Complete a school instruction", prompt: "Please ___ the lights before you leave the art room. (switch)", answer: "switch off", explanation: "Switch off means turn a device or light off, and it fits this practical instruction.", },
  { type: "transform", title: "Replace a single verb", prompt: "Rewrite using a phrasal verb: The coach cancelled the practice because of rain.", answer: "The coach called off the practice because of rain.", explanation: "Call off means cancel, so it preserves the meaning in a natural school context.", },
  { type: "rearrange", title: "Order a common phrasal-verb sentence", prompt: "Arrange the words: up / the / picked / student / litter", answer: "The student picked up the litter.", explanation: "Pick up means lift or collect something; the object litter follows the separable phrasal verb.", tokens: ["litter.", "picked", "The", "up", "student", "the"] },
] },
{ concept: "Phrasal Verbs", topic: "Separable and inseparable phrasal verbs", activities: [
  { type: "mcq", title: "Place a pronoun correctly", prompt: "Which sentence is correct?", answer: "Please turn it down; the music is too loud.", explanation: "Turn down is separable, but a pronoun must come between the verb and particle.", options: ["Please turn down it; the music is too loud.", "Please turn it down; the music is too loud.", "Please turn down the music it."] },
  { type: "fill", title: "Keep an inseparable verb together", prompt: "The hikers ___ an old fort on their route. (come across)", answer: "came across", explanation: "Come across means find or meet by chance and cannot be split: came across an old fort.", },
  { type: "error", title: "Correct particle placement", prompt: "Correct this sentence: The monitor looked the answer up it online.", answer: "The monitor looked up the answer online.", explanation: "Look up can be separated with a noun object, but the extra pronoun it is incorrect; the sentence needs only the answer.", },
  { type: "transform", title: "Move a noun object", prompt: "Rewrite with the object between the verb and particle: The volunteers handed out the leaflets.", answer: "The volunteers handed the leaflets out.", explanation: "Hand out is separable, so a full noun object may stand between handed and out.", },
  { type: "matching", title: "Match verbs with their patterns", prompt: "Match each phrasal verb with the useful pattern it follows.", answer: "look after=inseparable|turn on=separable|run into=inseparable", explanation: "Look after and run into stay together, while turn on can separate around a noun object.", pairs: [{ left: "look after", right: "inseparable" }, { left: "turn on", right: "separable" }, { left: "run into", right: "inseparable" }] },
] },
{ concept: "Phrasal Verbs", topic: "Meaning in context", activities: [
  { type: "mcq", title: "Infer meaning from context", prompt: "After three failed attempts, the robotics team finally figured out why the sensor stopped. What does figured out mean?", answer: "understood or solved", explanation: "In this context, figured out means discovered the reason through thinking and testing.", options: ["forgot", "understood or solved", "carried away"] },
  { type: "identify", title: "Interpret a travel phrase", prompt: "In “We set off before sunrise to reach the hilltop,” what does set off mean?", answer: "started a journey", explanation: "The time before sunrise and the goal of reaching the hilltop show that set off means began travelling.", options: ["started a journey", "stopped moving", "changed direction"] },
  { type: "fill", title: "Use context to choose a verb", prompt: "The debate became noisy, so the chairperson asked everyone to ___ and listen. (calm)", answer: "calm down", explanation: "Calm down means become or make less agitated, which suits the chairperson's request.", },
  { type: "transform", title: "Explain a contextual phrasal verb", prompt: "Rewrite using a single-word verb: The editor looked over my article before publication.", answer: "The editor reviewed my article before publication.", explanation: "Look over means examine or review carefully enough to check something.", },
  { type: "rearrange", title: "Build a context-rich sentence", prompt: "Arrange the words: after / the / match / we / cheered / our / team / on", answer: "We cheered our team on after the match.", explanation: "Cheer on means encourage a person or team; the time phrase comes at the end.", tokens: ["on", "team", "after", "We", "our", "the", "cheered", "match."] },
] },
{ concept: "Phrasal Verbs", topic: "Phrasal verbs in sentences", activities: [
  { type: "mcq", title: "Select the natural sentence", prompt: "Which sentence uses take up correctly?", answer: "Mira took up photography during the holidays.", explanation: "Take up means begin a hobby or activity, so photography is a suitable object.", options: ["Mira took up the bus at noon.", "Mira took up photography during the holidays.", "Mira took up loudly during the holidays."] },
  { type: "fill", title: "Complete a meaningful sentence", prompt: "The committee will ___ the complaint before announcing its decision. (look)", answer: "look into", explanation: "Look into means investigate, which is what a committee does before deciding a complaint.", },
  { type: "error", title: "Repair a phrasal-verb sentence", prompt: "Correct this sentence: The new student gets along the classmates well.", answer: "The new student gets along with the classmates well.", explanation: "Get along requires the preposition with before the people one has a good relationship with.", },
  { type: "transform", title: "Change the sentence focus", prompt: "Rewrite using put off: The organisers delayed the sports day because of the storm.", answer: "The organisers put off the sports day because of the storm.", explanation: "Put off means postpone, so it accurately replaces delayed without changing the reason.", },
  { type: "matching", title: "Match phrasal verbs to sentence meanings", prompt: "Match each phrasal verb with its meaning in a sentence.", answer: "bring up=mention|carry on=continue|work out=solve or understand", explanation: "The surrounding sentence determines whether a phrasal verb means mention, continue or solve.", pairs: [{ left: "bring up", right: "mention" }, { left: "carry on", right: "continue" }, { left: "work out", right: "solve or understand" }] },
] },
{ concept: "Phrasal Verbs", topic: "Phrasal verb transformation", activities: [
  { type: "transform", title: "Transform a verb into a phrasal verb", prompt: "Rewrite using find out: The class discovered the museum's opening time.", answer: "The class found out the museum's opening time.", explanation: "Find out means discover information; found is its past form in this sentence.", },
  { type: "fill", title: "Change the tense of a phrasal verb", prompt: "By next week, the technicians will have ___ the faulty wire. (remove)", answer: "taken out", explanation: "Take out can mean remove; the future perfect uses will have taken out before the object.", },
  { type: "error", title: "Correct a transformed sentence", prompt: "Correct this sentence: The audience was looking forward the final performance.", answer: "The audience was looking forward to the final performance.", explanation: "Look forward to is followed by the preposition to before a noun or -ing form.", },
  { type: "mcq", title: "Choose an equivalent transformation", prompt: "Which sentence has the same meaning as “Please continue with the rehearsal”?", answer: "Please carry on with the rehearsal.", explanation: "Carry on means continue, and carry on with correctly keeps the activity as its complement.", options: ["Please carry out with the rehearsal.", "Please carry on with the rehearsal.", "Please carry over the rehearsal."] },
  { type: "rearrange", title: "Transform words into a request", prompt: "Arrange the words using a phrasal verb: could / you / fill / this / form / in / please", answer: "Could you fill in this form, please?", explanation: "Fill in means complete a form, and the polite question begins with could.", tokens: ["in", "please?", "this", "Could", "fill", "form", "you"] },
] },
{ concept: "Idioms and Expressions", topic: "Common idioms", activities: [
  { type: "mcq", title: "Recognise a common idiom", prompt: "If a classmate says, “That test was a piece of cake,” what does the idiom mean?", answer: "The test was very easy.", explanation: "A piece of cake is an idiom meaning something was easy, not a literal dessert.", options: ["The test included cake.", "The test was very easy.", "The test was impossible."] },
  { type: "identify", title: "Identify an idiomatic expression", prompt: "Which phrase in the sentence is an idiom? “After the announcement, the secret was out of the bag.”", answer: "out of the bag", explanation: "Out of the bag means revealed or no longer secret.", options: ["After the announcement", "the secret", "out of the bag"] },
  { type: "fill", title: "Complete a familiar idiom", prompt: "When the captain encouraged the nervous players, she told them to keep their ___ up.", answer: "chins", explanation: "Keep your chin up means remain cheerful and hopeful during a difficulty.", },
  { type: "transform", title: "Replace a literal explanation", prompt: "Rewrite using an idiom: Aarav revealed the surprise accidentally.", answer: "Aarav let the cat out of the bag accidentally.", explanation: "Let the cat out of the bag means reveal a secret, matching the accidental disclosure.", },
  { type: "matching", title: "Match everyday idioms", prompt: "Match each idiom with its common meaning.", answer: "break the ice=start a friendly conversation|hit the books=study hard|under the weather=feeling unwell", explanation: "These idioms are understood figuratively in ordinary school conversations.", pairs: [{ left: "break the ice", right: "start a friendly conversation" }, { left: "hit the books", right: "study hard" }, { left: "under the weather", right: "feeling unwell" }] },
] },
{ concept: "Idioms and Expressions", topic: "Meaning in context", activities: [
  { type: "mcq", title: "Infer an idiom from a situation", prompt: "The winning team practised every afternoon, so their success did not happen by chance. Which phrase best describes it?", answer: "They earned it through hard work.", explanation: "The context shows effort and preparation rather than luck; the idiom “put in the hours” captures this.", options: ["They put in the hours.", "They spilled the beans.", "They were on thin ice."] },
  { type: "identify", title: "Interpret an expression", prompt: "In “Leena was on thin ice after ignoring the lab rules,” what does on thin ice suggest?", answer: "She was in a risky situation.", explanation: "On thin ice warns that someone's position is unsafe and another mistake could cause trouble.", options: ["She was skating.", "She was in a risky situation.", "She was feeling relaxed."] },
  { type: "fill", title: "Choose an idiom from context", prompt: "The two friends disagreed at first, but they finally saw eye to eye about the project. They finally ___ .", answer: "agreed", explanation: "See eye to eye means agree, especially about an opinion or decision.", },
  { type: "transform", title: "Explain an idiom plainly", prompt: "Rewrite without the idiom: The volunteers went the extra mile to make the fundraiser welcoming.", answer: "The volunteers made an extra effort to make the fundraiser welcoming.", explanation: "Go the extra mile means do more than is expected, so make an extra effort preserves the meaning.", },
  { type: "rearrange", title: "Place an idiom in context", prompt: "Arrange the words: before / the / exam / I / was / a / bundle / of / nerves", answer: "I was a bundle of nerves before the exam.", explanation: "A bundle of nerves describes someone who is extremely anxious, and the time phrase completes the context.", tokens: ["nerves", "a", "exam.", "I", "of", "before", "was", "bundle", "the"] },
] },
{ concept: "Idioms and Expressions", topic: "Matching idioms with meanings", activities: [
  { type: "matching", title: "Match idioms about communication", prompt: "Match each communication idiom with its meaning.", answer: "spill the beans=reveal a secret|get the message=understand the hint|hear it through the grapevine=learn through rumours", explanation: "Each idiom describes a different way information is revealed, understood or passed on.", pairs: [{ left: "spill the beans", right: "reveal a secret" }, { left: "get the message", right: "understand the hint" }, { left: "hear it through the grapevine", right: "learn through rumours" }] },
  { type: "mcq", title: "Match by meaning", prompt: "Which idiom means “to face a difficult task bravely”?", answer: "bite the bullet", explanation: "Bite the bullet means accept and deal with something unpleasant or difficult.", options: ["bite the bullet", "see red", "call it a day"] },
  { type: "fill", title: "Supply the matching idiom", prompt: "The debate became so heated that the moderator decided to ___ and end it for now. (stop working)", answer: "call it a day", explanation: "Call it a day means stop an activity, especially after spending enough time on it.", },
  { type: "identify", title: "Identify the meaning pair", prompt: "In “The new timetable is still up in the air,” which meaning matches the idiom?", answer: "It has not been decided yet.", explanation: "Up in the air means uncertain or undecided, not literally floating.", options: ["It has not been decided yet.", "It has been printed clearly.", "It is flying above the school."] },
  { type: "transform", title: "Use the matched meaning", prompt: "Rewrite using an idiom meaning “be very happy”: The players were very happy after the final whistle.", answer: "The players were on cloud nine after the final whistle.", explanation: "On cloud nine is an idiom for feeling extremely happy or delighted.", },
] },
{ concept: "Idioms and Expressions", topic: "Using idioms appropriately", activities: [
  { type: "mcq", title: "Choose an appropriate register", prompt: "Which sentence uses an idiom naturally in a friendly message to a teammate?", answer: "Great job—you really nailed it!", explanation: "Nail it is an informal expression meaning perform something extremely well, suitable for a friendly message.", options: ["Great job—you really nailed it!", "Great job—you combusted the examination.", "Great job—you are beneath the weather!"] },
  { type: "error", title: "Correct an idiom", prompt: "Correct this sentence: After months of practice, the choir hit the nail on the head in the concert.", answer: "After months of practice, the choir nailed it in the concert.", explanation: "Hit the nail on the head means identify something exactly, whereas nailed it means perform something very well.", },
  { type: "fill", title: "Use an idiom in advice", prompt: "If you want to improve your speech, practise regularly and remember that practice makes ___ .", answer: "perfect", explanation: "Practice makes perfect is suitable advice about improving a skill through repeated effort.", },
  { type: "transform", title: "Adapt an idiom to a formal setting", prompt: "Rewrite for a formal school report without the idiom: The project was a piece of cake for the team.", answer: "The team completed the project very easily.", explanation: "A formal report should state the meaning directly rather than use the conversational idiom piece of cake.", },
  { type: "rearrange", title: "Use an idiom politely", prompt: "Arrange the words as friendly advice: take / your / time / and / do / not / jump / to / conclusions", answer: "Take your time and do not jump to conclusions.", explanation: "Jump to conclusions means decide too quickly without enough evidence; the complete sentence gives considerate advice.", tokens: ["conclusions.", "your", "do", "Take", "to", "time", "not", "and", "jump"] },
] },
{ concept: "Idioms and Expressions", topic: "Idioms in sentences", activities: [
  { type: "mcq", title: "Complete an idiomatic sentence", prompt: "The mystery was difficult, but the detective eventually ___ the truth.", answer: "got to the bottom of", explanation: "Get to the bottom of means investigate until the real cause or truth is known.", options: ["got to the bottom of", "stood under the weather", "broke the ice with"] },
  { type: "fill", title: "Complete a sentence naturally", prompt: "When the lights went out during the play, the actors had to ___ and continue without the microphones.", answer: "make do", explanation: "Make do means manage with what is available when the preferred resources are missing.", },
  { type: "error", title: "Fix an idiom in a sentence", prompt: "Correct this sentence: Priya was feeling in seventh heaven after losing the final.", answer: "Priya was feeling down in the dumps after losing the final.", explanation: "Feeling down in the dumps means sad; in seventh heaven would mean extremely happy and conflicts with the context.", },
  { type: "transform", title: "Add an idiom to a sentence", prompt: "Rewrite with an idiom meaning “start immediately”: The volunteers began cleaning the beach immediately.", answer: "The volunteers got the ball rolling by cleaning the beach.", explanation: "Get the ball rolling means start an activity or process, and the sentence shows the first action.", },
  { type: "matching", title: "Match idioms to complete sentences", prompt: "Match each idiom to the sentence where it fits best.", answer: "a storm in a teacup=The argument was small but seemed dramatic.|when pigs fly=My brother says he will tidy his room when pigs fly.|on the same page=The partners agreed about the plan.", explanation: "The surrounding meaning makes each figurative expression appropriate for one sentence.", pairs: [{ left: "a storm in a teacup", right: "The argument was small but seemed dramatic." }, { left: "when pigs fly", right: "My brother says he will tidy his room when pigs fly." }, { left: "on the same page", right: "The partners agreed about the plan." }] },
] },
];

const buildSecondaryPhrasalIdiomQuestions = (): GrammarQuestion[] =>
SECONDARY_PHRASAL_IDIOM_SPECS.flatMap(({ concept, topic, activities }) =>
  activities.map((activity, index) =>
    q(
      `secondary-${middleRemainingSlug(concept)}-${middleRemainingSlug(topic)}-${index + 1}`,
      activity.type,
      `${topic}: ${activity.title}`,
      activity.prompt,
      activity.answer,
      activity.explanation,
      { concept, topic, options: activity.options, tokens: activity.tokens, pairs: activity.pairs },
    ),
  ),
);

GRAMMAR_LEVELS.find((level) => level.id === "secondary")?.questions.push(...buildSecondaryPhrasesClausesQuestions(), ...buildSecondaryAdditionalQuestions(), ...buildSecondaryFocusedQuestions(), ...buildSecondaryFiguresOfSpeechQuestions(), ...buildSecondaryPhrasalIdiomQuestions());

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
