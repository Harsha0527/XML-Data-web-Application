import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
// const Swal = require('sweetalert2')
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'aV16';


  constructor(public httpS:HttpService){}
  data: any;
  givendata:any;
  currentPage = 1;
  itemsPerPage = 100;
  totalPages = 0;
  totalItems = 0;
  pagedData: any[] = [];
  pages: number[] = [];
  visiblePages: (number | string)[] = [];

  isDarkMode = false;
  toggleDarkMode() {
    if (this.isDarkMode) {
      console.log(this.isDarkMode);
      
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  ngOnInit() {
    Swal.fire({
      title: 'Loading Data',
      icon: 'info',
      html: 'Please wait while we process your request...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.httpS.fetchData(1,50).subscribe(res=>{
     this.data=res.data
     this.givendata=res.data
     this.pagedData=this.data.data
     this.itemsPerPage= res.itemsPerPage;

     this.currentPage=res.currentPage
     this.totalPages=res.totalPages
     this.totalItems=res.totalItems
     this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.generateVisiblePages();
     console.log(res);
     Swal.close()
     if(res.data.length==0){
      Swal.fire({
        // title: 'Error!',
        text: 'No data found !',
        icon: 'error',
      })
     }
    //  Swal.hideLoading()

    })
  }
searchTerm:any=''
  filterData(searchTerm: any) {
    console.log(searchTerm);
    this.searchTerm = searchTerm.trim(); // Remove leading and trailing whitespace
    // Ensure searchTerm is a string
    if (typeof searchTerm !== 'string') {
        console.error('searchTerm is not a string:', searchTerm);
        return;
    }
    if(searchTerm){
      Swal.fire({titleText:'Searching in progress ...'})
    // Convert searchTerm to lowercase
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.currentPage = 1; // Reset to first page when searching
    this.httpS.filterData(this.currentPage,this.itemsPerPage,lowerCaseSearchTerm).subscribe(res=>{
      this.data=res.data
      this.givendata=res.data
      this.pagedData=this.data.data
      this.itemsPerPage= res.itemsPerPage;
  
      this.currentPage=res.currentPage
      this.totalPages=res.totalPages
      this.totalItems=res.totalItems
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
     this.generateVisiblePages();
     console.log(res);
     Swal.close()
     if(res.data.length==0){
      Swal.fire({
        // title: 'Error!',
        text: 'No data found !',
        icon: 'error',
      })
     }
    })
    // Filter the data
    // this.data = this.data.filter((item: any) =>
    //     JSON.stringify(item).toLowerCase().includes(lowerCaseSearchTerm)
    // );

    console.log(this.data);

    }
    else{
      // this.data=this.givendata;
      this.refreshData();
      console.log("No search term entered, showing all data")
    }
}


  handleFileUpload(file: File) {
    // Handle file upload logic here
    console.log('File uploaded:', file);
  }

  refreshData() {
    // Handle refresh logic here
    console.log('Data refreshed');
    Swal.fire({
      icon: 'info',
      title: 'Loading Data',
      html: 'Please wait while we process your request...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
      this.httpS.fetchData(1,50).subscribe(res=>{
  //     this.data=res.data

  // this.totalItems = res.totalItems;
  // this.totalPages = res.totalPages;
  // this.itemsPerPage= res.itemsPerPage;
  // this.pagedData = res.data;
  this.data=res.data
  this.updatePagination(res)
  this.generateVisiblePages()
      if(res){
        Swal.fire({
          // title: 'Error!',
          text: 'Refresh Done !',
          icon: 'success',
        })
      }

      
      console.log(res)
     })
  }





  // Add pagination handler
onPageChange(page: any): void {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.loadData();
}

private updatePagination(data: any): void {
  console.log(data,'updatePagination');
  
  this.totalItems = data.totalItems;
  this.totalPages = data.totalPages;
  this.itemsPerPage= data.itemsPerPage;
  this.pagedData = data.data;
  this.data=data.data;
  this.inputPage = this.currentPage
  Swal.close()
  this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  this.generateVisiblePages()
}

// Modify your data loading function to handle pagination
loadData(): void {
  console.log(this.currentPage, this.totalPages);
  Swal.fire({
    // title: 'Error!',
    text: 'Moving to page '+this.currentPage+'... wait for a moment !',
    icon: 'info',
    color: '#716add',
    focusCancel: false,
    showConfirmButton: false,
    timer: 20000,
    timerProgressBar: true,
  });

  if(!this.searchTerm){
  this.httpS.fetchData(this.currentPage, this.itemsPerPage).subscribe({
    next: (response) => {
      this.updatePagination(response);
    },
    error: (err) => console.error(err)
  });
}
if(this.searchTerm){
  this.httpS.filterData(this.currentPage, this.itemsPerPage,this.searchTerm).subscribe({
    next: (response) => {
      this.updatePagination(response);
    },
    error: (err) => console.error(err)
  });
}
  this.generateVisiblePages();

}

private generateVisiblePages(): void {
  const pages: (number | string)[] = [];
  const delta = 2; // Number of pages to show around current
  const current = this.currentPage;
  const total = this.totalPages;
  // Always show first page
  pages.push(1);
  // Show ellipsis if current page is far from start
  if (current > delta + 2) {
    pages.push('...');
  }
  // Middle pages
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    pages.push(i);
  }
  // Show ellipsis if current page is far from end
  if (current < total - delta - 1) {
    pages.push('...');
  }
  // Always show last page if different from first
  if (total > 1) {
    pages.push(total);
  }
  this.visiblePages = pages;
}



inputPage: number = 1;

onItemsPerPageChange(): void {
  this.currentPage = 1; // Reset to first page when changing page size
  this.loadData();
}

onPageInput(): void {
  const page = Math.max(1, Math.min(this.inputPage, this.totalPages));
  this.onPageChange(page);
  this.inputPage = page; // Update input to valid value
}

}
