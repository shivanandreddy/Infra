import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import todoRoutes from './routes/todo.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import handoverRoutes from './routes/handover.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/infra/users', userRoutes)
app.use('/infra/todos', todoRoutes)
app.use('/infra/tickets', ticketRoutes)
app.use('/infra/handovers', handoverRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});



