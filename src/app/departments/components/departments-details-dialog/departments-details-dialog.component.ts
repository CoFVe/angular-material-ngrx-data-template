import { DepartmentsEditorComponent } from '@/app/departments/components/departments-editor/departments-editor.component';
import { DepartmentModel } from '@/app/departments/models/department.model';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'departments-details-dialog',
  templateUrl: './departments-details-dialog.html',
})
export class DepartmentsDetailsDialogComponent {
  @ViewChild(DepartmentsEditorComponent) editorComponent !: DepartmentsEditorComponent;
  currentEntity!: DepartmentModel;

  constructor(public dialogRef: MatDialogRef<DepartmentsDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DepartmentModel) {
    this.currentEntity = data || {} as DepartmentModel;
  }

  save(entity: DepartmentModel) {
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
