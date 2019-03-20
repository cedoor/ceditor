import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {UtilsService} from '../../../../core/services/information/utils.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private utilsService: UtilsService) {
  }

  public runCode () {
    this.editorService.run()
  }

  public async shareCode () {
    this.utilsService.showMessage('To do...', 2000)
  }

}
