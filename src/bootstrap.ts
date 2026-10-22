import { bootstrapApplication } from '@angular/platform-browser';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Piezas que un módulo comparte con los demás: se cargan una vez y registran su etiqueta para todos.
// No se espera la carga: si asistencia está apagado, la app arranca igual y cada módulo muestra su texto de respaldo.
loadRemoteModule('asistencia', './ListaAlumnos').catch((err) => console.error('Lista de alumnos no disponible', err));

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
