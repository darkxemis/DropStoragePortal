import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { throwIfAlreadyLoaded } from "./guards/module-import.guard";
import { HttpAuthInterceptor } from "./interceptors/http-auth.interceptor";
import { HttpDateInterceptor } from "./interceptors/http-date.interceptor";
import { ApiService } from "./services/api.service";
import { LocalStorageService } from "./services/local-storage.service";
import { UserService } from "./services/user.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { LoaderService } from "./services/loader.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpDateInterceptor, multi: true },
        ApiService,
        AuthGuardService,
        LocalStorageService,
        UserService,
        LoaderService
    ]
})
export class CoreModule { 
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}