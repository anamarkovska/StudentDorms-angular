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

  createLike(postId: number) {
    return this.http.post(`${this.apiUrl}/${postId}/like`, {});
  }

  getNumberOfLikes(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${postId}/likes`);
  }

  getUsernamesFromPostLikes(postId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${postId}/likes/usernames`);
  }

  deleteLike(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}/likes/delete`);
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.apiUrl}/${postId}/delete`);
  }
  hasLikedPost(postId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${postId}/hasLiked`);
  }
  updatePost(id: number, title: string, content: string): Observable<Post> {
    const url = `${this.apiUrl}/update?id=${id}&title=${title}&content=${content}`;
    return this.http.put<Post>(url, {});
  }

}
