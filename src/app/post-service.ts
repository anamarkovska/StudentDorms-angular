import { Injectable } from '@angular/core';
import { PostCreationDto } from './domain/post-creation-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './domain/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  createPost(post: PostCreationDto, categoryId: number): Observable<PostCreationDto> {
    return this.http.post<PostCreationDto>(`${this.apiUrl}/${categoryId}`,post);
  }

  getPostsByCategory(categoryId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  addComment(postId: number, comment: Comment): Observable<Comment> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.post<Comment>(url, comment);
  }
}
