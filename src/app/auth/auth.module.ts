import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthEffect } from './state/auth.effect';
import { authReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selector';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffect]),
    StoreModule.forFeature(AUTH_STATE_NAME, authReducer),
  ],
})
export class AuthModule {}
