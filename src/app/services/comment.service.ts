import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})


export class CommentService {

  constructor(private _GenericService:GenericService) { }
  postID:number;

  getALL(){
    return this._GenericService.get(`comments`);
  }
  get(){
    return this._GenericService.get(`posts/${this.postID}/comments`);
  }

  post(body:any){
    return this._GenericService.post(`posts/${this.postID}/comments`,body);
  }

  put(commentID:number, body:any){
    return this._GenericService.put(`comments`, commentID, body);
  }

  delete(commentID:number){
    return this._GenericService.delete(`comments`,commentID);
  }
  
  setPostID(id:number){
    this.postID = id;
  }
}
