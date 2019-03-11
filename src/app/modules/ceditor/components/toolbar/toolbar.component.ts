import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {ConsoleService} from '../../../../core/services/console/console.service'
import {IpfsService} from '../../../../core/services/ipfs/ipfs.service'
import {InformationService} from '../../../../core/services/information/information.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private informationService: InformationService,
               private consoleService: ConsoleService,
               private ipfsService: IpfsService) {
  }

  public runCode () {
    this.editorService.run()
  }

  public clearConsole () {
    this.consoleService.clear()
  }

  public async shareCode () {
    this.informationService.log('Creating the code key...')

    const code = this.editorService.getCode()
    const ipfsPath = await this.ipfsService.add(code)

    this.informationService.log(`Click&nbsp;<a href="./${ipfsPath}" target="_blank">here</a>&nbsp;to open the correct link!`, 10000)
  }

}
