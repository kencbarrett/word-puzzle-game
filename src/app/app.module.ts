import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameRowComponent } from './game-row/game-row.component';
import { GameTileComponent } from './game-tile/game-tile.component';
import { GameKeyboardComponent } from './game-keyboard/game-keyboard.component';
import { GameButtonComponent } from './game-button/game-button.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameRowComponent,
    GameTileComponent,
    GameKeyboardComponent,
    GameButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
