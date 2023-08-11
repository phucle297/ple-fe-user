import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MuiModule } from 'src/_core/shared/muiModule/mui.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const ConfigModules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MuiModule,
];
@NgModule({
  declarations: [AppComponent],
  imports: [...ConfigModules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
