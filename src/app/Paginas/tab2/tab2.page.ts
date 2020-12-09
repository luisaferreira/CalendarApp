import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Evento } from 'src/app/interfaces/evento';
import {EventoService} from 'src/app/Services/evento.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  private evento: Evento = {};
  private eventoId: string = null;
  private eventoSubs: Subscription;
  minDate = new Date().toISOString();
  currentDate = new Date();
  currentMonth: string;
  @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;
  showAddEvent: boolean;
  private usuarioId: string;

  constructor(
    private afauth: AngularFireAuth,
    private eventoService: EventoService,
    private activeRoute: ActivatedRoute
  ) {
    this.eventoId = this.activeRoute.snapshot.params['id'];
  
    if (this.eventoId) this.loadEvento();
    console.log(this.eventoId);
    
  }

  ngOnInit() {}

  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.evento = {
    titulo: '',
    descricao: '',
    comeco: new Date().toISOString(),
    fim: new Date().toISOString()
  };
}

async addEvento() {
   this.evento.titulo = this.evento.titulo;
   this.evento.descricao = this.evento.descricao;
   this.evento.comeco = this.evento.comeco;
   this.evento.fim = this.evento.fim;
   this.evento.usersAdd = [];
   this.evento.numAdd = 0;
   this.evento.usuarioId = (await this.afauth.currentUser).uid
   this.evento.usuarioNome = (await this.afauth.currentUser).displayName
   this.evento.comentarios = [];
   try{
     await this.eventoService.addEvento(this.evento);
   } catch (error) {
     console.log(error);
   } finally{
    this.showHideForm();
    
   }
}
  loadEvento() {
    this.eventoSubs = this.eventoService.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    });
  }  
}
