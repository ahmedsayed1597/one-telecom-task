import { Injectable } from '@angular/core';

import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _GenericService:GenericService) { }

  get(){
    return this._GenericService.get("posts");
  }

  post(body:any){
    return this._GenericService.post("posts",body);
  }

  put(id:number,body:any){
    return this._GenericService.put("posts", id, body);
  }

  delete(id:number){
    return this._GenericService.delete("posts", id);
  }
}
