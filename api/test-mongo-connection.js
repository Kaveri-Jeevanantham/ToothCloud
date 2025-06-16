const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testMultipleConnections() {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    console.log('🔄 Testing MongoDB Atlas connection with multiple configurations...');
    console.log('URI (masked):', uri?.replace(/:[^:@]*@/, ':****@'));
    console.log('Database:', dbName);
    console.log('');

    // Test 1: Enhanced SSL configuration
    console.log('📝 Test 1: Enhanced SSL configuration');
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        
        const client1 = new MongoClient(uri, {
            tls: true,
            tlsAllowInvalidCertificates: true,
            tlsAllowInvalidHostnames: true,
            tlsInsecure: true,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            retryWrites: true,
            w: 'majority'
        });

        await client1.connect();
        console.log('✅ Test 1 PASSED: Enhanced SSL configuration works!');
        
        // Test database access
        const db = client1.db(dbName);
        await db.command({ ping: 1 });
        console.log('✅ Database ping successful!');
        
        await client1.close();
        return true;
    } catch (error) {
        console.log('❌ Test 1 FAILED:', error.message);
    }

    // Test 2: Minimal SSL configuration
    console.log('\n📝 Test 2: Minimal SSL configuration');
    try {
        const client2 = new MongoClient(uri, {
            ssl: true,
            sslValidate: false,
            serverSelectionTimeoutMS: 30000,
        });

        await client2.connect();
        console.log('✅ Test 2 PASSED: Minimal SSL configuration works!');
        await client2.close();
        return true;
    } catch (error) {
        console.log('❌ Test 2 FAILED:', error.message);
    }

    // Test 3: No SSL (if allowed)
    console.log('\n📝 Test 3: No SSL configuration');
    try {
        const uriNoSSL = uri.replace('ssl=true', 'ssl=false');
        const client3 = new MongoClient(uriNoSSL, {
            ssl: false,
            serverSelectionTimeoutMS: 30000,
        });

        await client3.connect();
        console.log('✅ Test 3 PASSED: No SSL configuration works!');
        await client3.close();
        return true;
    } catch (error) {
        console.log('❌ Test 3 FAILED:', error.message);
    }

    // Test 4: Alternative URI format
    console.log('\n📝 Test 4: Alternative URI format');
    try {
        const alternativeUri = uri.replace('?', '/toothcloud?').replace('ssl=true&', '');
        console.log('Alternative URI:', alternativeUri.replace(/:[^:@]*@/, ':****@'));
        
        const client4 = new MongoClient(alternativeUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: false,
            serverSelectionTimeoutMS: 30000,
        });

        await client4.connect();
        console.log('✅ Test 4 PASSED: Alternative URI format works!');
        await client4.close();
        return true;
    } catch (error) {
        console.log('❌ Test 4 FAILED:', error.message);
    }

    console.log('\n❌ All connection tests failed!');
    console.log('\n🔧 Troubleshooting suggestions:');
    console.log('1. Verify your MongoDB Atlas cluster is running');
    console.log('2. Check Network Access in MongoDB Atlas - whitelist your IP');
    console.log('3. Verify Database Access credentials are correct');
    console.log('4. Try connecting from MongoDB Compass to test credentials');
    console.log('5. Check if there are any firewall restrictions');
    
    return false;
}

testMultipleConnections()
    .then(success => {
        if (success) {
            console.log('\n🎉 Connection successful! Your MongoDB configuration is working.');
        }
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('\n💥 Unexpected error:', error);
        process.exit(1);
    });
