// src/components/Content.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { lessonController } from "../../controller/lesson-controller";
import { lessonQuestionIds } from '../../data/lessonQuestionIds';

interface Question {
  id: string;
  sectionType: string;
  type: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOption: string;
  difficulty: string;
}

interface ContentProps {
  title: string;
}

const Content = ({ title }: ContentProps) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [allQuestions, setAllQuestions] = useState<Record<string, Question>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Load question IDs when lesson changes
  useEffect(() => {
    if (lessonId) {
      if (!lessonQuestionIds[lessonId]) {
        navigate('/content');
      } else {
        setQuestionIds(lessonQuestionIds[lessonId]);
        setCurrentQuestionIndex(0);
        setSelectedOptions({});
        setAllQuestions({});
        setShowResults(false);
      }
    }
  }, [lessonId, navigate]);

  // Load current question and store in allQuestions state
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!lessonId || questionIds.length === 0 || currentQuestionIndex >= questionIds.length) {
        setQuestion(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { handleLesson } = lessonController();
        const data = await handleLesson(questionIds[currentQuestionIndex]);
        setQuestion(data);
        setAllQuestions(prev => ({
          ...prev,
          [data.id]: data
        }));
      } catch (err) {
        setError('Failed to load question');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionIds, currentQuestionIndex, lessonId]);

  const handleOptionSelect = (optionId: string) => {
    if (!question) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [question.id]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionIds.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowResults(false);
    }
  };

  const handleLessonNavigation = (newLessonId: string) => {
    navigate(`/content/${newLessonId}`);
  };

  const handleRestartLesson = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!questionIds.length) return 0;
    
    let correct = 0;
    questionIds.forEach(id => {
      const currentQuestion = allQuestions[id];
      if (selectedOptions[id] && currentQuestion && selectedOptions[id] === currentQuestion.correctOption) {
        correct++;
      }
    });
    return Math.round((correct / questionIds.length) * 100);
  };

  if (!lessonId) {
    return (
      <div className='flex flex-col items-center min-h-screen p-4 bg-gray-50'>
        <h1 className='text-3xl font-bold mb-8'>{title || 'Select a Lesson'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {Object.keys(lessonQuestionIds).map(id => (
            <Card 
              key={id}
              className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleLessonNavigation(id)}
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Lesson {id.replace('lesson', '')}</h2>
                <p className="text-gray-600">{lessonQuestionIds[id].length} questions</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: '0%' }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center min-h-screen p-4 bg-gray-50'>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-100"></div>
          <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-200"></div>
        </div>
        <div className="mt-4">Loading question...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center min-h-screen p-4 bg-gray-50'>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold mb-2">Error!</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className='flex flex-col items-center min-h-screen p-4 bg-gray-50'>
        <Card className="rounded-lg shadow-md p-8 mt-6 w-full max-w-4xl">
          <CardContent className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center">Lesson Results</h2>
            
            <div className={`w-32 h-32 rounded-full flex items-center justify-center 
              text-3xl font-bold mb-6 border-8 ${
                score >= 70 ? 'border-green-500 text-green-500' : 
                score >= 50 ? 'border-yellow-500 text-yellow-500' : 
                'border-red-500 text-red-500'
              }`}
            >
              {score}%
            </div>
            
            <p className="text-lg mb-6 text-center">
              {score >= 70 ? 'Congratulations! You did great!' : 
               score >= 50 ? 'Good job! You can improve even more!' : 
               "Don't give up! Review the content and try again!"}
            </p>
            
            <div className="w-full mb-6">
              <h3 className="font-bold mb-2">Summary:</h3>
              <div className="space-y-2">
                {questionIds.map((id, index) => {
                  const currentQuestion = allQuestions[id];
                  const isCorrect = selectedOptions[id] && currentQuestion && 
                                 selectedOptions[id] === currentQuestion.correctOption;
                  
                  return (
                    <div key={id} className="flex items-center">
                      <span className="w-8 font-medium">Q{index + 1}:</span>
                      <span className={`ml-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedOptions[id] ? `Answer: ${selectedOptions[id]}` : 'Not answered'}
                        {!isCorrect && currentQuestion && (
                          <span className="ml-2 text-gray-600">
                            (Correct: {currentQuestion.correctOption})
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleRestartLesson}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retake Lesson
              </button>
              <button
                onClick={() => navigate('/content')}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Choose Another Lesson
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!question) {
    return (
      <div className='flex flex-col items-center min-h-screen p-4 bg-gray-50'>
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          No questions available in this lesson
        </div>
        <button
          onClick={() => navigate('/content')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  const currentSelectedOption = selectedOptions[question.id] || null;

  return (
    <div className='flex flex-col items-center min-h-screen p-4 bg-gray-50'>
      {/* Pagination Header */}
      <Pagination className='bg-blue-700 rounded-lg p-6 w-full max-w-4xl'>
        <PaginationContent className='flex flex-row w-full justify-between'>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePrevQuestion}
              className={currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            />
          </PaginationItem>
          <PaginationItem>
            <div className='text-3xl text-white'>{title}</div>
            <div className='text-white ml-4'>
              Question {currentQuestionIndex + 1} of {questionIds.length}
            </div>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              onClick={handleNextQuestion}
              className={currentQuestionIndex === questionIds.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Exercise Card */}
      <Card className="rounded-lg shadow-md p-8 mt-6 w-full max-w-4xl">
        <CardContent className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center">{question.text}</h2>
          <ul className="space-y-4 w-full max-w-md">
            {question.options.map(option => (
              <li 
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-4 rounded-lg cursor-pointer text-center text-lg transition-colors ${
                  currentSelectedOption === option.id
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="font-medium mr-2">{option.id.toUpperCase()}:</span>
                {option.text}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between w-full text-sm text-gray-500">
            <span>Difficulty: {question.difficulty}</span>
            <span>ID: {question.id}</span>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <div className="mt-6 w-full max-w-4xl space-y-4">
        {/* Lesson Selector */}
        <Card className="p-4">
          <CardContent className="p-0">
            <h3 className="font-bold mb-3">Select a Lesson:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(lessonQuestionIds).map(id => (
                <button
                  key={id}
                  onClick={() => handleLessonNavigation(id)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    lessonId === id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Lesson {id.replace('lesson', '')}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <Card className="p-4">
          <CardContent className="p-0">
            <h3 className="font-bold mb-3">Progress:</h3>
            <div className="flex flex-wrap gap-2">
              {questionIds.map((id, index) => (
                <div 
                  key={id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    selectedOptions[id]
                      ? allQuestions[id] && selectedOptions[id] === allQuestions[id].correctOption
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : index === currentQuestionIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Content;