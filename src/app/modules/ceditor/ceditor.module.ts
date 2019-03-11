import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {ConsoleComponent} from './components/console/console.component'
import {EditorComponent} from './components/editor/editor.component'
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { FooterComponent } from './components/footer/footer.component'

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
    EditorComponent,
    FooterComponent
  ],
  exports: [
    ToolbarComponent,
    ConsoleComponent,
    EditorComponent,
    FooterComponent
  ]
})
export class CeditorModule {
}
