import { Component } from '@angular/core';

@Component({
  selector: 'app-list-of-works-page',
  templateUrl: './list-of-works-page.component.html',
  styleUrls: ['./list-of-works-page.component.scss'],
})
export class ListOfWorksPageComponent {
  public amountWorks$: any;
  public amountWalls$: any;
  public options$: any;
}
