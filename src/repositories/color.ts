import { connectFirebaseDb } from "../connections/firebase";
import { Color } from "../types/color";

const db = connectFirebaseDb();

export const getColors = async () : Promise<Color[]> => {
    let response = [];
    const queryRef = await db.collection('colors')
        .get();

    if (!queryRef.empty) {
        queryRef.forEach((item) => {
            let obj = item.data() as Color;
            obj.id = item.id;
            response.push(obj);
        });
    }
    return response;
}

export const saveColor = async (color : Color) => {
    const response = await db.collection('colors').add(color);
    return response;
}