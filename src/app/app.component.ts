import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-nav></app-nav><router-outlet></router-outlet><app-footer></app-footer>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkOutAholic';
}