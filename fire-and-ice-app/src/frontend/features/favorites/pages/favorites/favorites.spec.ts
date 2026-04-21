import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FavoriteComponent } from './favorites.component';
import { addFavorite, removeFavorite, selectFavoriteBooks } from '../../store';
import { SingleBook } from '../../../books/store';

const mockBook: SingleBook = {
  name: 'A Game of Thrones',
  authors: ['George R. R. Martin'],
  country: 'United States',
  url: 'https://anapioficeandfire.com/api/books/1',
  isbn: '978-0553103540',
  numberOfPages: 694,
  publisher: 'Bantam Books',
  mediaType: 'Hardcover',
  released: '1996-08-01T00:00:00',
  characters: [],
  povCharacters: [],
};

const anotherMockBook: SingleBook = {
  ...mockBook,
  name: 'A Clash of Kings',
};

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let store: MockStore;

  const cardSelector = '.book-card';
  const favoriteBtnSelector = '.favorite-button';
  const emptyElSelector = '.empty-state';

  const setupComponent = async (favorites: SingleBook[] = []) => {
    await TestBed.configureTestingModule({
      imports: [FavoriteComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectFavoriteBooks, value: favorites }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  afterEach(() => TestBed.resetTestingModule());

  it('should create', async () => {
    await setupComponent();
    expect(component).toBeTruthy();
  });

  describe('empty state', () => {
    it('should show the empty state message when there are no favorites', async () => {
      await setupComponent([]);
      const emptyEl: HTMLElement = fixture.nativeElement.querySelector(emptyElSelector);

      expect(emptyEl).toBeTruthy();
    });

    it('should not render any cards when favorites is empty', async () => {
      await setupComponent([]);
      const cards = fixture.nativeElement.querySelectorAll(cardSelector);
      expect(cards.length).toBe(0);
    });
  });

  describe('with favorites', () => {
    beforeEach(async () => await setupComponent([mockBook, anotherMockBook]));

    it('should not show the empty state message', () => {
      const emptyEl = fixture.nativeElement.querySelector('.empty-state');

      expect(emptyEl).toBeFalsy();
    });

    it('should render a card for each favorite book', () => {
      const cards = fixture.nativeElement.querySelectorAll(cardSelector);

      expect(cards.length).toBe(2);
    });

    it('should display the book name', () => {
      const firstCard = fixture.nativeElement.querySelectorAll(cardSelector)[0];

      expect(firstCard.textContent).toContain(mockBook.name);
    });

    it('should display the book author', () => {
      const firstCard = fixture.nativeElement.querySelectorAll(cardSelector)[0];

      expect(firstCard.textContent).toContain(mockBook.authors[0]);
    });

    it('should display the book country', () => {
      const firstCard = fixture.nativeElement.querySelectorAll(cardSelector)[0];

      expect(firstCard.textContent).toContain(mockBook.country);
    });

    it('should show ❤️ for books already in favorites', () => {
      const buttons = fixture.nativeElement.querySelectorAll(favoriteBtnSelector);

      expect(buttons[0].textContent.trim()).toBe('❤️');
    });
  });

  describe('isFavorite()', () => {
    beforeEach(async () => await setupComponent([mockBook]));

    it('should return true if the book is in favorites', () => {
      expect(component.isFavorite(mockBook)).toBe(true);
    });

    it('should return false if the book is not in favorites', () => {
      expect(component.isFavorite(anotherMockBook)).toBe(false);
    });
  });

  describe('toggleFavorite()', () => {
    it('should dispatch addFavorite when the book is not in favorites', async () => {
      await setupComponent([]);
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      component.toggleFavorite(mockBook);

      expect(dispatchSpy).toHaveBeenCalledWith(addFavorite({ book: mockBook }));
    });

    it('should dispatch removeFavorite when the book is already in favorites', async () => {
      await setupComponent([mockBook]);
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      component.toggleFavorite(mockBook);

      expect(dispatchSpy).toHaveBeenCalledWith(removeFavorite({ book: mockBook }));
    });

    it('should dispatch removeFavorite when the toggle button is clicked', async () => {
      await setupComponent([mockBook]);
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      const button = fixture.nativeElement.querySelectorAll(favoriteBtnSelector)[0];

      button.click();
      fixture.detectChanges();

      expect(dispatchSpy).toHaveBeenCalledWith(removeFavorite({ book: mockBook }));
    });
  });
});
