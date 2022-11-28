import { Injectable } from "@angular/core";
import { TokenParsed } from "../models/tokenParse.model";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private readonly JwtTokenKey = 'jwtToken';
    private readonly JwtRefreshTokenKey = 'jwtRefreshToken';
    private readonly IsUserAuthenticatedKey = "IsUserAuthenticated";

    /* Usuario */
    private readonly User = 'User';

    public getToken(): string {
        try
        {
            return window.localStorage[this.JwtTokenKey];
        }
        catch
        {
            return "";
        }
    }

    public getTokenParsed(): TokenParsed {
        try
        {
            return this.decodeToken();
        }
        catch
        {
            return null;
        }
    }

    /*public getUser(): User {
        try
        {
            return JSON.parse(window.localStorage[this.User]) as User;
        }
        catch
        {
            return null;
        }
    }*/

    public setToken(token: string) {
        window.localStorage[this.JwtTokenKey] = token;
    }

    public getRefreshToken(): string {
        try
        {
            return window.localStorage[this.JwtRefreshTokenKey];
        }
        catch
        {
            return null;
        }
    }

    public setRefreshToken(refreshToken: string) {
        window.localStorage[this.JwtRefreshTokenKey] = refreshToken;
    }

    public isAuthenticated() : boolean {
        try{
            const authenticated: string = window.localStorage[this.IsUserAuthenticatedKey];
            if(authenticated) {
                return JSON.parse(authenticated);
            } else {
                return false;
            }
        }
        catch
        {
            return false;
        }
    }

    public isTokenExpired() {
        const expiry = this.decodeToken().exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    public setIsAuthenticated(isAuthenticated: boolean) {
        window.localStorage[this.IsUserAuthenticatedKey] = String(isAuthenticated);
    }

    public purgeToken() {
        window.localStorage.removeItem(this.JwtTokenKey);
        //window.localStorage.removeItem(this.JwtRefreshTokenKey);
        window.localStorage.removeItem(this.IsUserAuthenticatedKey);

        window.localStorage.removeItem(this.User);
    }

    private decodeToken() : TokenParsed {
        try {
            const decode: any = jwt_decode(this.getToken());
            let str;
            const newObj = {} as any;
            for (let prop in decode) {
                const val = decode[prop];
                if (prop.includes('/')) {
                str = prop.substring(prop.lastIndexOf('/') + 1, prop.length);
                }
                else {
                str = prop;
                }
                newObj[str] = val;
            }
            return newObj;
        } catch (error) {
            return null
        }
    }
}

function jwt_decode(arg0: string): any {
    throw new Error("Function not implemented.");
}
