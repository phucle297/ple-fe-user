import { NgModule } from '@angular/core';

import { HomeLayoutComponent } from './home-layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PrimeNgModule } from '@app/_core/vendors/primeng.module';
import { ShortenAddressPipe } from '../../pipes/shortenAddress.pipe';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@NgModule({
  imports: [PrimeNgModule],
  exports: [HomeLayoutComponent],
  declarations: [
    HomeLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    ShortenAddressPipe,
  ],
})
export class HomeLayoutModule {}
