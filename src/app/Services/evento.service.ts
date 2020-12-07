import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Evento } from '../interfaces/evento';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

private eventosCollection: AngularFirestoreCollection<Evento>;

  constructor(
    private afstore: AngularFirestore
  ) { 
    this.eventosCollection = this.afstore.collection<Evento>('Eventos');
  }

  //listar todos os eventos
  getEventos() {
    return this.eventosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data};
        });
      })
    );
  }

  //adicionar evento
  addEvento(evento: Evento){
    return this.eventosCollection.add(evento);
  }

  //selecionar um evento específico
  getEvento(id: string) {
    return this.eventosCollection.doc<Evento>(id).valueChanges();
  }

  //atualizar evento específico
  updateEvento (id: string, evento: Evento) {
    return this.eventosCollection.doc<Evento>(id).update(evento);
  }

  //deletar evento
  deleteEvento(id: string) {
    return this.eventosCollection.doc(id).delete();
  }
}
