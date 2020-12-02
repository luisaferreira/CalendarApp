import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public evento: Evento = {}
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
    this.evento = {
    titulo: '',
    descricao: '',
    comeco: new Date().toISOString(),
    fim: new Date().toISOString()
  };
}

addEvento() {
    this.afs.collection('Eventos').add({
      titulo: this.evento.titulo,
      comeco: this.evento.comeco,
      fim: this.evento.fim,
      descricao: this.evento.descricao
    })
  this.showHideForm();
}
  
}
