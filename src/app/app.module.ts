import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {CeditorModule} from './modules/ceditor/ceditor.module'
import {SharedModule} from './shared/shared.module'
import {CeditorComponent} from './modules/ceditor/ceditor.component'
import {AppRoutingModule} from './app-routing.module'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    CeditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CeditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
