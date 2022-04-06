import { ConfirmationDialogModule } from '@/app/common/components/confirmation-dialog/confirmation-dialog.module';
import { NotificationMessageModule } from '@/app/common/components/notification-message/notification-message.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeopleStoreModule } from './people-store.module';

@NgModule({
  imports: [
    CommonModule,
    PeopleStoreModule,
    NotificationMessageModule,
    ConfirmationDialogModule
  ],
  declarations: [],
  providers: [

  ]
})
export class PeopleModule { }
