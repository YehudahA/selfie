import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShootingComponent } from './shooting/shooting.component';
import { ImageDesignerComponent } from './image-designer/image-designer.component';

@NgModule({
  declarations: [
    AppComponent,
    ShootingComponent,
    ImageDesignerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
