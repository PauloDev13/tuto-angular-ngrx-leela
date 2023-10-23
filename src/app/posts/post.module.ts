import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostEffect } from './state/post.effect';
import { postsReducer } from './state/post.reducer';
import { POST_STATE_NAME } from './state/posts.selector';

@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostEffect]),
  ],
})
export class PostModule {}
