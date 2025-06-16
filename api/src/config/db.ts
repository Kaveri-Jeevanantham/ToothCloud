import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// NOTE: Only uncomment the line below if you continue to have SSL issues
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const uri: string = process.env.MONGO_URI as string; // Ensure your .env file contains MONGO_URI
const dbName: string = process.env.DB_NAME as string; // Ensure your .env file contains DB_NAME

// Configure MongoDB client - trying minimal SSL configuration first
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Connection timeouts
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  // Retry configuration
  retryWrites: true,
  w: 'majority'
});

let dbConnection: MongoClient;

const connectDB = async () => {
    try {
        // Log connection attempt
        const uriWithoutPassword = uri?.replace(/:[^:@]*@/, ':****@');
        console.log('Attempting to connect to:', uriWithoutPassword);
        
        // Additional SSL workaround for MongoDB Atlas
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        
        // Connect the client to the server
        console.log('Initiating MongoDB connection...');
        await client.connect();
        console.log("✅ Successfully connected to MongoDB Atlas.");

        // Test the connection with admin command
        const admin = client.db().admin();
        const result = await admin.ping();
        console.log("✅ Database ping successful:", result);
        
        // Test database access
        if (dbName) {
            const db = client.db(dbName);
            await db.command({ ping: 1 });
            console.log(`✅ Database '${dbName}' is accessible.`);
        }
        
        // Assign the connection to dbConnection
        dbConnection = client;
        
        return client;
    } catch (error: any) {
        console.error('❌ Failed to connect to MongoDB Atlas:');
        console.error('Error details:', error.message);
        
        // Provide specific troubleshooting based on error type
        if (error.message.includes('SSL') || error.message.includes('TLS')) {
            console.log('🔧 SSL/TLS Error detected. Trying alternative connection...');
            
            // Try with minimal SSL options
            try {
                const fallbackClient = new MongoClient(uri, {
                    ssl: false,
                    serverSelectionTimeoutMS: 30000,
                });
                
                await fallbackClient.connect();
                console.log("✅ Connected with fallback SSL configuration.");
                dbConnection = fallbackClient;
                return fallbackClient;
            } catch (fallbackError) {
                console.error('❌ Fallback connection also failed:', fallbackError);
            }
        }
        
        console.log('\n🔍 Troubleshooting suggestions:');
        console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
        console.log('2. Verify your username and password are correct');
        console.log('3. Ensure your cluster is active and not paused');
        console.log('4. Try updating your MongoDB connection string');
        
        process.exit(1);
    }
};

const getDB = () => {
    if (!dbConnection) {
        throw new Error('No database connection');
    }
    return dbConnection.db(dbName); // Use the DB_NAME from environment variables
};

// Optional: Close the connection
const closeDB = async () => {
    await dbConnection.close();
};

export { connectDB, getDB, closeDB };
