import { connectFirebaseDb } from "../connections/firebase"
import { Cronog } from "../types/cronog";

const db = connectFirebaseDb();

export const getCronogById = async (id : string) : Promise<Cronog>=> {
    const queryRef = await db.collection('cronog')
            .doc(id)
            .get()

    return {
        id: queryRef.id,
        ...queryRef.data(),
    } as Cronog;
}

export const getCronogByUserId = async (userId : string) : Promise<Cronog[]> => {
    let response = [];
    const queryRef = await db.collection('cronog')
        .where('userId', '==', userId)
        .get();

        if (!queryRef.empty) {
            queryRef.forEach((item) => {
                let obj = item.data() as Cronog;
                obj.id = item.id;
                response.push(obj);
            });
        }
    return response;
}

export const saveCronog = async (cronog: Cronog) => {
    const response = await db.collection('cronog').add(cronog);
    return response;
}

export const updateCronog = async (cronog: Cronog, id: string) => {
    const response = await db.collection('cronog').doc(id).update(cronog);
    return response;
}

export const deleteCronog = async (id : string) => {
    const response = await db.collection('cronog').doc(id).delete();
    return response;
}

export const getCountCronog = async () : Promise<number> => {
    const query = db.collection("cronog");
    const snapshot = await query.get();
    return snapshot.size;
}