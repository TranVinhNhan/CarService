import { Pipe, PipeTransform } from '@angular/core';
import { AutoPart } from '../_models/autopart';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: AutoPart[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
   }
}
