import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { AboutPageComponent } from '../pages/about-page/about-page.component';

@NgModule({
  declarations: [HomePageComponent, AboutPageComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}