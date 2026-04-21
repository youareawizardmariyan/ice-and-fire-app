import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorComponent } from './form-error';

const setupComponent = async (control: FormControl | null = null) => {
  await TestBed.configureTestingModule({
    imports: [FormErrorComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(FormErrorComponent);
  const component = fixture.componentInstance;
  fixture.componentRef.setInput('control', control);
  fixture.detectChanges();

  return { fixture, component };
};

const errRequired = 'Field is required';
const errInvalidField = 'Invalid field';
const errPwMismatch = 'Passwords do not match';

afterEach(() => TestBed.resetTestingModule());

describe('FormErrorComponent', () => {
  it('should create', async () => {
    const { component } = await setupComponent();
    expect(component).toBeTruthy();
  });

  describe('errorMessage getter', () => {
    it('should return null when control is null', async () => {
      const { component } = await setupComponent(null);
      expect(component.errorMessage).toBeNull();
    });

    it('should return null when control has no errors', async () => {
      const control = new FormControl('some value', Validators.required);
      control.markAsTouched();
      const { component } = await setupComponent(control);
      expect(component.errorMessage).toBeNull();
    });

    it('should return null when control has errors but is untouched', async () => {
      const control = new FormControl('', Validators.required);
      const { component } = await setupComponent(control);
      expect(component.errorMessage).toBeNull();
    });

    it('should return "Field is required" for a required error on a touched control', async () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      const { component } = await setupComponent(control);
      expect(component.errorMessage).toBe(errRequired);
    });

    it('should return "Passwords do not match" for a passwordMismatch error', async () => {
      const control = new FormControl('');
      control.setErrors({ passwordMismatch: true });
      control.markAsTouched();
      const { component } = await setupComponent(control);
      expect(component.errorMessage).toBe(errPwMismatch);
    });

    it('should return "Invalid field" for an unknown error', async () => {
      const control = new FormControl('');
      control.setErrors({ someUnknownError: true });
      control.markAsTouched();
      const { component } = await setupComponent(control);
      expect(component.errorMessage).toBe(errInvalidField);
    });

    it('should prioritise "required" over other errors', async () => {
      const control = new FormControl('');
      control.setErrors({ required: true, passwordMismatch: true });
      control.markAsTouched();
      const { component } = await setupComponent(control);
      expect(component.errorMessage).toBe(errRequired);
    });
  });
});
