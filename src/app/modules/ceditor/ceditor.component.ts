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

  public gist: Promise<any>

  constructor (private sidenavService: SidenavService,
               private githubService: GithubService,
               private route: ActivatedRoute,
               private utilsService: UtilsService) {
    this.setGist()
  }

  public ngOnInit () {
    this.sidenavService.init(this.sidenav)
  }

  private async setGist () {
    this.utilsService.showProgressSpinner()

    const gistId = this.route.snapshot.paramMap.get('gist_id')

    if (gistId && typeof gistId === 'string') {
      try {
        this.gist = this.githubService.getGist(gistId)

      } catch (error) {
        this.gist = this.getDefaultGist()
      }
    } else {
      this.gist = this.getDefaultGist()
    }

    await this.gist

    this.utilsService.hideProgressSpinner()
  }

  private getDefaultGist (): Promise<any> {
    return this.githubService.getGist('6490a8bcea24c3a58e5a7233dd5f72e1')
  }

}
