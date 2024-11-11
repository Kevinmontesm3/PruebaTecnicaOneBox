import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input() event!: Event;

  constructor(private router: Router) {}

  goToDetails(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }
}
