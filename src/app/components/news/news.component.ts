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
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  newContent: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }


  getNews(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.newsList = news;
    });
  }

  // Dodaj nowy news
  addNews(): void {
    if (this.newContent.trim()) {
      this.newsService.addNews(this.newContent).subscribe((newNews: News) => {
        this.getNews();
        this.newContent = '';
      });
    }
  }


  moveUp(news: News): void {
    const index = this.newsList.indexOf(news);
    if (index > 0) {
      // Zamień miejscami dwa elementy w tablicy
      [this.newsList[index - 1], this.newsList[index]] = [this.newsList[index], this.newsList[index - 1]];
      
      // Aktualizuj pozycje w bazie danych
      this.newsService.updateNewsPosition(news._id, index - 1).subscribe(() => {
        // Opcjonalnie, możesz ponownie załadować newsy, aby upewnić się, że wszystkie dane są aktualne
        this.getNews();
      });
    }
  }

  moveDown(news: News): void {
    const index = this.newsList.indexOf(news);
    if (index < this.newsList.length - 1) {
      // Zamień miejscami dwa elementy w tablicy
      [this.newsList[index + 1], this.newsList[index]] = [this.newsList[index], this.newsList[index + 1]];
      
      // Aktualizuj pozycje w bazie danych
      this.newsService.updateNewsPosition(news._id, index + 1).subscribe(() => {
        // Opcjonalnie, możesz ponownie załadować newsy, aby upewnić się, że wszystkie dane są aktualne
        this.getNews();
      });
    }
  }
}
