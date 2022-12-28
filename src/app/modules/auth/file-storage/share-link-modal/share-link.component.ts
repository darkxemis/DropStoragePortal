import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'share-link',
  templateUrl: './share-link.component.html'
})
export class ShareLinkModalComponent implements OnInit {
    emails: string;

    constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
    ) { }

    public async ngOnInit(): Promise<void> {
    }

    public onSendModal() : void {
        const regIsEmail = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");
        let emails: string[] = this.emails?.trim().replace(/\s\s+/g, "").split(";");
        let thereIsErrors:boolean = false;  

        if(emails == undefined || emails.length == 0) {
            this.toastr.info("You need to add at leats one email");
        } else {
            emails.forEach(email => {
                if (!regIsEmail.test(email)) {
                    thereIsErrors = true;
                    this.toastr.error("This is not a email: " + email);
                }
            });

            if(!thereIsErrors) {
                this.activeModal.close(emails);
            }
        }
    }

    public onClickCloseModal() : void {
        this.activeModal.close();
    }
}
