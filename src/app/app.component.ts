import {Component} from '@angular/core'
import {IpfsService} from './core/services/ipfs/ipfs.service'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor (private ipfsService: IpfsService) {
    this.initializeServices()
  }

  private initializeServices () {
    this.ipfsService.init()
  }

}
