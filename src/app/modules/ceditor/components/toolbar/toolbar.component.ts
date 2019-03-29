import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private utilsService: UtilsService,
               private sidenavService: SidenavService) {
  }

  public async runCode () {
    return this.editorService.run()
  }

  public async toggleSidenav () {
    return this.sidenavService.toggle()
  }

  public async updateGist () {
    this.utilsService.showMessage('To do...', 2000)
  }

}
