// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  showModal$ = this.showModalSubject.asObservable();
  private modalDataSubject = new BehaviorSubject<any>(null);
  modalData$ = this.modalDataSubject.asObservable();

  openModal(modalData: any) {
    this.modalDataSubject.next(modalData); // Store custom parameters
    this.showModalSubject.next(true);
  }

  closeModal() {
    this.modalDataSubject.next(null); // Clear custom parameters
    this.showModalSubject.next(false);
  }
}
