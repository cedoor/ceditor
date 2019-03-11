import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {HttpService} from '../../../../core/http/http.service'
import {ConsoleService} from '../../../../core/services/console/console.service'
import {ActivatedRoute} from '@angular/router'
import {IpfsService} from '../../../../core/services/ipfs/ipfs.service'
import {InformationService} from '../../../../core/services/information/information.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterContentInit {

  @ViewChild('editor') public editorReference: ElementRef

  constructor (private editorService: EditorService,
               private loggerService: ConsoleService,
               private route: ActivatedRoute,
               private informationService: InformationService,
               private ipfsService: IpfsService,
               private httpService: HttpService) {
  }

  public async ngAfterContentInit (): Promise<void> {
    this.editorService.createEditor(this.editorReference.nativeElement)

    this.editorService.addCommand('run-code', {mac: 'cmd-Enter', win: 'ctrl-Enter'}, () => {
      this.editorService.run()
    })

    this.editorService.addCommand('clear-console', {mac: 'cmd-l', win: 'ctrl-l'}, () => {
      this.loggerService.clear()
    })

    await this.setCode()

    this.editorReference.nativeElement.onkeyup = () => {
      localStorage.setItem('code', this.editorService.getCode())
    }
  }

  private async setCode () {
    const key = this.route.snapshot.paramMap.get('key')

    if (key) {
      this.informationService.log('Getting the code...')

      this.editorService.setCode(await this.ipfsService.cat(key))

      this.informationService.log('Code loaded!', 4000)
    } else {
      this.editorService.setCode(localStorage.getItem('code') || await this.httpService.getCode())
    }
  }

}
