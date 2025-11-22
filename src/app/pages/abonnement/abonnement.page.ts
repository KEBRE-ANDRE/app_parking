import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { ParkingService, Etudiant } from '../../services/parking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.page.html',
  styleUrls: ['./abonnement.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class AbonnementPage implements OnInit {

  etudiants: Etudiant[] = [];
  selectedEtudiant: Etudiant | null = null;
  dateDebut = '';
  recuPreview: string = ''; // Contiendra le texte du reçu

  constructor(
    private parkingService: ParkingService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.chargerEtudiants();
  }

  // 🔹 Charger les étudiants
  async chargerEtudiants() {
    this.etudiants = await this.parkingService.getEtudiants();
  }

  // 🔹 Calculer la date de fin (30 jours)
  calculerDateFin(date: string): string {
    const d = new Date(date);
    d.setDate(d.getDate() + 30);
    return d.toISOString().substring(0, 10);
  }

  // 🔹 Générer un mini reçu texte
  genererRecu(abonnement: any, etudiant: Etudiant): string {
    return `
Reçu d'abonnement Parking-ESTA
----------------------------
Nom: ${etudiant.nom}
Matricule: ${etudiant.matricule}
Plaque: ${etudiant.plaque}
Date de début: ${abonnement.dateDebut}
Date de fin: ${abonnement.dateFin}
Montant payé: ${abonnement.montant} FCFA
----------------------------
Merci pour votre confiance !
`;
  }

  // 🔹 Générer et afficher le reçu dans la page
  genererEtAfficherRecu() {
    if (!this.selectedEtudiant || !this.dateDebut) return;

    const abonnement = {
      etudiantId: this.selectedEtudiant.matricule,
      nomEtudiant: this.selectedEtudiant.nom,
      dateDebut: this.dateDebut,
      dateFin: this.calculerDateFin(this.dateDebut),
      montant: 1500
    };

    // Générer le texte du reçu
    this.recuPreview = this.genererRecu(abonnement, this.selectedEtudiant);
  }

  // 🔹 Envoyer le reçu via WhatsApp
  envoyerRecuWhatsApp() {
    if (!this.selectedEtudiant || !this.recuPreview) return;

    const numero = this.selectedEtudiant.telephone.replace(/\D/g, '');
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(this.recuPreview)}`;
    window.open(url, '_blank');

    // Réinitialiser après envoi
    this.selectedEtudiant = null;
    this.dateDebut = '';
    this.recuPreview = '';
  }

}
