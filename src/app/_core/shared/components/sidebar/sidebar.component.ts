import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
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

  route: string = '';
  routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.route = this.router.url;
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
