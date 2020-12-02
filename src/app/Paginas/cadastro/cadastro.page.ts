import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;
  private ArrayUser = [];

  constructor(
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private afStore: AngularFirestore
  ) { }

  ngOnInit() {
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
      const novoUsrObj = Object.assign({}, this.usuario);
      delete novoUsrObj.senha;
      delete novoUsrObj.confSenha;
      await this.afStore.collection('Usuários').doc(novoUsr.user.uid).set(novoUsrObj);
      console.log(novoUsrObj);
      console.log(this.usuario);
      console.log(novoUsr);
      
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          user.updateProfile({
            displayName: this.usuario.username
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
