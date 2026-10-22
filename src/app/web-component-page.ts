import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/native-federation';

// El puente no convierte JavaScript a Angular: crea una etiqueta del navegador.
@Component({
 standalone: true,
 template: `<p aria-live="polite">{{ estado() }}</p><div #contenedor></div>
 <p aria-live="polite">Mensaje recibido por Angular: {{ mensaje() }}</p>`
})
export class WebComponentPage implements AfterViewInit, OnDestroy {
 @ViewChild('contenedor', { static: true }) contenedor!: ElementRef<HTMLDivElement>;
 private route = inject(ActivatedRoute);
 private subscription?: Subscription;
 private version = 0;
 private elemento?: HTMLElement;
 estado = signal('');
 mensaje = signal('ninguno todavía');
 private recibir = (event: Event) => {
   this.mensaje.set(String((event as CustomEvent).detail.message));
 };
 ngAfterViewInit() {
   // Angular puede reutilizar esta página al pasar de un remoto JS a otro.
   this.subscription = this.route.data.subscribe(data => void this.mostrar(data['remote'], data['tag']));
 }
 private async mostrar(remote: string, tag: string) {
   const version = ++this.version;
   this.limpiar();
   this.estado.set('Cargando ' + remote + '…');
   this.mensaje.set('ninguno todavía');
   try {
     // Ejecuta el módulo que registra customElements.define(...).
     await loadRemoteModule(remote, './Widget');
     if (version !== this.version) return;
     if (!customElements.get(tag)) throw new Error('El remoto no registró ' + tag);
     const elemento = document.createElement(tag);
     elemento.setAttribute('participante', 'Marcelo'); // Angular → JavaScript.
     elemento.addEventListener('aula-cambio', this.recibir); // JavaScript → Angular.
     this.elemento = elemento;
     this.contenedor.nativeElement.appendChild(elemento);
     this.estado.set('Cargado desde ' + remote + ' con Native Federation.');
   } catch (error) {
     if (version !== this.version) return;
     console.error(error);
     this.estado.set('No se pudo cargar ' + remote + '. Revisa su servidor y recarga.');
   }
 }
 private limpiar() {
   this.elemento?.removeEventListener('aula-cambio', this.recibir);
   this.elemento?.remove(); // Dispara disconnectedCallback del Web Component.
   this.elemento = undefined;
 }
 ngOnDestroy() {
   ++this.version; // Ignora descargas pendientes si el usuario ya salió.
   this.subscription?.unsubscribe();
   this.limpiar();
 }
}
