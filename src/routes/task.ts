import express from "express";
import requireAuth from "../middleware/authMiddleware";
import * as taskService from "../services/task";
import multer from  'multer';
import { Task } from "../types/task";
import formatMessageError from "../services/error";
import { Response } from "../types/response";
const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.get('/task/:cronogId/:id', requireAuth, async (req, res) => {
    let response: Response;
    try {
        const data = await taskService.getTaskById(req.params.id);
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

router.get('/task/:cronogId', requireAuth, async (req, res) => {
    let response: Response;
    try {
        const data = await taskService.getTaskByCronogId(req.params.cronogId);
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

router.post('/task', requireAuth, upload.single('img'), async (req, res) => {
    let response: Response;
    try {
        await taskService.saveTask(JSON.parse(req.body.data) as Task, req["file"]);
        response = {
            success: true,
            status: 200,
            message: "Tarefa criada com sucesso",
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

router.put('/task/:cronogId/:id', requireAuth, upload.single('img'), async (req, res) => {
    let response: Response;
    try {
        await taskService.updateTask(req.params.id, JSON.parse(req.body.data) as Task, req["file"]);
        response = {
            success: true,
            status: 200,
            message: "Tarefa atualizada com sucesso",
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

router.delete('/task/:cronogId/:id', requireAuth, async (req, res) => {
    let response: Response;
    try {
        await taskService.deleteTask(req.params.id);
        response = {
            success: true,
            status: 200,
            message: "Tarefa excluida com sucesso",
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
