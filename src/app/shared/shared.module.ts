import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { DndDirective } from './directive/dnd.directive';
import { ProgressComponent } from './progress/progress.component';
import { HeaderComponent } from './components/layoud/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoaderComponent,
    DndDirective,
    ProgressComponent,
    HeaderComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    LoaderComponent,
    ProgressComponent,
    HeaderComponent
],
  entryComponents: [
  ]
})
export class SharedModule { }