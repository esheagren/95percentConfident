import { useState } from 'react';
import { useEffect } from 'react';
import './styles/App.css'
import InputFields from './components/InputField'
import QuestionField from './components/QuestionField'
import SubmitButton from './components/SubmitButton'


function App() {
  
  const [lowerNumber, setLowerNumber] = useState();  // Initialize as empty string
  const [upperNumber, setUpperNumber] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions] = useState(5); // Set how many questions per game
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Fetch question when component mounts
  useEffect(() => {
    console.log('Fetching new question');
    fetchNewQuestion();
  }, []);

  const handleNumberChange = (type, newValue) => {
    if (type === 'lower') {
      setLowerNumber(newValue);
    } else {
      setUpperNumber(newValue);
    }
  };

  const fetchNewQuestion = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      console.log('New question data:', data);
      setCurrentQuestion(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch question');
    } 
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lowerBound: Number(lowerNumber),
          upperBound: Number(upperNumber),
          questionId: currentQuestion.id
        })
      });

      const result = await response.json();
      
      // Add current question to answered questions
      setAnsweredQuestions(prev => [...prev, {
        question: currentQuestion.question,
        answer: currentQuestion.answer,
        userLower: Number(lowerNumber),
        userUpper: Number(upperNumber),
        wasCorrect: result.correct
      }]);

      setScore(prevScore => prevScore + (result.correct ? 1 : 0));
      setQuestionCount(prev => prev + 1);

      // Check if game is complete
      if (questionCount + 1 >= totalQuestions) {
        setIsGameComplete(true);
      } else {
        await fetchNewQuestion();
        setLowerNumber('');
        setUpperNumber('');
      }

    } catch (_error) {
      setError('Failed to submit answer');
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <h1>4-σ</h1>
      
      {isGameComplete ? (
        <div className="score-card">
          <h2>Game Complete!</h2>
          <div className="final-score">
            <p>Final Score: {score} out of {totalQuestions}</p>
            <p>Accuracy: {((score/totalQuestions) * 100).toFixed(1)}%</p>
          </div>
          
          <div className="question-history">
            <h3>Question History:</h3>
            {answeredQuestions.map((q, index) => (
              <div 
                key={index} 
                className={`question-result ${q.wasCorrect ? 'correct' : 'incorrect'}`}
              >
                <p className="question-text">{q.question}</p>
                <p className="correct-answer">Correct Answer: {q.answer.toLocaleString()}</p>
                <p className="user-guess">
                  Your Interval: [{q.userLower.toLocaleString()} - {q.userUpper.toLocaleString()}]
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p>Question {questionCount + 1} of {totalQuestions}</p>
          <QuestionField question={currentQuestion} />
          <InputFields
            lowerValue={lowerNumber}
            upperValue={upperNumber}
            onValueChange={handleNumberChange}
          />
          <SubmitButton onClick={handleSubmit} />
          <div>Current Score: {score}</div>
        </>
      )}
    </div>
  );
}

export default App
