import {EventEmitter, Injectable} from '@angular/core'
import {GithubService} from '../../http/github/github.service'
import {StorageService} from '../storage/storage.service'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GistService {

  private gist: any
  private currentFile: string

  private readonly cachedFiles: any

  private onInitEvent: EventEmitter<any>
  private onUpdateEvent: EventEmitter<any>
  private onCacheUpdateEvent: EventEmitter<any>

  constructor(private githubService: GithubService,
              private storageService: StorageService) {
    this.onInitEvent = new EventEmitter()
    this.onUpdateEvent = new EventEmitter()
    this.onCacheUpdateEvent = new EventEmitter()
    this.cachedFiles = {}
  }

  /**
   * Initialize the service by setting the gist used in the editor.
   */
  public async init(gistId: string, fileName: string): Promise<any> {
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

    this.onCacheUpdateEvent.next(this.cachedFiles)
    this.onInitEvent.next(this.gist)
    this.onInitEvent.complete()

    return this.gist
  }

  /**
   * Return the promise of the initialization of the gist.
   */
  public onInit(): Promise<any> {
    return this.onInitEvent.toPromise()
  }

  /**
   * Return the observable for the update of the gist.
   */
  public onUpdate(): Observable<any> {
    return this.onUpdateEvent.asObservable()
  }

  /**
   * Return the observable for the cached files update of the gist.
   */
  public onCacheUpdate(): Observable<any> {
    return this.onCacheUpdateEvent.asObservable()
  }

  /**
   * Update the remote gist file with the content of cached file.
   */
  public async updateGistFile(fileName: string = this.currentFile): Promise<any> {
    if (this.cachedFiles[fileName]) {
      const files = {}

      files[fileName] = {
        content: this.cachedFiles[fileName]
      }

      this.gist = await this.githubService.updateGist(this.gist.id, {
        description: this.gist.description,
        files
      })

      this.onUpdateEvent.next(this.gist)

      this.removeCachedFile(fileName)
    }
  }

  /**
   * Set the name of the current used gist file.
   */
  public setCurrentFileName(fileName?: string) {
    this.currentFile = fileName || Object.keys(this.gist.files)[0]
  }

  /**
   * Get the name of the current used gist file.
   */
  public getCurrentFileName(): string {
    return this.currentFile
  }

  /**
   * Set the cached file in the storage if it's different from original gist file.
   */
  public setCachedFile(code: string, fileName: string = this.currentFile) {
    const file = this.getFile(fileName)

    if (code !== file) {
      this.cachedFiles[fileName] = code
      this.storageService.setGistFileCode(this.gist.id, fileName, code)
      this.onCacheUpdateEvent.next(this.cachedFiles)
    } else {
      this.removeCachedFile(fileName)
    }
  }

  /**
   * Remove the cached file in the storage if it's different from original gist file.
   */
  public removeCachedFile(fileName: string = this.currentFile) {
    this.cachedFiles[fileName] = null
    this.storageService.removeGistFileCode(this.gist.id, fileName)
    this.onCacheUpdateEvent.next(this.cachedFiles)
  }

  /**
   * Return the file with the name passed as parameter or the current file.
   */
  public getFile(fileName: string = this.currentFile) {
    return this.gist.files[fileName].content
  }

  /**
   * Return the cached code of the file with the name passed as parameter
   * or the cached code of the current file.
   */
  public getCachedFile(fileName: string = this.currentFile) {
    return this.cachedFiles[fileName]
  }

  /**
   * Return the default gist used in Ceditor.
   */
  private getDefault(): Promise<any> {
    return this.githubService.getGist('6490a8bcea24c3a58e5a7233dd5f72e1')
  }

}
