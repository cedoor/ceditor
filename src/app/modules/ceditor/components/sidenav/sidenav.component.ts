import {Component, Input, OnInit} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {Location} from '@angular/common'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input('gist') public gist: Promise<any>

  public gistId: string
  public gistFiles: any[]

  constructor (private editorService: EditorService,
               private location: Location) {
  }

  public async ngOnInit () {
    const gist = await this.gist

    this.gistId = gist.id
    this.gistFiles = Object.values(gist.files)
  }

  public setCode (gistFile: any) {
    this.editorService.setCode(gistFile.content)
    this.location.replaceState(`/${this.gistId}/${gistFile.filename}`)
  }

}
