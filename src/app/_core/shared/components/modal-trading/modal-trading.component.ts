import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '@app/_core/services/modal.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-trading',
  templateUrl: './modal-trading.component.html',
  styleUrls: ['./modal-trading.component.scss'],
})
export class ModalTradingComponent implements OnInit, OnDestroy {
  data: any;
  visible: boolean = false;
  private statusObject = new BehaviorSubject<string>('init');
  status$ = this.statusObject.asObservable();
  constructor(private modalService: ModalService) {}
  status: string = 'init';
  modalDataSub!: Subscription;
  statusSub!: Subscription;

  ngOnInit() {
    this.modalDataSub = this.modalService.modalData$.subscribe((data) => {
      this.data = data.data;
    });
    this.statusSub = this.status$.subscribe((status) => {
      this.status = status;
    });
  }

  ngOnDestroy() {
    this.statusObject.unsubscribe();
    this.modalDataSub.unsubscribe();
    this.statusSub.unsubscribe();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.statusObject.next('init');
    this.status = 'init';
  }

  closeModal() {
    this.modalService.closeModal();
  }

  buyNft() {
    this.statusObject.next('loading');
    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.statusObject.next('success');
      } else {
        this.statusObject.next('failed');
      }
    }, 2000);
  }
}
