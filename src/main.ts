import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient ,withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers:[provideRouter(routes),provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule)
  ]
})
  .catch((err) => console.error(err));

