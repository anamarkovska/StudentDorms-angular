import { Injectable } from '@angular/core';
import { PostCreationDto } from './domain/post-creation-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  createPost(post: PostCreationDto, categoryId: number): Observable<PostCreationDto> {
    return this.http.post<PostCreationDto>(`${this.apiUrl}/${categoryId}`,post);
  }
}
