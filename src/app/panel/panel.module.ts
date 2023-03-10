import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostControlComponent } from '../components/post-control/post-control.component';
import { AllPostsComponent } from '../components/all-posts/all-posts.component';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AllCommentsComponent } from '../components/all-comments/all-comments.component';
import { CommentControlComponent } from '../components/comment-control/comment-control.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo:'posts/all',  pathMatch: 'full'},
  {path: 'posts/control' , component:PostControlComponent},
  {path: 'posts/all' , component:AllPostsComponent},
  {path: 'comments/all' , component:AllCommentsComponent},
  {path: 'comments/control' , component:CommentControlComponent},
  {path: '**' , component:PageNotFoundComponent}
  
];


@NgModule({

  exports: [RouterModule],
  declarations: [
    PostControlComponent,
    AllPostsComponent,
    AllCommentsComponent,
    CommentControlComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PanelModule { }
