import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('search signal', () => {
    it('should have an empty string as the initial value', () => {
      expect(service.search()).toBe('');
    });
  });

  describe('setSearch()', () => {
    it('should update the search signal with the provided value', () => {
      service.setSearch('dragons');
      expect(service.search()).toBe('dragons');
    });

    it('should handle an empty string', () => {
      service.setSearch('something');
      service.setSearch('');
      expect(service.search()).toBe('');
    });

    it('should handle special characters', () => {
      const specialChars = '!@#$%^&*()';

      service.setSearch(specialChars);
      expect(service.search()).toBe(specialChars);
    });

    it('should handle whitespace-only strings', () => {
      const whiteSpaces = '             ';

      service.setSearch(whiteSpaces);
      expect(service.search()).toBe(whiteSpaces);
    });
  });
});
