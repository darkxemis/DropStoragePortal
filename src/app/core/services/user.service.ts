import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ApiConstants } from "../../logic/constants/api.constants";
import { Access } from "../models/access.model";
import { Auth } from "../models/auth.model";
import { TokenParsed } from "../models/tokenParse.model";
import { User } from "../models/user.model";
import { ApiService } from "./api.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(null);
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    
    public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private localStorageService: LocalStorageService
    ) { }

    public getCurrentTokenParse() : TokenParsed {
        return this.localStorageService.getTokenParsed();
    }

    public async attemptAuth(access: Access) : Promise<void> {
        const data: Auth = await this.apiService.post(ApiConstants.pathAuthToken, access) as Auth;
        
        this.setUserByToken(data);
    }

    public async purgeAuth() {
        this.localStorageService.purgeToken();
        this.purgeUser();
    }

    private async purgeUser() {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }
    
    private setUserByToken(data: Auth) {
        this.localStorageService.setToken(data.access_token);
        //this.localStorageService.setRefreshToken(data.refresh_token);
    }
}