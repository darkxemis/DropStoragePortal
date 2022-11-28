import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";


@NgModule({
    imports: [
        PublicRoutingModule,
    ],
    declarations: [
        PublicComponent,
        LoginComponent
    ],
    entryComponents: [   
    ]
})
export class PublicModule { }