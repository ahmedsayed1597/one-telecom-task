import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {

  constructor(private _CommentService:CommentService) { }

  comments:any

  ngOnInit(): void {
    
    this.get()
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

  delete(commentID:number){
    this._CommentService.delete(commentID).subscribe({
      next: (response) => {
        console.log(response)
          this.comments.splice(commentID,1)
       //this.get();
      }
      ,
      error: (err) => { console.log(err); }
    });
  }
}
