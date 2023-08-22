import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const ConfigModules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
];
@NgModule({
  declarations: [AppComponent],
  imports: [...ConfigModules],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
