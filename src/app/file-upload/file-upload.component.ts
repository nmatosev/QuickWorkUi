import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private apiServerUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  @Input() username: string

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {

    console.log("uploading pic for user " + this.username)
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData: any = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.username);
    const user = this.username;
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post(this.apiServerUrl + '/public/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
/*  onRetrieve() {
    this.fileUploadService.getImage();
  }*/

  ngOnInit(): void {
  }


}
