import {Injectable} from '@angular/core'
import {MatDrawerToggleResult, MatSidenav} from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav: MatSidenav

  constructor () {
  }

  public init (sidenav: MatSidenav) {
    this.sidenav = sidenav
  }

  public open (): Promise<MatDrawerToggleResult> {
    return this.sidenav.open()
  }

  public close (): Promise<MatDrawerToggleResult> {
    return this.sidenav.close()
  }

  public toggle (): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle()
  }

}
