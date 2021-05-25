
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { User } from "oidc-client";
import { ProfilePickerDialogComponent } from "./profile-picker-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ProfilePickerDialogService {

  constructor(public dialog: MatDialog) {
  }

  open(width?: string): MatDialogRef<ProfilePickerDialogComponent, User> {
    return this.dialog.open(ProfilePickerDialogComponent, {
      width: width || '410px'
    });
  }
}
