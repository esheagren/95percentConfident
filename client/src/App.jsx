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

  // Fetch question when component mounts
  useEffect(() => {
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
          questionId: 1  
        })
      });

      const result = await response.json();
      setScore(result.correct ? "Correct!" : "Try again");
    } catch (error) {
      setError('Failed to submit answer');
    } 
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>4-σ</h1>
      <QuestionField/> 
      <InputFields
        lowerValue={lowerNumber}
        upperValue={upperNumber}
        onValueChange={handleNumberChange}
      />
      
      <SubmitButton 
        onClick={handleSubmit}
      />
      <div>Score: {score}</div>
    </div>
  );
}

export default App
