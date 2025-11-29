<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Localisation du véhicule</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding" [fullscreen]="true">

  <!-- Bouton pour obtenir la localisation GPS -->
  <ion-button expand="block" color="primary" (click)="getLocation()">
    📍 Obtenir la localisation
  </ion-button>

  <!-- Bouton pour revenir à l'accueil -->
  <ion-button expand="block" color="secondary" (click)="goBack()">
    Retour à l'accueil
  </ion-button>

  <!-- Affichage des coordonnées si disponibles -->
  <div *ngIf="latitude !== null && longitude !== null" class="ion-margin-top">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Coordonnées GPS</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>Latitude : {{ latitude }}</p>
        <p>Longitude : {{ longitude }}</p>
      </ion-card-content>
    </ion-card>

    <ion-button color="success" expand="block" (click)="sendLocationWhatsApp()">
      Envoyer la position via WhatsApp
    </ion-button>
  </div>

  <!-- Recherche par plaque -->
  <ion-item class="ion-margin-top">
    <ion-label position="floating">Numéro de plaque</ion-label>
    <ion-input [(ngModel)]="plaque"></ion-input>
  </ion-item>

  <ion-button expand="full" class="ion-margin-top" color="tertiary" (click)="rechercher()">
    Rechercher
  </ion-button>

  <!-- Carte Leaflet -->
  <div id="map" style="height: 300px; margin-top: 15px;"></div>

</ion-content>
