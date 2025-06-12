import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import { appointmentRoutes, initializeAppointmentRoutes } from './routes/appointmentRoutes';
import cors from 'cors';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB Atlas and set up routes
connectDB().then(() => {
  console.log('Connected to MongoDB Atlas successfully');
  
  // Initialize appointment routes with database connection
  initializeAppointmentRoutes();
  
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
  
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

export default app;
