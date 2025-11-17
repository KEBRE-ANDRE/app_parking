import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.page.html',
  styleUrls: ['./localisation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
})
export class LocalisationPage {
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(private alertCtrl: AlertController) {}

  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    } catch (error) {
      this.showAlert('Erreur', 'Impossible d’obtenir la localisation. Vérifie les permissions GPS.');
    }
  }

  async sendLocationWhatsApp() {
    if (this.latitude && this.longitude) {
      const message = `Voici la position de votre véhicule 🚗 : https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      const numero = '22654097645'; // Numéro du parqueur
      const whatsappUrl = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
      await Browser.open({ url: whatsappUrl });
    } else {
      this.showAlert('Attention', 'Veuillez d’abord obtenir la localisation avant d’envoyer.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
