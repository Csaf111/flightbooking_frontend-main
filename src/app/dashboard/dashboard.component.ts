import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel, ngForm
import { AuthService } from '../services/auth.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule + CommonModule here
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

  constructor(
    private flightService: FlightService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
    const user = this.authService.user;
    if (user) this.loadBookings();
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: flights => this.flights = flights,
      error: err => console.error('Error loading flights', err)
    });
  }

  loadBookings(): void {
    this.flightService.getAllBookings().subscribe({
      next: data => this.bookings = data,
      error: err => console.error('Error fetching bookings', err)
    });
  }

  bookFlight(): void {
    this.flightService.createBooking(this.booking).subscribe({
      next: () => {
        alert('Booking successful');
        this.resetForm();
        this.loadBookings();
      },
      error: err => console.error('Error booking flight', err)
    });
  }

  editBooking(booking: any): void {
    this.booking = { ...booking };
    this.editingId = booking._id;
  }

  updateBooking(): void {
    if (!this.editingId) return;
    this.flightService.updateBooking(this.editingId, this.booking).subscribe({
      next: () => {
        alert('Booking updated');
        this.resetForm();
        this.loadBookings();
      },
      error: err => console.error('Error updating booking', err)
    });
  }

  deleteBooking(id: string): void {
    this.flightService.deleteBooking(id).subscribe(() => this.loadBookings());
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
