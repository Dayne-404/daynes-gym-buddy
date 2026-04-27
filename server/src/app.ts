import express, { type Application } from 'express'
import cors from 'cors'
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes'
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

//Routes go here

app.use('/api/auth', authRoutes); //Pending Testing

app.use(notFound);
app.use(errorHandler);

export default app;
