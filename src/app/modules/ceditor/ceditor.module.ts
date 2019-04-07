import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {EditorComponent} from './components/editor/editor.component'
import {MatCardModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material'
import {CeditorComponent} from './ceditor.component'
import {SidenavComponent} from './components/sidenav/sidenav.component'
import {AboutDialogComponent} from './components/about-dialog/about-dialog.component'
import {CachedGistsComponent} from './components/cached-gists/cached-gists.component'

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [
    CeditorComponent,
    ToolbarComponent,
    EditorComponent,
    SidenavComponent,
    AboutDialogComponent,
    CachedGistsComponent
  ],
  entryComponents: [
    AboutDialogComponent,
    CachedGistsComponent
  ]
})
export class CeditorModule {
}
