import {Component, OnInit} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {Location} from '@angular/common'
import {GistService} from '../../../../core/services/gist/gist.service'
import {StorageService} from '../../../../core/services/storage/storage.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public gist: any
  public gistFiles: any[]
  public currentGistFile: any

  constructor (private editorService: EditorService,
               private gistService: GistService,
               private utilsService: UtilsService,
               private storageService: StorageService,
               private location: Location) {
  }

  public async ngOnInit () {
    this.gist = await this.gistService.onInit()

    this.gistFiles = Object.values(this.gist.files)
    this.currentGistFile = this.gistService.getFile()
  }

  public async setGistFile (gistFile: any) {
    const cachedCode = this.storageService.get(`${this.gist.id}/${gistFile.filename}`)

    if (cachedCode) {
      const result = await this.utilsService.createDialog({
        title: 'Cached code',
        message: 'There is local saved code for this file, do you want to use it?',
        buttons: ['No thanks', 'Ok']
      })

      switch (result) {
        case 0:
          this.storageService.remove(`${this.gist.id}/${gistFile.filename}`)
          this.editorService.setCode(gistFile.content)
          break
        case 1:
          this.editorService.setCode(cachedCode)
          break
      }
    } else {
      this.editorService.setCode(gistFile.content)
    }

    this.currentGistFile = gistFile
    this.gistService.setFile(gistFile.filename)
    this.location.replaceState(`/${this.gist.id}/${gistFile.filename}`)
  }

}
