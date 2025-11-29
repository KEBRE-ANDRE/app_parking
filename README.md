<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button (click)="goHome()" color="warning">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title>Historique</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">

  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Historique</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-segment [value]="view" (ionChange)="switchView($any($event.detail.value))">
    <ion-segment-button value="jour">Jour</ion-segment-button>
    <ion-segment-button value="mois">Mois</ion-segment-button>
    <ion-segment-button value="annee">Année</ion-segment-button>
  </ion-segment>

  <div class="chart-container">
    <canvas #chartCanvas></canvas>
  </div>

  <ion-list>
    <ion-item *ngFor="let item of recentList">
      <ion-label>
        {{ formatDateReadable(item.date) }} - {{ item.nom || item.name || item.label }}
      </ion-label>
    </ion-item>
  </ion-list>

</ion-content>
