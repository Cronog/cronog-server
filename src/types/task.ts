export type Task = {
    id?: string,
    idCronog: string,
    title: string,
    img: Buffer,
    order: number,
    description?: string,
    createAt: Date
}