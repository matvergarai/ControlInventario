import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Asegúrate de que la ruta sea correcta

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));