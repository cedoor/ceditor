import {TestBed} from '@angular/core/testing'

import {GistService} from './gist.service'

describe('GistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: GistService = TestBed.get(GistService)
    expect(service).toBeTruthy()
  })
})
