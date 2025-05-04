import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  booking = {
    flightNumber: '',
    name: '',
    contact: '',
    seatClass: 'Economy'
  };

  constructor(private flightService: FlightService) {}

  submitBooking(): void {
    this.flightService.createBooking(this.booking).subscribe({
      next: (res: any) => {
        console.log('Booking successful:', res);
        alert('Booking confirmed!');
        this.booking = {
          flightNumber: '',
          name: '',
          contact: '',
          seatClass: 'Economy'
        };
      },
      error: (err: any) => {
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again.');
      }
    });
  }
  bookFlight() {
    this.flightService.createBooking(this.booking).subscribe({
      next: (res: any) => {
        console.log('Booking successful:', res);
      },
      error: (err: any) => {
        console.error('Booking failed:', err);
      }
    });
  }
  
}
