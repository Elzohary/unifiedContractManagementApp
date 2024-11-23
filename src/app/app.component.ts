import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'unifiedContractManagementApp';

 userName = signal('Mohamed');
 isValidUserId = signal(true);

 updateName() {

  if(this.userName() == 'Mohamed') {
    this.userName.set('Zohary');
  }
  else {
    this.userName.set('Mohamed');
  }
  console.log(this.userName());
 }

 updateStatus() {
  this.isValidUserId.set(!this.isValidUserId());
 }


}
