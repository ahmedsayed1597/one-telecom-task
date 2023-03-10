import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-control',
  templateUrl: './comment-control.component.html',
  styleUrls: ['./comment-control.component.css']
})
export class CommentControlComponent implements OnInit {

  comments:any
  commentForm:FormGroup;
  commentUpdateForm:FormGroup;
  commentID:number

  constructor(private _CommentService:CommentService, private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.get()
    this.commentForm = this._FormBuilder.group({
     name: new FormControl(""),
      body: new FormControl(""),
    })

    this.commentUpdateForm = this._FormBuilder.group({
      name: new FormControl(""),
      body: new FormControl(""),
    })

  }

  get(){
    this._CommentService.get().subscribe({
      next: (response) => {
        this.comments = response
       
      }
      ,
      error: (err) => { console.log(err); }
    });
  }


  post(){
    this._CommentService.post(JSON.stringify(this.commentForm.value)).subscribe({
      next: (response) => {
        console.log(response)
        let newComment=new Comment();
        newComment.postId = response.postId;
        newComment.id = response.id;
        newComment.name = this.commentForm.value['name']
        newComment.body = this.commentForm.value['body']
        this.comments.push(newComment)

      }
      ,
      error: (err) => { console.log(err); }
    });
  }


  update(){
    this._CommentService.put(this.commentID,JSON.stringify(this.commentUpdateForm.value)).subscribe({
      next: (response) => {
        console.log(response)
        for(let i=0; i<this.comments.length;i++){
          if(this.comments[i].id == this.commentID) {
            console.log(this.commentUpdateForm.value)
            this.comments[i].name = this.commentUpdateForm.value['name']
            this.comments[i].body = this.commentUpdateForm.value['body']
          }
        }
      }
      ,
      error: (err) => { console.log(err); }
    });
  }

  setCommentID(id:number){
    this.commentID = id
  }

  getCommentID(){
    return this.commentID
  }

  // setUpdateIntialValue(){
  //   for(let i=0; i<this.comments.length;i++){
  //     if(this.comments[i].id == this.commentID){
  //       // this.commentUpdateForm.value['name'] = this.comments[i].name;
  //       // this.commentUpdateForm.value['body'] = this.comments[i].body;
  //       this.name = this.comments[i].name;
  //       this.body = this.comments[i].body;
  //       this.commentUpdateForm.value['name'] = this.name
  //       this.commentUpdateForm.value['body'] = this.body
  //     }
      
  //   }
  // }
}
