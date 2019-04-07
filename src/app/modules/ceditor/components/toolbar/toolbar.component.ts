import {Component} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {DialogService} from '../../../../core/services/dialog/dialog.service'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'
import {GistService} from '../../../../core/services/gist/gist.service'
import {StorageService} from '../../../../core/services/storage/storage.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  private gist: any

  constructor (private editorService: EditorService,
               private dialogService: DialogService,
               private gistService: GistService,
               private storageService: StorageService,
               private sidenavService: SidenavService) {
  }

  public async ngOnInit () {
    this.gist = await this.gistService.onInit()
  }

  public async toggleSidenav () {
    const status = await this.sidenavService.toggle()

    this.storageService.setSidenavStatus(status === 'open')
  }

  public runCode () {
    this.editorService.run()
  }

  public async clearCurrentCode () {
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
    } else {
      this.dialogService.showMessage('There is not cached code for this file!', 5000)
    }
  }

  public removeGistFromCache () {
    this.storageService.removeCachedGist(this.gist.id)
  }

  public addGistToCache () {
    this.storageService.addCachedGist({
      id: this.gist.id,
      description: this.gist.description,
      fileNames: Object.keys(this.gist.files)
    })
  }

  public showAbout () {
    this.dialogService.showAboutDialog()
  }

  public showCachedGists () {
    this.dialogService.showCachedGistsDialog()
  }

}
