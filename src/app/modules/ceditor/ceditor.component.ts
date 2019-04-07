import {Component, OnInit, ViewChild} from '@angular/core'
import {MatSidenav} from '@angular/material'
import {SidenavService} from '../../core/services/sidenav/sidenav.service'
import {DialogService} from '../../core/services/dialog/dialog.service'
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
               private dialogService: DialogService) {
    this.init()
  }

  public ngOnInit () {
    this.initSidenavService()
  }

  /**
   * Initialization function of the component.
   */
  private async init () {
    this.dialogService.showProgressSpinner()

    const gist = await this.initGistService()
    this.storageService.addCachedGist({
      id: gist.id,
      description: gist.description,
      fileNames: Object.keys(gist.files)
    })

    this.dialogService.hideProgressSpinner()
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

    const sidenavStatus = this.storageService.getSidenavStatus()

    if (sidenavStatus === null || sidenavStatus === true) {
      this.sidenavService.open()
    } else {
      this.sidenavService.close()
    }
  }

}
