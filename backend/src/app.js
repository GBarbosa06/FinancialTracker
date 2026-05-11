import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.use("/auth", authRoutes);
export default app;