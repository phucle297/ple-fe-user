import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeLayoutModule } from '@shared/hoc/home-layout/home-layout.module';
import { PrimeNgModule } from '@app/_core/vendors/primeng.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

@NgModule({
  declarations: [HomePageComponent, WelcomePageComponent],
  imports: [CommonModule, HomeRoutingModule, HomeLayoutModule, PrimeNgModule],
})
export class HomeModule {}
