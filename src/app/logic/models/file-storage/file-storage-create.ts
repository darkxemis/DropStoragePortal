export class CreateFileStorage {
    name: string;
    size: number;
    file: Blob;

    constructor() {
        this.name = "";
        this.size = 0;
        this.file = new Blob();
    }
}