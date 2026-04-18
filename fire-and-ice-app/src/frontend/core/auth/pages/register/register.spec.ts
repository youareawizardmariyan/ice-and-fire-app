import { TestBed } from '@angular/core/testing';
import { Register } from './register';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';

describe('Register', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              isLoggedIn: false,
              error: null,
              successMessage: null,
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Register);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
