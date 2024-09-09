import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private currentTimeSubject = new BehaviorSubject<string>('');
  currentTime$ = this.currentTimeSubject.asObservable();
  private intervalId: any; // Przechowuje identyfikator interwału, aby móc go później zatrzymać.

  constructor() {
    this.updateTime(); // Wywołuje metodę updateTime, aby natychmiast ustawić początkowy czas.
    this.startClock(); // Wywołuje metodę startClock, aby rozpocząć aktualizowanie czasu co sekundę.
  }

  private startClock(): void {
    this.intervalId = setInterval(() => {
      // Ustawia interwał, który co 1000 ms (1 sekunda) wywołuje funkcję aktualizacji czasu.
      this.updateTime(); // Wywołuje metodę updateTime, aby zaktualizować czas.
    }, 1000); // Czas trwania interwału w milisekundach (1000 ms = 1 sekunda).
  }

  private updateTime(): void {
    const now = new Date(); // Tworzy nowy obiekt Date, który reprezentuje bieżący moment.
    let hours = now.getHours(); // Pobiera godziny z obiektu Date.
    let minutes = now.getMinutes(); // Pobiera minuty z obiektu Date.
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Formatuje minuty, aby zawsze miały dwie cyfry, dodając '0' przed jednocyfrowymi minutami.
    this.currentTimeSubject.next(`${hours}:${formattedMinutes}`); // Aktualizuje BehaviorSubject nowym sformatowanym czasem, który zostanie przekazany do subskrybentów.
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      // Sprawdza, czy identyfikator interwału jest ustawiony.
      clearInterval(this.intervalId); // Zatrzymuje interwał, jeśli istnieje, aby uniknąć niepotrzebnego działania po zniszczeniu serwisu.
    }
  }
}
