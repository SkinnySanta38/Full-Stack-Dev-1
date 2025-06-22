import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Travlr Getaways Admin';
}
