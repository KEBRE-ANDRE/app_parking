import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertController,} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';


import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

  
  ],
})
export class AuthPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService, 
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
  const { username, password } = this.loginForm.value;

  const ok = await this.authService.login(username, password);

  if (ok) {
  this.loginForm.reset();

    this.router.navigateByUrl('/home');
  } else {
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      message: 'Identifiants incorrects !',
      buttons: ['OK']
      this.loginForm.reset();
    });

    await alert.present();
  }
}

}
