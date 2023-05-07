import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';

import { AppRoutingModule } from './app/app-routing.module';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, RouterOutlet, AppRoutingModule),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
