import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonListHeader,
 } from '@ionic/angular/standalone';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton,
    IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonListHeader,
  IonButton
  ]
})
export class TicketPage {

  ticket = {
    nom: '',
    plaque: '',
    date: ''
  };

  tickets: any[] = [];
  filteredTickets: any[] = [];
  searchPlate = '';

  constructor() {
    let data = localStorage.getItem('tickets');
    if (data) {
      this.tickets = JSON.parse(data);
    }
  }

  saveTicket() {
    if (!this.ticket.nom || !this.ticket.plaque) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.ticket.date = new Date().toLocaleString();

    this.tickets.push({ ...this.ticket });

    localStorage.setItem('tickets', JSON.stringify(this.tickets));

    alert('Ticket enregistré avec succès !');

    this.ticket = { nom: '', plaque: '', date: '' };
  }

  searchTicket() {
    const plate = this.searchPlate.toLowerCase();
    this.filteredTickets = this.tickets.filter(t =>
      t.plaque.toLowerCase().includes(plate)
    );
  }

  generatePDF(t: any) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('TICKET DE PARKING-ESTA', 60, 20);

    doc.setFontSize(12);
    doc.text(`Nom : ${t.nom}`, 20, 40);
    doc.text(`Plaque : ${t.plaque}`, 20, 50);
    doc.text(`Date : ${t.date}`, 20, 60);
    doc.text(`Tarif : 100 F CFA`, 20, 70);

    doc.save(`ticket_${t.plaque}.pdf`);
  }
}