import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logger: HTMLElement

  constructor () {
  }

  public createLogger (htmlElement: HTMLElement) {
    this.logger = htmlElement
  }

  public log (message: string) {
    if (typeof message === 'object') {
      this.logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />'
    } else {
      this.logger.innerHTML += message + '<br/>'
    }
  }

  public clear () {
    this.logger.innerHTML = ''
  }

}
