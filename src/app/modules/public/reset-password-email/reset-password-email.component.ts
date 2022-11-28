import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'reset-password-email',
    templateUrl: './reset-password-email.component.html',
  })
  export class ResetPasswordEmailComponent implements OnInit {
    public _emailValue: string = "";

    constructor(
        public titleService: Title,
        private router: Router,
      ) {}

    ngOnInit(): void {
      this.titleService.setTitle("Reset password email");

      this._emailValue = "";
    }
  }