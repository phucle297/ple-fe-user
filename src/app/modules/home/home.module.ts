import { SharedComponentsModule } from './../../_core/shared/components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeLayoutModule } from '@shared/hoc/home-layout/home-layout.module';
import { PrimeNgModule } from '@app/_core/vendors/primeng.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MarketplacePageComponent } from './pages/marketplace-page/marketplace-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchAndFilterComponent } from './pages/marketplace-page/components/search-and-filter/search-and-filter.component';
import { ProductListComponent } from './pages/marketplace-page/components/product-list/product-list.component';
import { ProductItemComponent } from './pages/marketplace-page/components/product-item/product-item.component';
import { NftDetailPageComponent } from './pages/nft-detail-page/nft-detail-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    WelcomePageComponent,
    MarketplacePageComponent,
    SearchAndFilterComponent,
    ProductListComponent,
    ProductItemComponent,
    NftDetailPageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeLayoutModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
})
export class HomeModule {}
