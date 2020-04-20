import {Component} from '@angular/core'
import {StorageService} from '../../../../core/services/storage/storage.service'
import {CachedGist} from '../../../../shared/models/cached-gist'

@Component({
  selector: 'app-cached-gists',
  templateUrl: './cached-gists.component.html',
  styleUrls: ['./cached-gists.component.scss']
})
export class CachedGistsComponent {

  public cachedGists: CachedGist[]

  constructor(private storageService: StorageService) {
    this.cachedGists = this.storageService.getCachedGists()
  }

}
