import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MatTooltipModule} from '@angular/material'

@NgModule({
  imports: [CommonModule],
  exports: [
    FormsModule,
    CommonModule,
    MatTooltipModule
  ]
})
export class SharedModule {
}
