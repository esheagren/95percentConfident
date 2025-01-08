// server/questions.js
const questions = [
    {
      id: 1,
      question: "How many books are in the Library of Congress?",
      answer: 2, // 171 million
      metadata: {
        timesAnswered: 0,
        correctAnswers: 0,
        averageConfidenceInterval: 0,
        lastAsked: null,
        source: "Library of Congress website",
        yearUpdated: 2024,
        tags: ["libraries", "United States", "books"]
      }
    }
  ];

export default questions;