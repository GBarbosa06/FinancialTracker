import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

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

    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
}