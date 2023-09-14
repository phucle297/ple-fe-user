import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/_core/services/modal.service';

@Component({
  selector: 'app-modal-custom',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss'],
})
export class ModalCustomComponent implements OnInit {
  modalData: any;
  allowCloseCard = true;

  constructor(private modalService: ModalService) {}
  ngOnInit() {
    this.modalService.modalData$.subscribe((data) => {
      this.modalData = data;
    });
    this.modalService.showModal$.subscribe((data) => {
      if (data) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
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
