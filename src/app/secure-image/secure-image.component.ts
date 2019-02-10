import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-secure-image',
  styleUrls: ['./secure-image.component.scss'],
  template: `
    <app-loading *ngIf="isImageLoading"></app-loading>
    <section *ngIf="imageToShow && !isImageLoading">
      <div class=”media”>
        <img [src]="imageToShow">
      </div>
    </section>
  `
})
export class SecureImageComponent implements OnInit, OnChanges {

  @Input() private src: string;

  public imageToShow: any;
  public isImageLoading = false;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.src) {
      this.getImage(this.src);
    } else {
      this.imageToShow = null;
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
