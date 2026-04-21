import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { clearAuthMessages, register } from '../../store';

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
const repPasswordFieldName = 'repeatPassword';

const setupComponent = async () => {
  await TestBed.configureTestingModule({
    imports: [RegisterComponent],
    providers: [
      provideMockStore({ initialState }),
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { params: {}, queryParams: {} } },
      },
    ],
  }).compileComponents();

  const store = TestBed.inject(MockStore);
  vi.spyOn(store, 'dispatch');

  const fixture: ComponentFixture<RegisterComponent> = TestBed.createComponent(RegisterComponent);
  const component = fixture.componentInstance;
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component, store };
};

afterEach(() => TestBed.resetTestingModule());

describe('RegisterComponent', () => {
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

  describe('registerForm', () => {
    it('should initialise with empty fields', async () => {
      const { component } = await setupComponent();
      expect(component.registerForm.get(usernameFieldName)?.value).toBe('');
      expect(component.registerForm.get(passwordFieldName)?.value).toBe('');
      expect(component.registerForm.get(repPasswordFieldName)?.value).toBe('');
    });

    it('should be invalid when all fields are empty', async () => {
      const { component } = await setupComponent();
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be invalid when only username is filled', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue(testUsername);
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be invalid when passwords do not match', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue(testUsername);
      component.registerForm.get(passwordFieldName)?.setValue(testPassword);
      component.registerForm.get(repPasswordFieldName)?.setValue('different');
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be valid when all fields are filled and passwords match', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue(testUsername);
      component.registerForm.get(passwordFieldName)?.setValue(testPassword);
      component.registerForm.get(repPasswordFieldName)?.setValue(testPassword);
      expect(component.registerForm.valid).toBe(true);
    });

    it('should have a passwordMismatch error when passwords do not match', async () => {
      const { component } = await setupComponent();
      const repeatPasswordField = component.registerForm.get('repeatPassword');

      component.registerForm.get('password')?.setValue('abc');
      repeatPasswordField?.setValue('xyz');

      component.registerForm.updateValueAndValidity();

      expect(repeatPasswordField?.hasError('passwordMismatch')).toBe(true);
    });

    it('should not have a passwordMismatch error when passwords match', async () => {
      const { component } = await setupComponent();
      const repeatPasswordField = component.registerForm.get('repeatPassword');

      component.registerForm.get(passwordFieldName)?.setValue('abc');
      repeatPasswordField?.setValue('abc');
      expect(repeatPasswordField?.errors?.['passwordMismatch']).toBeFalsy();
    });
  });

  describe('f getter', () => {
    it('should return the form controls', async () => {
      const { component } = await setupComponent();
      expect(component.f[usernameFieldName]).toBe(component.registerForm.get(usernameFieldName));
      expect(component.f[passwordFieldName]).toBe(component.registerForm.get(passwordFieldName));
      expect(component.f[repPasswordFieldName]).toBe(
        component.registerForm.get(repPasswordFieldName),
      );
    });
  });

  describe('onSubmit()', () => {
    it('should dispatch register with credentials when the form is valid', async () => {
      const { component, store } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue(testUsername);
      component.registerForm.get(passwordFieldName)?.setValue(testPassword);
      component.registerForm.get(repPasswordFieldName)?.setValue(testPassword);

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        register({ username: testUsername, password: testPassword }),
      );
    });

    it('should not dispatch register when the form is invalid', async () => {
      const { component, store } = await setupComponent();
      component.onSubmit();

      expect(store.dispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: register.type }),
      );
    });

    it('should mark all fields as touched when submitting an invalid form', async () => {
      const { component } = await setupComponent();
      component.onSubmit();

      expect(component.registerForm.get(usernameFieldName)?.touched).toBe(true);
      expect(component.registerForm.get(passwordFieldName)?.touched).toBe(true);
      expect(component.registerForm.get(repPasswordFieldName)?.touched).toBe(true);
    });

    it('should dispatch register when the form is submitted via the DOM', async () => {
      const { fixture, component, store } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue(testUsername);
      component.registerForm.get(passwordFieldName)?.setValue(testPassword);
      component.registerForm.get(repPasswordFieldName)?.setValue(testPassword);
      fixture.detectChanges();

      fixture.debugElement.query(By.css('form')).nativeElement.dispatchEvent(new Event('submit'));

      expect(store.dispatch).toHaveBeenCalledWith(
        register({ username: testUsername, password: testPassword }),
      );
    });
  });
});
