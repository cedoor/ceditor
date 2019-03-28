import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {ActivatedRoute} from '@angular/router'
import {GithubService} from '../../../../core/http/github/github.service'
import {STORAGE_KEY, StorageService} from '../../../../core/services/storage/storage.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') public editorReference: ElementRef

  constructor (private editorService: EditorService,
               private githubService: GithubService,
               private storageService: StorageService,
               private route: ActivatedRoute,
               private utilsService: UtilsService) {
    this.utilsService.showProgressSpinner()
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
    await this.setCode()

    // Save the code on keyup event.
    this.editorReference.nativeElement.onkeyup = () => {
      this.storageService.set(STORAGE_KEY.CODE, this.editorService.getCode())
    }
  }

  /**
   * Set the code of the editor.
   */
  private async setCode () {
    const gistId = this.route.snapshot.paramMap.get('gist_id')
    const fileName = this.route.snapshot.paramMap.get('file_name')
    const code =
      await this.getGistCode(gistId, fileName) ||
      this.storageService.get(STORAGE_KEY.CODE) ||
      await this.getDefaultCode()

    this.editorService.setCode(code)
    this.utilsService.hideProgressSpinner()
  }

  /**
   * Return the default gist code to show.
   * https://gist.github.com/cedoor/6490a8bcea24c3a58e5a7233dd5f72e1
   */
  private async getDefaultCode () {
    return await this.getGistCode('6490a8bcea24c3a58e5a7233dd5f72e1', 'default.ts')
  }

  /**
   * Return the code of the gist with the id passed as parameter.
   */
  private async getGistCode (gistId: string, fileName?: string): Promise<string> {
    if (gistId && typeof gistId === 'string') {
      try {
        const gist = await this.githubService.getGist(gistId)

        if (fileName && typeof fileName === 'string' && gist.files[fileName]) {
          return gist.files[fileName].content
        } else {
          // @ts-ignore
          return Object.values(gist.files)[0].content
        }
      } catch (error) {
        return null
      }
    } else {
      return null
    }
  }

}
