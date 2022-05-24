import { Request } from "express";

import * as cronogRespository from "../repositories/cronog";
import { Cronog } from "../types/cronog";
import { Response } from "../types/response";
import { Task } from "../types/task";
import formatMessageError from "./error";
import { generateNotificationId } from "./notification";
import { deleteTaskByCronogId, getTaskByCronogId } from "./task";

export const getCronogById = async (req : Request) : Promise<Response<Cronog | {}>> => {
    try {
        let response = await cronogRespository.getCronogById(req.params.id);
        response.icon = JSON.parse(response.icon as string);
        return {
            success: true,
            status: 200,
            data: response
        } as Response<Cronog>
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}

export const getCronogByUserId = async (req : Request) : Promise<Response<Cronog[] | {}>> => {
    try {
        let response = await cronogRespository.getCronogByUserId(req.params.userId);
        await Promise.all(response.map(async item => {
            item.icon = JSON.parse(item.icon as string);
            item.taskCount = await (await getTaskByCronogId(item.id)).length
        }))
        return {
            success: true,
            status: 200,
            data: response.sort((prev, next) => prev.order - next.order)
        } as Response<Cronog[]>
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}

export const saveCronog = async (req: Request) : Promise<Response> => {
    try {
        let cronog = req.body as Cronog
        cronog.icon = JSON.stringify(cronog.icon);
        cronog.notificationId = await generateNotificationId()
        await cronogRespository.saveCronog(cronog);
        return {
            success: true,
            status: 200,
            message: "Novo Cronog criado",
            data: cronog.notificationId
        } as Response
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}

export const updateCronog = async (req: Request) : Promise<Response> => {
    try {
        let cronog = req.body as Cronog
        cronog.icon = JSON.stringify(cronog.icon);
        await cronogRespository.updateCronog(req.body, req.params.id);
        return {
            success: true,
            status: 200,
            message: "Cronog atualizado com sucesso",
            data: cronog.notificationId
        } as Response
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}

export const deleteCronog = async (req: Request) : Promise<Response> => {
    try {
        await deleteTaskByCronogId(req.params.id)
        const response = await cronogRespository.deleteCronog(req.params.id);
        return {
            success: true,
            status: 200,
            message: "Cronog excluido com sucesso",
            data: response
        } as Response
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: formatMessageError(error.code),
            data: error
        } as Response
    }
}