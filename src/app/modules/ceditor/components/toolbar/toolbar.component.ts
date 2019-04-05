import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'
import {STORAGE_KEYS, StorageService} from '../../../../core/services/storage/storage.service'
import {GistService} from '../../../../core/services/gist/gist.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor (private editorService: EditorService,
               private utilsService: UtilsService,
               private gistService: GistService,
               private storageService: StorageService,
               private sidenavService: SidenavService) {
  }

  public async toggleSidenav () {
    const status = await this.sidenavService.toggle()

    this.storageService.set(STORAGE_KEYS.SIDENAV, status === 'open')
  }

  public runCode () {
    this.editorService.run()
  }

  public async setOriginalCode () {
    const cachedCode = this.gistService.getCachedCode()

    if (cachedCode) {
      const result = await this.utilsService.createDialog({
        title: 'Remove cached code',
        message: 'Are you sure you want to remove the cached code?',
        buttons: ['Cancel', 'Yes']
      })

      switch (result) {
        case 1:
          this.gistService.removeCachedCode()

          const code = this.gistService.getCode()
          this.editorService.setCode(code)
          break
        case 0:
          break
      }
    }
  }

}
