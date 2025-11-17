import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule // ← Ajout indispensable pour utiliser les composants Ionic
  ],
})
export class InscriptionPage {
  formEtudiant!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController
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

  async enregistrerEtudiant() {
    if (this.formEtudiant.valid) {
      const data = this.formEtudiant.value;

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
