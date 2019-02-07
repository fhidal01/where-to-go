import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-secure-image',
  template: `
    <img [src]="imageToShow" *ngIf="imageToShow">
  `
})
export class SecureImageComponent implements OnInit, OnChanges {

  @Input() private src: string;

  private imageToShow: any;
  private isImageLoading = false;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.src) {
      this.getImage(this.src);
    }
  }

  ngOnInit(): void {
    if (this.src) {
      this.getImage(this.src);
    }
  }

  getImage(url) {
    this.isImageLoading = true;
    this.http.get(url, { responseType: 'blob' }).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }



}
