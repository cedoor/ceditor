import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {StorageService} from '../../../../core/services/storage/storage.service'
import {GistService} from '../../../../core/services/gist/gist.service'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') public editorReference: ElementRef

  public gist: any

  constructor (private editorService: EditorService,
               private gistService: GistService,
               private utilsService: UtilsService,
               private sidenavService: SidenavService,
               private storageService: StorageService) {
  }

  /**
   * Create the editor with commands and code after
   * the component initialization.
   */
  public async ngOnInit (): Promise<void> {
    // Create the editor.
    this.editorService.createEditor(this.editorReference.nativeElement)

    // Add all commands of the editor.
    this.editorService.addCommands([{
      name: 'run-code',
      exec: () => {
        this.editorService.run()
      },
      bindKey: {mac: 'cmd-Enter', win: 'ctrl-Enter'}
    }, {
      name: 'toggle-sidenav',
      exec: () => {
        this.sidenavService.toggle()
      },
      bindKey: {mac: 'cmd-M', win: 'ctrl-M'}
    }])

    // Set the code of the editor.
    this.setCode()

    // Save the code on keyup event.
    this.editorReference.nativeElement.onkeyup = () => {
      const file = this.gistService.getFile()
      const code = this.editorService.getCode()

      if (file.content !== code) {
        this.storageService.set(`${this.gist.id}/${file.filename}`, code)
      }
    }
  }

  /**
   * Set the code of the editor.
   */
  private async setCode () {
    this.gist = await this.gistService.onInit()
    const gistFile = this.gistService.getFile()
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
  }

}
