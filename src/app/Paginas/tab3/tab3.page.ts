import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides

  private evento: Evento = {};
  private eventoId: string = null;
  private eventos = new Array <Evento>();
  private eventoSubs: Subscription;
  private usuarios = new Array<Usuario>();
  private usuario: Usuario = {}; 
  private usuarioId: string;

  constructor(
    private afauth: AngularFireAuth,
    private activeRoute: ActivatedRoute,
    private eventoService: EventoService
  ) {
    this.subs();

    this.eventoId = this.activeRoute.snapshot.params['id'];
    if (this.eventoId) this.loadEvento();
   }

  async ngOnInit() {
    this.displayInfo();
  }

  async subs() {
   this.afauth.onAuthStateChanged(user => {
     if (user) {
       this.usuarioId = user.uid
       this.eventoSubs = this.eventoService.getEventos().subscribe(data => {
       this.eventos = data.filter(eve => eve.usuarioId === this.usuarioId).sort((a,b) => a.comeco > b.comeco ? -1 : 1);
     });
     }
   })
    
    
     
  }

  loadEvento() {
    this.eventoSubs = this.eventoService.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    })
  }

  displayInfo() {
    const nomeUser = document.querySelector('.nome_user')

    this.afauth.onAuthStateChanged(user => {
      if (user) {
        const htmlName = `<h1> @${user.displayName} </h1>`
        nomeUser.innerHTML = htmlName
      } else {
        nomeUser.innerHTML = ''
      }
    })
  }

  async deleteEvento(id: string) {
    try {
      await this.eventoService.deleteEvento(id);
    } catch (error) {
      console.log(error);
    }
  }

}
