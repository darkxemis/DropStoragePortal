import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PublicComponent } from "./public.component";
import { ResetPasswordEmailComponent } from "./reset-password-email/reset-password-email.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
    {
        path: 'public',
        component: PublicComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'reset-password-email',
                component: ResetPasswordEmailComponent,
            },
            {
                path: 'reset-password/:id',
                component: ResetPasswordComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}