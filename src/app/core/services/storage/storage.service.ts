import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage

  constructor () {
    this.storage = localStorage
  }

  /**
   * Set an item in the used storage.
   */
  public set (key: string, item: any) {
    this.storage.setItem(key, JSON.stringify(item))
  }

  /**
   * Get an item from the user storage.
   */
  public get (key: string) {
    const item = this.storage.getItem(key)

    try {
      return JSON.parse(item)
    } catch (error) {
      return item
    }
  }

}
