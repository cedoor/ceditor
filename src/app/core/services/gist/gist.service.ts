import {EventEmitter, Injectable} from '@angular/core'
import {GithubService} from '../../http/github/github.service'

@Injectable({
  providedIn: 'root'
})
export class GistService {

  private gist: any
  private file: any

  private onInitEvent: EventEmitter<any>

  constructor (private githubService: GithubService) {
    this.onInitEvent = new EventEmitter()
  }

  public async init (gistId: string, fileName: string): Promise<any> {
    if (gistId && typeof gistId === 'string') {
      try {
        this.gist = await this.githubService.getGist(gistId)
      } catch (error) {
        this.gist = await this.getDefault()
      }
    } else {
      this.gist = await this.getDefault()
    }

    this.setFile(fileName)

    this.onInitEvent.next(this.gist)
    this.onInitEvent.complete()

    return this.gist
  }

  public setFile (fileName: string) {
    if (fileName && this.gist.files[fileName]) {
      this.file = this.gist.files[fileName]
    } else {
      this.file = Object.values(this.gist.files)[0]
    }
  }

  public getFile (): any {
    return this.file
  }

  public onInit (): Promise<string> {
    return this.onInitEvent.toPromise()
  }

  private getDefault (): Promise<any> {
    return this.githubService.getGist('6490a8bcea24c3a58e5a7233dd5f72e1')
  }

}
