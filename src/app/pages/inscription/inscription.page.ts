import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';  // 👈 IMPORT IMPORTANT

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
})
export class InscriptionPage {
  formEtudiant!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private parkingService: ParkingService  // 👈 INJECTER LE SERVICE
  ) {
    this.formEtudiant = this.fb.group({
      nom: ['', Validators.required],
      matricule: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      email: [''],
      plaque: ['', Validators.required],
      typeAbonnement: ['', Validators.required],
    });
  }

abonnement(){
              this.navCtrl.navigateForward("/abonnement");
          }

  async enregistrerEtudiant() {
    if (this.formEtudiant.valid) {
      const data = {
        ...this.formEtudiant.value,
        dateInscription: new Date()          // 👈 On ajoute la date
      };

      this.parkingService.enregistrerEtudiant(data);  // 👈 ENREGISTREMENT ICI

      const alert = await this.alertCtrl.create({
        header: 'Succès',
        message: `Étudiant ${data.nom} inscrit avec succès !`,
        buttons: ['OK'],
      });

      await alert.present();
      this.formEtudiant.reset();
    }
  }
}
