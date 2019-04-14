import {Injectable} from '@angular/core'

export enum BASE_STORAGE_KEYS {
  SIDENAV = 'sidenav',
  GISTS = 'gists',
  GITHUB_TOKEN = 'github-token'
}

@Injectable({
  providedIn: 'root'
})
export class BaseStorageService {

  private storage: Storage

  constructor () {
    this.storage = localStorage
  }

  /**
   * Set an item in the used storage.
   */
  public set (key: string, item: any): void {
    this.storage.setItem(key, JSON.stringify(item))
  }

  /**
   * Get an item from the user storage.
   */
  public get (key: string): any {
    const item = this.storage.getItem(key)

    try {
      return JSON.parse(item)
    } catch (error) {
      return item
    }
  }

  /**
   * Remove an item from the used storage.
   */
  public remove (key: string): void {
    this.storage.removeItem(key)
  }

}
