import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule,MatSelectModule,MatInputModule,MatCardModule,MatToolbarModule,MatListModule,MatButtonModule} from '@angular/material';
import { AppComponent } from './app.component';
import { BooksAddComponent } from './components/books-add/books-add.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksLayoutComponent } from './components/books-layout/books-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksAddComponent,
    BooksListComponent,
    BooksLayoutComponent
  ],
  imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatToolbarModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		ReactiveFormsModule,
		FormsModule
		
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
