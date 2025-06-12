import { MongoClient, ObjectId } from 'mongodb';
import { getDB } from '../config/db';
import { IUser } from '../models/IUser';

class UserService {
    // Example: Create a new user
    async createUser(userData: IUser): Promise<IUser> {
        const db = getDB();
        const collection = db.collection('users');

        // Omit the 'id' since it's not used in the MongoDB document directly
        const { id, ...dataToInsert } = userData;

        const result = await collection.insertOne({
            ...dataToInsert,
            dateCreated: new Date(),
            dateUpdated: new Date(),
        });

        // Return the full IUser object, including the MongoDB _id converted to string
        return {
            ...userData,
            id: result.insertedId.toString(), // Convert ObjectId to string for the id field
        };
    }

    // Example: Retrieve a user by ID
    async getUserById(userId: string): Promise<IUser | null> {
        const db = getDB();
        const collection = db.collection('users');

        const result = await collection.findOne({_id: new ObjectId(userId)});
        if (!result) return null;

        // Map the MongoDB document to conform to IUser interface, including all necessary fields
        return {
            id: result._id.toString(), // Convert ObjectId to string for the id field
            username: result.username,
            email: result.email,
            password: result.password,
            phoneNumber: result.phoneNumber,
            dateCreated: result.dateCreated,
            dateUpdated: result.dateUpdated,
        };
    }
}

export default new UserService();
