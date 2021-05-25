import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'oidc-client';

@Component({
  selector: 'profile-picker-dialog',
  templateUrl: './profile-picker-dialog.html',
})
export class ProfilePickerDialogComponent {

  constructor(public dialogRef: MatDialogRef<ProfilePickerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  save(selectedUser: User) {
    if (!!!selectedUser) {
      this.dialogRef.close();
      return;
    }
    this.dialogRef.close(selectedUser);
  }
}
