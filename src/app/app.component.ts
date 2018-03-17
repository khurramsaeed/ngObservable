import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  usrObsSubscription: Subscription;
  user1Activated = false;
  user2Activated = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usrObsSubscription = this.usersService.userActivated.subscribe(
     (id: number) => {
       if (id === 1) {
         this.user1Activated = true;
       } else {
         this.user2Activated = true;
       }
     }
   );
  }

  ngOnDestroy(): void {
    this.usrObsSubscription.unsubscribe();
  }
}
