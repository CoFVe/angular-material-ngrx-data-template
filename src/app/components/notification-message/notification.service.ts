
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Message } from "./message";
import { NotificationMessageComponent } from "./notification-message.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) {

  }

  show(message: Message, panelClass?: string) {
    this.snackBar.openFromComponent(NotificationMessageComponent, {
      data: message,
      panelClass: panelClass,
      duration: message.life,
      horizontalPosition: message.horizontalPosition || 'center',
      verticalPosition: message.verticalPosition || 'bottom'
    });
  }
}
