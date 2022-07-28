import express from "express";
import * as colorService from "../services/color";
import formatMessageError from "../services/error";
import { Response } from "../types/response";

const router = express.Router()

router.get('/color', async (req, res) => {
    let response: Response;
    try {
        const data = await colorService.getColors();
        response = {
            success: true,
            status: 200,
            data: data
        };
    } catch (error) {
        response = {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        };
    }
    res.send(response);
});

router.post('/color', async (req, res) => {
    let response: Response;
    try {
        await colorService.saveColor(req.body);
        response = {
            success: true,
            status: 200,
            message: "Cor criada com sucesso"
        };
    } catch (error) {
        response = {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        };
    }
    res.send(response);
});


export default router;