import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async login(usuario: Usuario) {
    await this.presentLoading();

    try {
      await this.afAuth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha);
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
