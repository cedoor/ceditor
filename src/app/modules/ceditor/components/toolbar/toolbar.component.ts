import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {DialogService} from '../../../../core/services/dialog/dialog.service'
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
               private dialogService: DialogService,
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
    const cachedCode = this.gistService.getCachedFile()

    if (cachedCode) {
      const result = await this.dialogService.showGenericDialog({
        title: 'Remove cached code',
        message: 'Are you sure you want to remove the cached code?',
        buttons: ['Cancel', 'Yes']
      })

      switch (result) {
        case 1:
          this.gistService.removeCachedFile()

          const code = this.gistService.getFile()
          this.editorService.setCode(code)
          break
        case 0:
          break
      }
    }
  }

  public showAbout () {
    this.dialogService.showAboutDialog()
  }

  public showCachedFiles () {
    this.dialogService.showCachedGistsDialog()
  }

}
