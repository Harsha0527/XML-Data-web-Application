import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/';


  fetchData(page:any,limit:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'awards',{ "page": page, "limit": limit });
  }

  
  filterData(page:any,limit:any,searchTerm:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'awards/search',{ "page": page, "limit": limit, "searchTerm": searchTerm });
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.apiUrl+'upload', formData);
  }

}
