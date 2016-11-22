import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ModalDirective } from './components/modal/modal.component';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { TagsInputItemComponent } from './components/tags-input-item/tags-input-item.component';
import { AnimatedMsgComponent } from './components/animated-msg/animated-msg.component'

import {
  DraggableDirective,
  GridItemComponent,
  GridLayoutComponent
} from './components/index'

@NgModule({
  declarations: [
    AppComponent,
    ModalDirective,
    TagsInputComponent,
    TagsInputItemComponent,
    AnimatedMsgComponent,
    DraggableDirective,
    GridItemComponent,
    GridLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
