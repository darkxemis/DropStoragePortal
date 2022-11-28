import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/local-storage.service";
import { UserService } from "../services/user.service";
import { tap } from 'rxjs/operators';  

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router,
        private userService: UserService,
        private jwtService: LocalStorageService
    ) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {};
        
        //console.log("intercept: " + req.url);

        const token = this.jwtService.getToken();

        if(token) {
            headersConfig['Authorization'] = `Bearer ${token}`; 
        }
        
        const headerContentType = req.headers.get('Content-Type');
        if(headerContentType) {
            headersConfig['Content-Type'] = headerContentType;
        }

        const headerAccept = req.headers.get('Accept');
        if(headerAccept) {
            headersConfig['Accept'] = headerAccept;
        }

        req = req.clone({ setHeaders: headersConfig });

        return next.handle(req).pipe(tap(val => {}, async err => {
            if(err instanceof HttpErrorResponse && err.status == 401) {
                this.userService.purgeAuth();
                await this.router.navigate(['/']);
            }
        }));
    }
    
}