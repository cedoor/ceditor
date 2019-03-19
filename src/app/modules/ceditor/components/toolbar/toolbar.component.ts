import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {InformationService} from '../../../../core/services/information/information.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private informationService: InformationService) {
  }

  public runCode () {
    this.editorService.run()
  }

  public async shareCode () {
    this.informationService.log('To do...', 2000)
  }

}
