import { Component, AfterViewInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.page.html',
  styleUrls: ['./localisation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,       // ✅ Le module Ionic est le seul à importer
    HttpClientModule
  ],
})
export class LocalisationPage implements AfterViewInit {
  plaque: string = "";
  latitude: number | null = null;
  longitude: number | null = null;
  map!: L.Map;
  currentMarker: L.Marker | null = null;

  constructor(private alertCtrl: AlertController, private http: HttpClient, private navCtrl: NavController) {}

  goBack() {
  this.navCtrl.back(); 
}


  goToLocalisation() {
    this.navCtrl.navigateForward('/localisation');
  }

  ngAfterViewInit() {
    this.map = L.map('map').setView([5.3494, -4.0017], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);
  }

  async getLocation() {
    try {
      const permission: PermissionStatus = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        this.showAlert('Erreur', 'Permission GPS refusée.');
        return;
      }

      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      if (this.map) this.map.setView([this.latitude, this.longitude], 16);

      if (this.currentMarker && this.map) this.map.removeLayer(this.currentMarker);

      if (this.map) {
        this.currentMarker = L.marker([this.latitude, this.longitude])
          .addTo(this.map)
          .bindPopup("Position actuelle du véhicule")
          .openPopup();
      }

    } catch (error) {
      console.error(error);
      this.showAlert('Erreur', 'Impossible d’obtenir la localisation.');
    }
  }

  async sendLocationWhatsApp() {
    if (this.latitude !== null && this.longitude !== null) {
      const message = `Voici la position de votre véhicule 🚗 : https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      const numero = '22654097645';
      const whatsappUrl = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
      await Browser.open({ url: whatsappUrl });
    } else {
      this.showAlert('Attention', 'Veuillez d’abord obtenir la localisation.');
    }
  }

  rechercher() {
    if (!this.plaque) {
      this.showAlert('Attention', 'Veuillez saisir le numéro de plaque.');
      return;
    }

    this.http.get(`https://ton-api.com/localisation/${this.plaque}`)
      .subscribe((data: any) => {
        if (data && data.latitude && data.longitude) {
          const lat = data.latitude;
          const lon = data.longitude;

          if (this.map) {
            this.map.setView([lat, lon], 16);

            if (this.currentMarker) this.map.removeLayer(this.currentMarker);

            this.currentMarker = L.marker([lat, lon])
              .addTo(this.map)
              .bindPopup(`Position du véhicule (${this.plaque})`)
              .openPopup();
          }

        } else {
          this.showAlert('Erreur', 'Coordonnées introuvables pour cette plaque.');
        }
      }, error => {
        this.showAlert('Erreur', 'Impossible de récupérer les données depuis l’API.');
      });
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
