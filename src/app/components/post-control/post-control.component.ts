import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-control',
  templateUrl: './post-control.component.html',
  styleUrls: ['./post-control.component.css']
})
export class PostControlComponent implements OnInit {

  posts:any
  postForm:FormGroup;
  postUpdateForm:FormGroup;
  postID:number
  constructor(private _PostService:PostService, private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.get()
    this.postForm = this._FormBuilder.group({
     title: new FormControl(""),
      body: new FormControl(""),
    })

    this.postUpdateForm = this._FormBuilder.group({
      title: new FormControl(""),
      body: new FormControl(""),
    })
  }

  get(){
    this._PostService.get().subscribe({
      next: (response) => {
        this.posts = response
       
      }
      ,
      error: (err) => { console.log(err); }
    });
  }


  post(){
    this._PostService.post(JSON.stringify(this.postForm.value)).subscribe({
      next: (response) => {
        console.log(response)
        let newPost=new Post();
        newPost.userId = 10;
        newPost.id = response.id;
        newPost.title = this.postForm.value['title']
        newPost.body = this.postForm.value['body']
        this.posts.push(newPost)

      }
      ,
      error: (err) => { console.log(err); }
    });
  }


  update(id:number){
    this._PostService.put(id,JSON.stringify(this.postUpdateForm.value)).subscribe({
      next: (response) => {
        console.log(response)
        let newPost=new Post();
        newPost.userId = 10;
        newPost.id = response.id;
        newPost.title = this.postUpdateForm.value['title']
        newPost.body = this.postUpdateForm.value['body']

        for(let i=0; i<this.posts.length;i++){
          if(this.posts[i].id == id) {
            this.posts[i].title = this.postUpdateForm.value['title']
            this.posts[i].body = this.postUpdateForm.value['body']
          }
        }
      }
      ,
      error: (err) => { console.log(err); }
    });
  }

  setPostID(id:number){
    this.postID = id
  }

  getPostID(){
    return this.postID
  }
}
