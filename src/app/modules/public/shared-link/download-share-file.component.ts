import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ShareLinkApiService } from 'src/app/logic/api-services/ShareLinkApiService';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { ResetPasswordEmailValidation } from 'src/app/logic/models/validations-model/ResetPasswordEmailValidation.model';

@Component({
    selector: 'shared-link-file',
    templateUrl: './download-share-file.component.html',
  })
  export class SharedLinkFileComponent implements OnInit {
    idShareLink: string;

    constructor(
        public titleService: Title,
        private loaderService: LoaderService,
        private toastr: ToastrService,
        private shareLinkApiService: ShareLinkApiService,
        private route: ActivatedRoute,
      ) {}

    public ngOnInit(): void {
      this.titleService.setTitle("Share file");

      this.route.params.subscribe(params => {
        this.idShareLink = params['id'];
     });
    }

    public async onClickDownloadSharedFiles(): Promise<void> {
        const extension: string = ".zip";

        this.loaderService.show();

        try {
            const blob = new Blob([await this.shareLinkApiService.DownloadShareLink(this.idShareLink)], {
                type: 'application/zip'
            });
    
            const url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.download = `${moment().format('yyyy_MM_DD-HH_mm_ss')}${extension}`;
            a.href = url;
            a.click();
            a.remove();

            this.toastr.success("Download shared files success", "Success");
        } catch(error) {
            console.log(error);
            this.toastr.error("Date expired", "Error");
        }

        this.loaderService.hide();
    }
  }