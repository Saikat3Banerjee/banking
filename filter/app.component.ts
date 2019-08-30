import {Component, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  extra: number;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', extra: 174},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', extra: 23},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', extra: 345},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', extra: 56543},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', extra: 203},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', extra: 37765},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', extra: 35},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', extra: 56},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', extra: 654},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', extra: 6},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', extra: 67},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', extra: 778},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', extra: 87},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', extra: 99},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', extra: 8},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', extra: 987},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', extra: 98},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', extra: 7},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', extra: 5432},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', extra: 7867},
];

let random: PeriodicElement[] = [];

for (let i = 21; i < 50010 ; i++) {
  let weight = Math.random() * 2 + 1;
  let name = Math.random().toString(30).substring(2,3) + Math.random().toString(25).substring(2, 8);
  let symbol = Math.random().toString(36).substring(2, 3) + Math.random().toString(25).substring(2, 3);
  symbol = symbol.toUpperCase();
  let extra = Math.random() - 8;
  ELEMENT_DATA.push({position: i , name: name, weight: weight, symbol: symbol, extra: extra});
}
//console.log(random);



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'extra'];
 dataSource = new MatTableDataSource(ELEMENT_DATA); 
 positionFilter = new FormControl();
 nameFilter = new FormControl();
 globalFilter = '';  
 filteredValues = { position: '', name: '', weight: '', symbol: '', extra: '' };
 
    @ViewChild(MatSort, {static:true}) sort: MatSort;

    @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;



  ngOnInit() {  
   
     this.positionFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['position'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
   });
    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
     this.filteredValues['name'] = nameFilterValue;
     this.dataSource.filter = JSON.stringify(this.filteredValues);
   }); 
    
    this.dataSource.filterPredicate = this.customFilterPredicate();  

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;

  }  
  
  applyFilter(filter) {
   this.globalFilter = filter;
   this.dataSource.filter = JSON.stringify(this.filteredValues);
 }  
 customFilterPredicate() {
  const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
    var globalMatch = !this.globalFilter;    
      if (this.globalFilter) {
      // search all text fields
       globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
    } 
      if (!globalMatch) {
        return;
    }  
      let searchString = JSON.parse(filter);
      return data.position.toString().trim().indexOf(searchString.position) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
  }
  return myFilterPredicate;
 }


}
