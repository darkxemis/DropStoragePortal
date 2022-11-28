export class BaseValidation {
    private errors: string[];
    private dirty: boolean;

    public hasError(error: string) : boolean {
        return this.errors.includes(error);
    }

    public setError(error: string) : void {
        if (!this.errors.includes(error)) {
            this.errors.push(error);
        }
    }

    public deleteError(error: string) : void {
        const index: number = this.errors.indexOf(error);
        if (index !== -1) {
            this.errors.splice(index, 1);
        }    
    }

    public viewAllErrors() : string[] {
        return this.errors;
    }

    public setDirty(dirty: boolean) {
        this.dirty = dirty;
    }

    public isDirty() : boolean {
        return this.dirty;
    }

    constructor() {
        this.errors = [];
        this.dirty = false;
    }
}