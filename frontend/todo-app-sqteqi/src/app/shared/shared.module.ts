import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosListHeaderComponent } from './components/todos-list-header/todos-list-header.component';
import { MainBackgroundImgComponent } from './components/main-background-img/main-background-img.component';



@NgModule({
  declarations: [
    TodosListHeaderComponent,
    MainBackgroundImgComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [TodosListHeaderComponent, MainBackgroundImgComponent]
})
export class SharedModule { }
