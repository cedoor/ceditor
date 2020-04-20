import {NgModule} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {EditorComponent} from './components/editor/editor.component'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
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
