import { connectFirebaseDb } from "../connections/firebase";
import { Task } from "../types/task";

const db = connectFirebaseDb();

export const getTaskById = async (id : string) : Promise<Task>=> {
    const queryRef = await db.collection('task')
            .doc(id)
            .get()

    return {
        id: queryRef.id,
        ...queryRef.data(),
    } as Task;
}

export const getTasksByCronogId = async (cronogId : string) : Promise<Task[]> => {
    let response = [];
    const queryRef = await db.collection('task')
        .where('cronogId', '==', cronogId)
        .get();

    if (!queryRef.empty) {
        queryRef.forEach((item) => {
            let obj = item.data() as Task;
            obj.id = item.id;
            response.push(obj);
        });
    }
    return response;
}

export const saveTask = async (task : Task) => {
    const response = await db.collection('task').add(task);
    return response;
}

export const updateTask = async (task: Task, id: string) => {
    const response = await db.collection('task').doc(id).update(task);
    return response;
}

export const deleteTask = async (id : string) => {
    const response = await db.collection('task').doc(id).delete();
    return response;
}

export const deleteTaskByCronogId = async (cronogId : string) => {
    const queryRef = await db.collection('task')
        .where("cronogId", "==", cronogId).get()

    if (!queryRef.empty) {
        queryRef.forEach(async (item) => {
            await db.collection('task').doc(item.id).delete();
        });
    }
}