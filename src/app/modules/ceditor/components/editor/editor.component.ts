import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {HttpService} from '../../../../core/http/http.service'
import {ConsoleService} from '../../../../core/services/console/console.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') public editorReference: ElementRef

  constructor (private editorService: EditorService,
               private loggerService: ConsoleService,
               private httpService: HttpService) {
  }

  async ngOnInit (): Promise<void> {
    this.editorService.createEditor(this.editorReference.nativeElement)

    this.editorService.setCode(localStorage.getItem('code') || await this.httpService.getCode())

    this.editorService.addCommand('run-code', {mac: 'cmd-Enter', win: 'ctrl-Enter'}, () => {
      this.editorService.run()
    })

    this.editorService.addCommand('clear-console', {mac: 'cmd-l', win: 'ctrl-l'}, () => {
      this.loggerService.clear()
    })

    this.editorReference.nativeElement.onkeyup = () => {
      localStorage.setItem('code', this.editorService.getCode())
    }
  }

}
