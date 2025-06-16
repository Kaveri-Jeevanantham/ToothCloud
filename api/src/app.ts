import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';
import { connectMongoose } from './config/mongoose';
import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import cors from 'cors';
import { corsMiddleware } from './middleware/corsMiddleware';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Apply CORS middleware - using both the cors package and custom middleware for belt and suspenders approach
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Apply custom CORS middleware as a fallback
app.use(corsMiddleware);

// Connect to MongoDB Atlas and set up routes
Promise.all([connectDB(), connectMongoose()])
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
    
    // Routes
    app.use('/api', userRoutes);
    app.use('/api', appointmentRoutes);
    
    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'ToothCloud API is running successfully',
        timestamp: new Date().toISOString()
      });
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

export default app;
