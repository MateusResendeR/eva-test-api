import { login } from "@/http/controllers/userController";
import { Request, Response } from 'express';

import express from "express";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
    login(req, res);
});

export default router;