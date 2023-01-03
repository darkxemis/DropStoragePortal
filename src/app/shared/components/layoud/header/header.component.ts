import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { EditUserModalComponent } from '../../modals/edit-user.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'pr-header',
  templateUrl: './header.component.html',
})


export class HeaderComponent implements OnInit {
  public readonly pathToLogin: string = "/public/login";
  public userName: string;
  imgUser: SafeUrl;
  
  constructor(
    private userApiService: UserApiService,
    private userService: UserService,
    private modal: NgbModal,
    private loadService: LoaderService,
    private toastService: ToastrService,
    private router: Router, 
    private sanitizer: DomSanitizer,
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.loadUserValues();
  }

  private async loadUserValues(): Promise<void>{
    await this.LoadInfo();
  }

  public async OnEditUser(): Promise<void> {
    const modalRef = this.modal.open(EditUserModalComponent);

    modalRef.result.then(async () => {
      await this.LoadInfo();
    }, (reason) => {
    });
  }

  public async OnClickLogOff(): Promise<void> {
    this.userService.purgeAuth();
    await this.router.navigate(['/public/login']);
  }

  private async LoadInfo(): Promise<void> {
    const user: User = await this.userApiService.GetUserByUserName();
    this.userName = user.name;

    const imgUser = new Blob([await this.userApiService.GetImgUser(user.id)]);
    if(imgUser.size > 4) {
        this.imgUser = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imgUser));
    } else {
        this.imgUser = "../../../../../assets/img/image-drop.jpg";
    }
  }
}
