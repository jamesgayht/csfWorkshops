import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Comment, PostResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  postComment(id: number, comment: string): Promise<PostResponse> {

    const body = {
      id: id,
      comment: comment
    }

    return firstValueFrom(
      this.httpClient.post<PostResponse>('/api/post', body)
    )
  }

  getComments(id: number): Promise<Comment[]> {

    const params = new HttpParams()
      .set('id', id)

    return lastValueFrom(
      this.httpClient.get<Comment[]>('/api/comments', {params: params})
    )
  }

}
