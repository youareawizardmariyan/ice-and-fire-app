import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['../material-theme.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class App {}
