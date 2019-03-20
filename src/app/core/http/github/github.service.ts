import {Injectable} from '@angular/core'
import {HttpService} from '../http.service'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly GIST_API_URL = 'https://api.github.com'

  constructor (private httpService: HttpService) {
  }

  public getGist (gistId: string): Promise<any> {
    return this.httpService.get(`${this.GIST_API_URL}/gists/${gistId}`)
  }

}
