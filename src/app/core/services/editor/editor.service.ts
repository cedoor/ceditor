import {Injectable} from '@angular/core'
import {UtilsService} from '../utils/utils.service'
import {ConsoleService} from '../console/console.service'

declare const ace: any
declare const ts: any

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private editor: any

  constructor (private utilsService: UtilsService,
               private consoleService: ConsoleService) {
  }

  public createEditor (htmlElement: HTMLElement) {
    this.editor = ace.edit(htmlElement, {
      mode: 'editor/mode/typescript',
      selectionStyle: 'text',
      theme: 'editor/theme/monokai',
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
    const getHTML = this.utilsService.getHTML.bind(this.utilsService)
    const library = this.utilsService.library.bind(this.utilsService)
    const log = this.consoleService.log.bind(this.consoleService)

    await eval(ts.transpile(`(async () => { ${this.editor.getValue()}})()`))
  }

}
