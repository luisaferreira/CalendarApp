import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';
@Component({
  selector: 'app-detalhesevento',
  templateUrl: './detalhesevento.page.html',
  styleUrls: ['./detalhesevento.page.scss'],
})
export class DetalheseventoPage implements OnInit {

  private evento: Evento = {};
  private eventoId: string = null;
  private eventoSubs: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.inicializar(params['id']);
    })
  }

  ngOnDestroy() {
    if (this.eventoSubs) this.eventoSubs.unsubscribe();
  }

  inicializar(id: string) {
    this.eventoId = id;

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
}
