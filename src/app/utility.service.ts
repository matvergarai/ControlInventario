// utility.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public applyFadeInEffect() {
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('fade-in');
        }, index * 200); // Retraso escalonado para cada tarjeta
      });
    });
  }
}
