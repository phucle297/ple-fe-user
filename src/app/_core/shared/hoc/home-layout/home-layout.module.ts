import { NgModule } from '@angular/core';

import { PrimeNgModule } from '@app/_core/vendors/primeng.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { HomeLayoutComponent } from './home-layout.component';

@NgModule({
  imports: [PrimeNgModule, SharedComponentsModule],
  exports: [HomeLayoutComponent],
  declarations: [HomeLayoutComponent],
})
export class HomeLayoutModule {}
