import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { EventComponent } from './event/event.component';
import { SesionComponent } from './sesion/sesion.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    HeaderComponent,
    EventComponent,
    SesionComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    EventComponent,
    SesionComponent,
    CartComponent
  ]
})
export class ComponentsModule { }
