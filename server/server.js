import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import logRoutes from './routes/logRoutes.js';
import gameSessionRoutes from './routes/gameSessionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/sessions', gameSessionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 