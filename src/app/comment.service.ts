import { Injectable } from '@angular/core';
import { CommentDto } from './domain/comment-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  addComment(postId: number, comment: CommentDto): Observable<CommentDto> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.post<CommentDto>(url, comment);
  }

}
