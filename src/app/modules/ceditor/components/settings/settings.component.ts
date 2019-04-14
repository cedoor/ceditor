import {Component} from '@angular/core'
import {StorageService} from '../../../../core/services/storage/storage.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public githubToken: string

  constructor (private storageService: StorageService) {
    this.init()
  }

  public init () {
    this.githubToken = this.storageService.getGithubToken()
  }

  public setGithubToken () {
    this.storageService.setGithubToken(this.githubToken)
  }

}
