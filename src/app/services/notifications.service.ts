/**
  * Created by: Julian Rodriguez
  * Created on: 14/01/2019
  * Description: Popup notifications service for the whole app.
*/
import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public toastr: ToastrManager) {}

  showSuccess() {
    this.toastr.successToastr('This is success toast.', 'Success!', {position: 'bottom-right'});
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }

  showCustom() {
    this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
  }

  showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
  }
}
