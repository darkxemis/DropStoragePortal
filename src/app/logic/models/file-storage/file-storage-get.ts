import { Guid } from "guid-typescript";

export class GetFileStorage {
    id: Guid
    createTime: Date
    name: string
    url: string
    extension: string
    sizeMb: number
    userId: Guid

    //Parametros opcionales que no son de la API
    checked: boolean
    urlImg: any

    constructor() {
        this.checked = false;
    }
}