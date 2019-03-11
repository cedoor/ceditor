import {Component} from '@angular/core'
import {AceService} from '../../../../core/services/ace/ace.service'
import {ConsoleService} from '../../../../core/services/console/console.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private aceService: AceService,
               private consoleService: ConsoleService) {
  }

  public runCode () {
    this.aceService.run()
  }

  public clearConsole () {
    this.consoleService.clear()
  }

}
