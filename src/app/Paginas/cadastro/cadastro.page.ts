import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;

  constructor(
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async cadastrar () {
    await this.presentLoading();

    try {
      await this.afAuth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha);
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          user.updateProfile({
            displayName: this.usuario.nome
          })
        }
        console.log(user);
      })

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
