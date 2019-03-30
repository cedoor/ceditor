import {Component, OnInit, ViewChild} from '@angular/core'
import {MatSidenav} from '@angular/material'
import {SidenavService} from '../../core/services/sidenav/sidenav.service'
import {UtilsService} from '../../core/services/utils/utils.service'
import {GithubService} from '../../core/http/github/github.service'
import {ActivatedRoute} from '@angular/router'
import {GistService} from '../../core/services/gist/gist.service'
import {StorageService} from '../../core/services/storage/storage.service'

@Component({
  selector: 'app-ceditor',
  templateUrl: './ceditor.component.html',
  styleUrls: ['./ceditor.component.scss']
})
export class CeditorComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav

  constructor (private sidenavService: SidenavService,
               private githubService: GithubService,
               private gistService: GistService,
               private storageService: StorageService,
               private route: ActivatedRoute,
               private utilsService: UtilsService) {
    this.init()
  }

  public ngOnInit () {
    this.initSidenavService()
  }

  /**
   * Initialization function of the component.
   */
  private async init () {
    this.utilsService.showProgressSpinner()

    await this.initGistService()

    this.utilsService.hideProgressSpinner()
  }

  /**
   * Initialize the gist service.
   */
  private async initGistService (): Promise<any> {
    const gistId = this.route.snapshot.paramMap.get('gist_id')
    const filename = this.route.snapshot.paramMap.get('filename')

    return await this.gistService.init(gistId, filename)
  }

  /**
   * Initialize the sidenav service.
   */
  private initSidenavService () {
    this.sidenavService.init(this.sidenav)

    const sidenavStatus = this.storageService.get('sidenav')

    if (sidenavStatus === null || sidenavStatus === true) {
      this.sidenavService.open()
    } else {
      this.sidenavService.close()
    }
  }

}
