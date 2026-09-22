import { useState, useEffect } from 'react';
import { CURRICULUM, type Level, type Category, type Concept, type Activity } from './data/grammar';
import { 
  loadProgress, 
  markActivityCompleted, 
  isActivityCompleted, 
  getActivityScore,
  updateLevelProgress,
  getOverallProgress 
} from './lib/progress';

type View = 'levels' | 'categories' | 'concepts' | 'activities';

function App() {
  const [view, setView] = useState<View>('levels');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | string[] | { left: string; right: string }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(loadProgress());

  // Update progress when it changes
  useEffect(() => {
    setProgress(loadProgress());
  }, [view, selectedLevel, selectedCategory, selectedConcept, currentActivityIndex]);

  // Calculate level progress
  useEffect(() => {
    if (selectedLevel) {
      let total = 0;
      let completed = 0;
      let totalScore = 0;
      let scoreCount = 0;

      selectedLevel.categories.forEach(cat => {
        cat.concepts.forEach(concept => {
          concept.activities.forEach(activity => {
            total++;
            if (isActivityCompleted(activity.id)) {
              completed++;
              const score = getActivityScore(activity.id);
              totalScore += score;
              scoreCount++;
            }
          });
        });
      });

      const avgScore = scoreCount > 0 ? totalScore / scoreCount : 0;
      updateLevelProgress(selectedLevel.id, total, completed, avgScore);
    }
  }, [selectedLevel, progress]);

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setView('categories');
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setView('concepts');
  };

  const handleConceptSelect = (concept: Concept) => {
    setSelectedConcept(concept);
    setCurrentActivityIndex(0);
    setView('activities');
    setUserAnswer([]);
    setShowFeedback(false);
  };

  const handleBack = () => {
    if (view === 'activities') {
      setView('concepts');
      setSelectedConcept(null);
    } else if (view === 'concepts') {
      setView('categories');
      setSelectedCategory(null);
    } else if (view === 'categories') {
      setView('levels');
      setSelectedLevel(null);
    }
    setUserAnswer([]);
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    const activity = selectedConcept!.activities[currentActivityIndex];
    let correct = false;

    if (activity.type === 'mcq' || activity.type === 'fillblank' || activity.type === 'error') {
      correct = userAnswer === activity.answer;
    } else if (activity.type === 'matching') {
      const correctPairs = activity.answer as { left: string; right: string }[];
      const userPairs = userAnswer as { left: string; right: string }[];
      correct = correctPairs.every(cp => 
        userPairs.some(up => up.left === cp.left && up.right === cp.right)
      ) && userPairs.length === correctPairs.length;
    } else if (activity.type === 'dragdrop') {
      const correctOrder = activity.correctOrder!;
      correct = JSON.stringify(userAnswer) === JSON.stringify(correctOrder);
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      markActivityCompleted(activity.id, 100);
    }
  };

  const nextActivity = () => {
    if (currentActivityIndex < selectedConcept!.activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
      setUserAnswer([]);
      setShowFeedback(false);
    }
  };

  const previousActivity = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
      setUserAnswer([]);
      setShowFeedback(false);
    }
  };

  // Render different views
  if (view === 'levels') {
    return <LevelsView levels={CURRICULUM} onSelect={handleLevelSelect} progress={progress} />;
  }

  if (view === 'categories' && selectedLevel) {
    return (
      <CategoriesView 
        level={selectedLevel} 
        onSelect={handleCategorySelect} 
        onBack={handleBack}
        progress={progress}
      />
    );
  }

  if (view === 'concepts' && selectedCategory) {
    return (
      <ConceptsView 
        category={selectedCategory} 
        onSelect={handleConceptSelect} 
        onBack={handleBack}
        progress={progress}
      />
    );
  }

  if (view === 'activities' && selectedConcept) {
    return (
      <ActivitiesView
        concept={selectedConcept}
        activityIndex={currentActivityIndex}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        onCheck={checkAnswer}
        onNext={nextActivity}
        onPrevious={previousActivity}
        onBack={handleBack}
      />
    );
  }

  return null;
}

// Levels View
function LevelsView({ levels, onSelect, progress }: { 
  levels: Level[]; 
  onSelect: (level: Level) => void;
  progress: any;
}) {
  const overall = getOverallProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Grammar Laboratory</h1>
          <p className="text-xl text-gray-600">Master English Grammar from Foundation to Advanced</p>
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 inline-block">
            <p className="text-lg font-semibold text-gray-700">
              Overall Progress: {overall.totalCompleted} activities completed
            </p>
            <p className="text-md text-gray-600">
              Average Score: {overall.averageScore.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map(level => {
            const levelProgress = progress.levelProgress[level.id];
            const completionPercentage = levelProgress 
              ? (levelProgress.completedActivities / levelProgress.totalActivities) * 100 
              : 0;

            return (
              <div
                key={level.id}
                onClick={() => onSelect(level)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
                style={{ borderLeft: `8px solid ${level.color}` }}
              >
                <h2 className="text-2xl font-bold mb-2" style={{ color: level.color }}>
                  {level.name}
                </h2>
                <p className="text-gray-600 mb-4">{level.ageRange}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{completionPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${completionPercentage}%`,
                        backgroundColor: level.color 
                      }}
                    />
                  </div>
                  {levelProgress && (
                    <p className="text-xs text-gray-500">
                      {levelProgress.completedActivities} / {levelProgress.totalActivities} activities
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {level.categories.length} categories
                  </span>
                  <span className="text-2xl" style={{ color: level.color }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Categories View
function CategoriesView({ level, onSelect, onBack, progress }: {
  level: Level;
  onSelect: (category: Category) => void;
  onBack: () => void;
  progress: any;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Levels</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: level.color }}>
            {level.name}
          </h1>
          <p className="text-xl text-gray-600">{level.ageRange}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {level.categories.map(category => {
            const totalActivities = category.concepts.reduce(
              (sum, concept) => sum + concept.activities.length, 0
            );

            return (
              <div
                key={category.id}
                onClick={() => onSelect(category)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {category.name}
                </h2>
                
                <div className="space-y-2 mb-4">
                  {category.concepts.map(concept => {
                    const completedCount = concept.activities.filter(
                      a => isActivityCompleted(a.id)
                    ).length;
                    const percentage = (completedCount / concept.activities.length) * 100;

                    return (
                      <div key={concept.id} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">{concept.name}</span>
                          <span className="font-semibold">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full transition-all" 
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: level.color 
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">
                    {category.concepts.length} concepts • {totalActivities} activities
                  </span>
                  <span className="text-2xl" style={{ color: level.color }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Concepts View
function ConceptsView({ category, onSelect, onBack, progress }: {
  category: Category;
  onSelect: (concept: Concept) => void;
  onBack: () => void;
  progress: any;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Categories</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            {category.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.concepts.map(concept => {
            const completedCount = concept.activities.filter(
              a => isActivityCompleted(a.id)
            ).length;
            const percentage = (completedCount / concept.activities.length) * 100;

            return (
              <div
                key={concept.id}
                onClick={() => onSelect(concept)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  {concept.name}
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500 transition-all" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {completedCount} / {concept.activities.length} activities completed
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">
                    {concept.activities.length} activities
                  </span>
                  <span className="text-2xl text-blue-500">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Activities View
function ActivitiesView({
  concept,
  activityIndex,
  userAnswer,
  setUserAnswer,
  showFeedback,
  isCorrect,
  onCheck,
  onNext,
  onPrevious,
  onBack
}: {
  concept: Concept;
  activityIndex: number;
  userAnswer: any;
  setUserAnswer: (answer: any) => void;
  showFeedback: boolean;
  isCorrect: boolean;
  onCheck: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
}) {
  const activity = concept.activities[activityIndex];
  const completedCount = concept.activities.filter(a => isActivityCompleted(a.id)).length;
  const progressPercentage = (completedCount / concept.activities.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Concepts</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {concept.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-lg text-gray-600">
              Activity {activityIndex + 1} of {concept.activities.length}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
              <div 
                className="h-2 rounded-full bg-blue-500 transition-all" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {completedCount} completed
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <ActivityRenderer
            activity={activity}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={onPrevious}
              disabled={activityIndex === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>

            {!showFeedback ? (
              <button
                onClick={onCheck}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-semibold"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={activityIndex === concept.activities.length - 1}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                Next Activity →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Activity Renderer
function ActivityRenderer({
  activity,
  userAnswer,
  setUserAnswer,
  showFeedback,
  isCorrect
}: {
  activity: Activity;
  userAnswer: any;
  setUserAnswer: (answer: any) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}) {
  switch (activity.type) {
    case 'mcq':
      return (
        <MCQActivity
          activity={activity}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      );
    case 'matching':
      return (
        <MatchingActivity
          activity={activity}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      );
    case 'dragdrop':
      return (
        <DragDropActivity
          activity={activity}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      );
    case 'fillblank':
      return (
        <FillBlankActivity
          activity={activity}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      );
    case 'error':
      return (
        <ErrorCorrectionActivity
          activity={activity}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      );
    default:
      return <div>Unknown activity type</div>;
  }
}

// MCQ Activity
function MCQActivity({ activity, userAnswer, setUserAnswer, showFeedback, isCorrect }: any) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{activity.question}</h3>
      <div className="space-y-3">
        {activity.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => setUserAnswer(option)}
            disabled={showFeedback}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              userAnswer === option
                ? showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-gray-700 mt-2">{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Matching Activity
function MatchingActivity({ activity, userAnswer, setUserAnswer, showFeedback, isCorrect }: any) {
  const correctPairs = activity.answer as { left: string; right: string }[];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const userPairs = userAnswer as { left: string; right: string }[] || [];

  const handleMatch = (right: string) => {
    if (selectedLeft && !showFeedback) {
      const newPairs = [...userPairs.filter(p => p.left !== selectedLeft), { left: selectedLeft, right }];
      setUserAnswer(newPairs);
      setSelectedLeft(null);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{activity.question}</h3>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          {correctPairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedLeft(pair.left)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedLeft === pair.left
                  ? 'border-blue-500 bg-blue-50'
                  : userPairs.some(p => p.left === pair.left)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {pair.left}
              {userPairs.some(p => p.left === pair.left) && (
                <span className="ml-2 text-sm text-gray-600">
                  → {userPairs.find(p => p.left === pair.left)?.right}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {correctPairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => handleMatch(pair.right)}
              disabled={showFeedback || !selectedLeft}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                userPairs.some(p => p.right === pair.right)
                  ? 'border-green-500 bg-green-50'
                  : selectedLeft
                    ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                    : 'border-gray-200'
              }`}
            >
              {pair.right}
            </button>
          ))}
        </div>
      </div>
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-gray-700 mt-2">{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Drag and Drop Activity
function DragDropActivity({ activity, userAnswer, setUserAnswer, showFeedback, isCorrect }: any) {
  const items = activity.items as string[];
  const correctOrder = activity.correctOrder as string[];
  const orderedItems = userAnswer as string[] || [];
  const remainingItems = items.filter(item => !orderedItems.includes(item));

  const addItem = (item: string) => {
    if (!showFeedback) {
      setUserAnswer([...orderedItems, item]);
    }
  };

  const removeItem = (index: number) => {
    if (!showFeedback) {
      const newItems = [...orderedItems];
      newItems.splice(index, 1);
      setUserAnswer(newItems);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{activity.question}</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Your answer:</p>
        <div className="min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          {orderedItems.length === 0 ? (
            <p className="text-gray-400 text-center">Click items below to add them in order</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {orderedItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => removeItem(index)}
                  disabled={showFeedback}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    showFeedback
                      ? item === correctOrder[index]
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Available items:</p>
        <div className="flex flex-wrap gap-2">
          {remainingItems.map((item, index) => (
            <button
              key={index}
              onClick={() => addItem(item)}
              disabled={showFeedback}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-gray-700 mt-2">{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Fill in the Blank Activity
function FillBlankActivity({ activity, userAnswer, setUserAnswer, showFeedback, isCorrect }: any) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{activity.question}</h3>
      <input
        type="text"
        value={userAnswer || ''}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={showFeedback}
        className={`w-full p-4 border-2 rounded-lg transition-all ${
          showFeedback
            ? isCorrect
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : 'border-gray-300 focus:border-blue-500'
        }`}
        placeholder="Type your answer here..."
      />
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          {!isCorrect && (
            <p className="text-gray-700 mt-2">
              Correct answer: <strong>{activity.answer}</strong>
            </p>
          )}
          <p className="text-gray-700 mt-2">{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Error Correction Activity
function ErrorCorrectionActivity({ activity, userAnswer, setUserAnswer, showFeedback, isCorrect }: any) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{activity.question}</h3>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-700 font-mono">{activity.sentence}</p>
      </div>
      <input
        type="text"
        value={userAnswer || ''}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={showFeedback}
        className={`w-full p-4 border-2 rounded-lg transition-all ${
          showFeedback
            ? isCorrect
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : 'border-gray-300 focus:border-blue-500'
        }`}
        placeholder="Type the corrected sentence..."
      />
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          {!isCorrect && (
            <p className="text-gray-700 mt-2">
              Correct answer: <strong>{activity.answer}</strong>
            </p>
          )}
          <p className="text-gray-700 mt-2">{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
