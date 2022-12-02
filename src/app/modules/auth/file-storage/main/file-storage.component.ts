import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FileStorageApiService } from 'src/app/logic/api-services/FileStorageApiService';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { CreateFileStorage } from 'src/app/logic/models/file-storage/file-storage-create';
import { GetFileStorage } from 'src/app/logic/models/file-storage/file-storage-get';

@Component({
  selector: 'file-storage',
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.scss']
})
export class FileStorageComponent implements OnInit {
  fileStorageList: GetFileStorage[] = [];
  disableButtomDowload: boolean;

  //Upload
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  isAllFilesUploaded: boolean;

  constructor(
    public titleService: Title,
    private fileStorageApiService: FileStorageApiService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private userApiService: UserApiService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('File storage');
    this.isAllFilesUploaded = false;
    await this.InitFiles();
  }

  public ClickCheckBoxDowloadFile(file: GetFileStorage): void {
    if(file.checked == null || file.checked == undefined){
      file.checked = false;
    }

    file.checked = !file.checked;

    // Desabilitamos el boton si no hay ninguno clicado
    this.disableButtomDowload = !this.fileStorageList.some(file => file.checked === true);
  }

  public async Download(): Promise<void> {
    let idFilesSelected = this.fileStorageList.filter(x => x.checked == true).map(x => x.id.toString());
    
    this.loaderService.show();
    try {
      await this.DownloadFiles(idFilesSelected);
    } catch(error) {
      this.toastr.error("Error to download files", "Error");
    }

    this.loaderService.hide();

    await this.InitFiles();

    this.toastr.success("Download success", "Download");
  }

  // Upload
  public async Upload(): Promise<void> {
    this.isAllFilesUploaded = false;
    let isError = false;

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

    await this.InitFiles();
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
      this.files.push(item);
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

  //End upload

  private async DownloadFiles(idFilesSelected: string[]): Promise<void> {
    const extension: string = ".zip";

    const blob = new Blob([await this.fileStorageApiService.GetDownloadFile(idFilesSelected)], {
      type: 'application/zip'
    });
    
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.download = `${moment().format('yyyy_MM_DD-HH_mm_ss')}${extension}`;
    a.href = url;
    a.click();

    a.remove();
  }

  private async InitFiles(): Promise<void> {
    this.disableButtomDowload = true;

    this.loaderService.show();
    try {
      let user: User = await this.userApiService.GetUserByUserName();
      this.fileStorageList = await this.fileStorageApiService.GetAllFilesByUserId(user.id);
    } catch(error) {
      this.toastr.error("Error to load files", "Error");
    } 
    this.loaderService.hide();
  }
}
