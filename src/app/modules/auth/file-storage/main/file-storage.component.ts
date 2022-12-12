import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FileStorageApiService } from 'src/app/logic/api-services/FileStorageApiService';
import { UserApiService } from 'src/app/logic/api-services/UserApiService';
import { CreateFileStorage } from 'src/app/logic/models/file-storage/file-storage-create';
import { GetFileStorage } from 'src/app/logic/models/file-storage/file-storage-get';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'file-storage',
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.scss']
})
export class FileStorageComponent implements OnInit {
  fileStorageList: GetFileStorage[] = [];
  disableButtomDownload: boolean;
  menuTopLeftPosition =  {x: 0, y: 0}

  // reference to the MatMenuTrigger in the DOM
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  constructor(
    public titleService: Title,
    private fileStorageApiService: FileStorageApiService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private userApiService: UserApiService,
    private sanitizer: DomSanitizer,
    private modal: NgbModal,
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
    this.disableButtomDownload = !this.fileStorageList.some(file => file.checked === true);
  }

  public async Download(): Promise<void> {
    let idFilesSelected = this.fileStorageList.filter(x => x.checked == true).map(x => x.id.toString());

    this.loaderService.show();

    if(idFilesSelected.length != 0) {
      try {
        await this.DownloadFiles(idFilesSelected);
        this.toastr.success("Download success", "Download");
        this.loaderService.hide();
      } catch(error) {
        this.toastr.error("Error to download files", "Error");
      }
    } else {
      this.toastr.error("You must select at least one file", "Error");
    }

    await this.InitFiles();
  }

  public onRightClick(event: MouseEvent) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX;
    this.menuTopLeftPosition.y = event.clientY;

    // we open the menu
    // we pass to the menu the information about our object
    //this.matMenuTrigger.menuData = {item: item}

    // we open the menu
    this.matMenuTrigger.openMenu();
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
    this.disableButtomDownload = true;

    this.loaderService.show();
    try {
      let user: User = await this.userApiService.GetUserByUserName();
      this.fileStorageList = await this.fileStorageApiService.GetAllFilesByUserId(user.id);
      await this.loadImg();
    } catch(error) {
      this.toastr.error("Error to load files", "Error");
    } 
    this.loaderService.hide();
  }

  readonly imagesTypes: string = "apng, avif, gif, jpg, jpeg, jfif, pjpeg, pjp, png, svg, webp";
  readonly MusicTypes: string = "m4a, flac, mp3, wav, wma, aac";

  private async loadImg(): Promise<void> {
    this.fileStorageList.forEach(async (file) => {
      if (this.imagesTypes.toLowerCase().includes(file.extension.replace(".", "").toLowerCase())) {
        const blob = new Blob([await this.fileStorageApiService.GetImg([file.id.toString()])]);
        file.urlImg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
      } else if (this.MusicTypes.toLowerCase().includes(file.extension.replace(".", "").toLowerCase())){
        file.urlImg = "../../../../../assets/img/music-file.png";
      } else{
        file.urlImg = "../../../../../assets/img/file-document.png";
      }
    });
  }

  public open() {
    const modalRef = this.modal.open(UploadModalComponent);

    modalRef.result.then(() => {
      this.InitFiles();
    }, (reason) => {
    });
  }
}
