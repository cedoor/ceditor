import {Injectable} from '@angular/core'
import {HttpService} from '../http.service'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly API_URL = 'https://api.github.com'

  constructor (private httpService: HttpService) {
  }

  public getGist (gistId: string): Promise<any> {
    return this.httpService.get(`${this.API_URL}/gists/${gistId}`)
  }

  public getLatestRelease (owner: string, repository: string): Promise<any> {
    return this.httpService.get(`${this.API_URL}/repos/${owner}/${repository}/releases/latest`)
  }

  public getLicense (owner: string, repository: string): Promise<any> {
    return this.httpService.get(`${this.API_URL}/repos/${owner}/${repository}/license`)
  }

}
