import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  standalone: true
})
export class YearPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    // Extrair o ano da string de data
    const date = new Date(value);
    return date.getFullYear().toString();
  }

}
