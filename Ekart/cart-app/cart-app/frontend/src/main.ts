import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CartComponent } from './app/cart/cart.component';

// The Cart page IS the whole app (single page)
bootstrapApplication(CartComponent, appConfig).catch(err => console.error(err));
