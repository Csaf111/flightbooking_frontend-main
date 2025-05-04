import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:5001/flights');
  }
  
  getAllBookings(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', `${token}`);
    return this.http.get<any[]>('http://127.0.0.1:5001/bookings', { headers });
  }
  
  createBooking(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', `${token}`);
    return this.http.post<any>('http://127.0.0.1:5001/bookings', data, { headers });
  }
  
  deleteBooking(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', `${token}`);
    return this.http.delete<any>(`http://127.0.0.1:5001/bookings/${id}`, { headers });
  }

  updateBooking(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', `${token}`);
    return this.http.put<any>(`http://127.0.0.1:5001/bookings/${id}`, data, { headers });
  }
  
  
}
