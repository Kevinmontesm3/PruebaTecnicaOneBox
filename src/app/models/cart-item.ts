import { Session } from './event-detail';
export interface CartItem {
  session: Session;
  quantity: number;
  nombre? : string;
}
