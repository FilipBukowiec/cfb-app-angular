import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news'; // Upewnij się, że to jest poprawny adres API

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  addNews(content: string): Observable<News> {
    return this.http.post<News>(this.apiUrl, { content });
  }

  updateAllNewsOrders(updatedOrders: { _id: string; order: number }[]): Observable<any> {
    return this.http.put(this.apiUrl, updatedOrders);
  }

  deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
