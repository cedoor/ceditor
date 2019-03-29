import {Component, OnInit, ViewChild} from '@angular/core'
import {MatSidenav} from '@angular/material'
import {SidenavService} from '../../core/services/sidenav/sidenav.service'
import {UtilsService} from '../../core/services/utils/utils.service'
import {GithubService} from '../../core/http/github/github.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-ceditor',
  templateUrl: './ceditor.component.html',
  styleUrls: ['./ceditor.component.scss']
})
export class CeditorComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav

  public gistPromise: Promise<any>

  constructor (private sidenavService: SidenavService,
               private githubService: GithubService,
               private route: ActivatedRoute,
               private utilsService: UtilsService) {
    this.init()
  }

  public ngOnInit () {
    this.sidenavService.init(this.sidenav)
  }

  private async init () {
    this.utilsService.showProgressSpinner()

    await (this.gistPromise = this.getGistPromise())

    this.utilsService.hideProgressSpinner()
  }

  private async getGistPromise (): Promise<any> {
    const gistId = this.route.snapshot.paramMap.get('gist_id')

    if (gistId && typeof gistId === 'string') {
      try {
        return await this.githubService.getGist(gistId)
      } catch (error) {
        return this.getDefaultGist()
      }
    } else {
      return this.getDefaultGist()
    }
  }

  private getDefaultGist (): Promise<any> {
    return this.githubService.getGist('6490a8bcea24c3a58e5a7233dd5f72e1')
  }

}
