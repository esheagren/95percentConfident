import express from 'express';
import cors from 'cors';
import questions from './questions.js';
import { returnScore } from './scoringMiddleware.js';

const app = express();
app.use(cors());

app.use(express.json());

app.get('/api/questions', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * questions.length);
        res.json(questions[randomIndex]); 
    } catch (error) {
        console.error('Error serving question:', error);
        res.status(500).json({ error: 'Failed to get question' });
    }
});

app.post('/api/submit', returnScore, (req, res) => {
    console.log('Score:', res.locals.score);
    res.json(res.locals.score);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
