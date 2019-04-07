import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material'
import {ProgressSpinnerComponent} from '../../../modules/ceditor/components/progress-spinner/progress-spinner.component'
import {GenericDialogComponent} from '../../../modules/ceditor/components/generic-dialog/generic-dialog.component'
import {DialogData} from '../../../shared/models/dialog-data'
import {AboutDialogComponent} from '../../../modules/ceditor/components/about-dialog/about-dialog.component'
import {CachedGistsComponent} from '../../../modules/ceditor/components/cached-gists/cached-gists.component'
import {GithubService} from '../../http/github/github.service'

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private progressSpinnerRef: MatDialogRef<ProgressSpinnerComponent>

  constructor (private snackBar: MatSnackBar,
               private githubService: GithubService,
               private dialog: MatDialog) {
  }

  /**
   * Show a message with the material snack bar.
   */
  public showMessage (message: string, duration?: number) {
    this.snackBar.open(message, 'Dismiss', {
      duration
    })
  }

  /**
   * Show the progress spinner.
   */
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

  /**
   * Hide the progress spinner.
   */
  public hideProgressSpinner () {
    if (this.progressSpinnerRef) {
      this.progressSpinnerRef.close()
    }
  }

  /**
   * Create a generic dialog with title, message and actions.
   * You can create a confirm dialog or a simple info dialog.
   */
  public showGenericDialog (data: DialogData): Promise<number> {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data
    })

    return dialogRef.afterClosed().toPromise()
  }

  /**
   * Show the about dialog.
   */
  public async showAboutDialog (): Promise<number> {
    this.showProgressSpinner()

    const latestRelease = await this.githubService.getLatestRelease('cedoor', 'ceditor')
    const license = await this.githubService.getLicense('cedoor', 'ceditor')

    this.hideProgressSpinner()

    const dialogRef = this.dialog.open(AboutDialogComponent, {
      data: {
        version: latestRelease.tag_name,
        licenseURL: license.html_url
      }
    })

    return dialogRef.afterClosed().toPromise()
  }

  /**
   * Show the dialog of the cached gists.
   */
  public showCachedGistsDialog (): Promise<number> {
    const dialogRef = this.dialog.open(CachedGistsComponent)

    return dialogRef.afterClosed().toPromise()
  }

}
