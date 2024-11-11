import { Component, Input, OnInit } from '@angular/core';
import { Session } from '../../models/event-detail';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {
  @Input() session!: Session;
  @Input() nameEvent!: string;
  locationsSelected: number = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateLocationsSelected();
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.updateLocationsSelected();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateLocationsSelected(): void {
    const cartItems = this.cartService.cartItemsSubject.value;
    const cartItem = cartItems.find(item => item.session.date === this.session.date && item.eventTitle === this.nameEvent);
    this.locationsSelected = cartItem ? cartItem.quantity : 0;
  }

  increment(): void {
    if (this.session.availability > this.locationsSelected) {
      this.locationsSelected++;
      this.cartService.updateSession(this.session, this.nameEvent, this.locationsSelected);
    }
  }

  decrement(): void {
    if (this.locationsSelected > 0) {
      this.locationsSelected--;
      this.cartService.updateSession(this.session, this.nameEvent, this.locationsSelected);
    }
  }
}
