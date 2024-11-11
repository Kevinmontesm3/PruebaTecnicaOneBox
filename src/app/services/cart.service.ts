import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/event-detail';

export interface CartItem {
  session: Session;
  eventTitle: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartSessions';
  public cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  private loadCart(): CartItem[] {
    if (typeof localStorage !== 'undefined')
    {const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];}
    return [];
  }

  private saveCart(cart: CartItem[]): void {
    if (typeof localStorage !== 'undefined')
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  private findCartItemIndex(sessionId: string, eventTitle: string): number {
    return this.cartItemsSubject.value.findIndex(item => item.session.date === sessionId && item.eventTitle === eventTitle);
  }

  updateSession(session: Session, eventTitle: string, quantity: number): void {
    const cart = this.cartItemsSubject.value.slice();
    const index = this.findCartItemIndex(session.date, eventTitle);

    if (quantity > 0) {
      if (index >= 0) {
        cart[index].quantity = quantity;
      } else {
        cart.push({ session, eventTitle, quantity });
      }
    } else if (index >= 0) {
      cart.splice(index, 1);
    }

    this.cartItemsSubject.next(cart);
    this.saveCart(cart);
  }

  removeSession(sessionId: string, eventTitle: string): void {
    const cart = this.cartItemsSubject.value.filter(item => !(item.session.date === sessionId && item.eventTitle === eventTitle));
    this.cartItemsSubject.next(cart);
    this.saveCart(cart);
  }
}
