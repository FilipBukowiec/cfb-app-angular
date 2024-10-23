import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news'; 

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  addNews(content: string): Observable<News> {
    return this.http.post<News>(this.apiUrl, { content });
  }

  moveNewsUp(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/move-up/${id}`, {});
  }

  moveNewsDown(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/move-down/${id}`, {});
  }

  deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editNews(id: string, content: string): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/edit/${id}`, { content });
  }
  
}