import { createTransaction, getTransactions, updateTransaction, deleteTransaction  } from "../service/transaction.service.js";
import {CreateTransactionSchema, UpdateTransactionSchema} from "../schemas/transaction.schema.js";

export async function createTransactionController(req, res){
    const validatedData = CreateTransactionSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({
            errors: validatedData.error.issues
        });
    }
    try{
        const transaction = await createTransaction({...validatedData.data, userId: req.userId});
        return res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function listTransactionsController(req, res){
    try{
        const transactions = await getTransactions(req.userId);
        return res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateTransactionController(req, res){
    const validatedData = UpdateTransactionSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({
            errors: validatedData.error.issues
        });
    }
    try{
        const transaction = await updateTransaction(req.params.id, validatedData.data, req.userId);
        return res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        if(error.message === "TRANSACTION_NOT_FOUND"){
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function removeTransactionController(req, res){
    try{
        await deleteTransaction(req.params.id, req.userId);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        if(error.message === "TRANSACTION_NOT_FOUND"){
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}