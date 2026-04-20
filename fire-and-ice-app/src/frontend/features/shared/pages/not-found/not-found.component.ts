import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div class="text-center max-w-md">
        <h1 class="text-6xl font-extrabold text-white mb-4">404</h1>
        <p class="text-slate-400 mb-6">
          Redirecting to login in
          <span class="text-sky-400 font-semibold text-lg">
            {{ counter() }}
          </span>
          seconds...
        </p>
        <mat-progress-bar mode="indeterminate" />
      </div>
    </div>
  `,
  imports: [MatProgressBarModule],
})
export class NotFoundComponent {
  counter = signal(4);

  constructor(private router: Router) {
    this.startTimer();
  }

  startTimer() {
    const interval = setInterval(() => {
      const value = this.counter();

      if (value <= 1) {
        clearInterval(interval);
        this.router.navigate(['/login']);
        return;
      }

      this.counter.set(value - 1);
    }, 1000);
  }
}
