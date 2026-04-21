import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LayoutComponent } from './layout.component';
import { logout, selectUsername } from '../auth/store';
import { SearchService } from '../books/services/search/search.service';

describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>;
  let component: LayoutComponent;
  let store: MockStore;
  let router: Router;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectUsername, value: 'test-user' }],
        }),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    searchService = TestBed.inject(SearchService);

    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch()', () => {
    it('should call searchService.setSearch with the provided value', () => {
      const setSearchSpy = vi.spyOn(searchService, 'setSearch');
      component.onSearch('dragons');
      expect(setSearchSpy).toHaveBeenCalledWith('dragons');
    });

    it('should call searchService.setSearch with an empty string', () => {
      const setSearchSpy = vi.spyOn(searchService, 'setSearch');
      component.onSearch('');
      expect(setSearchSpy).toHaveBeenCalledWith('');
    });
  });

  describe('goToBooks()', () => {
    it('should navigate to /books', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');
      component.goToBooks();
      expect(navigateSpy).toHaveBeenCalledWith(['/books']);
    });
  });

  describe('goToCharacters()', () => {
    it('should navigate to /characters', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');
      component.goToCharacters();
      expect(navigateSpy).toHaveBeenCalledWith(['/characters']);
    });
  });

  describe('onLogout()', () => {
    it('should dispatch the logout action', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      component.onLogout();
      expect(dispatchSpy).toHaveBeenCalledWith(logout());
    });

    it('should navigate to /login', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');
      component.onLogout();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('searchForm', () => {
    it('should initialise the search form with an empty string', () => {
      expect(component.searchForm.get('search')?.value).toBe('');
    });

    it('should update the form control value when the user types', () => {
      const searchFormSelector = '.search-form';
      const input: HTMLInputElement = fixture.nativeElement.querySelector(searchFormSelector);

      input.value = 'Lannister';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.searchForm.get('search')?.value).toBe('Lannister');
    });
  });
});
