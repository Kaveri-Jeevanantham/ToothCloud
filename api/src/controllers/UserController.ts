import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    // POST: /users/create
    // Creates a new user
    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            // Ensure all required fields are present
            if (!userData.username || !userData.email || !userData.password || !userData.phoneNumber) {
                res.status(400).send("Missing required fields.");
                return;
            }
            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send("Failed to create user.");
        }
    }

    // GET: /users/:id
    // Retrieves a user by ID
    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await UserService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send("User not found.");
            }
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).send("Failed to retrieve user.");
        }
    }
}

export default new UserController();
