import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FileStorageApiService } from 'src/app/logic/api-services/FileStorageApiService';

@Component({
  selector: 'upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
    @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
    isAllFilesUploaded: boolean;
    files: any[] = [];

    extensionFileAllowed = `apng, avif, gif, jpg, jpeg, jfif, pjpeg, pjp, png, svg, webp, 
    MP4, MOV, WMV, AVI, FLV, MKV, AVCHD, WEBM
    doc, docx, odt, pdf, rtf, tex, txt, wpd, xlsx, xlsm, xlsb, xltx, xltm, xls, xlt, xls, xml, xml, xlam, xla, xlw, xlr, json
    M4A, FLAC, MP3, WAV, WMA, AAC`

    constructor(
    public activeModal: NgbActiveModal,
    private loaderService: LoaderService,
    private fileStorageApiService: FileStorageApiService,
    private toastr: ToastrService,
    ) { }

    public async ngOnInit(): Promise<void> {
    }

    // Upload
    public async Upload(): Promise<void> {
        this.isAllFilesUploaded = false;
        let isError = false;
    
        this.loaderService.show();
    
        if(this.IsValidFiles()) {
          for (const file of this.files) {
            try {
              await this.fileStorageApiService.UploadFile(file);
            } catch(error) {
              isError = true;
              this.toastr.error(error.message, `Error to upload file: ${file.name}`);
            }
          }
      
          this.files = [];
          if(!isError){
            this.toastr.success("Files upload success", "Upload");
          }
    
          this.loaderService.hide();
        }
      }
    
      public onFileDropped($event) {
        this.prepareFilesList($event);
      }
    
      public fileBrowseHandler(target) {
        const files = target.files;
        this.prepareFilesList(files);
      }
    
      public deleteFile(index: number) {
        if (this.files[index].progress < 100) {
          console.log("Upload in progress.");
          return;
        }
        this.files.splice(index, 1);
    
        this.isAllFilesUploaded = this.files.length > 0;
      }
    
      public uploadFilesSimulator(index: number) {
        setTimeout(() => {
          if (index === this.files.length) {
            return;
          } else {
            const progressInterval = setInterval(() => {
              if (this.files[index]?.progress === 100) {
                clearInterval(progressInterval);
                this.uploadFilesSimulator(index + 1);
              } else {
                if(this.files[index]){
                  this.files[index].progress += 5;
                }
              }
            }, 10);
          }
        }, 1000);
        this.isAllFilesUploaded = true;
      }
    
      public prepareFilesList(files: Array<any>) {
        for (const item of files) {
          item.progress = 0;
          if(this.files.filter(x => x.name == item.name).length == 0){
            this.files.push(item);
          }
        }
        this.fileDropEl.nativeElement.value = "";
        this.uploadFilesSimulator(0);
      }
    
      public formatBytes(bytes, decimals = 2) {
        if (bytes === 0) {
          return "0 Bytes";
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      }

      public onClickCloseModal() : void {
        this.activeModal.close();
      }
    
      private IsValidFiles(): boolean {
        const fileNotAllowed = this.files.filter(x => !this.extensionFileAllowed.toLowerCase().includes(x.name.substr(x.name.lastIndexOf('.') + 1).toLowerCase()));
    
        if(fileNotAllowed.length > 0) {
          fileNotAllowed.forEach(x => this.toastr.error(`You can't use file with extension: ${x.name.substr(x.name.lastIndexOf('.') + 1)}`, `Error in file ${x.name}`));
          return false;
        }
    
        return true;
      }
    
      //End upload
}
