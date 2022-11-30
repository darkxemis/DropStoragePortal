import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileStorageComponent } from './file-storage/main/file-storage.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [
    AuthComponent,
    FileStorageComponent,
  ]
})
export class AuthModule { }
