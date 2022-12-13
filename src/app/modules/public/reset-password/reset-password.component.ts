import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { ResetPassword } from 'src/app/logic/models/user/ResetPassword';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
  })
  export class ResetPasswordComponent implements OnInit {
    resetPassword: ResetPassword = new ResetPassword();

    constructor(
        public titleService: Title,
        private route: ActivatedRoute,
        private userApiService: UserApiService,
        private loaderService: LoaderService,
        private toastr: ToastrService,
        private router: Router, 
      ) {}

    public ngOnInit(): void {
      this.titleService.setTitle("Reset password");

      this.route.params.subscribe(params => {
        this.resetPassword.requestPasswordLinkId = params['id'];
     });
    }

    public async onResetPassword(): Promise<void> {
      this.loaderService.show();

      try {
        await this.userApiService.ResetPassword(this.resetPassword);
      } catch (error) {
        this.toastr.error(error.message, "Error");
      }
      
      this.toastr.success("Reset password success", "Reset password");
      await this.router.navigateByUrl('public/login');
      this.loaderService.hide();
    }
  }