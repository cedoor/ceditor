import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {GistService} from '../../../../core/services/gist/gist.service'
import {DialogService} from '../../../../core/services/dialog/dialog.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor', { static: true }) public editorReference: ElementRef

  public gist: any

  constructor (private editorService: EditorService,
               private gistService: GistService,
               private dialogService: DialogService) {
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
        // @ts-ignore
        document.querySelector('.run-code-button').click()
      },
      bindKey: {mac: 'cmd-Enter', win: 'ctrl-Enter'}
    }, {
      name: 'toggle-sidenav',
      exec: () => {
        // @ts-ignore
        document.querySelector('.toggle-sidenav-button').click()
      },
      bindKey: {mac: 'alt-M', win: 'alt-M'}
    }, {
      name: 'show-about-dialog',
      exec: () => {
        // @ts-ignore
        document.querySelector('.show-about-dialog-button').click()
      },
      bindKey: {mac: 'alt-I', win: 'alt-I'}
    }, {
      name: 'show-settings-dialog',
      exec: () => {
        // @ts-ignore
        document.querySelector('.show-settings-dialog-button').click()
      },
      bindKey: {mac: 'alt-S', win: 'alt-S'}
    }])

    // Set the code of the editor.
    this.setCode()

    // Save the code on keyup event.
    this.editorReference.nativeElement.onkeyup = () => {
      const code = this.editorService.getCode()

      this.gistService.setCachedFile(code)
    }
  }

  /**
   * Set the code of the editor.
   */
  private async setCode () {
    this.gist = await this.gistService.onInit()
    const cachedFile = this.gistService.getCachedFile()
    const file = this.gistService.getFile()

    if (cachedFile !== null) {
      const result = await this.dialogService.showGenericDialog({
        title: 'Cached code',
        message: 'There is cached code for this file, do you want to use it?',
        buttons: ['No thanks', 'Ok']
      })

      switch (result) {
        case 0:
          this.gistService.removeCachedFile()
          this.editorService.setCode(file)
          break
        case 1:
          this.editorService.setCode(cachedFile)
          break
        default:
          this.editorService.setCode(cachedFile)
      }
    } else {
      this.editorService.setCode(file)
    }
  }

}
