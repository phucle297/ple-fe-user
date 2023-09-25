import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '@app/_core/services/global.service';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
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
  width: number = 0;
  route: string = '';
  routerSubscription!: Subscription;

  constructor(private router: Router, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.route = this.router.url;
    });

    this.globalService.width$.subscribe((res) => {
      console.log(res);
      this.width = res;
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
