import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') public editorReference: ElementRef

  @Input('gistPromise') public gistPromise: Promise<any>

  constructor (private editorService: EditorService,
               private route: ActivatedRoute,
               private utilsService: UtilsService) {
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
      name: 'share-code',
      exec: () => {
        this.utilsService.showMessage('To do...', 2000)
      },
      bindKey: 'alt-S'
    }])

    // Set the code of the editor.
    this.setCode()

    // Save the code on keyup event.
    // this.editorReference.nativeElement.onkeyup = () => {
    // this.storageService.set(STORAGE_KEY.CODE, this.editorService.getCode())
    // }
  }

  /**
   * Set the code of the editor.
   */
  private async setCode () {
    const fileName = this.route.snapshot.paramMap.get('file_name')
    const gist = await this.gistPromise

    if (fileName && typeof fileName === 'string' && gist.files[fileName]) {
      this.editorService.setCode(gist.files[fileName].content)
    } else {
      // @ts-ignore
      this.editorService.setCode(Object.values(gist.files)[0].content)
    }
  }

}
