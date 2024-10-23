import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss'],
})
export class AdminNewsComponent implements OnInit { // Zmień nazwę klasy tutaj
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
      console.log('Current News List:', this.newsList);
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

  startEditing(news: News): void {
    this.editingNewsId = news._id; // Upewnij się, że tu jest _id lub id
    this.editedContent = news.content; // Ustawia treść newsa do edycji
  }

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
        console.error('Error moving news down:', error);
      }
    );
  }

  deleteNews(newsId: string): void {
    const confirmed = window.confirm('Are you sure you want to delete this news?');
    if (confirmed) {
      this.newsService.deleteNews(newsId).subscribe(
        () => {
          console.log('News deleted successfully');
          this.getNews();
        },
        (error) => {
          console.error('Error deleting news:', error);
          alert('Failed to delete news.');
        }
      );
    }
  }
}
