import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
  standalone: true,
  imports: [ IonContent, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon]
})
export class HistoriquePage implements OnInit {

  constructor(private navCtrl: NavController, private alertCtrl : AlertController, private loadingCtrl : LoadingController ) { }
  home(){
    this.navCtrl.navigateForward("/home");
  }
  ngOnInit() {
  }

}
