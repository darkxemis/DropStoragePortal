import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserModalComponent implements OnInit {
    user: User;
    imgUser: SafeUrl;
    imgFileUpload: any;

    constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private userApiService: UserApiService,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.loaderService.show();

        this.user = await this.userApiService.GetUserByUserName();
        
        const imgUser = new Blob([await this.userApiService.GetImgUser(this.user.id)]);
        if(imgUser.size > 4) {
            this.imgUser = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imgUser));
        } else {
            this.imgUser = "../../../../../assets/img/image-drop.jpg";
        }

        this.loaderService.hide();
    }

    public handleFileInput(target): void {
        this.imgFileUpload = target.files.item(0);
    }

    public async onClickSave(): Promise<void>{
        this.loaderService.show();

        await this.userApiService.UploadImgUser(this.imgFileUpload);

        this.toastr.success("User saved");
        this.loaderService.hide();

        this.activeModal.close();
    }

    public onClickCloseModal() : void {
        this.activeModal.close();
    }
}
