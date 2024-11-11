import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Event } from '../models/event.model';
import { EventDetail, Session } from '../models/event-detail';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private dataUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.dataUrl}/events.json`).pipe(
      map(events => {
        if (!events || events.length === 0) {
          return [];
        }
        return events.sort((a, b) => parseInt(a.startDate) - parseInt(b.startDate));
      })
    );
  }

  getEventInfo(eventId: string): Observable<EventDetail> {
    return this.http.get<EventDetail>(`${this.dataUrl}/event-info-${eventId}.json`).pipe(
      map(eventDetail => ({
        ...eventDetail,
        sessions: eventDetail.sessions.map(session => ({
          ...session,
          availability: Number(session.availability)
        }))
      })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Event not found'));
        } else {
          return throwError(() => new Error('An error occurred while fetching the event information'));
        }
      })
    );
  }

}
