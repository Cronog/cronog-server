export type Task = {
    id?: string,
    idCronog: string,
    title: string,
    imgs: Buffer[],
    order: number,
    description?: string,
    createAt: Date
}