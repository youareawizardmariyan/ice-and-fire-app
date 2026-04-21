import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
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
      component.registerForm.get(usernameFieldName)?.setValue('test-user');
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be invalid when passwords do not match', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue('test-user');
      component.registerForm.get(passwordFieldName)?.setValue('password123');
      component.registerForm.get(repPasswordFieldName)?.setValue('different');
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be valid when all fields are filled and passwords match', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(usernameFieldName)?.setValue('test-user');
      component.registerForm.get(passwordFieldName)?.setValue('password123');
      component.registerForm.get(repPasswordFieldName)?.setValue('password123');
      expect(component.registerForm.valid).toBe(true);
    });

    it('should have a passwordMismatch error when passwords do not match', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(passwordFieldName)?.setValue('abc');
      component.registerForm.get(repPasswordFieldName)?.setValue('xyz');
      expect(component.registerForm.errors?.['passwordMismatch']).toBeTruthy();
    });

    it('should not have a passwordMismatch error when passwords match', async () => {
      const { component } = await setupComponent();
      component.registerForm.get(passwordFieldName)?.setValue('abc');
      component.registerForm.get(repPasswordFieldName)?.setValue('abc');
      expect(component.registerForm.errors?.['passwordMismatch']).toBeFalsy();
    });
  });

  // checkpoint
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
      component.registerForm.get(usernameFieldName)?.setValue('test-user');
      component.registerForm.get(passwordFieldName)?.setValue('password123');
      component.registerForm.get(repPasswordFieldName)?.setValue('password123');

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(
        register({ username: 'test-user', password: 'password123' }),
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
      component.registerForm.get(usernameFieldName)?.setValue('test-user');
      component.registerForm.get(passwordFieldName)?.setValue('password123');
      component.registerForm.get(repPasswordFieldName)?.setValue('password123');
      fixture.detectChanges();

      fixture.debugElement.query(By.css('form')).nativeElement.dispatchEvent(new Event('submit'));

      expect(store.dispatch).toHaveBeenCalledWith(
        register({ username: 'test-user', password: 'password123' }),
      );
    });
  });

  describe('template', () => {
    it('should render three inputs', async () => {
      const { fixture } = await setupComponent();
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBe(3);
    });

    it('should render two password inputs', async () => {
      const { fixture } = await setupComponent();
      const passwordInputs = fixture.debugElement
        .queryAll(By.css('input'))
        .filter((el) => el.nativeElement.type === passwordFieldName);
      expect(passwordInputs.length).toBe(2);
    });

    it('should render the submit button', async () => {
      const { fixture } = await setupComponent();
      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Register');
    });

    it('should render the login link', async () => {
      const { fixture } = await setupComponent();
      const link = fixture.debugElement.query(By.css('a[routerLink]'));
      expect(link).toBeTruthy();
      expect(link.nativeElement.textContent?.trim()).toBe('Login');
    });
  });
});
