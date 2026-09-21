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
  questions: GrammarQuestion[];
}

const q = (
  id: string,
  type: GrammarExerciseType,
  title: string,
  prompt: string,
  answer: string,
  explanation: string,
  extra: Pick<GrammarQuestion, "options" | "tokens" | "pairs"> & { topic?: string } = {}
): GrammarQuestion => ({
  id,
  type,
  title,
  topic: extra.topic ?? title,
  prompt,
  answer,
  explanation,
  ...extra,
});

export const GRAMMAR_LEVELS: GrammarLevel[] = [
  {
    id: "pre-primary",
    name: "Pre-Primary",
    classes: "Nursery · LKG · UKG",
    blurb: "Build confidence with naming words, action words, sounds and simple sentences.",
    color: "#d24a2b",
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
    ],
  },
  {
    id: "primary",
    name: "Primary",
    classes: "Classes 1–5",
    blurb: "Strengthen nouns, pronouns, verbs, punctuation and the building blocks of clear writing.",
    color: "#0e7c6b",
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
    ],
  },
  {
    id: "middle",
    name: "Middle School",
    classes: "Classes 6–8",
    blurb: "Explore tense, clauses, modifiers, voice and the choices that make sentences precise.",
    color: "#0a8b9e",
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
    ],
  },
  {
    id: "secondary",
    name: "Secondary",
    classes: "Classes 9–10",
    blurb: "Master reported speech, conditionals, clauses and formal sentence control for school writing.",
    color: "#a8720a",
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
    ],
  },
  {
    id: "senior",
    name: "Senior Secondary",
    classes: "Classes 11–12",
    blurb: "Work with nuance: modality, inversion, non-finite clauses and academic precision.",
    color: "#8a44a6",
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
    ],
  },
  {
    id: "graduation",
    name: "Graduation",
    classes: "Undergraduate · Advanced",
    blurb: "Polish advanced grammar for research, professional communication and critical writing.",
    color: "#2460c0",
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
    ],
  },
];

export const GRAMMAR_TOTAL = GRAMMAR_LEVELS.reduce((sum, level) => sum + level.questions.length, 0);

export const grammarKey = (levelId: string, questionId: string) => `grammar:${levelId}:${questionId}`;

export const grammarDone = (checks: Record<string, boolean>) =>
  Object.keys(checks).filter((key) => key.startsWith("grammar:") && checks[key]).length;
