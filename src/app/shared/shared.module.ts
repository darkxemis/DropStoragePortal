import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { DndDirective } from './directive/dnd.directive';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    LoaderComponent,
    DndDirective,
    ProgressComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    LoaderComponent,
    ProgressComponent
],
  entryComponents: [
  ]
})
export class SharedModule { }