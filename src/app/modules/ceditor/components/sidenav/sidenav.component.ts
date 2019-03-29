import {Component, Input, OnInit} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {Location} from '@angular/common'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input('gistPromise') public gistPromise: Promise<any>

  public gist: any
  public gistFiles: any[]

  constructor (private editorService: EditorService,
               private location: Location) {
  }

  public async ngOnInit () {
    this.gist = await this.gistPromise

    this.gistFiles = Object.values(this.gist.files)
  }

  public setCode (gistFile: any) {
    this.editorService.setCode(gistFile.content)
    this.location.replaceState(`/${this.gist.id}/${gistFile.filename}`)
  }

}
