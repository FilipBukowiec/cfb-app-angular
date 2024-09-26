import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news'; // Zmień na swój URL backendu

  constructor(private http: HttpClient) {}

  // Pobierz wszystkie newsy
  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  // Dodaj nowy news
  addNews(content: string): Observable<News> {
    return this.http.post<News>(this.apiUrl, { content });
  }

  // Zaktualizuj istniejący news
  updateNews(id: string, content: string): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}`, { content });
  }

  // Usuń news
  deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Zaktualizuj pozycję newsa
  updateNewsPosition(id: string, newPosition: number): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/position/${id}`, { position: newPosition });
  }
}

