import { Component, OnInit } from '@angular/core';
import { ModalController } from'@ionic/angular';
import { Comentario } from 'src/app/interfaces/comentario';
import { AngularFireAuth } from '@angular/fire/auth';
import { EventoService } from 'src/app/Services/evento.service';
import { Subscription } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {

  private comentario: Comentario = {};
  private comentarios
  private eventoId: string = null;
  private eventoSubs: Subscription;
  private evento: Evento = {};


  constructor(
    private modalCtrl: ModalController,
    private eventoService: EventoService,
    private afauth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.inicializar(params['id']);
    })
  }

  inicializar(id: string) {
    this.eventoId = id;
    if (this.eventoId) this.loadEvento();
  }

  loadEvento() {
    this.eventoSubs = this.eventoService.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }



   
}
