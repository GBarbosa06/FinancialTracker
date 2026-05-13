import { createTransaction, getTransactions, updateTransaction, deleteTransaction  } from "../service/transaction.service.js";

export async function createTransactionController(req, res){
    try{
        const transaction = await createTransaction({...req.body, userId: req.userId});
        return res.status(201).json(transaction);
    } catch (error) {
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
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateTransactionController(req, res){
    try{
        const transaction = await updateTransaction(req.params.id, req.body, req.userId);
        return res.status(200).json(transaction);
    } catch (error) {
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
        if(error.message === "TRANSACTION_NOT_FOUND"){
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}