import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { AuthComponent } from './auth.component';
import { FileStorageComponent } from './file-storage/main/file-storage.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuardService],
    children: [
        {
          path: 'file-storage',
          component: FileStorageComponent,
          canActivate: [AuthGuardService],
          //data: {showHeader: true, showSidebar: true}
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
