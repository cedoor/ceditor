import {AfterContentInit, Component, ElementRef, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {HttpService} from '../../../../core/http/http.service'
import {UtilsService} from '../../../../core/services/utils/utils.service'
import {ActivatedRoute} from '@angular/router'
import {GithubService} from '../../../../core/http/github/github.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterContentInit {

  @ViewChild('editor') public editorReference: ElementRef

  constructor (private editorService: EditorService,
               private githubService: GithubService,
               private route: ActivatedRoute,
               private utilsService: UtilsService,
               private httpService: HttpService) {
  }

  public async ngAfterContentInit (): Promise<void> {
    this.editorService.createEditor(this.editorReference.nativeElement)

    this.editorService.addCommand('run-code', {mac: 'cmd-Enter', win: 'ctrl-Enter'}, () => {
      this.editorService.run()
    })

    await this.setCode()

    this.editorReference.nativeElement.onkeyup = () => {
      localStorage.setItem('code', this.editorService.getCode())
    }
  }

  private async setCode () {
    const gistId = this.route.snapshot.paramMap.get('gist_id')
    let code =
      localStorage.getItem('code')
      || await this.httpService.get('./assets/code/default.txt', {
        responseType: 'text'
      })

    if (gistId) {
      try {
        const gist = await this.githubService.getGist(gistId)

        // @ts-ignore
        code = Object.values(gist.files)[0].content
      } catch (error) {
        this.editorService.setCode(code)
      }
    }

    this.editorService.setCode(code)
  }

}
