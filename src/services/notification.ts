import * as cronogRespository from "../repositories/cronog";

export const generateNotificationId = async () : Promise<number> => {
    let countDocs = await cronogRespository.getCountCronog()
    return countDocs + 1
} 