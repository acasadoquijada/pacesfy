import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  constructor(private bookingsService: BookingService, private router: Router, private loadingCtrl: LoadingController) { }

  loadedBookings: Booking[];
  private bookingSub: Subscription;

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create( {message: "Cancelling..."}).then(LoadingEl => {
      LoadingEl.present();
      this.bookingsService.cancelBooking(bookingId).subscribe(() => LoadingEl.dismiss());

    })
    // cancel booking with id
  }

  ngOnDestroy() {
    if(this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
