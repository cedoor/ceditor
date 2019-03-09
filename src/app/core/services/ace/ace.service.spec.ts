import {TestBed} from '@angular/core/testing'

import {AceService} from './ace.service'

describe('AceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: AceService = TestBed.get(AceService)
    expect(service).toBeTruthy()
  })
})
