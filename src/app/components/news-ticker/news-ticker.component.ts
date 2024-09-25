
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Marquee, loop, LoopReturn } from 'dynamic-marquee';

@Component({
  selector: 'app-news-ticker',
  standalone: true,
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss'],
})
export class NewsTickerComponent implements AfterViewInit {
  @ViewChild('marquee') marqueeElement!: ElementRef<HTMLElement>;
  marqueeInstance?: Marquee;
  loopInstance?: LoopReturn;

  ngAfterViewInit(): void {
    const $marquee = this.marqueeElement.nativeElement;

    // Inicjalizacja dynamic-marquee
    this.marqueeInstance = new Marquee($marquee, {
      rate: -80,
    });

    // Konfiguracja loopowania treści
    this.loopInstance = loop(
      this.marqueeInstance,
      [
        () => 'Contmtext',
        () =>
          'It has ryears old',
        // () =>
        //   'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source',
        // () =>
        //   'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC',
      ],
      () => {
        const $separator = document.createElement('img');
        $separator.src = '/assets/images/cfb.svg';

        $separator.style.height = '4rem';
        $separator.style.padding = '0 3rem';

        return $separator;
      }
    );
  }
}


