import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent],
  imports: [CommonModule, PostRoutingModule, ReactiveFormsModule],
})
export class PostModule {}
