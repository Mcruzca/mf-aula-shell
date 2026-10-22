import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { WebComponentPage } from './web-component-page';
@Component({ template: '<h2>Elige una actividad</h2><p>Agenda y Notas son Angular. Asistencia y Encuesta son JavaScript puro, publicados como Web Components.</p><p>El shell organiza la navegación. Native Federation carga los archivos remotos.</p>' })
class Inicio {}
export const routes: Routes = [
 { path: '', pathMatch: 'full', component: Inicio },
 // Angular recibe una clase de componente Angular.
 { path: 'agenda', loadComponent: () => loadRemoteModule('agenda', './Agenda').then(m => m.AgendaComponent) },
 { path: 'notas', loadComponent: () => loadRemoteModule('notas', './Notas').then(m => m.NotasComponent) },
 // Para JavaScript, un puente inserta la etiqueta HTML personalizada.
 { path: 'asistencia', component: WebComponentPage, data: { remote: 'asistencia', tag: 'aula-asistencia' } },
 { path: 'encuesta', component: WebComponentPage, data: { remote: 'encuesta', tag: 'aula-encuesta' } },
 { path: '**', redirectTo: '' }
];
