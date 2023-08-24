import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home'],
    },
    {
      label: 'Marketplace',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/marketplace'],
    },
    {
      label: 'Pool',
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: ['/pool'],
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      routerLink: ['/events'],
    },
  ];
}
