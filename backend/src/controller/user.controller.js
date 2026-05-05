import { createUser } from "../service/user.service.js";

export async function register(req, res){
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}