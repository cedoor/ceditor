import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {AceService} from '../../../../core/services/ace/ace.service'
import {HttpService} from '../../../../core/http/http.service'
import {ConsoleService} from '../../../../core/services/console/console.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') public editorReference: ElementRef

  constructor (private aceService: AceService,
               private loggerService: ConsoleService,
               private httpService: HttpService) {
  }

  async ngOnInit (): Promise<void> {
    this.aceService.createEditor(this.editorReference.nativeElement)

    this.aceService.setCode(localStorage.getItem('code') || await this.httpService.getCode())

    this.aceService.addCommand('run-code', {mac: 'cmd-Enter', win: 'ctrl-Enter'}, () => {
      this.aceService.run()
    })

    this.aceService.addCommand('clear-console', {mac: 'cmd-l', win: 'ctrl-l'}, () => {
      this.loggerService.clear()
    })

    this.editorReference.nativeElement.onkeyup = () => {
      localStorage.setItem('code', this.aceService.getCode())
    }
  }

}
