import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private logger: HTMLElement

  constructor () {
  }

  public createLogger (htmlElement: HTMLElement) {
    this.logger = htmlElement
  }

  public log (message: string, duration?: number) {
    this.logger.innerHTML = message

    if (duration) {
      setTimeout(this.clear.bind(this), duration)
    }
  }

  public clear () {
    this.logger.innerHTML = ''
  }

}
