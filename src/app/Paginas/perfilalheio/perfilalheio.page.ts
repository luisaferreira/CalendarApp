import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfilalheio',
  templateUrl: './perfilalheio.page.html',
  styleUrls: ['./perfilalheio.page.scss'],
})
export class PerfilalheioPage implements OnInit {

  private usuario: Usuario = {};
  private usuarioId: string = null;
  private usuarioSubs: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {
    this.usuarioId = this.activatedRoute.snapshot.params['id'];

    if (this.usuarioId) this.loadUsuario();
   }

  ngOnInit() {
  
  }

  ngOnDestroy() {
  
  }

  loadUsuario() {
    this.usuarioSubs = this.usuarioService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    });
  }

}
