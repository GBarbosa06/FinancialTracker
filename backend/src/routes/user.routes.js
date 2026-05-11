import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ 
        message: "PROTECTED_PROFILE",
        userId: req.userId 
    });
});

export default router;