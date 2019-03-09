import {async, ComponentFixture, TestBed} from '@angular/core/testing'

import {CeditorComponent} from './ceditor.component'

describe('CeditorComponent', () => {
  let component: CeditorComponent
  let fixture: ComponentFixture<CeditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CeditorComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CeditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
