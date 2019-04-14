import {Injectable} from '@angular/core'
import {HttpService} from '../http.service'
import {UpdateGistData} from '../../../shared/models/update-gist-data'
import {StorageService} from '../../services/storage/storage.service'
import {HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly API_URL = 'https://api.github.com'

  constructor (private httpService: HttpService,
               private storageService: StorageService) {
  }

  public getGist (gistId: string): Promise<any> {
    return this.httpService.get(`${this.API_URL}/gists/${gistId}`)
  }

  public updateGist (gistId: string, updateGistData: UpdateGistData): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `token ${this.storageService.getGithubToken()}`
      })
    }

    return this.httpService.patch(`${this.API_URL}/gists/${gistId}`, updateGistData, options)
  }

  public getLatestRelease (owner: string, repository: string): Promise<any> {
    return this.httpService.get(`${this.API_URL}/repos/${owner}/${repository}/releases/latest`)
  }

  public getLicense (owner: string, repository: string): Promise<any> {
    return this.httpService.get(`${this.API_URL}/repos/${owner}/${repository}/license`)
  }

}
