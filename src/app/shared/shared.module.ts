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

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
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
    ProgressSpinnerComponent
  ],
  declarations: [
    ProgressSpinnerComponent
  ]
})
export class SharedModule {
}
