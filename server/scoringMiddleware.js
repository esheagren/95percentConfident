import questions from './questions.js';

export function returnScore(req, res, next) {
    console.log(req.params);
    console.log(req.body);

    try {
      const {lowerBound, upperBound, questionId} = req.body;
      console.log(lowerBound)

      const question = questions.find(q => q.id === questionId);

      let isCorrect = false

      if(question.answer >= lowerBound && question.answer <=upperBound){
        isCorrect = true
      }
      
      res.locals.score = {
        correct: isCorrect,
      }

    } catch (error) {
      res.status(500).json({error: 'Error processing score'})
    }
    next()
  }