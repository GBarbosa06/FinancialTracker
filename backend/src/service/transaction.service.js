import prisma from "../prisma/client.js";

export async function createTransaction({amount, title, type, userId}){
    if(amount === null || amount === undefined||  !title){
        throw new Error("MISSING_REQUIRED_FIELDS");
    }

    if(type !== "income" && type !== "expense"){
        throw new Error("INVALID_TYPE");
    }

    return prisma.transaction.create({
        data: {
            amount,
            title,
            type,
            userId
        }
    });
}

export async function getTransactions(userId){
    return prisma.transaction.findMany({
        where: {userId}
    });
}

export async function updateTransaction(id, {amount, title, type}, userId){
    const transaction = await prisma.transaction.findFirst({
        where: {
            id,
            userId
        }
    });

    if(!transaction){
        throw new Error("TRANSACTION_NOT_FOUND");
    }

    return prisma.transaction.update({
        where: {id},
        data: {
            amount,
            title,
            type
        }
    });
}

export async function deleteTransaction(id, userId){
    const result = await prisma.transaction.deleteMany({
        where: {
            id,
            userId
        }
    });

    if(result.count === 0){
        throw new Error("TRANSACTION_NOT_FOUND");
    }
}