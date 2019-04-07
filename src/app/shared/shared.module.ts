import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
  ],
  entryComponents: [],
  declarations: []
})
export class SharedModule {
}
