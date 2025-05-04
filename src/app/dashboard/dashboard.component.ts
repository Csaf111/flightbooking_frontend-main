import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  flights: any[] = [];
  bookings: any[] = [];
  editingId: string | null = null;

  booking: any = {
    flight_number: '',
    passenger_name: '',
    passport_number: '',
    email: '',
    phone_number: '',
    seat_class: '',
    contact_details: ''
  };

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getAllBookings().subscribe({
      next: (data) => this.bookings = data,
      error: (err) => console.error('Error fetching bookings', err)
    });

    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => this.flights = flights,
      error: (err) => console.error('Error loading flights', err)
    });
  }

  bookFlight(): void {
    this.flightService.createBooking(this.booking).subscribe({
      next: () => {
        this.ngOnInit(); // Refresh bookings
        this.resetForm();
        alert('Booking successful');
      },
      error: (err) => console.error('Error booking flight', err)
    });
  }

  editBooking(booking: any): void {
    this.booking = { ...booking };  // Load data into form
    this.editingId = booking._id;   // Enable update mode
  }

  updateBooking(): void {
    if (!this.editingId) return;

    this.flightService.updateBooking(this.editingId, this.booking).subscribe({
      next: () => {
        this.ngOnInit();
        this.resetForm();
        alert('Booking updated');
      },
      error: (err) => console.error('Error updating booking', err)
    });
  }

  deleteBooking(id: string): void {
    this.flightService.deleteBooking(id).subscribe(() => {
      this.ngOnInit(); // Refresh after deletion
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
