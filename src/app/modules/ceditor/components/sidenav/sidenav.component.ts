import {Component, OnInit} from '@angular/core'
import {EditorService} from '../../../../core/services/editor/editor.service'
import {Location} from '@angular/common'
import {GistService} from '../../../../core/services/gist/gist.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public gist: any
  public gistFiles: any[]
  public currentGistFile: any

  constructor (private editorService: EditorService,
               private gistService: GistService,
               private location: Location) {
  }

  public async ngOnInit () {
    this.gist = await this.gistService.onInit()

    this.gistFiles = Object.values(this.gist.files)
    this.currentGistFile = this.gistService.getFile()
  }

  public setGistFile (gistFile: any) {
    this.currentGistFile = gistFile

    this.gistService.setFile(gistFile.filename)
    this.editorService.setCode(gistFile.content)
    this.location.replaceState(`/${this.gist.id}/${gistFile.filename}`)
  }

}