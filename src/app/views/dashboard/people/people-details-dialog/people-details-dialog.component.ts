import { PeopleEditorComponent } from '@/app/components/people-editor/people-editor.component';
import { PeopleModel } from '@/app/models/people.model';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'people-details-dialog',
  templateUrl: './people-details-dialog.html',
})
export class PeopleDetailsDialogComponent {
  @ViewChild(PeopleEditorComponent) editorComponent !: PeopleEditorComponent;
  currentEntity!: PeopleModel;

  constructor(public dialogRef: MatDialogRef<PeopleDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PeopleModel) {
    this.currentEntity = data || {} as PeopleModel;
  }

  save(entity: PeopleModel) {
    if (!!!entity) {
      this.dialogRef.close();
      return;
    }
    this.currentEntity = {
      ...entity
    }
    this.dialogRef.close(this.currentEntity);
  }
}
