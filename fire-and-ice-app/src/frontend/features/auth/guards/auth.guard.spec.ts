import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { authGuard } from './auth.guard';
import { selectIsLoggedIn } from '../store';

describe('authGuard (Vitest)', () => {
  let store: MockStore;
  let router: { createUrlTree: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    router = {
      createUrlTree: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });

    store = TestBed.inject(MockStore);
  });

  const runGuard = async () => {
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    if (result instanceof Promise) {
      return result;
    }

    if ((result as any)?.subscribe) {
      return firstValueFrom(result as any);
    }

    return result;
  };

  it('allows activation when logged in', async () => {
    store.overrideSelector(selectIsLoggedIn, true);
    store.refreshState();

    const result = await runGuard();

    expect(result).toBe(true);
  });

  it('redirects to /login when NOT logged in', async () => {
    const mockUrlTree = { mock: true };
    router.createUrlTree.mockReturnValue(mockUrlTree);

    store.overrideSelector(selectIsLoggedIn, false);
    store.refreshState();

    const result = await runGuard();

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBe(mockUrlTree);
  });
});
