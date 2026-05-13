import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { 
    createTransactionController,
    listTransactionsController,
    updateTransactionController,
    removeTransactionController
} from "../controller/transaction.controller.js";

const router = Router();

router.post("/", authMiddleware, createTransactionController);
router.get("/", authMiddleware, listTransactionsController);
router.put("/:id", authMiddleware, updateTransactionController);
router.delete("/:id", authMiddleware, removeTransactionController);

export default router;