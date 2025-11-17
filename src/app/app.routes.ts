import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'localisation',
    loadComponent: () => import('./pages/localisation/localisation.page').then(m => m.LocalisationPage)
  },
  {
    path: 'abonnement',
    loadComponent: () => import('./pages/abonnement/abonnement.page').then(m => m.AbonnementPage)
  },
  {
    path: 'ticket',
    loadComponent: () => import('./pages/ticket/ticket.page').then(m => m.TicketPage)
  },
  {
    path: 'historique',
    loadComponent: () => import('./pages/historique/historique.page').then(m => m.HistoriquePage)
  },
  /*{
    path: 'inscription',
    loadComponent: () => import('./inscription/inscription.page').then( m => m.InscriptionPage)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./pages/inscription/inscription.page').then( m => m.InscriptionPage)
  },*/
  {
    path: 'inscription',
    loadComponent: () => import('./pages/inscription/inscription.page').then( m => m.InscriptionPage)
  },
  {
    path: 'presentation',
    loadComponent: () => import('./pages/presentation/presentation.page').then( m => m.PresentationPage)
  },
  /*{
    path: 'authentification',
    loadComponent: () => import('./pages/pages/authentification/authentification.page').then( m => m.AuthentificationPage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  },*/
  
];
