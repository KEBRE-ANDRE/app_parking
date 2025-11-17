import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonIcon } from '@ionic/angular/standalone';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
//import { IonicModule } from '@ionic/angular';  // ⬅️ important

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.page.html',
  styleUrls: ['./abonnement.page.scss'],
  standalone: true,
  imports: [IonContent,/*IonicModule,*/ IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon]
})
export class AbonnementPage implements OnInit {

  constructor( private navCtrl: NavController, private alertCtrl : AlertController, private loadingCtrl : LoadingController) { }
   home(){
    this.navCtrl.navigateForward("/home");
  }

  ngOnInit() {
  }

}
