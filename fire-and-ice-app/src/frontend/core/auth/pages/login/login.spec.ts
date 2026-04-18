import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
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

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
