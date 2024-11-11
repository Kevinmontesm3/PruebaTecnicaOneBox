import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { EventDetail, Session } from '../../models/event-detail';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { map, catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  eventDetail$?: Observable<EventDetail | null>;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id')!;
    this.eventDetail$ = this.ticketsService.getEventInfo(eventId).pipe(
      map(eventDetail => ({
        ...eventDetail,
        sessions: eventDetail.sessions.sort(
          (a, b) => parseInt(a.date) - parseInt(b.date)
        ),
      })),
      catchError(error => {
        this.error = true;
        return of(null);
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
