import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  Evento = {
    titulo: '',
    descricao: '',
    comeco: '',
    fim: ''
  }
  allEvents = [];
  minDate = new Date().toISOString();
  currentDate = new Date();
  currentMonth: string;
  @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;
  showAddEvent: boolean;

  constructor(
    private afs: AngularFirestore
  ) {}

  ngOnInit() {}

  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.Evento = {
    titulo: '',
    descricao: '',
    comeco: new Date().toISOString(),
    fim: new Date().toISOString()
  };
}

addEvento() {
  this.allEvents.push({
    title: this.Evento.titulo,
    startTime:  new Date(this.Evento.comeco),
    endTime: new Date(this.Evento.fim),
    description: this.Evento.descricao
    });
    this.afs.collection('Eventos').add({
      titulo: this.Evento.titulo,
      comeco: this.Evento.comeco,
      fim: this.Evento.fim,
      descricao: this.Evento.descricao
    })
  this.showHideForm();
}
  
}
