import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { Subscription } from 'rxjs';
import { EventoService} from 'src/app/Services/evento.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  private eventos = new Array<Evento>();
  private eventosSubscription: Subscription;

  constructor(
    private eventoService: EventoService
  ) {
    this.eventosSubscription = this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
    })
  }
  ngOnInit() {}

  ngOnDestroy(){
    this.eventosSubscription.unsubscribe();
  }

}
