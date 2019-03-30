import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {StorageService} from '../../../../core/services/storage/storage.service'
import {GistService} from '../../../../core/services/gist/gist.service'
import {SidenavService} from '../../../../core/services/sidenav/sidenav.service'

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

      this.storageService.set(`${this.gist.id}/${file.filename}`, code)
    }
  }

  /**
   * Set the code of the editor.
   */
  private async setCode () {
    this.gist = await this.gistService.onInit()
    const file = this.gistService.getFile()

    this.editorService.setCode(file.content)
  }

}
