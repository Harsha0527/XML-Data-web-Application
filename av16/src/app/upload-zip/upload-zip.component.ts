import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-upload-zip',
  templateUrl: './upload-zip.component.html',
  styleUrls: ['./upload-zip.component.scss']
})
export class UploadZipComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  constructor(private httpS:HttpService){}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      
      this.fileUploaded.emit(file);
      this.httpS.uploadFile(file).subscribe(res=>{
        console.log(res);
        
      });
    }
  }

}
