import { Component, Output, EventEmitter, OnDestroy, Input, OnInit } from '@angular/core';
import { User } from 'oidc-client';
import { environment } from '@environment';

@Component({
  selector: 'profile-picker',
  templateUrl: './profile-picker.html',
  styleUrls: ['./profile-picker.scss']
})
export class ProfilePickerComponent {
  @Output() onClose: EventEmitter<User> = new EventEmitter<User>();
  profiles: User[] = environment.testUsers;
  selectedUser!: User;

  constructor(){
  }

  onNoClick(): void {
    this.onClose.emit(undefined);
  }

  userSelected(selectedUser: User) {
    this.onClose.emit(selectedUser);
  }

}
