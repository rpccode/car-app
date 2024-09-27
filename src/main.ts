import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { Storage } from '@ionic/storage-angular';
import { authReducer } from './app/store/reducer/auth.reducer';
import { AuthEffects } from './app/store/effects/auth.effects';
import { StorageService } from './app/core/services/storage.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore(),
    provideState('auth', authReducer),
    provideEffects([AuthEffects]),
    // Proveemos el servicio Storage como instancia
    { provide: Storage, useFactory: () => new Storage() },
    StorageService, // Proveemos el servicio de almacenamiento
    provideHttpClient(withFetch()),
    ReactiveFormsModule
  ],
});
