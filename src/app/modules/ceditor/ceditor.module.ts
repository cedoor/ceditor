import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {EditorComponent} from './components/editor/editor.component'
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material'
import {FooterComponent} from './components/footer/footer.component'

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    ToolbarComponent,
    EditorComponent,
    FooterComponent
  ],
  exports: [
    ToolbarComponent,
    EditorComponent,
    FooterComponent
  ]
})
export class CeditorModule {
}
