import { createUser, loginUser } from "../service/user.service.js";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema.js";

export async function register(req, res){
    const validatedData = RegisterSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({
            errors: validatedData.error.issues
        });
    }
    try {
        const user = await createUser(validatedData.data);
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export async function login(req, res){
    const validatedData = LoginSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({
            errors: validatedData.error.issues
        });
    }
    try{
        const data = await loginUser(validatedData.data);

        return res.json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}