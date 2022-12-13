import { Guid } from "guid-typescript";

export class GetFileStorage {
    id: Guid
    createTime: Date
    name: string
    url: string
    extension: string
    sizeBytes: number
    userId: Guid

    //Parametros opcionales que no son de la API
    checked: boolean
    urlImg: any
    sizeMB: string

    constructor() {
        this.checked = false;
    }
}