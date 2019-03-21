import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor (private snackBar: MatSnackBar) {
  }

  public showMessage (message: string, duration?: number) {
    this.snackBar.open(message, 'Dismiss', {
      duration
    })
  }

}
