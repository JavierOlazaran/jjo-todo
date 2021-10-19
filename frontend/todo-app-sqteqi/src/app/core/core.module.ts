import { MainInterceptor } from './interceptors/main.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeHandlingModule } from './theme-handling/theme-handling.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThemeHandlingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true},
  ]
})
export class CoreModule { }
