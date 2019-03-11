import {Injectable} from '@angular/core'
import {Buffer} from 'buffer'

declare const IpfsHttpClient: any

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  private ipfs: any

  constructor () {
  }

  /**
   * Initializes the IPFS instance.
   */
  public init () {
    this.ipfs = IpfsHttpClient('ipfs.infura.io', '5001', {protocol: 'https'})
  }

  /**
   * Returns a file addressed by a valid IPFS Path.
   */
  public async cat (ipfsPath): Promise<string> {
    return (await this.ipfs.cat(ipfsPath)).toString('utf8')
  }

  /**
   * Add a content to IPFS network and return the correspondent IPFS path.
   */
  public async add (content: any): Promise<string> {
    return (await this.ipfs.add(Buffer.from(content)))[0].path
  }

}
