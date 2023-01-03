export class User {
    id: string;
    login: string;
    name: string;
    lastName: string;
    password: string;
    address: string;
    profilePhotoUrl: string;
    directoryHome: string;

    constructor() {
        this.id = "";
        this.login = "";
        this.name = "";
        this.lastName = "";
        this.password = "";
        this.address = "";
        this.profilePhotoUrl = "";
        this.directoryHome = "";
    }
}