import { Component, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YearPipe } from '../pipes/year.pipe';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule, YearPipe],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  carros: any[] = [];
  filteredCars: any[] = [];
  carService = inject(CarService);
  router = inject(Router);
  searchTerm: string = '';  // Termo de pesquisa

  ngOnInit() {
    this.carService.list().subscribe({
      next: (data: any) => {
        let arrayFavoritos = JSON.parse(localStorage.getItem('favoritos') || "[]");
        data.forEach((element: any) => {
          let isFavorite = arrayFavoritos.some((favorito: any) => favorito.id === element.id);
          element.favorito = isFavorite ? "Sim" : "Não";
        });
        this.carros = data;
        this.filteredCars = data; // Inicializa com todos os carros
      },
      error: (error) => { console.error("Erro ao listar carros: ", error); }
    });
  }

  searchCars() {
    this.filteredCars = this.carros.filter(car =>
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  redirectTo(id: number) {
    this.router.navigateByUrl(`/carro/${id}`);
  }
}
