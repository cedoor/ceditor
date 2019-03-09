import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor () {
  }

  public getHTML (url: string): Promise<HTMLElement> {
    return new Promise(function (resolve) {

      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const html = document.createElement('html')
          html.innerHTML = this.responseText
          resolve(html)
        }
      }

      xhttp.open('GET', `https://cors-anywhere.herokuapp.com/${url}`, true)
      xhttp.send()
    })
  }

  public library (name: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.src = `https://unpkg.com/${name}`

      script.onload = resolve
      script.onerror = reject

      head.appendChild(script)
    })
  }

}
