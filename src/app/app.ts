import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
 selector: 'app-root',
 imports: [RouterLink, RouterOutlet],
 template: `<header><small>SHELL ANGULAR · repositorio mf-aula-shell</small>
 <h1>Aula de capacitación</h1><p>Un shell y cuatro módulos independientes, en dos tecnologías.</p>
 <nav><a routerLink="/">Inicio</a> · <a routerLink="/agenda">Agenda · Angular</a> ·
 <a routerLink="/notas">Notas · Angular</a> · <a routerLink="/asistencia">Asistencia · JS</a> ·
 <a routerLink="/encuesta">Encuesta · JS</a></nav></header>
 <main><router-outlet /></main>`
})
export class App {}
