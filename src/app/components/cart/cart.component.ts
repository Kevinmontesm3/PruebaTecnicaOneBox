import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  groupedCartItems$!: Observable<{ [eventTitle: string]: CartItem[] }>;
  emptyCart$!: Observable<boolean>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.groupedCartItems$ = this.cartService.cartItems$.pipe(
      map(items =>
        items.reduce((acc, item) => {
          if (!acc[item.eventTitle]) {
            acc[item.eventTitle] = [];
          }
          acc[item.eventTitle].push(item);
          return acc;
        }, {} as { [eventTitle: string]: CartItem[] })
      )
    );

    this.emptyCart$ = this.cartService.cartItems$.pipe(
      map(items => items.length === 0)
    );
  }

  removeSession(sessionId: string, eventTitle: string): void {
    this.cartService.removeSession(sessionId, eventTitle);
  }
}
