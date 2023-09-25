import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { GlobalService } from './_core/services/global.service';
declare let window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent implements OnDestroy {
  title = 'ple-fe';
  resize$ = fromEvent(window, 'resize');
  resizeSubscription!: Subscription;

  constructor(private globalService: GlobalService) {
    this.globalService.width = window.innerWidth;
  }

  ngOnInit() {
    this.resizeSubscription = this.resize$.subscribe((even: any) => {
      this.globalService.width = (event?.target as Window).innerWidth;
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }
}
