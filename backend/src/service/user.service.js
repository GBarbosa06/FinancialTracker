import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generate-token.js";

export async function createUser({name, email, password}){
    const userExists = await prisma.user.findUnique({
        where: {email}
    });

    if(userExists){
        throw new Error("USER_ALREADY_EXISTS");
    }

    if(!name || !email || !password){
        throw new Error("MISSING_REQUIRED_FIELDS");
    }
    if(password.length < 8){
        throw new Error("PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating ", name,  "user");

    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
}

export async function loginUser({email, password}) {
    const user = await prisma.user.findUnique({
        where: {email}
    })

    if(!user){
        throw new Error("ACCOUNT_NOT_FOUND");
    }

    const passwordMatch = await bcrypt.compare(
        password, user.password
    );

    if(!passwordMatch){
        throw new Error("INCORRECT_PASSWORD")
    }

    const token = generateToken(user.id);

    console.log("User logged in: ", user.email);
    return{
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

}