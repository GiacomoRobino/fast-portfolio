import { TestBed } from '@angular/core/testing';

import { GetArticlesService } from './get-articles.service';

describe('GetArticlesService', () => {
  let service: GetArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
