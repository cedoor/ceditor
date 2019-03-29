import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CeditorComponent} from './modules/ceditor/ceditor.component'

const routes: Routes = [{
  path: '',
  component: CeditorComponent
}, {
  path: ':gist_id',
  component: CeditorComponent
}, {
  path: ':gist_id/:filename',
  component: CeditorComponent
}, {
  path: '**', component: CeditorComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
