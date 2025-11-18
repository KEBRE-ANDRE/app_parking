import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Etudiant {
  nom: string;
  matricule: string;
  telephone: string;
  email: string;
  plaque: string;
  typeAbonnement: 'mensuel' | 'journalier';
  dateInscription: string; // format string
}

@Injectable({ providedIn: 'root' })
export class ParkingService {

  private KEY_ETUDIANTS = 'etudiants';
  private KEY_ABONNEMENTS = 'abonnements';

  constructor() {}

  // ============================
  // 📌 Sauver un étudiant
  // ============================
  async enregistrerEtudiant(etudiant: Etudiant) {
    const liste = await this.getEtudiants();
    liste.push(etudiant);
    await this.saveData(this.KEY_ETUDIANTS, liste);
  }

  // ============================
  // 📌 Obtenir la liste des étudiants
  // ============================
  async getEtudiants(): Promise<Etudiant[]> {
    const { value } = await Preferences.get({ key: this.KEY_ETUDIANTS });
    return value ? JSON.parse(value) : [];
  }

  // ============================
  // 📌 Chercher un étudiant par matricule
  // ============================
  async getEtudiantParMatricule(matricule: string) {
    const liste = await this.getEtudiants();
    return liste.find(e => e.matricule === matricule);
  }

  // ============================
  // 📌 Mise à jour d’un étudiant
  // ============================
  async mettreAJourEtudiant(matricule: string, nouvelleData: Partial<Etudiant>) {
    const liste = await this.getEtudiants();
    const idx = liste.findIndex(e => e.matricule === matricule);

    if (idx !== -1) {
      liste[idx] = { ...liste[idx], ...nouvelleData };
      await this.saveData(this.KEY_ETUDIANTS, liste);
    }
  }

  // ============================
  // 📌 Gestion des abonnements (NOUVEAU)
  // ============================

  async getAbonnements(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.KEY_ABONNEMENTS });
    return value ? JSON.parse(value) : [];
  }

  async saveAbonnement(abonnement: any) {
    const liste = await this.getAbonnements();
    liste.push(abonnement);
    await this.saveData(this.KEY_ABONNEMENTS, liste);
  }

  // ============================
  // 📌 Méthodes génériques
  // ============================
  async saveData(key: string, data: any) {
    await Preferences.set({ key, value: JSON.stringify(data) });
  }

  async getData(key: string) {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }
}
