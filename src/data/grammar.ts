// Grammar Curriculum Data - Complete 6-Level Framework
// Each level contains categories, concepts, and 10 activities per concept

export type ActivityType = 'mcq' | 'matching' | 'dragdrop' | 'fillblank' | 'error';

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  options?: string[];
  answer: string | string[] | { left: string; right: string }[];
  explanation: string;
  items?: string[]; // for drag-drop
  correctOrder?: string[]; // for drag-drop
}

export interface Concept {
  id: string;
  name: string;
  activities: Activity[];
}

export interface Category {
  id: string;
  name: string;
  concepts: Concept[];
}

export interface Level {
  id: string;
  name: string;
  ageRange: string;
  color: string;
  categories: Category[];
}

// Helper to generate activity IDs
let activityCounter = 0;
const genId = (prefix: string) => `${prefix}-${++activityCounter}`;

// ============================================
// LEVEL 1: PRE-PRIMARY (Nursery-UKG, ages 3-5)
// ============================================

const prePrimaryActivities = {
  alphabet: [
    { type: 'mcq' as ActivityType, question: 'Which letter comes after A?', options: ['B', 'C', 'D'], answer: 'B', explanation: 'The alphabet order is A, B, C, D...' },
    { type: 'mcq' as ActivityType, question: 'Which is a capital letter?', options: ['a', 'b', 'C', 'd'], answer: 'C', explanation: 'Capital letters are big letters like A, B, C.' },
    { type: 'matching' as ActivityType, question: 'Match capital to small letters', answer: [{ left: 'A', right: 'a' }, { left: 'B', right: 'b' }, { left: 'C', right: 'c' }], explanation: 'Each capital letter has a small letter match.' },
    { type: 'mcq' as ActivityType, question: 'What letter does "apple" start with?', options: ['A', 'B', 'C'], answer: 'A', explanation: 'Apple starts with the letter A.' },
    { type: 'dragdrop' as ActivityType, question: 'Put letters in order', items: ['C', 'A', 'B'], correctOrder: ['A', 'B', 'C'], answer: ['A', 'B', 'C'], explanation: 'Alphabet order: A, B, C.' },
    { type: 'mcq' as ActivityType, question: 'Which letter comes before D?', options: ['B', 'C', 'E'], answer: 'C', explanation: 'C comes before D in the alphabet.' },
    { type: 'matching' as ActivityType, question: 'Match the letter to the word', answer: [{ left: 'B', right: 'Ball' }, { left: 'C', right: 'Cat' }, { left: 'D', right: 'Dog' }], explanation: 'B for Ball, C for Cat, D for Dog.' },
    { type: 'mcq' as ActivityType, question: 'How many letters are in the English alphabet?', options: ['24', '26', '28'], answer: '26', explanation: 'There are 26 letters from A to Z.' },
    { type: 'dragdrop' as ActivityType, question: 'Arrange in alphabetical order', items: ['Z', 'A', 'M'], correctOrder: ['A', 'M', 'Z'], answer: ['A', 'M', 'Z'], explanation: 'A comes first, then M, then Z.' },
    { type: 'mcq' as ActivityType, question: 'Which is the last letter of the alphabet?', options: ['X', 'Y', 'Z'], answer: 'Z', explanation: 'Z is the last letter.' }
  ],
  vowels: [
    { type: 'mcq' as ActivityType, question: 'Which is a vowel?', options: ['A', 'B', 'C'], answer: 'A', explanation: 'Vowels are A, E, I, O, U.' },
    { type: 'mcq' as ActivityType, question: 'Which letter is NOT a vowel?', options: ['E', 'I', 'T'], answer: 'T', explanation: 'T is a consonant, not a vowel.' },
    { type: 'matching' as ActivityType, question: 'Match vowel to word', answer: [{ left: 'A', right: 'Apple' }, { left: 'E', right: 'Elephant' }, { left: 'I', right: 'Ice' }], explanation: 'A for Apple, E for Elephant, I for Ice.' },
    { type: 'mcq' as ActivityType, question: 'How many vowels are there?', options: ['3', '5', '7'], answer: '5', explanation: 'There are 5 vowels: A, E, I, O, U.' },
    { type: 'dragdrop' as ActivityType, question: 'Put vowels in order', items: ['U', 'A', 'E', 'I', 'O'], correctOrder: ['A', 'E', 'I', 'O', 'U'], answer: ['A', 'E', 'I', 'O', 'U'], explanation: 'Vowels in order: A, E, I, O, U.' },
    { type: 'mcq' as ActivityType, question: 'Which word starts with a vowel?', options: ['Cat', 'Dog', 'Elephant'], answer: 'Elephant', explanation: 'Elephant starts with E, a vowel.' },
    { type: 'fillblank' as ActivityType, question: 'A, E, I, O, ___', answer: 'U', explanation: 'The last vowel is U.' },
    { type: 'mcq' as ActivityType, question: 'Which is a consonant?', options: ['A', 'E', 'B'], answer: 'B', explanation: 'B is a consonant. Vowels are A, E, I, O, U.' },
    { type: 'matching' as ActivityType, question: 'Match the sound', answer: [{ left: 'A', right: 'ah' }, { left: 'E', right: 'ee' }, { left: 'I', right: 'ih' }], explanation: 'Each vowel has its own sound.' },
    { type: 'mcq' as ActivityType, question: '"Orange" starts with which vowel?', options: ['A', 'O', 'U'], answer: 'O', explanation: 'Orange starts with O.' }
  ],
  nouns: [
    { type: 'mcq' as ActivityType, question: 'Which is a naming word for a person?', options: ['Run', 'Mother', 'Red'], answer: 'Mother', explanation: 'Mother is a person, a naming word.' },
    { type: 'mcq' as ActivityType, question: 'Which is a naming word for an animal?', options: ['Cat', 'Big', 'Jump'], answer: 'Cat', explanation: 'Cat is an animal, a naming word.' },
    { type: 'matching' as ActivityType, question: 'Match person to naming word', answer: [{ left: 'Person', right: 'Teacher' }, { left: 'Animal', right: 'Dog' }, { left: 'Thing', right: 'Ball' }], explanation: 'Teacher is a person, Dog is an animal, Ball is a thing.' },
    { type: 'mcq' as ActivityType, question: 'Which word names a thing?', options: ['Book', 'Run', 'Happy'], answer: 'Book', explanation: 'Book is a thing you can name.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort: People, Animals, Things', items: ['Dog', 'Mother', 'Ball', 'Cat', 'Father', 'Book'], correctOrder: ['Mother', 'Father', 'Dog', 'Cat', 'Ball', 'Book'], answer: ['Mother', 'Father', 'Dog', 'Cat', 'Ball', 'Book'], explanation: 'People first, then animals, then things.' },
    { type: 'mcq' as ActivityType, question: 'Which is NOT a naming word?', options: ['Sun', 'Run', 'Tree'], answer: 'Run', explanation: 'Run is an action word, not a naming word.' },
    { type: 'matching' as ActivityType, question: 'Match picture to word', answer: [{ left: '🌞', right: 'Sun' }, { left: '🌳', right: 'Tree' }, { left: '🐦', right: 'Bird' }], explanation: 'Match the picture to its naming word.' },
    { type: 'mcq' as ActivityType, question: 'Which names a place?', options: ['Park', 'Run', 'Happy'], answer: 'Park', explanation: 'Park is a place.' },
    { type: 'fillblank' as ActivityType, question: 'A dog is an ___.', answer: 'animal', explanation: 'Dog is an animal.' },
    { type: 'mcq' as ActivityType, question: 'How many naming words? "The cat sits on the mat."', options: ['2', '3', '4'], answer: '3', explanation: 'Cat, mat are naming words. (The is not)' }
  ],
  verbs: [
    { type: 'mcq' as ActivityType, question: 'Which is an action word?', options: ['Run', 'Ball', 'Red'], answer: 'Run', explanation: 'Run is something you do - an action.' },
    { type: 'mcq' as ActivityType, question: 'Which word shows action?', options: ['Jump', 'Cat', 'Big'], answer: 'Jump', explanation: 'Jump is an action you can do.' },
    { type: 'matching' as ActivityType, question: 'Match action to word', answer: [{ left: '🏃', right: 'Run' }, { left: '😴', right: 'Sleep' }, { left: '🍽️', right: 'Eat' }], explanation: 'Match the action picture to the word.' },
    { type: 'mcq' as ActivityType, question: 'Which is NOT an action word?', options: ['Sing', 'Dance', 'Table'], answer: 'Table', explanation: 'Table is a thing, not an action.' },
    { type: 'dragdrop' as ActivityType, question: 'Put actions in order of a day', items: ['Sleep', 'Wake', 'Eat', 'Play'], correctOrder: ['Wake', 'Eat', 'Play', 'Sleep'], answer: ['Wake', 'Eat', 'Play', 'Sleep'], explanation: 'We wake, eat, play, then sleep.' },
    { type: 'mcq' as ActivityType, question: 'Birds can ___.', options: ['Fly', 'Read', 'Write'], answer: 'Fly', explanation: 'Birds fly - it is their action.' },
    { type: 'fillblank' as ActivityType, question: 'Fish ___ in water.', answer: 'swim', explanation: 'Fish swim - swimming is their action.' },
    { type: 'mcq' as ActivityType, question: 'Which action do you do with your eyes?', options: ['See', 'Hear', 'Run'], answer: 'See', explanation: 'We see with our eyes.' },
    { type: 'matching' as ActivityType, question: 'Match body part to action', answer: [{ left: 'Hands', right: 'Clap' }, { left: 'Feet', right: 'Walk' }, { left: 'Mouth', right: 'Talk' }], explanation: 'We clap with hands, walk with feet, talk with mouth.' },
    { type: 'mcq' as ActivityType, question: 'Which is an action word?', options: ['Happy', 'Write', 'Blue'], answer: 'Write', explanation: 'Write is something you do.' }
  ],
  adjectives: [
    { type: 'mcq' as ActivityType, question: 'Which word describes size?', options: ['Big', 'Run', 'Cat'], answer: 'Big', explanation: 'Big tells us about size.' },
    { type: 'mcq' as ActivityType, question: 'Which is a colour word?', options: ['Red', 'Jump', 'Dog'], answer: 'Red', explanation: 'Red is a colour.' },
    { type: 'matching' as ActivityType, question: 'Match opposite words', answer: [{ left: 'Big', right: 'Small' }, { left: 'Hot', right: 'Cold' }, { left: 'Happy', right: 'Sad' }], explanation: 'Big-Small, Hot-Cold, Happy-Sad are opposites.' },
    { type: 'mcq' as ActivityType, question: 'The sun is ___.', options: ['Hot', 'Run', 'Cat'], answer: 'Hot', explanation: 'The sun is hot - hot describes the sun.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort colours', items: ['Red', 'Dog', 'Blue', 'Cat', 'Green'], correctOrder: ['Red', 'Blue', 'Green', 'Dog', 'Cat'], answer: ['Red', 'Blue', 'Green', 'Dog', 'Cat'], explanation: 'Colours first, then animals.' },
    { type: 'mcq' as ActivityType, question: 'Ice cream is ___.', options: ['Cold', 'Run', 'Table'], answer: 'Cold', explanation: 'Ice cream is cold.' },
    { type: 'fillblank' as ActivityType, question: 'The sky is ___.', answer: 'blue', explanation: 'The sky is blue - blue describes the sky.' },
    { type: 'mcq' as ActivityType, question: 'Which describes how something feels?', options: ['Soft', 'Run', 'Book'], answer: 'Soft', explanation: 'Soft tells us how something feels.' },
    { type: 'matching' as ActivityType, question: 'Match describing words', answer: [{ left: 'Tall', right: 'Tree' }, { left: 'Sweet', right: 'Candy' }, { left: 'Loud', right: 'Drum' }], explanation: 'Trees are tall, candy is sweet, drums are loud.' },
    { type: 'mcq' as ActivityType, question: 'A baby elephant is ___.', options: ['Small', 'Run', 'Book'], answer: 'Small', explanation: 'A baby elephant is small.' }
  ],
  pronouns: [
    { type: 'mcq' as ActivityType, question: '___ am a student.', options: ['I', 'He', 'She'], answer: 'I', explanation: 'We use "I" for ourselves.' },
    { type: 'mcq' as ActivityType, question: '___ is my father.', options: ['He', 'She', 'It'], answer: 'He', explanation: 'We use "He" for a boy or man.' },
    { type: 'matching' as ActivityType, question: 'Match pronoun to person', answer: [{ left: 'I', right: 'Myself' }, { left: 'You', right: 'The person I talk to' }, { left: 'He', right: 'A boy' }], explanation: 'I = myself, You = person I talk to, He = a boy.' },
    { type: 'mcq' as ActivityType, question: '___ is a girl.', options: ['She', 'He', 'It'], answer: 'She', explanation: 'We use "She" for a girl or woman.' },
    { type: 'fillblank' as ActivityType, question: '___ is a dog. (for animal)', answer: 'It', explanation: 'We use "It" for animals and things.' },
    { type: 'mcq' as ActivityType, question: '___ are my friends.', options: ['They', 'He', 'She'], answer: 'They', explanation: 'We use "They" for more than one person.' },
    { type: 'dragdrop' as ActivityType, question: 'Match pronoun to sentence', items: ['He runs', 'She sings', 'It barks'], correctOrder: ['He runs', 'She sings', 'It barks'], answer: ['He runs', 'She sings', 'It barks'], explanation: 'He for boys, She for girls, It for animals.' },
    { type: 'mcq' as ActivityType, question: '___ is a book.', options: ['It', 'He', 'She'], answer: 'It', explanation: 'We use "It" for things like books.' },
    { type: 'fillblank' as ActivityType, question: '___ can help me. (talking to someone)', answer: 'You', explanation: 'We use "You" when talking to someone.' },
    { type: 'mcq' as ActivityType, question: '___ like ice cream. (myself)', options: ['I', 'He', 'They'], answer: 'I', explanation: 'I like - talking about myself.' }
  ],
  singular: [
    { type: 'mcq' as ActivityType, question: 'One cat. Two ___.', options: ['cats', 'cat', 'cates'], answer: 'cats', explanation: 'Add "s" for more than one.' },
    { type: 'mcq' as ActivityType, question: 'One dog. Three ___.', options: ['dogs', 'dog', 'doges'], answer: 'dogs', explanation: 'Add "s" for more than one.' },
    { type: 'matching' as ActivityType, question: 'Match one to many', answer: [{ left: 'book', right: 'books' }, { left: 'cat', right: 'cats' }, { left: 'dog', right: 'dogs' }], explanation: 'Add "s" to make more than one.' },
    { type: 'mcq' as ActivityType, question: 'Which means more than one?', options: ['Boxes', 'Box', 'Boxs'], answer: 'Boxes', explanation: 'Words ending in x add "es": box → boxes.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort: One or Many?', items: ['cat', 'cats', 'dog', 'dogs'], correctOrder: ['cat', 'dog', 'cats', 'dogs'], answer: ['cat', 'dog', 'cats', 'dogs'], explanation: 'cat and dog are one; cats and dogs are many.' },
    { type: 'fillblank' as ActivityType, question: 'One baby. Two ___.', answer: 'babies', explanation: 'Baby ends in y, change to "ies": babies.' },
    { type: 'mcq' as ActivityType, question: 'One foot. Two ___.', options: ['feet', 'foots', 'foot'], answer: 'feet', explanation: 'Foot → feet is irregular (special).' },
    { type: 'matching' as ActivityType, question: 'Match singular to plural', answer: [{ left: 'man', right: 'men' }, { left: 'child', right: 'children' }, { left: 'mouse', right: 'mice' }], explanation: 'These are irregular plurals (special words).' },
    { type: 'mcq' as ActivityType, question: 'How many apples? "I have five ___."', options: ['apples', 'apple', 'appleses'], answer: 'apples', explanation: 'Five apples - add "s" for more than one.' },
    { type: 'fillblank' as ActivityType, question: 'One tooth. Two ___.', answer: 'teeth', explanation: 'Tooth → teeth is irregular.' }
  ],
  prepositions: [
    { type: 'mcq' as ActivityType, question: 'The cat is ___ the box. (inside)', options: ['in', 'on', 'under'], answer: 'in', explanation: 'In means inside.' },
    { type: 'mcq' as ActivityType, question: 'The book is ___ the table. (top)', options: ['on', 'in', 'under'], answer: 'on', explanation: 'On means on top of.' },
    { type: 'matching' as ActivityType, question: 'Match position to word', answer: [{ left: '📦⬆️🐱', right: 'on' }, { left: '📦⬇️🐱', right: 'under' }, { left: '📦🐱', right: 'in' }], explanation: 'On = top, Under = below, In = inside.' },
    { type: 'mcq' as ActivityType, question: 'The ball is ___ the chair. (below)', options: ['under', 'on', 'in'], answer: 'under', explanation: 'Under means below.' },
    { type: 'dragdrop' as ActivityType, question: 'Put words in sentence', items: ['The', 'cat', 'is', 'on', 'the', 'mat'], correctOrder: ['The', 'cat', 'is', 'on', 'the', 'mat'], answer: ['The', 'cat', 'is', 'on', 'the', 'mat'], explanation: 'The cat is on the mat.' },
    { type: 'mcq' as ActivityType, question: 'The bird is ___ the tree. (close to)', options: ['near', 'in', 'on'], answer: 'near', explanation: 'Near means close to.' },
    { type: 'fillblank' as ActivityType, question: 'The dog is ___ the house. (behind)', answer: 'behind', explanation: 'Behind means at the back of.' },
    { type: 'mcq' as ActivityType, question: 'I sit ___ my friend. (next to)', options: ['beside', 'in', 'on'], answer: 'beside', explanation: 'Beside means next to.' },
    { type: 'matching' as ActivityType, question: 'Match preposition to meaning', answer: [{ left: 'in', right: 'inside' }, { left: 'on', right: 'on top' }, { left: 'under', right: 'below' }], explanation: 'In = inside, On = on top, Under = below.' },
    { type: 'mcq' as ActivityType, question: 'The sun is ___ us. (above)', options: ['over', 'in', 'on'], answer: 'over', explanation: 'Over means above.' }
  ],
  sentences: [
    { type: 'dragdrop' as ActivityType, question: 'Make a sentence', items: ['I', 'run'], correctOrder: ['I', 'run'], answer: ['I', 'run'], explanation: 'I run - who + what.' },
    { type: 'dragdrop' as ActivityType, question: 'Make a sentence', items: ['Cat', 'sits'], correctOrder: ['Cat', 'sits'], answer: ['Cat', 'sits'], explanation: 'Cat sits - who + what.' },
    { type: 'mcq' as ActivityType, question: 'Which is a complete sentence?', options: ['I run.', 'Run.', 'I.'], answer: 'I run.', explanation: 'A sentence needs who and what.' },
    { type: 'dragdrop' as ActivityType, question: 'Put words in order', items: ['The', 'dog', 'barks'], correctOrder: ['The', 'dog', 'barks'], answer: ['The', 'dog', 'barks'], explanation: 'The dog barks.' },
    { type: 'mcq' as ActivityType, question: 'Which ends with a full stop?', options: ['I play', 'I play.', 'I play?'], answer: 'I play.', explanation: 'Statements end with a full stop.' },
    { type: 'dragdrop' as ActivityType, question: 'Make a sentence', items: ['She', 'is', 'happy'], correctOrder: ['She', 'is', 'happy'], answer: ['She', 'is', 'happy'], explanation: 'She is happy.' },
    { type: 'mcq' as ActivityType, question: 'Which is a question?', options: ['I run.', 'Do you run?', 'Run!'], answer: 'Do you run?', explanation: 'Questions end with ?' },
    { type: 'dragdrop' as ActivityType, question: 'Complete the sentence', items: ['The', 'bird', 'can', 'fly'], correctOrder: ['The', 'bird', 'can', 'fly'], answer: ['The', 'bird', 'can', 'fly'], explanation: 'The bird can fly.' },
    { type: 'fillblank' as ActivityType, question: 'I ___ a student.', answer: 'am', explanation: 'I am a student.' },
    { type: 'mcq' as ActivityType, question: 'Which sentence is correct?', options: ['Cat the sits.', 'The cat sits.', 'Sits cat the.'], answer: 'The cat sits.', explanation: 'Sentences start with who/what.' }
  ],
  rhyming: [
    { type: 'mcq' as ActivityType, question: 'Which word rhymes with "cat"?', options: ['hat', 'dog', 'cup'], answer: 'hat', explanation: 'Cat and hat rhyme - same ending sound.' },
    { type: 'matching' as ActivityType, question: 'Match rhyming words', answer: [{ left: 'cat', right: 'hat' }, { left: 'dog', right: 'log' }, { left: 'sun', right: 'fun' }], explanation: 'Rhyming words sound the same at the end.' },
    { type: 'mcq' as ActivityType, question: 'Which rhymes with "ball"?', options: ['wall', 'cup', 'pen'], answer: 'wall', explanation: 'Ball and wall rhyme.' },
    { type: 'dragdrop' as ActivityType, question: 'Group rhyming words', items: ['cat', 'dog', 'hat', 'log', 'bat', 'fog'], correctOrder: ['cat', 'hat', 'bat', 'dog', 'log', 'fog'], answer: ['cat', 'hat', 'bat', 'dog', 'log', 'fog'], explanation: 'Cat-hat-bat rhyme; dog-log-fog rhyme.' },
    { type: 'mcq' as ActivityType, question: 'Which rhymes with "red"?', options: ['bed', 'cup', 'sun'], answer: 'bed', explanation: 'Red and bed rhyme.' },
    { type: 'fillblank' as ActivityType, question: 'Ring-a-ring-a ___', answer: 'roses', explanation: 'Ring-a-ring-a roses.' },
    { type: 'mcq' as ActivityType, question: 'Which rhymes with "light"?', options: ['night', 'dark', 'day'], answer: 'night', explanation: 'Light and night rhyme.' },
    { type: 'matching' as ActivityType, question: 'Find the rhyming pair', answer: [{ left: 'moon', right: 'soon' }, { left: 'star', right: 'far' }, { left: 'tree', right: 'see' }], explanation: 'Moon-soon, star-far, tree-see rhyme.' },
    { type: 'mcq' as ActivityType, question: 'Which rhymes with "play"?', options: ['day', 'run', 'sit'], answer: 'day', explanation: 'Play and day rhyme.' },
    { type: 'dragdrop' as ActivityType, question: 'Put rhyming words together', items: ['cat', 'dog', 'hat', 'log'], correctOrder: ['cat', 'hat', 'dog', 'log'], answer: ['cat', 'hat', 'dog', 'log'], explanation: 'Cat-hat rhyme; dog-log rhyme.' }
  ]
};

// Continue with Primary, Middle, Secondary, Senior Secondary, and Graduation levels...
// Due to space constraints, I'll create a comprehensive but condensed version

const primaryActivities = {
  commonProperNouns: [
    { type: 'mcq' as ActivityType, question: 'Which is a common noun?', options: ['city', 'Delhi', 'Ravi'], answer: 'city', explanation: 'City is a common noun (general).' },
    { type: 'mcq' as ActivityType, question: 'Which is a proper noun?', options: ['boy', 'girl', 'Ravi'], answer: 'Ravi', explanation: 'Ravi is a proper noun (specific name).' },
    { type: 'matching' as ActivityType, question: 'Match common to proper', answer: [{ left: 'city', right: 'Delhi' }, { left: 'country', right: 'India' }, { left: 'river', right: 'Ganga' }], explanation: 'Common nouns are general; proper nouns are specific names.' },
    { type: 'mcq' as ActivityType, question: 'Which needs a capital letter?', options: ['dog', 'school', 'Monday'], answer: 'Monday', explanation: 'Days of the week need capital letters.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort: Common or Proper?', items: ['teacher', 'Mrs. Smith', 'school', 'DPS', 'boy', 'Raju'], correctOrder: ['teacher', 'school', 'boy', 'Mrs. Smith', 'DPS', 'Raju'], answer: ['teacher', 'school', 'boy', 'Mrs. Smith', 'DPS', 'Raju'], explanation: 'Common nouns first, then proper nouns.' },
    { type: 'fillblank' as ActivityType, question: 'I live in ___ (city name).', answer: 'Mumbai', explanation: 'City names are proper nouns - need capitals.' },
    { type: 'mcq' as ActivityType, question: 'Which is written correctly?', options: ['india', 'India', 'INDIA'], answer: 'India', explanation: 'Proper nouns start with capital letter.' },
    { type: 'matching' as ActivityType, question: 'Match to proper noun', answer: [{ left: 'month', right: 'January' }, { left: 'festival', right: 'Diwali' }, { left: 'language', right: 'English' }], explanation: 'Specific names are proper nouns.' },
    { type: 'mcq' as ActivityType, question: 'Which sentence is correct?', options: ['i live in delhi.', 'I live in Delhi.', 'I live in delhi.'], answer: 'I live in Delhi.', explanation: 'I and Delhi need capitals.' },
    { type: 'fillblank' as ActivityType, question: 'My name is ___. (your name)', answer: 'Student', explanation: 'Names are proper nouns - always capital.' }
  ],
  plurals: [
    { type: 'mcq' as ActivityType, question: 'One box. Two ___.', options: ['boxes', 'boxs', 'box'], answer: 'boxes', explanation: 'Words ending in x add "es".' },
    { type: 'mcq' as ActivityType, question: 'One baby. Two ___.', options: ['babies', 'babys', 'baby'], answer: 'babies', explanation: 'Words ending in y change to "ies".' },
    { type: 'matching' as ActivityType, question: 'Match singular to plural', answer: [{ left: 'cat', right: 'cats' }, { left: 'box', right: 'boxes' }, { left: 'baby', right: 'babies' }], explanation: 'Different endings need different rules.' },
    { type: 'mcq' as ActivityType, question: 'One child. Two ___.', options: ['children', 'childs', 'childes'], answer: 'children', explanation: 'Child → children is irregular.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by plural rule', items: ['cats', 'boxes', 'babies', 'dogs', 'wishes', 'cities'], correctOrder: ['cats', 'dogs', 'boxes', 'wishes', 'babies', 'cities'], answer: ['cats', 'dogs', 'boxes', 'wishes', 'babies', 'cities'], explanation: '+s, +es, -y+ies rules.' },
    { type: 'fillblank' as ActivityType, question: 'One foot. Two ___.', answer: 'feet', explanation: 'Foot → feet is irregular.' },
    { type: 'mcq' as ActivityType, question: 'One mouse. Two ___.', options: ['mice', 'mouses', 'mouse'], answer: 'mice', explanation: 'Mouse → mice is irregular.' },
    { type: 'matching' as ActivityType, question: 'Match irregular plurals', answer: [{ left: 'man', right: 'men' }, { left: 'woman', right: 'women' }, { left: 'tooth', right: 'teeth' }], explanation: 'These change completely.' },
    { type: 'mcq' as ActivityType, question: 'Which is correct?', options: ['three childs', 'three children', 'three child'], answer: 'three children', explanation: 'Three needs plural: children.' },
    { type: 'fillblank' as ActivityType, question: 'One leaf. Two ___.', answer: 'leaves', explanation: 'Leaf → leaves (f changes to v+es).' }
  ],
  tenses: [
    { type: 'mcq' as ActivityType, question: 'I ___ to school every day. (present)', options: ['go', 'went', 'will go'], answer: 'go', explanation: 'Present tense for daily actions.' },
    { type: 'mcq' as ActivityType, question: 'I ___ to school yesterday. (past)', options: ['go', 'went', 'will go'], answer: 'went', explanation: 'Past tense for yesterday.' },
    { type: 'matching' as ActivityType, question: 'Match tense to time', answer: [{ left: 'play', right: 'now/every day' }, { left: 'played', right: 'yesterday' }, { left: 'will play', right: 'tomorrow' }], explanation: 'Present = now, Past = before, Future = after.' },
    { type: 'mcq' as ActivityType, question: 'She ___ a letter tomorrow. (future)', options: ['writes', 'wrote', 'will write'], answer: 'will write', explanation: 'Future tense uses "will".' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by tense', items: ['I play', 'I played', 'I will play'], correctOrder: ['I play', 'I played', 'I will play'], answer: ['I play', 'I played', 'I will play'], explanation: 'Present, Past, Future order.' },
    { type: 'fillblank' as ActivityType, question: 'He ___ (go) to school yesterday.', answer: 'went', explanation: 'Yesterday needs past tense: went.' },
    { type: 'mcq' as ActivityType, question: 'Which is present continuous?', options: ['I eat', 'I am eating', 'I ate'], answer: 'I am eating', explanation: 'Am/is/are + -ing = present continuous.' },
    { type: 'matching' as ActivityType, question: 'Match verb forms', answer: [{ left: 'go', right: 'went' }, { left: 'eat', right: 'ate' }, { left: 'see', right: 'saw' }], explanation: 'These are past tense forms.' },
    { type: 'mcq' as ActivityType, question: 'They ___ playing now.', options: ['are', 'was', 'were'], answer: 'are', explanation: 'They + are (present continuous).' },
    { type: 'fillblank' as ActivityType, question: 'She ___ (come) tomorrow.', answer: 'will come', explanation: 'Tomorrow needs future: will come.' }
  ],
  articles: [
    { type: 'mcq' as ActivityType, question: 'I saw ___ elephant.', options: ['a', 'an', 'the'], answer: 'an', explanation: 'Elephant starts with vowel sound - use "an".' },
    { type: 'mcq' as ActivityType, question: 'I have ___ book.', options: ['a', 'an', 'the'], answer: 'a', explanation: 'Book starts with consonant sound - use "a".' },
    { type: 'matching' as ActivityType, question: 'Match to article', answer: [{ left: 'apple', right: 'an' }, { left: 'ball', right: 'a' }, { left: 'sun', right: 'the' }], explanation: 'Vowel sound = an, consonant = a, specific = the.' },
    { type: 'mcq' as ActivityType, question: '___ sun is hot.', options: ['A', 'An', 'The'], answer: 'The', explanation: 'The sun - there is only one sun (specific).' },
    { type: 'dragdrop' as ActivityType, question: 'Choose correct article', items: ['a', 'an', 'the', 'a', 'an'], correctOrder: ['an', 'a', 'the', 'an', 'a'], answer: ['an', 'a', 'the', 'an', 'a'], explanation: 'Match article to word.' },
    { type: 'fillblank' as ActivityType, question: 'I eat ___ orange.', answer: 'an', explanation: 'Orange starts with vowel - use "an".' },
    { type: 'mcq' as ActivityType, question: 'Which is correct?', options: ['a umbrella', 'an umbrella', 'the umbrella'], answer: 'an umbrella', explanation: 'Umbrella starts with vowel sound.' },
    { type: 'matching' as ActivityType, question: 'Match sentence to article', answer: [{ left: '___ hour', right: 'an' }, { left: '___ cat', right: 'a' }, { left: '___ moon', right: 'the' }], explanation: 'Hour = an (silent h), cat = a, moon = the (one moon).' },
    { type: 'mcq' as ActivityType, question: 'I want ___ water.', options: ['a', 'an', 'some'], answer: 'some', explanation: 'Water is uncountable - use "some".' },
    { type: 'fillblank' as ActivityType, question: 'He is ___ honest man.', answer: 'an', explanation: 'Honest starts with vowel sound (silent h).' }
  ],
  prepositionsPrimary: [
    { type: 'mcq' as ActivityType, question: 'The cat is ___ the table. (on top)', options: ['on', 'in', 'at'], answer: 'on', explanation: 'On = on top of.' },
    { type: 'mcq' as ActivityType, question: 'I go ___ school. (to that place)', options: ['to', 'at', 'in'], answer: 'to', explanation: 'To = direction/movement.' },
    { type: 'matching' as ActivityType, question: 'Match preposition to meaning', answer: [{ left: 'in', right: 'inside' }, { left: 'on', right: 'on top' }, { left: 'at', right: 'at a point' }], explanation: 'Different prepositions for different positions.' },
    { type: 'mcq' as ActivityType, question: 'He arrived ___ 5 o\'clock.', options: ['in', 'on', 'at'], answer: 'at', explanation: 'At for specific time.' },
    { type: 'dragdrop' as ActivityType, question: 'Choose correct preposition', items: ['in', 'on', 'at', 'in', 'on'], correctOrder: ['at', 'on', 'in', 'at', 'on'], answer: ['at', 'on', 'in', 'at', 'on'], explanation: 'Match preposition to context.' },
    { type: 'fillblank' as ActivityType, question: 'My birthday is ___ Monday.', answer: 'on', explanation: 'On for days.' },
    { type: 'mcq' as ActivityType, question: 'I was born ___ 2010.', options: ['in', 'on', 'at'], answer: 'in', explanation: 'In for years.' },
    { type: 'matching' as ActivityType, question: 'Match time preposition', answer: [{ left: 'at', right: '5 o\'clock' }, { left: 'on', right: 'Monday' }, { left: 'in', right: '2010' }], explanation: 'At for time, on for days, in for years.' },
    { type: 'mcq' as ActivityType, question: 'The book is ___ the shelf.', options: ['on', 'in', 'at'], answer: 'on', explanation: 'On the shelf (on top of).' },
    { type: 'fillblank' as ActivityType, question: 'She is good ___ math.', answer: 'at', explanation: 'Good at something.' }
  ]
};

// Middle School Activities
const middleActivities = {
  abstractNouns: [
    { type: 'mcq' as ActivityType, question: 'Which is an abstract noun?', options: ['happiness', 'table', 'dog'], answer: 'happiness', explanation: 'Abstract nouns are feelings/ideas we cannot touch.' },
    { type: 'mcq' as ActivityType, question: 'Which is a material noun?', options: ['gold', 'happiness', 'team'], answer: 'gold', explanation: 'Material nouns are substances we can touch.' },
    { type: 'matching' as ActivityType, question: 'Match noun type', answer: [{ left: 'honesty', right: 'abstract' }, { left: 'gold', right: 'material' }, { left: 'team', right: 'collective' }], explanation: 'Different types of nouns.' },
    { type: 'mcq' as ActivityType, question: 'Which is a collective noun?', options: ['flock', 'happiness', 'water'], answer: 'flock', explanation: 'Collective nouns name groups.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort noun types', items: ['love', 'iron', 'jury', 'freedom', 'silver', 'class'], correctOrder: ['love', 'freedom', 'iron', 'silver', 'jury', 'class'], answer: ['love', 'freedom', 'iron', 'silver', 'jury', 'class'], explanation: 'Abstract, Material, Collective.' },
    { type: 'fillblank' as ActivityType, question: 'A ___ of birds. (group)', answer: 'flock', explanation: 'Flock is the collective noun for birds.' },
    { type: 'mcq' as ActivityType, question: 'Which abstract noun comes from "kind"?', options: ['kindness', 'kindly', 'kinder'], answer: 'kindness', explanation: 'Kind + ness = kindness (abstract noun).' },
    { type: 'matching' as ActivityType, question: 'Match collective nouns', answer: [{ left: 'fish', right: 'school' }, { left: 'lions', right: 'pride' }, { left: 'ships', right: 'fleet' }], explanation: 'Groups have special names.' },
    { type: 'mcq' as ActivityType, question: 'Which is NOT an abstract noun?', options: ['chair', 'bravery', 'truth'], answer: 'chair', explanation: 'Chair is concrete (can touch it).' },
    { type: 'fillblank' as ActivityType, question: 'A ___ of keys.', answer: 'bunch', explanation: 'Bunch is the collective noun for keys.' }
  ],
  tenses16: [
    { type: 'mcq' as ActivityType, question: 'I ___ (eat) lunch now. (Present Continuous)', options: ['eat', 'am eating', 'have eaten'], answer: 'am eating', explanation: 'Now = Present Continuous: am/is/are + -ing.' },
    { type: 'mcq' as ActivityType, question: 'She ___ (finish) her work. (Present Perfect)', options: ['finishes', 'is finishing', 'has finished'], answer: 'has finished', explanation: 'Present Perfect: has/have + past participle.' },
    { type: 'matching' as ActivityType, question: 'Match tense to structure', answer: [{ left: 'Present Perfect', right: 'has/have + V3' }, { left: 'Past Continuous', right: 'was/were + -ing' }, { left: 'Future Perfect', right: 'will have + V3' }], explanation: 'Each tense has its structure.' },
    { type: 'mcq' as ActivityType, question: 'They ___ (play) when it rained. (Past Continuous)', options: ['played', 'were playing', 'had played'], answer: 'were playing', explanation: 'Past Continuous: was/were + -ing.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort tenses', items: ['I eat', 'I am eating', 'I have eaten', 'I have been eating'], correctOrder: ['I eat', 'I am eating', 'I have eaten', 'I have been eating'], answer: ['I eat', 'I am eating', 'I have eaten', 'I have been eating'], explanation: 'Simple, Continuous, Perfect, Perfect Continuous.' },
    { type: 'fillblank' as ActivityType, question: 'He ___ (go) before I arrived. (Past Perfect)', answer: 'had gone', explanation: 'Past Perfect: had + past participle.' },
    { type: 'mcq' as ActivityType, question: 'By next year, I ___ (complete) my degree. (Future Perfect)', options: ['complete', 'will complete', 'will have completed'], answer: 'will have completed', explanation: 'Future Perfect: will have + past participle.' },
    { type: 'matching' as ActivityType, question: 'Match sentence to tense', answer: [{ left: 'I write', right: 'Simple Present' }, { left: 'I am writing', right: 'Present Continuous' }, { left: 'I have written', right: 'Present Perfect' }], explanation: 'Identify the tense.' },
    { type: 'mcq' as ActivityType, question: 'She ___ (study) for 2 hours. (Present Perfect Continuous)', options: ['studies', 'is studying', 'has been studying'], answer: 'has been studying', explanation: 'Present Perfect Continuous: has/have been + -ing.' },
    { type: 'fillblank' as ActivityType, question: 'They ___ (live) here since 2010. (Present Perfect Continuous)', answer: 'have been living', explanation: 'Since 2010 = duration until now = Present Perfect Continuous.' }
  ],
  clauses: [
    { type: 'mcq' as ActivityType, question: 'Which is an independent clause?', options: ['I play', 'because I play', 'when I play'], answer: 'I play', explanation: 'Independent clause can stand alone.' },
    { type: 'mcq' as ActivityType, question: 'Which is a dependent clause?', options: ['She sings', 'Because she is happy', 'They play'], answer: 'Because she is happy', explanation: 'Dependent clause cannot stand alone.' },
    { type: 'matching' as ActivityType, question: 'Match clause type', answer: [{ left: 'I play', right: 'Independent' }, { left: 'when I play', right: 'Dependent' }, { left: 'because I am happy', right: 'Dependent' }], explanation: 'Independent = complete thought.' },
    { type: 'mcq' as ActivityType, question: 'Which word starts a dependent clause?', options: ['and', 'because', 'she'], answer: 'because', explanation: 'Because, when, if start dependent clauses.' },
    { type: 'dragdrop' as ActivityType, question: 'Identify clause types', items: ['I eat', 'when I eat', 'she runs', 'because she runs'], correctOrder: ['I eat', 'she runs', 'when I eat', 'because she runs'], answer: ['I eat', 'she runs', 'when I eat', 'because she runs'], explanation: 'Independent first, then dependent.' },
    { type: 'fillblank' as ActivityType, question: '___ it rains, we will stay home. (dependent clause starter)', answer: 'If', explanation: 'If starts a dependent clause.' },
    { type: 'mcq' as ActivityType, question: 'Which sentence has two independent clauses?', options: ['I play and she sings', 'I play because she sings', 'When I play, she sings'], answer: 'I play and she sings', explanation: 'Both parts can stand alone.' },
    { type: 'matching' as ActivityType, question: 'Match clause to type', answer: [{ left: 'What he said', right: 'Noun clause' }, { left: 'who is tall', right: 'Adjective clause' }, { left: 'because he ran', right: 'Adverb clause' }], explanation: 'Different clause types.' },
    { type: 'mcq' as ActivityType, question: 'The book ___ I bought is good. (relative clause)', options: ['what', 'which', 'when'], answer: 'which', explanation: 'Which introduces a relative (adjective) clause.' },
    { type: 'fillblank' as ActivityType, question: 'I know ___ he lives. (noun clause)', answer: 'where', explanation: 'Where introduces a noun clause.' }
  ],
  voice: [
    { type: 'mcq' as ActivityType, question: 'Which is active voice?', options: ['The cat chased the mouse', 'The mouse was chased by the cat'], answer: 'The cat chased the mouse', explanation: 'Active: subject does the action.' },
    { type: 'mcq' as ActivityType, question: 'Which is passive voice?', options: ['She writes a letter', 'A letter is written by her'], answer: 'A letter is written by her', explanation: 'Passive: subject receives the action.' },
    { type: 'matching' as ActivityType, question: 'Match active to passive', answer: [{ left: 'I eat rice', right: 'Rice is eaten by me' }, { left: 'She sings', right: 'A song is sung by her' }, { left: 'They play', right: 'A game is played by them' }], explanation: 'Convert active to passive.' },
    { type: 'mcq' as ActivityType, question: 'Change to passive: "He writes a letter"', options: ['A letter is written by him', 'A letter was written by him', 'A letter writes him'], answer: 'A letter is written by him', explanation: 'Present: is/am/are + past participle.' },
    { type: 'dragdrop' as ActivityType, question: 'Convert to passive', items: ['The', 'cake', 'was', 'eaten', 'by', 'her'], correctOrder: ['The', 'cake', 'was', 'eaten', 'by', 'her'], answer: ['The', 'cake', 'was', 'eaten', 'by', 'her'], explanation: 'Past passive: was/were + past participle.' },
    { type: 'fillblank' as ActivityType, question: 'The window ___ (break) by the ball. (passive, past)', answer: 'was broken', explanation: 'Past passive: was + broken.' },
    { type: 'mcq' as ActivityType, question: 'Which tense? "The work will be done."', options: ['Future passive', 'Present passive', 'Past passive'], answer: 'Future passive', explanation: 'Will be + past participle = future passive.' },
    { type: 'matching' as ActivityType, question: 'Match voice to sentence', answer: [{ left: 'Active', right: 'She cooks food' }, { left: 'Passive', right: 'Food is cooked by her' }, { left: 'Active', right: 'They built the house' }], explanation: 'Identify the voice.' },
    { type: 'mcq' as ActivityType, question: 'Change to active: "The song was sung by her"', options: ['She sang the song', 'She sings the song', 'She will sing the song'], answer: 'She sang the song', explanation: 'Past passive → past active.' },
    { type: 'fillblank' as ActivityType, question: 'English ___ (speak) worldwide. (passive, present)', answer: 'is spoken', explanation: 'Present passive: is + spoken.' }
  ],
  conditionals: [
    { type: 'mcq' as ActivityType, question: 'Type 1: If it rains, I ___ stay home.', options: ['will', 'would', 'had'], answer: 'will', explanation: 'Type 1 (real future): If + present, will + base.' },
    { type: 'mcq' as ActivityType, question: 'Type 2: If I ___ rich, I would travel.', options: ['am', 'was', 'were'], answer: 'were', explanation: 'Type 2 (unreal present): If + past (were), would + base.' },
    { type: 'matching' as ActivityType, question: 'Match conditional type', answer: [{ left: 'Type 1', right: 'If it rains, I will go' }, { left: 'Type 2', right: 'If I were you, I would go' }, { left: 'Type 3', right: 'If I had known, I would have gone' }], explanation: 'Three types of conditionals.' },
    { type: 'mcq' as ActivityType, question: 'Type 3: If I had studied, I ___ passed.', options: ['will have', 'would have', 'would'], answer: 'would have', explanation: 'Type 3 (unreal past): If + past perfect, would have + past participle.' },
    { type: 'dragdrop' as ActivityType, question: 'Build conditional sentence', items: ['If', 'it', 'rains', 'I', 'will', 'stay'], correctOrder: ['If', 'it', 'rains', 'I', 'will', 'stay'], answer: ['If', 'it', 'rains', 'I', 'will', 'stay'], explanation: 'Type 1 conditional structure.' },
    { type: 'fillblank' as ActivityType, question: 'If I ___ you, I would apologize. (Type 2)', answer: 'were', explanation: 'Type 2: If + were (subjunctive).' },
    { type: 'mcq' as ActivityType, question: 'Which is Type 1?', options: ['If it rains, I will stay', 'If I were rich, I would travel', 'If I had known, I would have helped'], answer: 'If it rains, I will stay', explanation: 'Type 1: real future possibility.' },
    { type: 'matching' as ActivityType, question: 'Match conditional to meaning', answer: [{ left: 'Type 1', right: 'Real future' }, { left: 'Type 2', right: 'Unreal present' }, { left: 'Type 3', right: 'Unreal past' }], explanation: 'Different meanings.' },
    { type: 'mcq' as ActivityType, question: 'If she had come, she ___ met him. (Type 3)', options: ['will have', 'would have', 'would'], answer: 'would have', explanation: 'Type 3: would have + past participle.' },
    { type: 'fillblank' as ActivityType, question: 'If it snows tomorrow, we ___ build a snowman. (Type 1)', answer: 'will', explanation: 'Type 1: will + base verb.' }
  ]
};

// Secondary, Senior Secondary, Graduation activities (condensed for space)
const secondaryActivities = {
  advancedTenses: [
    { type: 'mcq' as ActivityType, question: 'By the time we arrived, the movie ___.', options: ['started', 'had started', 'has started'], answer: 'had started', explanation: 'Past perfect for action before another past action.' },
    { type: 'mcq' as ActivityType, question: 'She ___ for the exam all day. (Present Perfect Continuous)', options: ['studies', 'has been studying', 'is studying'], answer: 'has been studying', explanation: 'Duration until now = Present Perfect Continuous.' },
    { type: 'matching' as ActivityType, question: 'Match tense to usage', answer: [{ left: 'Past Perfect', right: 'Action before another past action' }, { left: 'Future Perfect', right: 'Action completed before future time' }, { left: 'Past Perfect Continuous', right: 'Duration before past time' }], explanation: 'Advanced tense usage.' },
    { type: 'mcq' as ActivityType, question: 'By next year, I ___ here for 10 years.', options: ['will work', 'will have worked', 'will be working'], answer: 'will have worked', explanation: 'Future Perfect: completed before future time.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by tense complexity', items: ['I eat', 'I am eating', 'I have eaten', 'I have been eating'], correctOrder: ['I eat', 'I am eating', 'I have eaten', 'I have been eating'], answer: ['I eat', 'I am eating', 'I have eaten', 'I have been eating'], explanation: 'Simple → Continuous → Perfect → Perfect Continuous.' },
    { type: 'fillblank' as ActivityType, question: 'When I reached the station, the train ___ (leave).', answer: 'had left', explanation: 'Past perfect: train left before I reached.' },
    { type: 'mcq' as ActivityType, question: 'She ___ (wait) for 2 hours when he finally came.', options: ['waited', 'had been waiting', 'was waiting'], answer: 'had been waiting', explanation: 'Past Perfect Continuous: duration before past time.' },
    { type: 'matching' as ActivityType, question: 'Match sentence to tense', answer: [{ left: 'I will have finished', right: 'Future Perfect' }, { left: 'I had been working', right: 'Past Perfect Continuous' }, { left: 'I have been waiting', right: 'Present Perfect Continuous' }], explanation: 'Identify advanced tenses.' },
    { type: 'mcq' as ActivityType, question: 'By 2025, they ___ the project.', options: ['will complete', 'will have completed', 'will be completing'], answer: 'will have completed', explanation: 'Future Perfect: completed before 2025.' },
    { type: 'fillblank' as ActivityType, question: 'He ___ (study) since morning. (Present Perfect Continuous)', answer: 'has been studying', explanation: 'Since morning = duration until now.' }
  ],
  reportedSpeech: [
    { type: 'mcq' as ActivityType, question: 'Direct: He said, "I am happy." Indirect: He said that he ___ happy.', options: ['is', 'was', 'has been'], answer: 'was', explanation: 'Present → Past in reported speech.' },
    { type: 'mcq' as ActivityType, question: 'Direct: She said, "I will come." Indirect: She said that she ___ come.', options: ['will', 'would', 'can'], answer: 'would', explanation: 'Will → Would in reported speech.' },
    { type: 'matching' as ActivityType, question: 'Match direct to indirect', answer: [{ left: '"I am"', right: 'that he was' }, { left: '"I will"', right: 'that he would' }, { left: '"I have"', right: 'that he had' }], explanation: 'Tense changes in reported speech.' },
    { type: 'mcq' as ActivityType, question: 'Direct: He said, "I live here." Indirect: He said that he ___ there.', options: ['lives', 'lived', 'has lived'], answer: 'lived', explanation: 'Present simple → Past simple.' },
    { type: 'dragdrop' as ActivityType, question: 'Convert to indirect speech', items: ['He', 'said', 'that', 'he', 'was', 'happy'], correctOrder: ['He', 'said', 'that', 'he', 'was', 'happy'], answer: ['He', 'said', 'that', 'he', 'was', 'happy'], explanation: 'Reported speech structure.' },
    { type: 'fillblank' as ActivityType, question: 'She said, "I can swim." → She said that she ___ swim.', answer: 'could', explanation: 'Can → Could in reported speech.' },
    { type: 'mcq' as ActivityType, question: 'Direct: He asked, "Where do you live?" Indirect: He asked where I ___.', options: ['live', 'lived', 'am living'], answer: 'lived', explanation: 'Present → Past in reported questions.' },
    { type: 'matching' as ActivityType, question: 'Match reporting verb', answer: [{ left: 'said', right: 'statement' }, { left: 'asked', right: 'question' }, { left: 'ordered', right: 'command' }], explanation: 'Different verbs for different speech types.' },
    { type: 'mcq' as ActivityType, question: 'Direct: He said, "I am going." Indirect: He said that he ___ going.', options: ['is', 'was', 'has been'], answer: 'was', explanation: 'Am → Was in reported speech.' },
    { type: 'fillblank' as ActivityType, question: 'She said, "I will help you." → She said that she ___ help me.', answer: 'would', explanation: 'Will → Would in reported speech.' }
  ],
  sentenceTransformation: [
    { type: 'mcq' as ActivityType, question: 'Simple: He is poor but honest. Compound:', options: ['He is poor and honest', 'He is poor but he is honest', 'Though poor, he is honest'], answer: 'He is poor but he is honest', explanation: 'Simple → Compound: add conjunction + subject.' },
    { type: 'mcq' as ActivityType, question: 'Compound: She sang and he danced. Complex:', options: ['While she sang, he danced', 'She sang and he danced', 'Singing, he danced'], answer: 'While she sang, he danced', explanation: 'Compound → Complex: use subordinating conjunction.' },
    { type: 'matching' as ActivityType, question: 'Match transformation type', answer: [{ left: 'Affirmative → Negative', right: 'He is tall → He is not tall' }, { left: 'Active → Passive', right: 'I eat rice → Rice is eaten by me' }, { left: 'Direct → Indirect', right: '"I am" → he said he was' }], explanation: 'Different transformation types.' },
    { type: 'mcq' as ActivityType, question: 'Change to negative: She can swim.', options: ['She cannot swim', 'She does not swim', 'She is not swimming'], answer: 'She cannot swim', explanation: 'Can → Cannot for negative.' },
    { type: 'dragdrop' as ActivityType, question: 'Transform: Active to Passive', items: ['The', 'cake', 'was', 'eaten', 'by', 'her'], correctOrder: ['The', 'cake', 'was', 'eaten', 'by', 'her'], answer: ['The', 'cake', 'was', 'eaten', 'by', 'her'], explanation: 'Active: She ate the cake → Passive: The cake was eaten by her.' },
    { type: 'fillblank' as ActivityType, question: 'Change degree: He is tall. (Comparative)', answer: 'taller', explanation: 'Tall → Taller (comparative degree).' },
    { type: 'mcq' as ActivityType, question: 'Transform: No one is perfect. (Interrogative)', options: ['Is anyone perfect?', 'Who is perfect?', 'Is no one perfect?'], answer: 'Is anyone perfect?', explanation: 'Negative → Interrogative: No one → Anyone.' },
    { type: 'matching' as ActivityType, question: 'Match transformation', answer: [{ left: 'Simple → Compound', right: 'add conjunction' }, { left: 'Compound → Complex', right: 'use subordinator' }, { left: 'Active → Passive', right: 'change voice' }], explanation: 'Transformation methods.' },
    { type: 'mcq' as ActivityType, question: 'Change voice: They built the house.', options: ['The house was built by them', 'The house is built by them', 'The house has been built'], answer: 'The house was built by them', explanation: 'Past active → Past passive.' },
    { type: 'fillblank' as ActivityType, question: 'Change degree: She is the smartest. (Positive)', answer: 'smart', explanation: 'Smartest → Smart (positive degree).' }
  ]
};

const seniorSecondaryActivities = {
  syntax: [
    { type: 'mcq' as ActivityType, question: 'Which is a simple sentence?', options: ['I play', 'I play and she sings', 'I play because I am happy'], answer: 'I play', explanation: 'Simple sentence: one independent clause.' },
    { type: 'mcq' as ActivityType, question: 'Which is a compound sentence?', options: ['I play', 'I play and she sings', 'I play because I am happy'], answer: 'I play and she sings', explanation: 'Compound: two independent clauses joined.' },
    { type: 'matching' as ActivityType, question: 'Match sentence type', answer: [{ left: 'I play', right: 'Simple' }, { left: 'I play and she sings', right: 'Compound' }, { left: 'I play because I am happy', right: 'Complex' }], explanation: 'Sentence structures.' },
    { type: 'mcq' as ActivityType, question: 'Which has a subordinate clause?', options: ['I play', 'I play and she sings', 'I play because I am happy'], answer: 'I play because I am happy', explanation: 'Complex sentence has subordinate clause.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by complexity', items: ['I play', 'I play and she sings', 'I play because I am happy', 'I play, she sings, and they dance'], correctOrder: ['I play', 'I play and she sings', 'I play because I am happy', 'I play, she sings, and they dance'], answer: ['I play', 'I play and she sings', 'I play because I am happy', 'I play, she sings, and they dance'], explanation: 'Simple → Compound → Complex → Compound-Complex.' },
    { type: 'fillblank' as ActivityType, question: 'I play ___ she sings. (compound conjunction)', answer: 'and', explanation: 'And joins two independent clauses.' },
    { type: 'mcq' as ActivityType, question: 'Which is a complex sentence?', options: ['I play', 'I play and she sings', 'I play because I am happy'], answer: 'I play because I am happy', explanation: 'Complex: independent + dependent clause.' },
    { type: 'matching' as ActivityType, question: 'Match clause to sentence type', answer: [{ left: 'One independent clause', right: 'Simple' }, { left: 'Two independent clauses', right: 'Compound' }, { left: 'Independent + dependent', right: 'Complex' }], explanation: 'Clause structure.' },
    { type: 'mcq' as ActivityType, question: 'Which shows coordination?', options: ['I play and she sings', 'I play because I am happy', 'I play'], answer: 'I play and she sings', explanation: 'Coordination: joining equal clauses.' },
    { type: 'fillblank' as ActivityType, question: 'I play ___ I am happy. (subordination)', answer: 'because', explanation: 'Because introduces subordinate clause.' }
  ],
  morphology: [
    { type: 'mcq' as ActivityType, question: 'Which is a prefix?', options: ['un-', '-ness', '-ly'], answer: 'un-', explanation: 'Prefixes come before the root word.' },
    { type: 'mcq' as ActivityType, question: 'Which is a suffix?', options: ['un-', '-ness', 're-'], answer: '-ness', explanation: 'Suffixes come after the root word.' },
    { type: 'matching' as ActivityType, question: 'Match affix type', answer: [{ left: 'un-', right: 'prefix' }, { left: '-ness', right: 'suffix' }, { left: 're-', right: 'prefix' }], explanation: 'Prefix vs suffix.' },
    { type: 'mcq' as ActivityType, question: 'What does "un-" mean?', options: ['not', 'again', 'very'], answer: 'not', explanation: 'Un- means not: unhappy = not happy.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort affixes', items: ['un-', '-ness', 're-', '-ly', 'dis-', '-ment'], correctOrder: ['un-', 're-', 'dis-', '-ness', '-ly', '-ment'], answer: ['un-', 're-', 'dis-', '-ness', '-ly', '-ment'], explanation: 'Prefixes first, then suffixes.' },
    { type: 'fillblank' as ActivityType, question: 'Happy → Un___ (opposite)', answer: 'happy', explanation: 'Unhappy = not happy.' },
    { type: 'mcq' as ActivityType, question: 'What does "-ness" do?', options: ['Makes adjective from noun', 'Makes noun from adjective', 'Makes verb from noun'], answer: 'Makes noun from adjective', explanation: 'Kind → Kindness (adjective → noun).' },
    { type: 'matching' as ActivityType, question: 'Match word formation', answer: [{ left: 'un + happy', right: 'unhappy' }, { left: 'kind + ness', right: 'kindness' }, { left: 're + write', right: 'rewrite' }], explanation: 'Prefix and suffix usage.' },
    { type: 'mcq' as ActivityType, question: 'Which is derivation?', options: ['happy → happiness', 'cat → cats', 'walk → walked'], answer: 'happy → happiness', explanation: 'Derivation changes word class/meaning.' },
    { type: 'fillblank' as ActivityType, question: 'Teach + er = ___ (person who teaches)', answer: 'teacher', explanation: '-er makes noun from verb (person who does).' }
  ],
  discourseGrammar: [
    { type: 'mcq' as ActivityType, question: 'Which shows contrast?', options: ['however', 'therefore', 'moreover'], answer: 'however', explanation: 'However shows contrast.' },
    { type: 'mcq' as ActivityType, question: 'Which shows result?', options: ['however', 'therefore', 'moreover'], answer: 'therefore', explanation: 'Therefore shows result/consequence.' },
    { type: 'matching' as ActivityType, question: 'Match discourse marker', answer: [{ left: 'however', right: 'contrast' }, { left: 'therefore', right: 'result' }, { left: 'moreover', right: 'addition' }], explanation: 'Different discourse functions.' },
    { type: 'mcq' as ActivityType, question: 'Which adds information?', options: ['however', 'therefore', 'moreover'], answer: 'moreover', explanation: 'Moreover adds more information.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by function', items: ['however', 'therefore', 'moreover', 'nevertheless', 'consequently', 'furthermore'], correctOrder: ['however', 'nevertheless', 'therefore', 'consequently', 'moreover', 'furthermore'], answer: ['however', 'nevertheless', 'therefore', 'consequently', 'moreover', 'furthermore'], explanation: 'Contrast, Result, Addition.' },
    { type: 'fillblank' as ActivityType, question: 'It rained; ___, we stayed home. (result)', answer: 'therefore', explanation: 'Therefore shows result.' },
    { type: 'mcq' as ActivityType, question: 'Which shows concession?', options: ['however', 'nevertheless', 'therefore'], answer: 'nevertheless', explanation: 'Nevertheless shows concession (despite that).' },
    { type: 'matching' as ActivityType, question: 'Match connector to use', answer: [{ left: 'consequently', right: 'result' }, { left: 'furthermore', right: 'addition' }, { left: 'nevertheless', right: 'concession' }], explanation: 'Discourse functions.' },
    { type: 'mcq' as ActivityType, question: 'He is tired; ___, he continues working.', options: ['however', 'therefore', 'nevertheless'], answer: 'nevertheless', explanation: 'Nevertheless = despite that.' },
    { type: 'fillblank' as ActivityType, question: 'She is smart; ___, she is hardworking. (addition)', answer: 'moreover', explanation: 'Moreover adds information.' }
  ]
};

const graduationActivities = {
  advancedSyntax: [
    { type: 'mcq' as ActivityType, question: 'Which shows constituent structure?', options: ['[The cat] [sat]', 'The cat sat', 'Cat sat the'], answer: '[The cat] [sat]', explanation: 'Brackets show constituents (phrase structure).' },
    { type: 'mcq' as ActivityType, question: 'What is a phrase?', options: ['Group of words without subject-verb', 'Complete sentence', 'Single word'], answer: 'Group of words without subject-verb', explanation: 'Phrase: group of words, no subject-verb.' },
    { type: 'matching' as ActivityType, question: 'Match syntactic unit', answer: [{ left: 'Word', right: 'smallest unit' }, { left: 'Phrase', right: 'group of words' }, { left: 'Clause', right: 'subject + verb' }], explanation: 'Syntactic hierarchy.' },
    { type: 'mcq' as ActivityType, question: 'Which is a noun phrase?', options: ['the big cat', 'runs quickly', 'very happy'], answer: 'the big cat', explanation: 'Noun phrase: centered on noun.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by syntactic complexity', items: ['cat', 'the cat', 'the big cat sat', 'The cat that I saw sat'], correctOrder: ['cat', 'the cat', 'the big cat sat', 'The cat that I saw sat'], answer: ['cat', 'the cat', 'the big cat sat', 'The cat that I saw sat'], explanation: 'Word → Phrase → Clause → Complex sentence.' },
    { type: 'fillblank' as ActivityType, question: 'The very tall building is a ___ phrase.', answer: 'noun', explanation: 'Centered on "building" (noun).' },
    { type: 'mcq' as ActivityType, question: 'What is subcategorization?', options: ['What complements a verb takes', 'Word meaning', 'Sentence type'], answer: 'What complements a verb takes', explanation: 'Subcategorization: verb requirements.' },
    { type: 'matching' as ActivityType, question: 'Match phrase type', answer: [{ left: 'NP', right: 'Noun Phrase' }, { left: 'VP', right: 'Verb Phrase' }, { left: 'PP', right: 'Prepositional Phrase' }], explanation: 'Phrase types.' },
    { type: 'mcq' as ActivityType, question: 'Which shows embedding?', options: ['The cat sat', 'The cat that I saw sat', 'The cat and dog sat'], answer: 'The cat that I saw sat', explanation: 'Embedding: clause inside clause.' },
    { type: 'fillblank' as ActivityType, question: 'In "I know that he is tall", "that he is tall" is a ___ clause.', answer: 'complement', explanation: 'Complement clause completes "know".' }
  ],
  semantics: [
    { type: 'mcq' as ActivityType, question: 'Big and large are:', options: ['synonyms', 'antonyms', 'homonyms'], answer: 'synonyms', explanation: 'Synonyms: same meaning.' },
    { type: 'mcq' as ActivityType, question: 'Hot and cold are:', options: ['synonyms', 'antonyms', 'homonyms'], answer: 'antonyms', explanation: 'Antonyms: opposite meaning.' },
    { type: 'matching' as ActivityType, question: 'Match semantic relation', answer: [{ left: 'big/large', right: 'synonymy' }, { left: 'hot/cold', right: 'antonymy' }, { left: 'bank/bank', right: 'polysemy' }], explanation: 'Meaning relationships.' },
    { type: 'mcq' as ActivityType, question: 'Bank (financial) and bank (river) are:', options: ['synonyms', 'homonyms', 'antonyms'], answer: 'homonyms', explanation: 'Homonyms: same form, different meaning.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort semantic relations', items: ['big/large', 'hot/cold', 'bat/bat', 'dog/animal'], correctOrder: ['big/large', 'hot/cold', 'bat/bat', 'dog/animal'], answer: ['big/large', 'hot/cold', 'bat/bat', 'dog/animal'], explanation: 'Synonymy, Antonymy, Homonymy, Hyponymy.' },
    { type: 'fillblank' as ActivityType, question: 'Dog is a ___ of animal.', answer: 'hyponym', explanation: 'Hyponym: specific term (dog) of general (animal).' },
    { type: 'mcq' as ActivityType, question: 'What is polysemy?', options: ['Multiple related meanings', 'Same sound different meaning', 'Opposite meaning'], answer: 'Multiple related meanings', explanation: 'Polysemy: word with related meanings.' },
    { type: 'matching' as ActivityType, question: 'Match semantic concept', answer: [{ left: 'Synonymy', right: 'same meaning' }, { left: 'Antonymy', right: 'opposite meaning' }, { left: 'Hyponymy', right: 'specific-general' }], explanation: 'Semantic relations.' },
    { type: 'mcq' as ActivityType, question: 'Rose is a ___ of flower.', options: ['hyponym', 'hypernym', 'synonym'], answer: 'hyponym', explanation: 'Rose (specific) is hyponym of flower (general).' },
    { type: 'fillblank' as ActivityType, question: 'Animal is a ___ of dog.', answer: 'hypernym', explanation: 'Animal (general) is hypernym of dog (specific).' }
  ],
  pragmatics: [
    { type: 'mcq' as ActivityType, question: '"Can you pass the salt?" is literally a question about:', options: ['ability', 'request', 'command'], answer: 'ability', explanation: 'Literally asks about ability, but functions as request.' },
    { type: 'mcq' as ActivityType, question: 'What is an implicature?', options: ['Implied meaning', 'Literal meaning', 'Grammatical meaning'], answer: 'Implied meaning', explanation: 'Implicature: meaning beyond literal.' },
    { type: 'matching' as ActivityType, question: 'Match speech act', answer: [{ left: 'I promise', right: 'commissive' }, { left: 'I apologize', right: 'expressive' }, { left: 'I order', right: 'directive' }], explanation: 'Speech act types.' },
    { type: 'mcq' as ActivityType, question: '"It\'s cold in here" might imply:', options: ['Close the window', 'The temperature', 'Both'], answer: 'Both', explanation: 'Literal + implied meaning.' },
    { type: 'dragdrop' as ActivityType, question: 'Sort by directness', items: ['Close the door', 'Could you close the door?', 'It\'s cold in here'], correctOrder: ['Close the door', 'Could you close the door?', 'It\'s cold in here'], answer: ['Close the door', 'Could you close the door?', 'It\'s cold in here'], explanation: 'Direct → Indirect requests.' },
    { type: 'fillblank' as ActivityType, question: '"I declare the meeting open" is a ___ act.', answer: 'declarative', explanation: 'Declarations change reality by speaking.' },
    { type: 'mcq' as ActivityType, question: 'What is presupposition?', options: ['Assumed background information', 'Literal meaning', 'Implied request'], answer: 'Assumed background information', explanation: 'Presupposition: what is taken for granted.' },
    { type: 'matching' as ActivityType, question: 'Match pragmatic concept', answer: [{ left: 'Implicature', right: 'implied meaning' }, { left: 'Presupposition', right: 'background assumption' }, { left: 'Speech act', right: 'action by speaking' }], explanation: 'Pragmatic concepts.' },
    { type: 'mcq' as ActivityType, question: '"The King of France is bald" presupposes:', options: ['There is a King of France', 'He is bald', 'Nothing'], answer: 'There is a King of France', explanation: 'Presupposes existence of King.' },
    { type: 'fillblank' as ActivityType, question: '"Could you..." is more ___ than "Do this".', answer: 'polite', explanation: 'Indirect requests are more polite.' }
  ]
};

// Build complete curriculum
export const CURRICULUM: Level[] = [
  {
    id: 'pre-primary',
    name: 'Pre-Primary',
    ageRange: 'Nursery-UKG (3-5 years)',
    color: '#10b981',
    categories: [
      {
        id: 'parts-of-speech',
        name: 'Parts of Speech - Foundation',
        concepts: [
          { id: 'nouns', name: 'Nouns / Naming Words', activities: prePrimaryActivities.nouns.map((a, i) => ({ ...a, id: `pp-nouns-${i}` })) },
          { id: 'verbs', name: 'Verbs / Action Words', activities: prePrimaryActivities.verbs.map((a, i) => ({ ...a, id: `pp-verbs-${i}` })) },
          { id: 'adjectives', name: 'Adjectives / Describing Words', activities: prePrimaryActivities.adjectives.map((a, i) => ({ ...a, id: `pp-adj-${i}` })) },
          { id: 'pronouns', name: 'Pronouns (I, you, he, she, it)', activities: prePrimaryActivities.pronouns.map((a, i) => ({ ...a, id: `pp-pron-${i}` })) }
        ]
      },
      {
        id: 'basic-grammar',
        name: 'Basic Grammar',
        concepts: [
          { id: 'alphabet', name: 'Alphabet', activities: prePrimaryActivities.alphabet.map((a, i) => ({ ...a, id: `pp-alpha-${i}` })) },
          { id: 'vowels', name: 'Vowels and Consonants', activities: prePrimaryActivities.vowels.map((a, i) => ({ ...a, id: `pp-vow-${i}` })) },
          { id: 'singular-plural', name: 'Singular / Plural', activities: prePrimaryActivities.singular.map((a, i) => ({ ...a, id: `pp-sing-${i}` })) },
          { id: 'prepositions', name: 'Basic Prepositions', activities: prePrimaryActivities.prepositions.map((a, i) => ({ ...a, id: `pp-prep-${i}` })) }
        ]
      },
      {
        id: 'sentences',
        name: 'Sentences',
        concepts: [
          { id: 'simple-sentences', name: 'Simple Sentences', activities: prePrimaryActivities.sentences.map((a, i) => ({ ...a, id: `pp-sent-${i}` })) }
        ]
      },
      {
        id: 'language-awareness',
        name: 'Language Awareness',
        concepts: [
          { id: 'rhyming', name: 'Rhyming and Phonics', activities: prePrimaryActivities.rhyming.map((a, i) => ({ ...a, id: `pp-rhyme-${i}` })) }
        ]
      }
    ]
  },
  {
    id: 'primary',
    name: 'Primary',
    ageRange: 'Classes 1-5 (6-10 years)',
    color: '#3b82f6',
    categories: [
      {
        id: 'nouns-primary',
        name: 'Nouns',
        concepts: [
          { id: 'common-proper', name: 'Common and Proper Nouns', activities: primaryActivities.commonProperNouns.map((a, i) => ({ ...a, id: `p-noun-${i}` })) },
          { id: 'plurals', name: 'Plurals (Regular/Irregular)', activities: primaryActivities.plurals.map((a, i) => ({ ...a, id: `p-plur-${i}` })) }
        ]
      },
      {
        id: 'tenses-primary',
        name: 'Tenses',
        concepts: [
          { id: 'basic-tenses', name: 'Basic Tenses', activities: primaryActivities.tenses.map((a, i) => ({ ...a, id: `p-tense-${i}` })) }
        ]
      },
      {
        id: 'articles-primary',
        name: 'Articles',
        concepts: [
          { id: 'a-an-the', name: 'Articles (a, an, the)', activities: primaryActivities.articles.map((a, i) => ({ ...a, id: `p-art-${i}` })) }
        ]
      },
      {
        id: 'prepositions-primary',
        name: 'Prepositions',
        concepts: [
          { id: 'prep-primary', name: 'Prepositions (detailed)', activities: primaryActivities.prepositionsPrimary.map((a, i) => ({ ...a, id: `p-prep-${i}` })) }
        ]
      }
    ]
  },
  {
    id: 'middle',
    name: 'Middle School',
    ageRange: 'Classes 6-8 (11-13 years)',
    color: '#8b5cf6',
    categories: [
      {
        id: 'nouns-middle',
        name: 'Nouns (Advanced)',
        concepts: [
          { id: 'abstract-nouns', name: 'Abstract, Material, Collective Nouns', activities: middleActivities.abstractNouns.map((a, i) => ({ ...a, id: `m-noun-${i}` })) }
        ]
      },
      {
        id: 'tenses-middle',
        name: 'Tenses (16-Tense Module)',
        concepts: [
          { id: 'all-tenses', name: 'All 16 Tenses', activities: middleActivities.tenses16.map((a, i) => ({ ...a, id: `m-tense-${i}` })) }
        ]
      },
      {
        id: 'clauses-middle',
        name: 'Clauses',
        concepts: [
          { id: 'clause-intro', name: 'Introduction to Clauses', activities: middleActivities.clauses.map((a, i) => ({ ...a, id: `m-clause-${i}` })) }
        ]
      },
      {
        id: 'voice-middle',
        name: 'Voice',
        concepts: [
          { id: 'active-passive', name: 'Active and Passive Voice', activities: middleActivities.voice.map((a, i) => ({ ...a, id: `m-voice-${i}` })) }
        ]
      },
      {
        id: 'conditionals-middle',
        name: 'Conditionals',
        concepts: [
          { id: 'conditional-types', name: 'Conditional Sentences (Types 1-3)', activities: middleActivities.conditionals.map((a, i) => ({ ...a, id: `m-cond-${i}` })) }
        ]
      }
    ]
  },
  {
    id: 'secondary',
    name: 'Secondary',
    ageRange: 'Classes 9-10 (14-15 years)',
    color: '#ec4899',
    categories: [
      {
        id: 'tenses-secondary',
        name: 'Advanced Tenses',
        concepts: [
          { id: 'adv-tenses', name: 'Advanced Tense Usage', activities: secondaryActivities.advancedTenses.map((a, i) => ({ ...a, id: `s-tense-${i}` })) }
        ]
      },
      {
        id: 'speech-secondary',
        name: 'Reported Speech',
        concepts: [
          { id: 'reported-speech', name: 'Direct and Indirect Speech', activities: secondaryActivities.reportedSpeech.map((a, i) => ({ ...a, id: `s-speech-${i}` })) }
        ]
      },
      {
        id: 'transformation-secondary',
        name: 'Sentence Transformation',
        concepts: [
          { id: 'sentence-transform', name: 'Sentence Transformation', activities: secondaryActivities.sentenceTransformation.map((a, i) => ({ ...a, id: `s-trans-${i}` })) }
        ]
      }
    ]
  },
  {
    id: 'senior-secondary',
    name: 'Senior Secondary',
    ageRange: 'Classes 11-12 (16-17 years)',
    color: '#f59e0b',
    categories: [
      {
        id: 'syntax-senior',
        name: 'Syntax',
        concepts: [
          { id: 'syntax-intro', name: 'Sentence Structure and Syntax', activities: seniorSecondaryActivities.syntax.map((a, i) => ({ ...a, id: `ss-syntax-${i}` })) }
        ]
      },
      {
        id: 'morphology-senior',
        name: 'Morphology',
        concepts: [
          { id: 'morph-intro', name: 'Word Formation (Morphology)', activities: seniorSecondaryActivities.morphology.map((a, i) => ({ ...a, id: `ss-morph-${i}` })) }
        ]
      },
      {
        id: 'discourse-senior',
        name: 'Discourse Grammar',
        concepts: [
          { id: 'discourse-intro', name: 'Cohesion and Discourse Markers', activities: seniorSecondaryActivities.discourseGrammar.map((a, i) => ({ ...a, id: `ss-disc-${i}` })) }
        ]
      }
    ]
  },
  {
    id: 'graduation',
    name: 'Graduation',
    ageRange: 'Undergraduate (18-21 years)',
    color: '#ef4444',
    categories: [
      {
        id: 'syntax-grad',
        name: 'Advanced Syntax',
        concepts: [
          { id: 'adv-syntax', name: 'Phrase Structure and Constituency', activities: graduationActivities.advancedSyntax.map((a, i) => ({ ...a, id: `g-syntax-${i}` })) }
        ]
      },
      {
        id: 'semantics-grad',
        name: 'Semantics',
        concepts: [
          { id: 'sem-intro', name: 'Meaning Relationships', activities: graduationActivities.semantics.map((a, i) => ({ ...a, id: `g-sem-${i}` })) }
        ]
      },
      {
        id: 'pragmatics-grad',
        name: 'Pragmatics',
        concepts: [
          { id: 'prag-intro', name: 'Context and Speech Acts', activities: graduationActivities.pragmatics.map((a, i) => ({ ...a, id: `g-prag-${i}` })) }
        ]
      }
    ]
  }
];

// Export helper functions
export const getAllLevels = () => CURRICULUM;
export const getLevelById = (id: string) => CURRICULUM.find(l => l.id === id);
export const getTotalActivities = () => {
  let total = 0;
  CURRICULUM.forEach(level => {
    level.categories.forEach(cat => {
      cat.concepts.forEach(concept => {
        total += concept.activities.length;
      });
    });
  });
  return total;
};
