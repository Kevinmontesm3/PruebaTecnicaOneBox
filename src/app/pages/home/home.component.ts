import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Observable } from 'rxjs';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  events$?: Observable<Event[]>;
  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.events$ = this.ticketsService.getEvents();
  }

}
