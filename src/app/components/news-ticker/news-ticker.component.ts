import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Marquee, loop, LoopReturn } from 'dynamic-marquee';
import { News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

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
  newsList: News[] = [];

  constructor(private newsService: NewsService) {}

  ngAfterViewInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getAllNews().subscribe(
      (news: News[]) => {
        this.newsList = news;
        this.initializeMarquee();
      },
      (error) => {
        console.error('Error fetching news', error);
      }
    );
  }

  initializeMarquee(): void {
    const $marquee = this.marqueeElement.nativeElement;

    // Inicjalizacja dynamic-marquee
    this.marqueeInstance = new Marquee($marquee, {
      rate: -110,
    });

    // Konfiguracja loopowania treści
    this.loopInstance = loop(
      this.marqueeInstance,
      this.newsList.map((news) => () => news.content),
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