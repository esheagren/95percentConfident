// import questions from './questions.js';

// export function returnScore(req, res, next) {
//     console.log(req.params);
//     console.log(req.body);

//     try {
//       const {lowerBound, upperBound, questionId} = req.body;
      
//       console.log('Received submission:', {
//         questionId,
//         lowerBound,
//         upperBound
//       });
  
//       const question = questions.find(q => q.id === questionId);
//       console.log('Found question:', question);
//       console.log('Checking if', question.answer, 'is between', lowerBound, 'and', upperBound);

//       let isCorrect = false;
//       let questionScore = 0;

//       if(question.answer >= lowerBound && question.answer <=upperBound){
//         questionScore = 1;
//         isCorrect = true
//       } else {
//         // questionScore = 0;
//         isCorrect = false;
//       }
//       res.locals = {
//         score: questionScore,
//         correct: isCorrect,
//       }
      
//       res.json(res.locals);

//     } catch (error) {
//       res.status(500).json({
//         message: 'Error processing score',
//         details: error.message
//       });
//     }
//   }