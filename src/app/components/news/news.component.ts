import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.newsList = news;
    });
  }

  deleteNews(newsId: string): void {
    this.newsService.deleteNews(newsId).subscribe(() => {
      // Po usunięciu news, ponownie pobierz listę
      this.getNews();
    });
  }
}
