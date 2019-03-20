import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {EditorComponent} from './components/editor/editor.component'
import {MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule} from '@angular/material'

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  declarations: [
    ToolbarComponent,
    EditorComponent
  ],
  exports: [
    ToolbarComponent,
    EditorComponent
  ]
})
export class CeditorModule {
}
