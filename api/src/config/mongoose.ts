import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const uri: string = process.env.MONGO_URI as string;

// Configure mongoose connection options
const options = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  bufferCommands: true,
  bufferTimeoutMS: 30000, // Increase buffer timeout from default 10000ms
  autoIndex: true
};

// Connect to MongoDB using mongoose
export const connectMongoose = async (): Promise<void> => {
  try {
    console.log('Connecting to MongoDB with Mongoose...');
    await mongoose.connect(uri, options);
    console.log('✅ Mongoose connection successful');
  } catch (error) {
    console.error('❌ Mongoose connection error:', error);
    throw error;
  }
};

// Export mongoose instance
export default mongoose;