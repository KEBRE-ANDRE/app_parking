import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton, IonButtons, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class HomePage implements OnInit 
{

  constructor( private navCtrl: NavController, private alertCtrl : AlertController, private loadingCtrl : LoadingController,

               private router: Router,
               private authService: AuthService 
               ) { }

        async logout() {
          await this.authService.logout();
          this.router.navigateByUrl('/auth');
          }
        
        abonnement(){
              this.navCtrl.navigateForward("/abonnement");
          }

        ticket(){
              this.navCtrl.navigateForward("/ticket");
          }

          historique(){
              this.navCtrl.navigateForward("/historique");
        } 

          localisation(){
              this.navCtrl.navigateForward("/localisation");
          }

          inscription(){
             this.navCtrl.navigateForward("/inscription");
           }

         ngOnInit() { }

}

