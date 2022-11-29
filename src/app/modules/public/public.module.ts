import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { ResetPasswordEmailComponent } from "./reset-password-email/reset-password-email.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PublicRoutingModule
    ],
    declarations: [
        PublicComponent,
        LoginComponent,
        ResetPasswordEmailComponent
    ],
    entryComponents: [   
    ]
})
export class PublicModule { }