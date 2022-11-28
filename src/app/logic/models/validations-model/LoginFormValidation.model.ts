import { BaseValidation } from "./BaseValidation.model";

export class LoginFormValidation {
    public user: BaseValidation;
    public password: BaseValidation;

    public hasAnyError () : boolean {
        return this.user.viewAllErrors().length > 0 || this.password.viewAllErrors().length > 0;
    }

    constructor() {
        this.user = new BaseValidation();
        this.password = new BaseValidation();
    }
}