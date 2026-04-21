import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockInstance } from 'vitest';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let routerSpy: MockInstance;
  let router: Router;

  // the best practice is to use data-testid="..." but for now we can use classes
  const counterSelector = '.counter';
  const titleSelector = '.title';
  const progressBarSelector = '.progress-bar';

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerSpy = vi.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('counter signal', () => {
    it('should initialise at 4', () => {
      expect(component.counter()).toBe(4);
    });

    it('should render the initial counter value in the template', () => {
      const span: HTMLElement = fixture.nativeElement.querySelector(counterSelector);
      expect(span.textContent).toBe('4');
    });
  });

  describe('startTimer()', () => {
    it('should navigate to /login when the counter reaches 1', async () => {
      vi.advanceTimersByTime(4000);
      expect(routerSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should navigate to /login exactly once', async () => {
      vi.advanceTimersByTime(6000);
      expect(routerSpy).toHaveBeenCalledTimes(1);
    });

    it('should stop decrementing after navigating', async () => {
      vi.advanceTimersByTime(4000);
      const counterAtNavigation = component.counter();

      vi.advanceTimersByTime(2000);
      expect(component.counter()).toBe(counterAtNavigation);
    });
  });

  describe('template', () => {
    it('should render the 404 heading', () => {
      const h1: HTMLElement = fixture.nativeElement.querySelector(titleSelector);
      expect(h1.textContent?.trim()).toBe('404');
    });

    it('should update the counter in the template as it decrements', async () => {
      vi.advanceTimersByTime(1000);
      fixture.detectChanges();

      const span: HTMLElement = fixture.nativeElement.querySelector(counterSelector);
      expect(span.textContent?.trim()).toBe('3');
    });

    it('should render the progress bar', () => {
      const progressBar = fixture.nativeElement.querySelector(progressBarSelector);
      expect(progressBar).toBeTruthy();
    });
  });
});
