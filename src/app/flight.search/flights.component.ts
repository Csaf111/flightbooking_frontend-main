import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service'; // ✅ Import service

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  filteredFlights: any[] = [];
  searchTerm: string = '';

  constructor(private flightService: FlightService) {} // ✅ Inject it here

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data: any) => {
        this.flights = data;
        this.filteredFlights = data;
      },
      error: (err) => console.error(err)
    });
  }

  filterFlights(): void {
    this.filteredFlights = this.flights.filter(flight =>
      flight.destination.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
