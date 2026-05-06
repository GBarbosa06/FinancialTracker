import { createUser, loginUser } from "../service/user.service.js";

export async function register(req, res){
    try {
        const user = await createUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function login(req, res){
    try{
        const data = await loginUser(req.body);

        return res.json(data)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}