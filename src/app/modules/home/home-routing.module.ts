import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MarketplacePageComponent } from './pages/marketplace-page/marketplace-page.component';
import { NftDetailPageComponent } from './pages/nft-detail-page/nft-detail-page.component';
import { PoolPageComponent } from './pages/pool-page/pool-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'marketplace', component: MarketplacePageComponent },
  {
    path: 'nft-detail',
    children: [{ path: ':id', component: NftDetailPageComponent }],
  },
  { path: 'pool', component: PoolPageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
