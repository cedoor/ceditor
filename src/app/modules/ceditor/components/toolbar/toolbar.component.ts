import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {ConsoleService} from '../../../../core/services/console/console.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private consoleService: ConsoleService) {
  }

  public runCode () {
    this.editorService.run()
  }

  public clearConsole () {
    this.consoleService.clear()
  }

}
