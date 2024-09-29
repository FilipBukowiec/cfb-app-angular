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
  editedContent: string = '';
  editingNewsId: string | null = null;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getAllNews().subscribe((news: News[]) => {
      this.newsList = news;
      console.log('Current News List:', this.newsList); // Logowanie tablicy newsów
    });
  }

  addNews(): void {
    if (this.newContent.trim()) {
      this.newsService.addNews(this.newContent).subscribe(
        () => {
          this.getNews(); // Odśwież listę newsów po dodaniu nowego newsa
          this.newContent = ''; // Wyczyść pole tekstowe
        },
        (error) => {
          console.error('Error adding news:', error);
        }
      );
    } else {
      console.error('New content is empty');
    }
  }

  // Metoda do rozpoczęcia edycji newsa
  startEditing(news: News): void {
    this.editingNewsId = news._id;
    this.editedContent = news.content; // Ustawia treść newsa do edycji
  }

  // Metoda do zapisywania zmian
  saveChanges(): void {
    if (this.editingNewsId && this.editedContent.trim()) {
      this.newsService
        .editNews(this.editingNewsId, this.editedContent)
        .subscribe(
          () => {
            this.getNews();
            this.editingNewsId = null; // Resetuje ID edytowanego newsa
            this.editedContent = ''; // Resetuje edytowaną treść
          },
          (error) => {
            console.error('Error editing news:', error);
          }
        );
    }
  }

  moveUp(newsId: string): void {
    this.newsService.moveNewsUp(newsId).subscribe(
      () => {
        console.log('News moved up successfully');
        this.getNews();
      },
      (error) => {
        console.error('Error moving news up:', error);
      }
    );
  }

  moveDown(newsId: string): void {
    this.newsService.moveNewsDown(newsId).subscribe(
      () => {
        console.log('News moved down successfully');
        this.getNews();
      },
      (error) => {
        console.error('Error moving news up:', error);
      }
    );
  }

  deleteNews(newsId: string): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this news?'
    );
    if (confirmed) {
      this.newsService.deleteNews(newsId).subscribe(
        () => {
          // Po pomyślnym usunięciu, odśwież listę newsów
          console.log('News deleted successfully');
          this.getNews();
        },
        (error) => {
          console.error('Error deleting news:', error);
          alert('Failed to delete news.'); // Możesz dodać komunikat o błędzie
        }
      );
    }
  }
}
