import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  flights: any[] = [];
  bookings: any[] = [];
  booking: any = {
    flight_number: '',
    passenger_name: '',
    passport_number: '',
    email: '',
    phone_number: '',
    seat_class: '',
    contact_details: ''
  };
  editingId: string | null = null;

  bookingMessage: string = '';
  bookingError: string = '';

  constructor(
    private flightService: FlightService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
    if (this.authService.user) {
      this.loadBookings();
    }
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: flights => this.flights = flights,
      error: err => {
        console.error('Error loading flights', err);
        this.bookingError = 'Failed to load flights.';
      }
    });
  }

  loadBookings(): void {
    this.flightService.getAllBookings().subscribe({
      next: data => this.bookings = data,
      error: err => {
        console.error('Error fetching bookings', err);
        this.bookingError = 'Could not load your bookings.';
      }
    });
  }

  bookFlight(): void {
    this.flightService.createBooking(this.booking).subscribe({
      next: () => {
        this.bookingMessage = '✅ Booking successful!';
        this.bookingError = '';
        this.resetForm();
        this.loadBookings();
      },
      error: err => {
        console.error('Booking failed', err);
        this.bookingError = '⚠️ Failed to book. Please try again.';
      }
    });
  }

  editBooking(booking: any): void {
    this.booking = { ...booking };
    this.editingId = booking._id;
    this.bookingMessage = '';
    this.bookingError = '';
  }

  updateBooking(): void {
    if (!this.editingId) return;
    this.flightService.updateBooking(this.editingId, this.booking).subscribe({
      next: () => {
        this.bookingMessage = '✅ Booking updated successfully!';
        this.bookingError = '';
        this.resetForm();
        this.loadBookings();
      },
      error: err => {
        console.error('Update failed', err);
        this.bookingError = '⚠️ Failed to update booking.';
      }
    });
  }

  deleteBooking(id: string): void {
    this.flightService.deleteBooking(id).subscribe({
      next: () => {
        this.bookingMessage = '✅ Booking canceled.';
        this.bookingError = '';
        this.loadBookings();
      },
      error: err => {
        console.error('Delete failed', err);
        this.bookingError = '⚠️ Failed to cancel booking.';
      }
    });
  }

  resetForm(): void {
    this.booking = {
      flight_number: '',
      passenger_name: '',
      passport_number: '',
      email: '',
      phone_number: '',
      seat_class: '',
      contact_details: ''
    };
    this.editingId = null;
  }
}
