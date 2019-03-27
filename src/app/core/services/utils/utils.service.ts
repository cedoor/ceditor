import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material'
import {ProgressSpinnerComponent} from '../../../shared/components/progress-spinner/progress-spinner.component'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private progressSpinnerRef: MatDialogRef<ProgressSpinnerComponent>

  constructor (private snackBar: MatSnackBar,
               private dialog: MatDialog) {
  }

  public showMessage (message: string, duration?: number) {
    this.snackBar.open(message, 'Dismiss', {
      duration
    })
  }

  public showProgressSpinner (duration?: number) {
    this.progressSpinnerRef = this.dialog.open(ProgressSpinnerComponent, {
      disableClose: true,
      panelClass: 'progress-spinner-dialog'
    })

    if (duration) {
      setTimeout(() => {
        this.progressSpinnerRef.close()
        this.progressSpinnerRef = null
      }, duration)
    }
  }

  public hideProgressSpinner () {
    if (this.progressSpinnerRef) {
      this.progressSpinnerRef.close()
    }
  }

}
