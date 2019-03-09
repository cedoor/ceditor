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
  public async cat (ipfsPath) {
    return (await this.ipfs.cat(ipfsPath)).toString('utf8')
  }

  /**
   * Add a file to IPFS network.
   */
  public async add (file) {
    return this.ipfs.add(Buffer.from(file))
  }

}
