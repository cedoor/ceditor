import {Component} from '@angular/core'
import {AceService} from '../../../../core/services/ace/ace.service'
import {LoggerService} from '../../../../core/services/logger/logger.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private aceService: AceService,
               private loggerService: LoggerService) {
  }

  public runCode () {
    this.aceService.run()
  }

  public clearConsole () {
    this.loggerService.clear()
  }

}
