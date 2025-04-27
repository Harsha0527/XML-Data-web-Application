import { Component, Input } from '@angular/core';
import { HttpService } from '../http.service';
import {OnInit} from '@angular/core'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: any
  filteredData: any
  constructor(private httpS:HttpService){}

  ngOnInit() {
    // this.httpS.fetchData().subscribe(res=>{
    //   this.filteredData=res
    // //  this.data=res
    // })
  }
  ngOnChanges() {
    this.filteredData = this.data;
  }

  filterData(searchTerm: string) {
    if (!searchTerm) {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter((item:any) =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  isOpen = false;

  toggleAccordion(index: number) {
    this.data[index].expanded = !this.data[index].expanded;
    this.isOpen = this.data.some((item: any) => item.expanded);
  }
}  