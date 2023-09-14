import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalService } from '@app/_core/services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-auction',
  templateUrl: './modal-auction.component.html',
  styleUrls: ['./modal-auction.component.scss'],
})
export class ModalAuctionComponent implements OnInit {
  data: any;
  visible: boolean = false;
  private statusObject = new BehaviorSubject<string>('init');
  status$ = this.statusObject.asObservable();
  biddingPrice = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.pattern('^[0-9]*$'),
  ]);
  status: string = 'init';

  constructor(private modalService: ModalService) {}

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

  bidNft() {
    this.statusObject.next('loading');
    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.statusObject.next('success');
      } else {
        this.statusObject.next('failed');
      }
    }, 2000);
  }
  handlePriceChange(e: any) {
    this.biddingPrice = e.target.value;
  }

  ngOnDestroy() {
    this.statusObject.unsubscribe();
  }
}
