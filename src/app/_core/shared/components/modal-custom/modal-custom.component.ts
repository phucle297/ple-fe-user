import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '@app/_core/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-custom',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss'],
})
export class ModalCustomComponent implements OnInit, OnDestroy {
  modalData: any;
  allowCloseCard = true;
  modalDataSub!: Subscription;
  showModalSub!: Subscription;

  constructor(private modalService: ModalService) {}
  ngOnInit() {
    this.modalDataSub = this.modalService.modalData$.subscribe((data) => {
      this.modalData = data;
    });
    this.showModalSub = this.modalService.showModal$.subscribe((data) => {
      if (data) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }

  ngOnDestroy(): void {
    this.modalDataSub.unsubscribe();
    this.showModalSub.unsubscribe();
  }

  closeModal() {
    this.modalService.closeModal();
  }
  closeModalByClickOutside() {
    if (this.allowCloseCard) this.modalService.closeModal();
  }

  onMouseOverCard() {
    this.allowCloseCard = false;
  }

  onMouseLeaveCard() {
    this.allowCloseCard = true;
  }
}
