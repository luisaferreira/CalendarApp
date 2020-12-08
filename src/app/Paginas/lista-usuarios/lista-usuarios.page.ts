import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators'
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  
  public listaUsuarios: any;
  public pesquisa: string = '';
  public usuario: Usuario = {};

  constructor(
    private afs: AngularFirestore
  ) { }

  async ngOnInit() {
    this.listaUsuarios = await this.initializaItems();
  }

  async initializaItems(): Promise<any> {
    const listaUsuarios = await this.afs.collection('Usuários').valueChanges().pipe(first()).toPromise();
    return listaUsuarios;
  }

  async filterList(evt) {
    this.listaUsuarios = await this.initializaItems();
    this.pesquisa = evt.srcElement.value;

    if (!this.pesquisa) {
      return;
    }

    this.listaUsuarios = this.listaUsuarios.filter(currentUser => {
      if (currentUser.username && this.pesquisa) {
        return (currentUser.username.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1);
      }
    })
  }

}
