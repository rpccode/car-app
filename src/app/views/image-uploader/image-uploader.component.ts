// src/image-uploader.component.ts
import { Component, input } from '@angular/core';
import { ImageService } from 'src/app/core/services/image.service';
import { ImageViewModel } from 'src/app/viewmodels/image-view-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  standalone:true,
  imports:[FormsModule],
  template: `
    <div>
      <input type="file" (change)="viewModel.onFileChange($event)" />
      <button (click)="viewModel.uploadImage()" [disabled]="!viewModel.selectedFile">Cargar Imagen</button>

      <div *ngIf="viewModel.uploadedImage">
        <h2>Imagen Cargada:</h2>
        <img [src]="viewModel.uploadedImage" alt="Uploaded Image" />
      </div>

      <input [(ngModel)]="viewModel.searchQuery" placeholder="Buscar imágenes..." />
      <button (click)="viewModel.searchImages()">Buscar</button>

      <div *ngIf="viewModel.images.length">
        <h2>Imágenes Encontradas:</h2>
        <div *ngFor="let image of viewModel.images">
          <img [src]="image.url" alt="Found Image" />
        </div>
      </div>
    </div>
  `,

})
export class ImageUploaderComponent {
  viewModel: ImageViewModel;

  constructor(private imageService: ImageService) {
    this.viewModel = new ImageViewModel(this.imageService);
  }
}
