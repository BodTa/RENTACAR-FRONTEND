import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetails';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value:CarDetails[],filterText:string): CarDetails[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((c:CarDetails)=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
