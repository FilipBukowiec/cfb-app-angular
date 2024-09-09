import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Marquee, loop } from 'dynamic-marquee';

@Component({
  selector: 'app-news-ticker',
  standalone: true,
  imports: [],
  templateUrl: './news-ticker.component.html',
  styleUrl: './news-ticker.component.scss'
})
export class NewsTickerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('marquee') marqueeElement!: ElementRef; // Referencja do elementu marquee
  private marqueeInstance: any;
  private marqueeControl: any; // Kontrola looper'a

  constructor() { }

  ngOnInit(): void { }

  // Uruchamiamy Marquee po załadowaniu widoku
  ngAfterViewInit(): void {
    this.initMarquee();
  }

  initMarquee(): void {
    // Inicjalizujemy Marquee
    const marquee = new Marquee(this.marqueeElement.nativeElement, {
      rate: -80, // Prędkość przewijania (wartość ujemna do przewijania z prawej do lewej)
      upDown: false, // Przewijanie poziome (z prawej do lewej)
      startOnScreen: true // Tekst zaczyna na ekranie
    });

    // Przechowujemy instancję marquee
    this.marqueeInstance = marquee;

    // Używamy looper'a do zapewnienia cyklicznego przewijania
    this.marqueeControl = loop(marquee, [
      () => {
        const $item = document.createElement('div');
        $item.textContent = 'Przewijany tekst w pętli';
        return $item;
      }
    ]);
  }

  // Zatrzymanie marquee i looper'a przy niszczeniu komponentu
  ngOnDestroy(): void {
    if (this.marqueeInstance) {
      this.marqueeInstance.clear(); // Oczyszczenie marquee
    }
    if (this.marqueeControl) {
      this.marqueeControl.update([]); // Opcjonalnie: Zaktualizuj looper, aby usunąć elementy
    }
  }
}

