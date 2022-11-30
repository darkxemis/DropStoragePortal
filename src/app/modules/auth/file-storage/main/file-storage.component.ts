import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FileStorageApiService } from 'src/app/logic/api-services/FileStorageApiService';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { GetFileStorage } from 'src/app/logic/models/file-storage/file-storage-get';

@Component({
  selector: 'file-storage',
  templateUrl: './file-storage.component.html',
})
export class FileStorageComponent implements OnInit {
  fileStorageList: GetFileStorage[] = [];
  disableButtomDowload: boolean;

  constructor(
    public titleService: Title,
    private fileStorageApiService: FileStorageApiService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private userApiService: UserApiService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('File storage');
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
