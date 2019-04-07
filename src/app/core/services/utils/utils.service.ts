import {Injectable} from '@angular/core'
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material'
import {ProgressSpinnerComponent} from '../../../shared/components/progress-spinner/progress-spinner.component'
import {DialogComponent} from '../../../shared/components/dialog/dialog.component'
import {DialogData} from '../../../shared/models/dialog-data'
import {AboutDialogComponent} from '../../../modules/ceditor/components/about-dialog/about-dialog.component'
import {CachedGistsComponent} from '../../../modules/ceditor/components/cached-gists/cached-gists.component'
import {GithubService} from '../../http/github/github.service'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private progressSpinnerRef: MatDialogRef<ProgressSpinnerComponent>

  constructor (private snackBar: MatSnackBar,
               private githubService: GithubService,
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

  public createDialog (data: DialogData): Promise<number> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data
    })

    return dialogRef.afterClosed().toPromise()
  }

  public async showAbout (): Promise<number> {
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

  public showCachedFiles (): Promise<number> {
    const dialogRef = this.dialog.open(CachedGistsComponent)

    return dialogRef.afterClosed().toPromise()
  }

}
