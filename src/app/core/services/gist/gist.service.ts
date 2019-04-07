import {EventEmitter, Injectable} from '@angular/core'
import {GithubService} from '../../http/github/github.service'
import {StorageService} from '../storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class GistService {

  private gist: any
  private currentFile: string

  private readonly cachedFiles: any

  private onInitEvent: EventEmitter<any>

  constructor (private githubService: GithubService,
               private storageService: StorageService) {
    this.onInitEvent = new EventEmitter()
    this.cachedFiles = {}
  }

  /**
   * Initialize the service by setting the gist used in the editor.
   */
  public async init (gistId: string, fileName: string): Promise<any> {
    // Get the remote gist with Github APIs.
    if (gistId && typeof gistId === 'string') {
      try {
        this.gist = await this.githubService.getGist(gistId)
      } catch (error) {
        this.gist = await this.getDefault()
      }
    } else {
      this.gist = await this.getDefault()
    }

    // Get local cached files.
    for (const key of Object.keys(this.gist.files)) {
      this.cachedFiles[key] = this.storageService.getGistFileCode(this.gist.id, key)
    }

    // Set the current file used.
    this.setCurrentFileName(fileName)

    this.onInitEvent.next(this.gist)
    this.onInitEvent.complete()

    return this.gist
  }

  /**
   * Return the promise of the initialization of the gist.
   */
  public onInit (): Promise<string> {
    return this.onInitEvent.toPromise()
  }

  /**
   * Set the name of the current used gist file.
   */
  public setCurrentFileName (fileName?: string) {
    this.currentFile = fileName || Object.keys(this.gist.files)[0]
  }

  /**
   * Get the name of the current used gist file.
   */
  public getCurrentFileName (): string {
    return this.currentFile
  }

  /**
   * Set the cached file in the storage if it's different from original gist file.
   */
  public setCachedFile (code: string, fileName: string = this.currentFile) {
    this.cachedFiles[fileName] = code
    this.storageService.setGistFileCode(this.gist.id, fileName, code)
  }

  /**
   * Remove the cached file in the storage if it's different from original gist file.
   */
  public removeCachedFile (fileName: string = this.currentFile) {
    delete this.cachedFiles[fileName]

    this.storageService.removeGistFileCode(this.gist.id, fileName)
  }

  /**
   * Return the file with the name passed as parameter or the current file.
   */
  public getFile (fileName: string = this.currentFile) {
    return this.gist.files[fileName].content
  }

  /**
   * Return the cached code of the file with the name passed as parameter
   * or the cached code of the current file.
   */
  public getCachedFile (fileName: string = this.currentFile) {
    return this.cachedFiles[fileName]
  }

  /**
   * Return the default gist used in Ceditor.
   */
  private getDefault (): Promise<any> {
    return this.githubService.getGist('6490a8bcea24c3a58e5a7233dd5f72e1')
  }

}
