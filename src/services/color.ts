import { Color } from "../types/color";
import * as colorRespository from "../repositories/color";

export const getColors = async () : Promise<Color[]> => {
    let response = await colorRespository.getColors();
    return response;
}

export const saveColor = async (color : Color) => {
    await colorRespository.saveColor(color);
}