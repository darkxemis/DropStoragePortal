import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FileStorageComponent } from './file-storage/main/file-storage.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadModalComponent } from './file-storage/upload-modal/upload-modal.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    MatSlideToggleModule,
    MatMenuModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  declarations: [
    AuthComponent,
    FileStorageComponent,
    UploadModalComponent
  ]
})
export class AuthModule { }
