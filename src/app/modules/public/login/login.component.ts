import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Access } from 'src/app/core/models/access.model';
import { UserService } from 'src/app/core/services/user.service';
import { LoginFormValidation } from 'src/app/logic/models/validations-model/LoginFormValidation.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginFormValidation: LoginFormValidation;
  
  public userValue: string;
  public passwordValue: string;

  //Validations
  get requiredPassword(): boolean {
    return this.loginFormValidation.password.hasError('required');
  }
  get dirtyPasswordChange(): boolean {
    return this.loginFormValidation.password.isDirty();
  }

  get requiredUser(): boolean {
    return this.loginFormValidation.user.hasError('required');
  }
  get dirtyUserChange(): boolean {
    return this.loginFormValidation.user.isDirty();
  }

  constructor(
    public titleService: Title,
    private userService: UserService
  ){}

  public async ngOnInit(): Promise<void> {
    this.titleService.setTitle("Login");

    this.loginFormValidation = new LoginFormValidation();
    this.userValue = "";
    this.passwordValue = "";
  }

  public async login(): Promise<void> {
    this.SetDirtyFields(true);

    if(this.IsValidForm()) {
      try {
        const access: Access = {
          username: this.userValue,
          password: this.passwordValue,
        };
  
        await this.userService.attemptAuth(access);
  
        //await this.toastr.success(mensajeLoginSuccess);
        
        console.log("Todo ok");
        //this.toastr.success("Algo", "Algo titutlo");
  
      } catch (error) {
        if (error && error.message) {
          //this.toastr.error(error.message, "Algo error titulo");
        }
      }
    }
  }

  public OnChangePassword(value): void {
    this.loginFormValidation.password.setDirty(true);
    this.IsValidForm();
  }

  public OnChangeUser(value): void {
    this.loginFormValidation.user.setDirty(true);
    this.IsValidForm();
  }

  private IsValidForm(): boolean {
    // Comprobar campos requeridos
    if (!this.userValue || this.userValue.trim() == "") {
      this.loginFormValidation.user.setError("required");
    } else {
      this.loginFormValidation.user.deleteError("required");
    }

    if (!this.passwordValue || this.passwordValue.trim() == "") {
      this.loginFormValidation.password.setError("required");
    } else {
      this.loginFormValidation.password.deleteError("required");
    }

    return !this.loginFormValidation.hasAnyError();
  }

  private SetDirtyFields(dirty: boolean): void {
    this.loginFormValidation.user.setDirty(dirty);
    this.loginFormValidation.password.setDirty(dirty);
  }
}

