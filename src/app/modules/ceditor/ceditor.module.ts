import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {ConsoleComponent} from './components/console/console.component'
import {EditorComponent} from './components/editor/editor.component'
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material'

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    ToolbarComponent,
    ConsoleComponent,
    EditorComponent
  ],
  exports: [
    ToolbarComponent,
    ConsoleComponent,
    EditorComponent
  ]
})
export class CeditorModule {
}
