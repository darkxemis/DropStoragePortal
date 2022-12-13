import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { ResetPasswordEmailValidation } from 'src/app/logic/models/validations-model/ResetPasswordEmailValidation.model';

@Component({
    selector: 'reset-password-email',
    templateUrl: './reset-password-email.component.html',
  })
  export class ResetPasswordEmailComponent implements OnInit {
    public _emailValue: string = "";

    // Validaciones
    public resetPasswordEmailValidation: ResetPasswordEmailValidation;

    get requiredEmail(): boolean {
      return this.resetPasswordEmailValidation.email.hasError('required');
    }

    get invalidEmail(): boolean {
      return this.resetPasswordEmailValidation.email.hasError('invalidEmail');
    }

    get dirtyEmail(): boolean {
      return this.resetPasswordEmailValidation.email.isDirty();
    }

    constructor(
        public titleService: Title,
        private router: Router,
        private userApiService: UserApiService,
        private loaderService: LoaderService,
        private toastr: ToastrService,
      ) {}

    public ngOnInit(): void {
      this.titleService.setTitle("Reset password email");

      this.resetPasswordEmailValidation = new ResetPasswordEmailValidation();
      this._emailValue = "";
    }

    public async onResetPasswordEmail(): Promise<void> {
      this.loaderService.show();

      this.SetDirtyFields(true);

      if(this.IsValidForm()) {
        try {
          await this.userApiService.ResetPasswordEmail(this._emailValue);
          this.toastr.success("Request password success, check your email", "Request password");
          await this.router.navigateByUrl('public/login');
        } catch (error) {
          this.toastr.error(error.message, "error");
        }
      }

      this.loaderService.hide();
    }

    public OnChangeEmail(value) : void {
      this.resetPasswordEmailValidation.email.setDirty(true);
      this.IsValidForm();
    }

    private IsValidForm() : boolean {
      // Comprobar campos requeridos
      if (!this._emailValue || this._emailValue.trim() == "") {
        this.resetPasswordEmailValidation.email.setError("required");
      } else {
        this.resetPasswordEmailValidation.email.deleteError("required");
      }

      if (!this.isValidEmail()) {
        this.resetPasswordEmailValidation.email.setError("invalidEmail");
      } else {
        this.resetPasswordEmailValidation.email.deleteError("invalidEmail");
      }
      
      return !this.resetPasswordEmailValidation.hasAnyError();
    }


    private isValidEmail() : boolean {
      const regIsEmail = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");

      if (!regIsEmail.test(this._emailValue)) {
          return false;
      }

      return true;
    }

    private SetDirtyFields(dirty: boolean): void {
      this.resetPasswordEmailValidation.email.setDirty(dirty);
    }
  }