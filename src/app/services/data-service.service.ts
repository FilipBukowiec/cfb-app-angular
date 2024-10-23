import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  data$ = this.dataSubject.asObservable();

  // Metoda do aktualizacji danych
  updateData(newData: { [key: string]: boolean }): void {
    // Łączenie obecnych danych z nowymi danymi
    const currentData = this.dataSubject.getValue();
    this.dataSubject.next({ ...currentData, ...newData });
  }
}
