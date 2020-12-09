import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';
import { ModalController } from '@ionic/angular';
import { Comentario } from 'src/app/interfaces/comentario'
import { ComentarioService } from 'src/app/Services/comentario.service';

@Component({
  selector: 'app-detalhesevento',
  templateUrl: './detalhesevento.page.html',
  styleUrls: ['./detalhesevento.page.scss'],
})
export class DetalheseventoPage implements OnInit {

  private evento: Evento = {};
  private eventoId: string = null;
  private eventoSubs: Subscription;
  private comentario: Comentario = {};

  constructor(
    private afAuth: AngularFireAuth,
    private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private comentarioService: ComentarioService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.inicializar(params['id']);      
    })
    console.log(this.eventoId);
  }

  ngOnDestroy() {
    if (this.eventoSubs) this.eventoSubs.unsubscribe();
  }

  inicializar(id: string) {
    this.eventoId = id;
  console.log(id);

    if(this.eventoId) this.loadEvento();
  }

  loadEvento() {
    this.eventoSubs = this.eventoService.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    });
  }

  async add() {
    const userVerif = (await this.afAuth.currentUser).uid

    try {
      if (this.evento.usersAdd.includes(userVerif) === false){
        this.evento.numAdd ++;
        this.evento.usersAdd.push(userVerif);
        await this.eventoService.updateEvento(this.eventoId, this.evento)
      } else if (this.evento.usersAdd.includes(userVerif) === true){
        this.evento.numAdd --;
        
        const index = this.evento.usersAdd.indexOf(userVerif);
        this.evento.usersAdd.splice(index, 1);

        await this.eventoService.updateEvento(this.eventoId, this.evento);
      }
    } catch(error) {
      console.log(error);
      
    }

    }

   

    async coment() {
      try{
        this.comentario.createdAt = new Date().getTime();
        this.comentario.username = (await this.afAuth.currentUser).displayName
        this.comentario.idPost = this.eventoId;
        
        await this.comentarioService.addComentario(this.comentario)
      } catch(error) {
        console.log(error);
      }
    }
}
