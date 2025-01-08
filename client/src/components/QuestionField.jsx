import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

function QuestionField() {
    const [question, setQuestion] = useState('');

    useEffect(() => {
        async function fetchQuestion(){
            try {
                const response = await fetch('/api/questions');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuestion(data.question);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        }
        fetchQuestion();
    }, 
    []);

    return (
      <div className="question-container">
        <h2>{question}</h2>
      </div>
    );
}

QuestionField.propTypes = {
    question: PropTypes.string.isRequired
};

export default QuestionField; 





