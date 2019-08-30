import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../register.service';
import {Router,NavigationExtras} from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent implements OnInit {

  selectTable :FormGroup;
  allTables :string[]; 
  data :any[];
  returnMessage:string;
  keys :string[];
  tableSelected ;
  oldData :any;
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private registerService: RegisterService, private router:Router) { }

  ngOnInit() {
    this.selectTable=this.formBuilder.group({
      table:['']
    });
    this.allTables=['User','Account','Transfer','Receiver'];
  }

  get f(){return this.selectTable.controls;}

  getTable()
  {
    var table={table:this.f.table.value};

    this.registerService.gridTable(table).subscribe((data)=>
    {
      if (data)
      {
      this.data=data;
      this.oldData=JSON.parse(JSON.stringify(data));
      this.keys=Object.keys(this.data[0]);
      this.tableSelected=table.table;
      }
    })
  }
  
  alterTable(index)
  {

    var queryObj={table:(this.tableSelected),newModel:this.data[index],oldModel:this.oldData[index]};
    this.registerService.alterGridTable(queryObj).subscribe((data)=>
    {
      this.returnMessage=data.returnMessage;
      console.log(data);
      console.log
    })
    
  }
}
