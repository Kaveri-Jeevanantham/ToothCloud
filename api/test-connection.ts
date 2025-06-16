import { connectDB, closeDB } from './src/config/db';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('DB_NAME exists:', !!process.env.DB_NAME);
    
    await connectDB();
    console.log('✅ Connection test completed successfully!');
    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    process.exit(1);
  }
}

// Run the test
testConnection();
