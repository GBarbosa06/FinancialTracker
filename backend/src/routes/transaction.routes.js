import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { CreateTransactionSchema, UpdateTransactionSchema } from "../schemas/transaction.schema.js";
import { 
    createTransactionController,
    listTransactionsController,
    updateTransactionController,
    removeTransactionController,
    getTransactionSummaryController
} from "../controller/transaction.controller.js";

const router = Router();

router.get("/summary", authMiddleware, getTransactionSummaryController)
router.post("/", authMiddleware, validate(CreateTransactionSchema), createTransactionController);
router.get("/", authMiddleware, listTransactionsController);
router.put("/:id", authMiddleware, validate(UpdateTransactionSchema), updateTransactionController);
router.delete("/:id", authMiddleware, removeTransactionController);


export default router;