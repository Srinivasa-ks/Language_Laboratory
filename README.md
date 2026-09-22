# Grammar Laboratory

An interactive, multi-level English grammar learning application with 10 activities per concept across 6 academic levels.

## 🎯 Overview

Grammar Laboratory provides a comprehensive grammar curriculum from Pre-Primary to Graduation level, featuring:

- **6 Academic Levels**: Pre-Primary, Primary, Middle School, Secondary, Senior Secondary, Graduation
- **Multiple Categories**: Parts of Speech, Tenses, Voice, Clauses, Syntax, Semantics, and more
- **10 Activities per Concept**: Each concept includes diverse activity types
- **5 Activity Types**: MCQ, Matching, Drag & Drop, Fill in the Blank, Error Correction
- **Progress Tracking**: Automatic progress saving per user
- **Offline Support**: Works completely offline after initial load

## 📚 Curriculum Structure

### Level 1: Pre-Primary (Nursery-UKG, ages 3-5)
**Categories:**
- Parts of Speech - Foundation (Nouns, Verbs, Adjectives, Pronouns)
- Basic Grammar (Alphabet, Vowels/Consonants, Singular/Plural, Prepositions)
- Sentences (Simple Sentences)
- Language Awareness (Rhyming and Phonics)

**Total Activities:** 100

### Level 2: Primary (Classes 1-5, ages 6-10)
**Categories:**
- Nouns (Common/Proper, Plurals)
- Tenses (Basic Tenses)
- Articles (a, an, the)
- Prepositions (Detailed)

**Total Activities:** 50

### Level 3: Middle School (Classes 6-8, ages 11-13)
**Categories:**
- Nouns Advanced (Abstract, Material, Collective)
- Tenses (16-Tense Module)
- Clauses (Introduction)
- Voice (Active/Passive)
- Conditionals (Types 1-3)

**Total Activities:** 50

### Level 4: Secondary (Classes 9-10, ages 14-15)
**Categories:**
- Advanced Tenses
- Reported Speech
- Sentence Transformation

**Total Activities:** 30

### Level 5: Senior Secondary (Classes 11-12, ages 16-17)
**Categories:**
- Syntax (Sentence Structure)
- Morphology (Word Formation)
- Discourse Grammar (Cohesion)

**Total Activities:** 30

### Level 6: Graduation (Undergraduate, ages 18-21)
**Categories:**
- Advanced Syntax (Phrase Structure)
- Semantics (Meaning Relationships)
- Pragmatics (Context and Speech Acts)

**Total Activities:** 30

**Grand Total: 290 Activities**

## 🎮 Activity Types

### 1. Multiple Choice Questions (MCQ)
- Select the correct answer from 3-4 options
- Immediate feedback with explanation
- Example: "Which is a vowel? A, B, C"

### 2. Matching
- Match items from two columns
- Click left item, then click matching right item
- Example: Match capital letters to small letters

### 3. Drag and Drop Ordering
- Arrange items in correct order
- Click items to add to sequence
- Click ordered items to remove
- Example: Put letters in alphabetical order

### 4. Fill in the Blank
- Type the missing word or phrase
- Case-insensitive matching
- Example: "A, E, I, O, ___"

### 5. Error Correction
- Identify and correct grammatical errors
- Type the corrected sentence
- Example: Fix "He go to school" → "He goes to school"

## 📊 Progress Tracking

The application automatically tracks:
- **Activity Completion**: Which activities you've completed
- **Scores**: Performance on each activity (0-100%)
- **Level Progress**: Overall progress per academic level
- **Last Accessed**: When you last worked on each activity

All progress is stored locally in your browser using localStorage.

### Progress Features:
- Visual progress bars for each level, category, and concept
- Completion percentage display
- Overall statistics on the home screen
- Persistent across sessions

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Usage

1. **Select a Level**: Choose from 6 academic levels on the home screen
2. **Choose a Category**: Browse grammar categories within the level
3. **Pick a Concept**: Select a specific grammar concept
4. **Complete Activities**: Work through 10 activities per concept
5. **Track Progress**: Monitor your completion and scores

## 🏗️ Project Structure

```
src/
├── data/
│   └── grammar.ts          # Complete curriculum data (290 activities)
├── lib/
│   └── progress.ts         # Progress tracking utilities
├── components/             # (Integrated into App.tsx for simplicity)
├── App.tsx                 # Main application with all views
├── main.tsx                # Application entry point
└── index.css               # Global styles with Tailwind CSS
```

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color-Coded Levels**: Each academic level has a unique color
- **Interactive Feedback**: Immediate visual feedback for answers
- **Smooth Transitions**: Animated progress bars and hover effects
- **Accessibility**: Keyboard navigation and screen reader support

## 💾 Data Persistence

All user data is stored locally in the browser:
- `grammar_lab_user_id`: Unique user identifier
- `grammar_lab_progress_[userId]`: User's progress data

**Note**: Clearing browser data will reset progress.

## 🔧 Technical Details

### Built With:
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling

### Key Features:
- Component-based architecture
- State management with React hooks
- LocalStorage for data persistence
- Modular activity rendering system
- Comprehensive type definitions

## 📈 Adding New Content

To add new activities:

1. Open `src/data/grammar.ts`
2. Add activities to the appropriate level's activities object
3. Follow the activity type structure:
   ```typescript
   {
     type: 'mcq' | 'matching' | 'dragdrop' | 'fillblank' | 'error',
     question: 'Question text',
     options?: ['Option 1', 'Option 2', 'Option 3'],
     answer: 'Correct answer',
     explanation: 'Why this is correct'
   }
   ```
4. Update the curriculum structure if adding new concepts

## 🎓 Educational Approach

The curriculum follows a progressive learning path:

1. **Foundation (Pre-Primary)**: Basic recognition and identification
2. **Systematic Introduction (Primary)**: Structured grammar rules
3. **Advanced Concepts (Middle)**: Complex structures and transformations
4. **Mastery (Secondary)**: Nuanced usage and error correction
5. **Analysis (Senior Secondary)**: Linguistic understanding
6. **Application (Graduation)**: Professional and academic usage

## 🐛 Troubleshooting

### Progress not saving?
- Check browser localStorage is enabled
- Clear browser cache and reload
- Check browser console for errors

### Activities not loading?
- Ensure all dependencies are installed: `npm install`
- Rebuild the application: `npm run build`
- Check browser console for errors

### Styling issues?
- Verify Tailwind CSS is properly configured
- Clear browser cache
- Rebuild CSS: `npm run build`

## 📝 License

This project is created for educational purposes.

## 👨‍🏫 For Educators

This application can be used to:
- Supplement classroom grammar instruction
- Provide self-paced learning opportunities
- Track student progress across grammar concepts
- Identify areas where students need additional support

## 🔄 Future Enhancements

Potential additions:
- Multiple user profiles
- Teacher dashboard for monitoring student progress
- Export progress reports
- Additional activity types (listening, speaking)
- Gamification elements (badges, achievements)
- Social features (leaderboards, challenges)

## 📞 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

---

**Happy Learning! 🎉**
