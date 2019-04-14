import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {EditorComponent} from './components/editor/editor.component'
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material'
import {CeditorComponent} from './ceditor.component'
import {SidenavComponent} from './components/sidenav/sidenav.component'
import {AboutDialogComponent} from './components/about-dialog/about-dialog.component'
import {CachedGistsComponent} from './components/cached-gists/cached-gists.component'
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component'
import {GenericDialogComponent} from './components/generic-dialog/generic-dialog.component'
import {SettingsComponent} from './components/settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  declarations: [
    CeditorComponent,
    ToolbarComponent,
    EditorComponent,
    SidenavComponent,
    AboutDialogComponent,
    CachedGistsComponent,
    ProgressSpinnerComponent,
    GenericDialogComponent,
    SettingsComponent
  ],
  entryComponents: [
    AboutDialogComponent,
    CachedGistsComponent,
    ProgressSpinnerComponent,
    GenericDialogComponent,
    SettingsComponent
  ]
})
export class CeditorModule {
}
