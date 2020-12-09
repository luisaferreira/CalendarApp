import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = {};
  private usuarioId: string = null;
  private usuarioSubs: Subscription
  private loading: any;
  private ArrayUser = [];

  constructor(
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private afStore: AngularFirestore,
    private usuarioService: UsuarioService,
    private activeRoute: ActivatedRoute
  ) { 
   this.usuarioId = this.activeRoute.snapshot.params['id'];
   if(this.usuarioId) this.loadUsuario();
   console.log(this.usuarioId);
   
  }

  ngOnInit() {
  }

  loadUsuario() {
    this.usuarioSubs = this.usuarioService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    })
  }

  async cadastrar () {
    await this.presentLoading();

    if (this.usuario.senha != this.usuario.confSenha) {
      this.presentToast("the passwords doesn't match")
      return console.error("As senhas não são iguais");
    }

   if (this.ArrayUser.includes(this.usuario.username) == true) {
    this.presentToast("This username is already on use")
    return console.error("Username repetido");
   } else {
     this.ArrayUser.push(this.usuario.username)
   }

    try {
      const novoUsr = await this.afAuth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha);
      this.usuario.email = novoUsr.user.email;
      this.usuario.numEventos = 0;
      this.usuario.seguindo = [];
      this.usuario.numSeguindo = 0;
      
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          user.updateProfile({
            displayName: this.usuario.username
          })
        }
      })
      delete this.usuario.confSenha
      delete this.usuario.senha
      await this.usuarioService.addUsuario(this.usuario)

      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      console.dir(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'loading-css-custom',
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
}
