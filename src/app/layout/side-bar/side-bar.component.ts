import { Component } from '@angular/core';
import { navigation } from 'src/app/shared/utils/navigation';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  navigationList = navigation
}
