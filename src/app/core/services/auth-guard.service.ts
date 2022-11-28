import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  userLoggedIn = false;

  constructor(private authService: UserService, private router: Router) {}

  public canActivate() : boolean {
      if (this.authService.getCurrentTokenParse()) {
        return true;
      } else {
        this.router.navigate(['public/login']);
        return false;
      }
    }
  }