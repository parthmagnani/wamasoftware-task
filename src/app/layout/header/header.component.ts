import { Component } from '@angular/core';
import { navigation } from 'src/app/shared/utils/navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navigationList = navigation
}
