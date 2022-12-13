export class ResetPassword {
    password: string;
    confirmPassword: string;
    requestPasswordLinkId: string;

    constructor() {
        this.password = "";
        this.confirmPassword = "";
        this.requestPasswordLinkId = "";
    }
}