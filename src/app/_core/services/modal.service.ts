// modal.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService implements OnDestroy {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  showModal$ = this.showModalSubject.asObservable();
  private modalDataSubject = new BehaviorSubject<any>({});
  modalData$ = this.modalDataSubject.asObservable();

  openModal(modalData: any) {
    this.modalDataSubject.next(modalData); // Store custom parameters
    this.showModalSubject.next(true);
  }

  closeModal() {
    this.modalDataSubject.next({}); // Clear custom parameters
    this.showModalSubject.next(false);
  }

  ngOnDestroy(): void {
    this.modalDataSubject.unsubscribe();
    this.showModalSubject.unsubscribe();
  }
}
