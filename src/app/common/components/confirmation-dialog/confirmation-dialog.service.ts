
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(public confirmDialog: MatDialog) {
  }

  open(message: string, width?: string): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.confirmDialog.open(ConfirmationDialogComponent, {
      data: message,
      width: width
    });
  }
}
