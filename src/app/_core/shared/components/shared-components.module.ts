import { NgModule } from '@angular/core';
import { PrimeNgModule } from '@app/_core/vendors/primeng.module';
import { ShortenAddressPipe } from '../pipes/shortenAddress.pipe';
import { CheckboxCustomComponent } from './checkbox-custom/checkbox-custom.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const components = [HeaderComponent, SidebarComponent, CheckboxCustomComponent];
const pipes = [ShortenAddressPipe];
@NgModule({
  imports: [PrimeNgModule],
  exports: [...components],
  declarations: [...components, ...pipes],
})
export class SharedComponentsModule {}
