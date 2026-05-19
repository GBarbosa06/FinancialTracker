import { createTransaction, getTransactions, updateTransaction, deleteTransaction, getTransactionSummary  } from "../service/transaction.service.js";
import {CreateTransactionSchema, UpdateTransactionSchema} from "../schemas/transaction.schema.js";

export async function createTransactionController(req, res){
    try{
        const transaction = await createTransaction({...req.validatedData, userId: req.userId});
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
    try{
        const transaction = await updateTransaction(req.params.id, req.validatedData, req.userId);
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

export async function getTransactionSummaryController(req, res) {
    try {
        const summary = await getTransactionSummary(req.userId);
        return res.status(200).json(summary);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}