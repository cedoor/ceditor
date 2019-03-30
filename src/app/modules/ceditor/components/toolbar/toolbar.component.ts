import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'
import {StorageService} from '../../../../core/services/storage/storage.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private utilsService: UtilsService,
               private storageService: StorageService,
               private sidenavService: SidenavService) {
  }

  public runCode () {
    this.editorService.run()
  }

  public async toggleSidenav () {
    const status = await this.sidenavService.toggle()

    this.storageService.set('sidenav', status === 'open')
  }

}
