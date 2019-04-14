import {Injectable} from '@angular/core'
import {BASE_STORAGE_KEYS, BaseStorageService} from '../base-storage/base-storage.service'
import {CachedGist} from '../../../shared/models/cached-gist'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor (private baseStorageService: BaseStorageService) {
  }

  /**
   * Add a gist in the array of cached gists of the storage if a gist
   * with the same id doesn't already exists.
   */
  public addCachedGist (cachedGist: CachedGist): void {
    const cachedGists = this.getCachedGists()

    if (cachedGists !== null) {
      for (const existingCachedGist of cachedGists) {
        if (existingCachedGist.id === cachedGist.id) {
          return
        }
      }

      cachedGists.push(cachedGist)
    }

    this.setCachedGists(cachedGists || [cachedGist])
  }

  /**
   * Remove the cached gist from the storage.
   */
  public removeCachedGist (gistId: string): void {
    const cachedGists = this.getCachedGists()

    for (let i = 0; i < cachedGists.length; i++) {
      if (cachedGists[i].id === gistId) {
        cachedGists.splice(i, 1)
        break
      }
    }

    this.setCachedGists(cachedGists)
  }

  /**
   * Set the cached gists in the storage.
   */
  public setCachedGists (cachedGists: CachedGist[]): void {
    return this.baseStorageService.set(BASE_STORAGE_KEYS.GISTS, cachedGists)
  }

  /**
   * Return all the cached gists from the storage.
   */
  public getCachedGists (): CachedGist[] | null {
    return this.baseStorageService.get(BASE_STORAGE_KEYS.GISTS)
  }

  /**
   * Save the status of the sidenav in the storage.
   */
  public setSidenavStatus (status: boolean): void {
    this.baseStorageService.set(BASE_STORAGE_KEYS.SIDENAV, status)
  }

  /**
   * Return the status of the sidenav in the storage.
   */
  public getSidenavStatus (): boolean | null {
    return this.baseStorageService.get(BASE_STORAGE_KEYS.SIDENAV)
  }

  /**
   * Save the code of the gist file in the storage.
   */
  public setGistFileCode (gistId: string, fileName: string, code: string): void {
    this.baseStorageService.set(`${gistId}/${fileName}`, code)
  }

  /**
   * Return the code of the gist file saved in the storage.
   */
  public getGistFileCode (gistId: string, fileName: string): string | null {
    return this.baseStorageService.get(`${gistId}/${fileName}`)
  }

  /**
   * Remove the code of the gist file from the storage.
   */
  public removeGistFileCode (gistId: string, fileName: string): void {
    this.baseStorageService.remove(`${gistId}/${fileName}`)
  }

  /**
   * Set the github token in the storage.
   */
  public setGithubToken (token: string): void {
    this.baseStorageService.set(BASE_STORAGE_KEYS.GITHUB_TOKEN, token)
  }

  /**
   * Return the github token saved in the storage.
   */
  public getGithubToken (): string {
    return this.baseStorageService.get(BASE_STORAGE_KEYS.GITHUB_TOKEN)
  }

}
