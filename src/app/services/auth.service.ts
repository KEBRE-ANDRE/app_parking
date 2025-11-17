import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login(username: string, password: string): Promise<boolean> {
    if (username === 'admin' && password === '1234') {
      await Preferences.set({
        key: 'isLoggedIn',
        value: 'true'
      });
      return true;
    }
    return false;
  }

  async logout() {
    await Preferences.remove({ key: 'isLoggedIn' });
  }

  async isLoggedIn(): Promise<boolean> {
    const result = await Preferences.get({ key: 'isLoggedIn' });
    return result.value === 'true';
  }
}
