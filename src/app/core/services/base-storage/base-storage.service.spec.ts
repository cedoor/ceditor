import {TestBed} from '@angular/core/testing'

import {BaseStorageService} from './base-storage.service'

describe('BaseStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: BaseStorageService = TestBed.get(BaseStorageService)
    expect(service).toBeTruthy()
  })
})
