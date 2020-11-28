import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(){
    // this.displayInfo();
  }

  // displayInfo() {
  //   const emailUser = document.querySelector('.email_user')
  //   const nomeUser = document.querySelector('.nome_user')
  
  //   this.afAuth.onAuthStateChanged(user => {
  //     if (user) {
  //       const htmlName = `<h2> ${ user.displayName } </h2>`
  //       const htmlEmail = `<h2> ${ user.email } </h2>`

  //       nomeUser.innerHTML = htmlName
  //       emailUser.innerHTML = htmlEmail
  //     } else {
  //       nomeUser.innerHTML = ''
  //       emailUser.innerHTML = ''
  //     }
  //   })
  // }

  async logout() {
    try {
      await this.afAuth.signOut();

      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);
      
    }
  }

}
