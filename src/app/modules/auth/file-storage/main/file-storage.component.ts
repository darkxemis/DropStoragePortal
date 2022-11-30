import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FileStorageApiService } from 'src/app/logic/api-services/FileStorageApiService';
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
    
    try {
      await this.DownloadFiles(idFilesSelected);
    } catch(error) {
      this.toastr.error("Error to download files", "Error");
    }
    
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
    try {
      this.fileStorageList = await this.fileStorageApiService.GetAllFilesByUserId("EEDC4753-3F88-4A48-8A9B-AA59E5337B83");
    } catch(error) {
      this.toastr.error("Error to load files", "Error");
    } 
  }
}
