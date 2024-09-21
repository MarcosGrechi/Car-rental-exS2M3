import { Component, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YearPipe } from '../pipes/year.pipe';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, YearPipe],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {

  carService = inject(CarService);
  activatedRoute = inject(ActivatedRoute);
  carro: any = {};
  isFavorito: boolean = false; // Estado do favorito

  ngOnInit() {
    // Obtém o ID do carro da rota e chama o serviço para buscar detalhes
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.carService.detail(id).subscribe({
        next: (data) => {
          this.carro = data;
          // Verifica se o carro já está nos favoritos
          this.checkFavorito();
        },
        error: (error) => {
          console.log('Erro ao buscar detalhes do carro: ', error);
        }
      });
    });
  }

  // Verifica se o carro está na lista de favoritos
  checkFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.isFavorito = favoritos.some((fav: any) => fav.id === this.carro.id);
  }

  // Adiciona ou remove o carro dos favoritos
  toggleFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (this.isFavorito) {
      // Remove o carro da lista de favoritos
      const novosFavoritos = favoritos.filter((fav: any) => fav.id !== this.carro.id);
      localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
      this.isFavorito = false;
      alert("Carro removido dos favoritos!");
    } else {
      // Adiciona o carro aos favoritos
      favoritos.push(this.carro);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      this.isFavorito = true;
      alert("Carro adicionado aos favoritos!");
    }
  }

  favoritarCarro() {
    let temFavoritos = localStorage.getItem('favoritos');
    if (temFavoritos) {
      let favoritos = JSON.parse(temFavoritos);
      let jaFavoritado = favoritos.some((fav: any) => fav.id === this.carro.id);

      if (jaFavoritado) {
        favoritos = favoritos.filter((fav: any) => fav.id !== this.carro.id);
        alert("Carro removido dos favoritos!");
      } else {
        favoritos.push(this.carro);
        alert("Carro favoritado com sucesso!");
      }

      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    } else {
      localStorage.setItem('favoritos', JSON.stringify([this.carro]));
      alert("Carro favoritado com sucesso!");
    }

    window.location.reload(); // Recarrega a página para atualizar a contagem de favoritos no cabeçalho
  }
}
