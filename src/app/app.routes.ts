import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';

export const routes: Routes = [
    // Rota padrão redireciona para a lista de carros
    { path: '', redirectTo: 'car-list', pathMatch: 'full' },
    
    // Página de listagem de automóveis
    { path: 'carro', component: CarListComponent },

    // Página de detalhes de um automóvel específico
    { path: 'carro/:id', component: CarDetailsComponent },

    // Rota alternativa para o HomeComponent (opcional)
    { path: 'home', component: HomeComponent },
];
