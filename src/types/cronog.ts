import { Days } from "./days";
import { typeCronog } from "./typeCronog";

export type Cronog = {
    id: string,
    userId: string,
    notificationId: number,
    order: number,
    color: string,
    date?: string,
    time?: string,
    icon: {},
    weekdays?: Array<Days>,
    type: typeCronog,
    title: string,
    taskCount: number;
};