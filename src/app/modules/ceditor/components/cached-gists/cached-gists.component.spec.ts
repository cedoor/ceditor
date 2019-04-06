import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {CachedGistsComponent} from './cached-gists.component'

describe('CachedGistsComponent', () => {
  let component: CachedGistsComponent
  let fixture: ComponentFixture<CachedGistsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CachedGistsComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CachedGistsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
