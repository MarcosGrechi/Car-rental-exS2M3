import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  favoritosCount: number = 0;

  ngOnInit() {
    this.updateFavoritosCount();
  }

  updateFavoritosCount() {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || "[]");
    this.favoritosCount = favoritos.length;
  }
}
