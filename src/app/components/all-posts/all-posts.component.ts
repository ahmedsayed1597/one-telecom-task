import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {


  constructor(private _PostService:PostService, private _Router:Router, private _CommmentService:CommentService, private _FirebaseService:FirebaseService) { }

  posts:any
  ngOnInit(): void {
    this.get();
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

  delete(id:number){
    this._PostService.delete(id).subscribe({
      next: (response) => {
        console.log(response)
          this.posts.splice(id,1)
       //this.get();
      }
      ,
      error: (err) => { console.log(err); }
    });
  }

  routeToCommentView(){
    this._Router.navigateByUrl('/panel/comments/all');
  }

  routeToCommentControl(){
    this._Router.navigateByUrl('/panel/comments/control');
  }

  setPostID(postID:number){
    this._CommmentService.setPostID(postID)
  }

  routeToPostControl(){
    this._Router.navigateByUrl('/panel/posts/control');
  }

  logOut(){
    this._FirebaseService.logOut();
    this._Router.navigate(['Login'])
  }
}
