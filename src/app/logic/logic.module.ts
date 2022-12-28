import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { throwIfAlreadyLoaded } from "../core/guards/module-import.guard";
import { FileStorageApiService } from "./api-services/FileStorageApiService";
import { ShareLinkApiService } from "./api-services/ShareLinkApiService";
import { UserApiService } from "./api-services/UserApiService";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        FileStorageApiService,
        UserApiService,
        ShareLinkApiService
    ]
})
export class LogicModule { 
    constructor(@Optional() @SkipSelf() parentModule: LogicModule) {
        throwIfAlreadyLoaded(parentModule, 'LogicModule');
    }
}