import {Component, OnInit, ViewChild} from '@angular/core'
import {MatSidenav} from '@angular/material'
import {SidenavService} from '../../core/services/sidenav/sidenav.service'
import {UtilsService} from '../../core/services/utils/utils.service'
import {GithubService} from '../../core/http/github/github.service'
import {ActivatedRoute} from '@angular/router'
import {GistService} from '../../core/services/gist/gist.service'

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
               private route: ActivatedRoute,
               private utilsService: UtilsService) {
    this.init()
  }

  public ngOnInit () {
    this.sidenavService.init(this.sidenav)
  }

  private async init () {
    this.utilsService.showProgressSpinner()

    const gistId = this.route.snapshot.paramMap.get('gist_id')
    const filename = this.route.snapshot.paramMap.get('filename')

    await this.gistService.init(gistId, filename)

    this.utilsService.hideProgressSpinner()
  }

}
