import {Injectable} from '@angular/core'
import * as ace from 'brace'
import 'brace/mode/typescript'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'
import 'brace/ext/searchbox'

declare const ts: any

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private editor: any

  constructor () {
  }

  public createEditor (htmlElement: HTMLElement) {
    this.editor = ace.edit(htmlElement)

    this.editor.setOptions({
      mode: 'ace/mode/typescript',
      selectionStyle: 'text',
      enableBasicAutocompletion: true,
      autoScrollEditorIntoView: true,
      enableMultiselect: true,
      theme: 'ace/theme/monokai',
      fontSize: 18
    })
  }

  public setCode (code: string) {
    this.editor.setValue(code, 1)
  }

  public getCode (): string {
    return this.editor.getValue()
  }

  public addCommand (name: string, keys: any, callback: () => void) {
    this.editor.commands.addCommand({
      name,
      exec: callback.bind(this),
      bindKey: keys
    })
  }

  public async run () {
    const script = this.script.bind(this)

    await eval(ts.transpile(this.editor.getValue()))
  }

  private script (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.scriptAlreadyExist(url)) {
        resolve()
      } else {
        const head = document.getElementsByTagName('head')[0]
        const script = document.createElement('script')

        script.className = 'ceditor-script'
        script.type = 'text/javascript'
        script.src = url

        script.onload = resolve
        script.onerror = reject

        head.appendChild(script)
      }
    })
  }

  private scriptAlreadyExist (url: string): boolean {
    for (const script of Array.from(document.querySelectorAll('.ceditor-script'))) {
      if (script.getAttribute('src') === url) {
        return true
      }
    }

    return false
  }

}
