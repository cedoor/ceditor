import {Component} from '@angular/core'
import {STORAGE_KEYS, StorageService} from '../../../../core/services/storage/storage.service'

@Component({
  selector: 'app-cached-gists',
  templateUrl: './cached-gists.component.html',
  styleUrls: ['./cached-gists.component.scss']
})
export class CachedGistsComponent {

  public cachedGists: any[]

  constructor (private storageService: StorageService) {
    this.setCachedGists()
  }

  public setCachedGists () {
    this.cachedGists = this.storageService.get(STORAGE_KEYS.GISTS)
  }

  public removeCachedGist (gist: any) {
    const gists = this.storageService.get(STORAGE_KEYS.GISTS)

    for (let i = 0; i < gists.length; i++) {
      if (gists[i].id === gist.id) {
        gists.splice(i, 1)
        break
      }
    }

    this.cachedGists = gists
    this.storageService.set(STORAGE_KEYS.GISTS, gists)
  }

}
