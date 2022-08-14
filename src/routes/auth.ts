import express from "express";
import { Response } from "../types/response";
import { connectFirebaseAuth } from "../connections/firebase";
import * as registerService from "../services/auth";
import requireAuth from "../middleware/auth";

const router = express.Router()

const app = connectFirebaseAuth();

router.post('/auth/singin', async (req, res, next) => {
    const response = await registerService.singin(req);
    res.send(response);
})

router.post('/auth/register', async (req, res, next) => {
    const response = await registerService.register(req);
    res.send(response);
})

router.get('/auth/recovery/:email', async (req, res, next) => {
    const response = await registerService.sendEmailResetPassword(req.params.email);
    res.send(response);
})

router.get("/auth/authenticatedUser", requireAuth, async (req, res) => {
    res.send({
        success: true,
        status: 200
    } as Response);
})

router.get("/auth/refresh/:refreshToken", async (req, res) => {
    const response = await registerService.renewAccessToken(req.params.refreshToken)
    res.send(response);
})

export default router;
