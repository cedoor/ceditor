import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor (private http: HttpClient) {
  }

  public getCode (fileName: string = 'default.txt'): Promise<string> {
    return this.http.get(`./assets/code/${fileName}`, {
      responseType: 'text'
    }).toPromise()
  }

}
