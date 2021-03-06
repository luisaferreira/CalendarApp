import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { Subscription, Subject } from 'rxjs';
import { EventoService } from 'src/app/Services/evento.service';
import { Observable, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators'
import { Usuario } from 'src/app/interfaces/usuario'; 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  private eventos = new Array<Evento>();
  private eventosSubscription: Subscription;
  private eventoId: string = null;
  
  constructor(
    private eventoService: EventoService,
    private afauth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.eventosSubscription = this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
    })
  }
  
  ngOnInit() {

  }

  ngOnDestroy(){
    this.eventosSubscription.unsubscribe();
  }




  
}
