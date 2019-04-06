import {Component} from '@angular/core'
import {GithubService} from '../../../../core/http/github/github.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  public version: string
  public currentYear: number
  public licenseURL: string

  constructor (private githubService: GithubService) {
    this.setAppInformations()
  }

  private async setAppInformations () {
    const latestRelease = await this.githubService.getLatestRelease('cedoor', 'ceditor')
    const license = await this.githubService.getLicense('cedoor', 'ceditor')

    this.version = latestRelease.tag_name
    this.currentYear = new Date().getFullYear()
    this.licenseURL = license.html_url
  }

}
