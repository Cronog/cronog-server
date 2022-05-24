import * as taskRespository from "../repositories/task";
import { Task } from "../types/task";
import fs from "fs";

export const getTaskById = async (id : string) : Promise<Task> => {
    let response = await taskRespository.getTaskById(id);
    return response;
}

export const getTaskByCronogId = async (cronogId: string) : Promise<Task[]> => {
    let response = await taskRespository.getTasksByCronogId(cronogId);
    return response.sort((prev, next) => prev.order - next.order);
}

export const saveTask = async (task: Task, file: Blob) => {
    task.img = fs.readFileSync(`uploads/${file["filename"]}`)
    await taskRespository.saveTask(task);
}

export const updateTask = async (id: string, task: Task) => {
    await taskRespository.updateTask(task, id);
}

export const deleteTask = async (id: string) : Promise<boolean> => {
    try{
        await taskRespository.deleteTask(id);
        return true;
    } catch (error) {
        return false;
    }
}

export const deleteTaskByCronogId = async (cronogId: string) : Promise<boolean> => {
    try {
        await taskRespository.deleteTaskByCronogId(cronogId);
        return true;
    } catch (error) {
        return false;
    }
}