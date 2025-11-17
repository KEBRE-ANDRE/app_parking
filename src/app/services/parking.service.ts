import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  async saveData(key: string, data: any) {
    await Preferences.set({ key, value: JSON.stringify(data) });
  }

  async getData(key: string) {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }
}
