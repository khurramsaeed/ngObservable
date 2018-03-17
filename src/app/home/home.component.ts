import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  ascObsSubscription: Subscription;
  custObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const ascNumbers = Observable.interval(1000);

    this.ascObsSubscription = ascNumbers.subscribe(
      (number: number) => {
        console.log('Ascending number: ' + number);
      }
    );

    const custObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('Error occured');
        observer.complete(); // packages sent after that won't arrive
      }, 5000);
      setTimeout(() => {
        observer.next('extra package');
      }, 6000);
    });
    this.custObsSubscription = custObservable.subscribe(
      (data: string) => {console.log(data); },
      (error: string) => {console.log(error); },
      () => {console.log('Completed'); }
    );
  }

  // Unscribe on destruction of this component
  // Example: When another component replaces this component
  ngOnDestroy(): void {
    this.ascObsSubscription.unsubscribe();
    this.custObsSubscription.unsubscribe();
  }

}
