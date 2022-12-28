import { Guid } from "guid-typescript";
import { GetFileStorage } from "../file-storage/file-storage-get";

export class GetShareLink {
    id: Guid;
    expirationDate: Date;
    userId: Guid;

    user: GetFileStorage;

    constructor() {
        this.id = undefined;
        this.expirationDate = undefined;
        this.userId = undefined;

        this.user = new GetFileStorage();
    }
}