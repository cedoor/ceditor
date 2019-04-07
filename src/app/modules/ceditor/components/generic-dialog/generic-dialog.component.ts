import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import {DialogData} from '../../../../shared/models/dialog-data'

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {

  constructor (public dialogRef: MatDialogRef<GenericDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  public onButtonClick (result: number): void {
    this.dialogRef.close(result)
  }

}
