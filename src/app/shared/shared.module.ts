import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material'
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component'
import {GenericDialogComponent} from './components/generic-dialog/generic-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    ProgressSpinnerComponent,
    GenericDialogComponent
  ],
  declarations: [
    ProgressSpinnerComponent,
    GenericDialogComponent
  ]
})
export class SharedModule {
}
