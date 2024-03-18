import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export interface Confirm {
  icon: any;
  title: string;
  text: string;
  confirmText: string;
  cancelText: string;
}

export interface GlobalAlert {
  icon: any;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  Global_Alert(data: GlobalAlert, icon: SweetAlertIcon = 'success', title: any = '', text: any = ''): Promise<SweetAlertResult> {
    if (data) {
        icon = data.icon;
        title = data.title;
        text = data.text;
    }
    return Swal.fire({
        icon: icon,
        title: title,
        html: text
    })
}

Global_Confirm(data: Confirm, icon: any = '', title: string = '', text: string = '', confirmText: string = '', cancelText: string = ''): Promise<SweetAlertResult> {
    if(data) {
        icon = data.icon
        title = data.title
        text = data.text
        confirmText = data.confirmText
        cancelText = data.cancelText
    }
    return Swal.fire({
        title: title,
        html: text,
        icon: icon,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#7367F0',
        cancelButtonColor: '#E42728',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ml-1'
        }
    })
}

Global_Alert_Preview_Image(imageUrl: any, fileName: any, fileSize: any): Promise<SweetAlertResult> {
    return Swal.fire({
        title: fileName,
        text: fileSize,
        imageUrl: imageUrl,
        width: '88%',
        imageHeight: 768,
        imageAlt: 'Attachment Image',
    })
}
}
