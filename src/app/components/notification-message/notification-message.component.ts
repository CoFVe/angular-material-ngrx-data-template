import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Message } from './message';

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.html',
  styleUrls: ['./notification-message.scss']
})
export class NotificationMessageComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<NotificationMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: Message
  ) { }

}
