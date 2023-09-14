import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/_core/services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-trading',
  templateUrl: './modal-trading.component.html',
  styleUrls: ['./modal-trading.component.scss'],
})
export class ModalTradingComponent implements OnInit {
  data: any;
  visible: boolean = false;
  private statusObject = new BehaviorSubject<string>('init');
  status$ = this.statusObject.asObservable();
  constructor(private modalService: ModalService) {}
  status: string = 'init';

  ngOnInit() {
    this.modalService.modalData$.subscribe((data) => {
      this.data = data.data;
    });
    this.status$.subscribe((status) => {
      this.status = status;
    });
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

  ngOnDestroy() {
    this.statusObject.unsubscribe();
  }
}
