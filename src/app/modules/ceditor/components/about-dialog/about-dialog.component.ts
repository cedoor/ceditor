import {Component, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AboutData} from '../../../../shared/models/about-data'

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent {

  public currentYear: number

  constructor(@Inject(MAT_DIALOG_DATA) public data: AboutData) {
    this.currentYear = new Date().getFullYear()
  }

}
