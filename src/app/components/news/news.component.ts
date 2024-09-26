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
  styleUrls: ['./news.component.scss'], // Poprawna nazwa: styleUrls, nie styleUrl
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  newContent: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.newsList = news.sort((a, b) => a.order - b.order);
    });
  }

  addNews(): void {
    if (this.newContent.trim()) {
      this.newsService.addNews(this.newContent).subscribe(() => {
        this.getNews();
        this.newContent = '';
      });
    }
  }

  moveUp(news: News): void {
    const index = this.newsList.indexOf(news);
    if (index > 0) {
      // Zamień miejscami dwa elementy w tablicy
      [this.newsList[index - 1], this.newsList[index]] = [
        this.newsList[index],
        this.newsList[index - 1],
      ];
      // Zaktualizuj kolejność wszystkich newsów
      this.updateAllOrders();
    }
  }

  moveDown(news: News): void {
    const index = this.newsList.indexOf(news);
    if (index < this.newsList.length - 1) {
      // Zamień miejscami dwa elementy w tablicy
      [this.newsList[index], this.newsList[index + 1]] = [
        this.newsList[index + 1],
        this.newsList[index],
      ];
      // Zaktualizuj kolejność wszystkich newsów
      this.updateAllOrders();
    }
  }

  updateAllOrders(): void {
    const updatedNewsList = this.newsList.map((news, index) => ({
      _id: news._id,
      order: index + 1, // Ustal nową wartość order na podstawie kolejności w tabeli
    }));

    // Wyślij do backendu całą listę newsów z nowymi wartościami order
    this.newsService.updateAllNewsOrders(updatedNewsList).subscribe(() => {
      console.log('All orders updated successfully');
      this.getNews(); // Pobierz newsy na nowo
    });
  }


  deleteNews(news: News): void {
    if (confirm('Czy na pewno chcesz usunąć ten news?')) {
      this.newsService.deleteNews(news._id).subscribe(() => {
        console.log('News deleted successfully');
        this.getNews(); // Odśwież listę newsów po usunięciu
      });
    }
  }


}
