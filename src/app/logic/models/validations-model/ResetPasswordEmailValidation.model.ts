import { BaseValidation } from "./BaseValidation.model";

export class ResetPasswordEmailValidation {
    public email: BaseValidation;

    public hasAnyError () : boolean {
        return this.email.viewAllErrors().length > 0;
    }

    constructor() {
        this.email = new BaseValidation();
    }
}