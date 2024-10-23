import { Component, Input, OnInit, OnChanges, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

Swiper.use([Autoplay]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() media: string[] = [
    'kenews.jpg',
    'badania.jpg',
    'shakes.mp4',
    'badania.jpg',
    'shakes.mp4',
  ]; // Dynamicznie dodawane media
  private mySwiper!: Swiper;

  ngOnInit(): void {
    // Logika inicjalizacyjna, jeśli potrzebna
  }

  ngOnChanges(): void {
    if (this.mySwiper) {
      this.mySwiper.destroy(); // Zniszczenie istniejącego Swipera przy zmianie danych
    }
    this.initializeSwiper(); // Ponowna inicjalizacja po zmianie danych
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  initializeSwiper(): void {
    const swiperWrapper = document.querySelector('.swiper-wrapper') as HTMLElement;
    if (swiperWrapper) {
      swiperWrapper.innerHTML = ''; // Wyczyść wrapper, aby zaktualizować slajdy

      this.media.forEach((element) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
    
        if (element.endsWith('.mp4')) {
          const videoElement = document.createElement('video');
          videoElement.src = `assets/media/${element}`;
          videoElement.muted = true;
          videoElement.setAttribute('playsinline', '');
          videoElement.setAttribute('preload', 'metadata');
          videoElement.style.width = '100vw';
          videoElement.style.height = '100%';
          videoElement.style.objectFit = 'cover';
          slide.appendChild(videoElement);

          // Nasłuchuj zakończenia wideo i przejdź do następnego slajdu
          videoElement.addEventListener('ended', () => {
            this.mySwiper.slideNext(); // Po zakończeniu wideo przejdź do następnego slajdu
            this.mySwiper.autoplay.start(); // Wznów autoplay Swipera
          });

        } else {
          const imageElement = document.createElement('img');
          imageElement.src = `assets/media/${element}`;
          imageElement.style.width = '100vw';
          imageElement.style.height = '100%';
          imageElement.style.objectFit = 'cover';
          slide.appendChild(imageElement);
        }
    
        swiperWrapper.appendChild(slide); // Dodaj slajd do wrappera
      });

      // Inicjalizacja Swipera
      this.mySwiper = new Swiper('.swiper', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        speed: 800,
        effect: 'fade', // Ustawienie efektu fade
        fadeEffect: {
          crossFade: true, // Umożliwia crossfade między slajdami
        },
        allowTouchMove: false, // Blokada przesuwania ręcznego
        on: {
          slideChangeTransitionStart: () => {
            const currentSlide = this.mySwiper.slides[this.mySwiper.activeIndex];
            const video = currentSlide.querySelector('video') as HTMLVideoElement;

            if (video) {
              // Jeśli jest wideo, zresetuj autoplay i odtwarzanie wideo
              video.currentTime = 0; // Zresetuj wideo do początku
              video.play(); // Odtwórz wideo
              this.mySwiper.autoplay.stop(); // Zatrzymaj autoplay na czas odtwarzania wideo

              // Nasłuchuj zakończenia wideo i przejdź do następnego slajdu
              video.addEventListener('ended', () => {
                this.mySwiper.slideNext(); // Po zakończeniu wideo przejdź do następnego slajdu
                this.mySwiper.autoplay.start(); // Wznów autoplay
              }, { once: true }); // Dodaj nasłuchiwacz, który działa tylko raz
            } else {
              // Jeśli nie ma wideo, uruchom autoplay
              this.mySwiper.autoplay.start();
            }
          },
        },
      });
    }
  }
}
