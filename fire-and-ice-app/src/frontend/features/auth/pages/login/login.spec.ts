import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { clearAuthMessages, login, selectIsLoggedIn } from '../../store';

const initialState = {
  auth: {
    isLoggedIn: false,
    error: null,
    successMessage: null,
  },
};

const testUsername = 'testUsername';
const testPassword = 'testPassword';
const usernameFieldName = 'username';
const passwordFieldName = 'password';

const submitBtnSelector = '.submit-btn';
const loginFormSelector = '.login-form';

const setupComponent = async ({ isLoggedIn = false } = {}) => {
  await TestBed.configureTestingModule({
    imports: [LoginComponent],
    providers: [
      provideMockStore({
        initialState,
        selectors: [{ selector: selectIsLoggedIn, value: isLoggedIn }],
      }),
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { params: {}, queryParams: {} } },
      },
    ],
  }).compileComponents();

  const store = TestBed.inject(MockStore);
  vi.spyOn(store, 'dispatch');

  const fixture = TestBed.createComponent(LoginComponent);
  const component = fixture.componentInstance;
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component, store };
};

afterEach(() => TestBed.resetTestingModule());

describe('LoginComponent', () => {
  it('should create', async () => {
    const { component } = await setupComponent();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch clearAuthMessages on init', async () => {
      const { store } = await setupComponent();
      expect(store.dispatch).toHaveBeenCalledWith(clearAuthMessages());
    });
  });

  describe('loginForm', () => {
    it('should initialise with empty username and password fields', async () => {
      const { component } = await setupComponent();
      expect(component.loginForm.get(usernameFieldName)?.value).toBe('');
      expect(component.loginForm.get(passwordFieldName)?.value).toBe('');
    });

    it('should be invalid when both fields are empty', async () => {
      const { component } = await setupComponent();
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when only username is filled', async () => {
      const { component } = await setupComponent();
      component.loginForm.get(usernameFieldName)?.setValue(testUsername);
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be invalid when only password is filled', async () => {
      const { component } = await setupComponent();
      component.loginForm.get(passwordFieldName)?.setValue(testPassword);
      expect(component.loginForm.valid).toBe(false);
    });

    it('should be valid when both fields are filled', async () => {
      const { component } = await setupComponent();
      component.loginForm.get(usernameFieldName)?.setValue(testUsername);
      component.loginForm.get(passwordFieldName)?.setValue(testPassword);
      expect(component.loginForm.valid).toBe(true);
    });
  });

  describe('onSubmit()', () => {
    it('should dispatch login with credentials when the form is valid', async () => {
      const { component, store } = await setupComponent();
      component.loginForm.get('username')?.setValue(testUsername);
      component.loginForm.get(passwordFieldName)?.setValue(testPassword);

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        login({ username: testUsername, password: testPassword }),
      );
    });

    it('should not dispatch login when the form is invalid', async () => {
      const { component, store } = await setupComponent();
      component.onSubmit();

      expect(store.dispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: login.type }),
      );
    });

    it('should mark all fields as touched when submitting an invalid form', async () => {
      const { component } = await setupComponent();
      component.onSubmit();

      expect(component.loginForm.get(usernameFieldName)?.touched).toBe(true);
      expect(component.loginForm.get(passwordFieldName)?.touched).toBe(true);
    });

    it('should dispatch login when the form is submitted via the DOM', async () => {
      const { fixture, component, store } = await setupComponent();
      component.loginForm.get(usernameFieldName)?.setValue(testUsername);
      component.loginForm.get(passwordFieldName)?.setValue(testPassword);
      fixture.detectChanges();

      fixture.nativeElement.querySelector(loginFormSelector).dispatchEvent(new Event('submit'));

      expect(store.dispatch).toHaveBeenCalledWith(
        login({ username: testUsername, password: testPassword }),
      );
    });
  });

  describe('template', () => {
    it('should render the submit button', async () => {
      const { fixture } = await setupComponent();
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(submitBtnSelector);
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Login');
    });

    it('should disable the submit button when user is logged in', async () => {
      const { fixture } = await setupComponent({ isLoggedIn: true });
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(submitBtnSelector);
      expect(button.disabled).toBe(true);
    });

    it('should enable the submit button when user is not logged in', async () => {
      const { fixture } = await setupComponent({ isLoggedIn: false });
      const button: HTMLButtonElement = fixture.nativeElement.querySelector(submitBtnSelector);
      expect(button.disabled).toBe(false);
    });
  });
});
