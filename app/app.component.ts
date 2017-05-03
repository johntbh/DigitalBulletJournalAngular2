import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css'],
    moduleId: module.id
})
export class AppComponent {
  title = 'DBJ';
  searchtext: String = '';

  constructor(private router: Router){ };

  nngOnInit(): void {
    this.searchtext = '';
  }

  search() {
    console.log(this.searchtext);
    this.router.navigate(['/search',this.searchtext]);
  }
}
