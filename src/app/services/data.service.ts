import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://switch-yam-equator.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const accessToken = 'cc565823-9819-4413-937e-2dd499660ff1'; 
    return new HttpHeaders({
      'x-chmura-cors': accessToken,
    });
  }

  getMovies(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/movies`, { headers: this.getHeaders() });
  }

  getActors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actors`, { headers: this.getHeaders() });
  }
  
  validateResults(results: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/validation`, results, { headers: this.getHeaders() });
  }
}
