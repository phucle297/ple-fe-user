import { NgModule } from '@angular/core';
import { PrimeNgModule } from '@app/_core/vendors/primeng.module';
import { ShortenAddressPipe } from '../pipes/shortenAddress.pipe';
import { CheckboxCustomComponent } from './checkbox-custom/checkbox-custom.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalCustomComponent } from './modal-custom/modal-custom.component';
import { ModalTradingComponent } from './modal-trading/modal-trading.component';
import { ModalAuctionComponent } from './modal-auction/modal-auction.component';
import { UppercaseFirstLetter } from '../pipes/upperCaseFirstLetter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryNftComponent } from './history-nft/history-nft.component';
import { SameTypeComponent } from './same-type/same-type.component';

const components = [
  HeaderComponent,
  SidebarComponent,
  CheckboxCustomComponent,
  ModalCustomComponent,
  ModalTradingComponent,
  ModalAuctionComponent,
  HistoryNftComponent,
  SameTypeComponent,
];
const pipes = [ShortenAddressPipe, UppercaseFirstLetter];
@NgModule({
  imports: [PrimeNgModule, ReactiveFormsModule],
  exports: [...components, ...pipes],
  declarations: [...components, ...pipes],
})
export class SharedComponentsModule {}
