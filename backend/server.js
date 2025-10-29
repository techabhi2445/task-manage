import express from 'express';
import 'dotenv/config'; 
import connectDB from './config/dbConfig.js';
import cors from 'cors';
import userRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoute.js';
const app = express();


const port =process.env.PORT || 3000;
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/auth',userRouter);
app.use('/api',taskRouter);


app.listen(port, () => {
  console.log(`Server is running on port-: ${port}`);
});