#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const grammarFile = path.join(process.cwd(), 'src/data/grammar.ts');

console.log('Reading grammar.ts...');
const content = fs.readFileSync(grammarFile, 'utf-8');
console.log(`File size: ${(content.length / 1024).toFixed(2)} KB`);

// Extract exports
const exportRegex = /export\s+(const|function|type|interface)\s+(\w+)/g;
const exports = [];
let match;
while ((match = exportRegex.exec(content)) !== null) {
  exports.push({ type: match[1], name: match[2] });
}

// Extract GRAMMAR_LEVELS
const levelsMatch = content.match(/export\s+const\s+GRAMMAR_LEVELS\s*=\s*\[([\s\S]*?)\];/);
const levels = [];
if (levelsMatch) {
  const levelRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*classes:\s*['"]([^'"]+)['"]/g;
  let levelMatch;
  while ((levelMatch = levelRegex.exec(levelsMatch[1])) !== null) {
    levels.push({
      id: levelMatch[1],
      name: levelMatch[2],
      classes: levelMatch[3]
    });
  }
}

// Extract GRAMMAR_TOTAL
const totalMatch = content.match(/export\s+const\s+GRAMMAR_TOTAL\s*=\s*(\d+)/);
const grammarTotal = totalMatch ? parseInt(totalMatch[1]) : null;

// Extract builder functions
const builderRegex = /function\s+(build\w+Questions?)\s*\([^)]*\)\s*:\s*GrammarQuestion\[\]/g;
const builders = [];
let builderMatch;
while ((builderMatch = builderRegex.exec(content)) !== null) {
  builders.push(builderMatch[1]);
}

// Count questions per level by analyzing builder functions
const levelQuestionCounts = {};

// Pre-Primary questions
const prePrimaryMatch = content.match(/buildPrePrimaryQuestions[\s\S]*?return\s*\[([\s\S]*?)\];\s*\}/);
if (prePrimaryMatch) {
  const questionBlocks = prePrimaryMatch[1].match(/q\(/g);
  levelQuestionCounts['pre-primary'] = questionBlocks ? questionBlocks.length : 0;
}

// Primary questions
const primaryMatch = content.match(/buildPrimaryQuestions[\s\S]*?return\s*\[([\s\S]*?)\];\s*\}/);
if (primaryMatch) {
  const questionBlocks = primaryMatch[1].match(/q\(/g);
  levelQuestionCounts['primary'] = questionBlocks ? questionBlocks.length : 0;
}

// Middle level questions (multiple builders)
const middleBuilders = [
  'buildMiddleNounPronounQuestions',
  'buildMiddleDeterminerQuestions',
  'buildMiddleTenseQuestions',
  'buildMiddleModalQuestions',
  'buildMiddleVoiceQuestions',
  'buildMiddleClauseQuestions',
  'buildMiddleSentenceQuestions'
];

let middleTotal = 0;
for (const builder of middleBuilders) {
  const builderMatch = content.match(new RegExp(`${builder}[\\s\\S]*?return\\s*\\[([\\s\\S]*?)\\];\\s*\\}`));
  if (builderMatch) {
    const questionBlocks = builderMatch[1].match(/q\(/g);
    const count = questionBlocks ? questionBlocks.length : 0;
    middleTotal += count;
    levelQuestionCounts[builder] = count;
  }
}
levelQuestionCounts['middle'] = middleTotal;

// Senior Secondary questions
const seniorMatch = content.match(/buildSeniorSecondaryQuestions[\s\S]*?return\s*\[([\s\S]*?)\];\s*\}/);
if (seniorMatch) {
  const questionBlocks = seniorMatch[1].match(/q\(/g);
  levelQuestionCounts['senior-secondary'] = questionBlocks ? questionBlocks.length : 0;
}

// Extract categories and concepts from PRE_PRIMARY_SPECS
const categories = new Set();
const concepts = new Set();

const prePrimarySpecsMatch = content.match(/const\s+PRE_PRIMARY_SPECS\s*=\s*\[([\s\S]*?)\];/);
if (prePrimarySpecsMatch) {
  const conceptRegex = /concept:\s*['"]([^'"]+)['"]/g;
  let conceptMatch;
  while ((conceptMatch = conceptRegex.exec(prePrimarySpecsMatch[1])) !== null) {
    concepts.add(conceptMatch[1]);
  }
}

// Extract topics from question builders
const topicsByLevel = {
  'pre-primary': [],
  'primary': [],
  'middle': [],
  'senior-secondary': []
};

// Pre-Primary topics
if (prePrimarySpecsMatch) {
  const topicRegex = /topic:\s*['"]([^'"]+)['"]/g;
  let topicMatch;
  while ((topicMatch = topicRegex.exec(prePrimarySpecsMatch[1])) !== null) {
    topicsByLevel['pre-primary'].push(topicMatch[1]);
  }
}

// Primary topics
const primaryTopicsMatch = content.match(/buildPrimaryQuestions[\s\S]*?const\s+topics\s*=\s*\[([\s\S]*?)\];/);
if (primaryTopicsMatch) {
  const topicRegex = /topic:\s*['"]([^'"]+)['"]/g;
  let topicMatch;
  while ((topicMatch = topicRegex.exec(primaryTopicsMatch[1])) !== null) {
    topicsByLevel['primary'].push(topicMatch[1]);
  }
}

// Calculate total questions
const calculatedTotal = Object.values(levelQuestionCounts).reduce((sum, count) => sum + count, 0);

// Extract concepts covered at each level
const conceptsByLevel = {
  'pre-primary': new Set(),
  'primary': new Set(),
  'middle': new Set(),
  'senior-secondary': new Set()
};

// Pre-Primary concepts
if (prePrimarySpecsMatch) {
  const conceptRegex = /concept:\s*['"]([^'"]+)['"]/g;
  let conceptMatch;
  while ((conceptMatch = conceptRegex.exec(prePrimarySpecsMatch[1])) !== null) {
    conceptsByLevel['pre-primary'].add(conceptMatch[1]);
  }
}

// Primary concepts - extract from question prompts
const primarySection = content.match(/buildPrimaryQuestions[\s\S]*?return\s*\[([\s\S]*?)\];\s*\}/);
if (primarySection) {
  // Look for concept patterns in questions
  if (primarySection[1].includes('noun') || primarySection[1].includes('Noun')) {
    conceptsByLevel['primary'].add('Nouns');
  }
  if (primarySection[1].includes('verb') || primarySection[1].includes('Verb')) {
    conceptsByLevel['primary'].add('Verbs');
  }
  if (primarySection[1].includes('adjective') || primarySection[1].includes('Adjective')) {
    conceptsByLevel['primary'].add('Adjectives');
  }
  if (primarySection[1].includes('pronoun') || primarySection[1].includes('Pronoun')) {
    conceptsByLevel['primary'].add('Pronouns');
  }
  if (primarySection[1].includes('tense') || primarySection[1].includes('Tense')) {
    conceptsByLevel['primary'].add('Tenses');
  }
  if (primarySection[1].includes('article') || primarySection[1].includes('Article')) {
    conceptsByLevel['primary'].add('Articles');
  }
  if (primarySection[1].includes('preposition') || primarySection[1].includes('Preposition')) {
    conceptsByLevel['primary'].add('Prepositions');
  }
  if (primarySection[1].includes('conjunction') || primarySection[1].includes('Conjunction')) {
    conceptsByLevel['primary'].add('Conjunctions');
  }
}

// Middle concepts
for (const builder of middleBuilders) {
  const builderSection = content.match(new RegExp(`${builder}[\\s\\S]*?return\\s*\\[([\\s\\S]*?)\\];\\s*\\}`));
  if (builderSection) {
    if (builder.includes('Noun') || builder.includes('Pronoun')) {
      conceptsByLevel['middle'].add('Advanced Nouns');
      conceptsByLevel['middle'].add('Advanced Pronouns');
    }
    if (builder.includes('Determiner')) {
      conceptsByLevel['middle'].add('Determiners');
    }
    if (builder.includes('Tense')) {
      conceptsByLevel['middle'].add('Advanced Tenses');
    }
    if (builder.includes('Modal')) {
      conceptsByLevel['middle'].add('Modals');
    }
    if (builder.includes('Voice')) {
      conceptsByLevel['middle'].add('Active/Passive Voice');
    }
    if (builder.includes('Clause')) {
      conceptsByLevel['middle'].add('Clauses');
    }
    if (builder.includes('Sentence')) {
      conceptsByLevel['middle'].add('Sentence Transformation');
    }
  }
}

// Generate JSON audit
const auditData = {
  levels: levels.map(l => l.name),
  categories: Array.from(categories),
  concepts: Array.from(concepts),
  questionCounts: levelQuestionCounts,
  totalQuestions: calculatedTotal,
  grammarTotal: grammarTotal,
  exports: exports.map(e => e.name),
  builders: builders,
  conceptsByLevel: {
    'pre-primary': Array.from(conceptsByLevel['pre-primary']),
    'primary': Array.from(conceptsByLevel['primary']),
    'middle': Array.from(conceptsByLevel['middle']),
    'senior-secondary': Array.from(conceptsByLevel['senior-secondary'])
  },
  topicsByLevel: topicsByLevel
};

fs.writeFileSync('grammar-audit.json', JSON.stringify(auditData, null, 2));
console.log('Generated grammar-audit.json');

// Generate Markdown audit
let md = '# Grammar Curriculum Audit Report\n\n';

md += '## EXACT GRAMMAR STRUCTURE\n\n';
md += `**Number of levels:** ${levels.length}\n`;
md += `**Level names:** ${levels.map(l => l.name).join(', ')}\n`;
md += `**Number of categories:** ${categories.size}\n`;
md += `**Number of concepts:** ${concepts.size}\n`;
md += `**Number of activities:** ${calculatedTotal}\n\n`;

md += '## LEVEL BREAKDOWN\n\n';
md += '| Level | Categories | Concepts | Activities |\n';
md += '|-------|------------|----------|------------|\n';
for (const level of levels) {
  const levelKey = level.id;
  const concepts = conceptsByLevel[levelKey] ? Array.from(conceptsByLevel[levelKey]).length : 0;
  const activities = levelQuestionCounts[levelKey] || 0;
  md += `| ${level.name} | ${concepts} | ${concepts} | ${activities} |\n`;
}
md += '\n';

md += '## CONCEPT COVERAGE\n\n';
md += '| Concept | Pre-Primary | Primary | Middle | Senior/Advanced |\n';
md += '|---------|-------------|---------|--------|-----------------|\n';

const allConcepts = new Set([
  ...Array.from(conceptsByLevel['pre-primary']),
  ...Array.from(conceptsByLevel['primary']),
  ...Array.from(conceptsByLevel['middle']),
  ...Array.from(conceptsByLevel['senior-secondary'])
]);

for (const concept of Array.from(allConcepts).sort()) {
  const prePrimary = conceptsByLevel['pre-primary'].has(concept) ? '✓' : '—';
  const primary = conceptsByLevel['primary'].has(concept) ? '✓' : '—';
  const middle = conceptsByLevel['middle'].has(concept) ? '✓' : '—';
  const senior = conceptsByLevel['senior-secondary'].has(concept) ? '✓' : '—';
  md += `| ${concept} | ${prePrimary} | ${primary} | ${middle} | ${senior} |\n`;
}
md += '\n';

md += '## TOTAL VERIFICATION\n\n';
md += `**Calculated total:** ${calculatedTotal}\n`;
md += `**GRAMMAR_TOTAL:** ${grammarTotal || 'NOT FOUND'}\n`;
md += `**Match:** ${calculatedTotal === grammarTotal ? 'YES ✓' : 'NO ✗'}\n\n`;

md += '## EXPORT VERIFICATION\n\n';
const requiredExports = ['GRAMMAR_LEVELS', 'GRAMMAR_CURRICULUM', 'GRAMMAR_TOTAL', 'grammarDone', 'grammarKey'];
for (const exp of requiredExports) {
  const found = exports.some(e => e.name === exp);
  md += `- **${exp}:** ${found ? '✓ Found' : '✗ Missing'}\n`;
}
md += '\n';

md += '## BUILDER FUNCTIONS\n\n';
for (const builder of builders) {
  md += `- ${builder}\n`;
}
md += '\n';

md += '## QUESTION COUNTS BY BUILDER\n\n';
for (const [key, count] of Object.entries(levelQuestionCounts)) {
  md += `- **${key}:** ${count} questions\n`;
}
md += '\n';

fs.writeFileSync('grammar-audit.md', md);
console.log('Generated grammar-audit.md');

console.log('\n=== AUDIT COMPLETE ===\n');
console.log(`Levels: ${levels.length}`);
console.log(`Total Questions (calculated): ${calculatedTotal}`);
console.log(`GRAMMAR_TOTAL: ${grammarTotal}`);
console.log(`Match: ${calculatedTotal === grammarTotal ? 'YES' : 'NO'}`);
