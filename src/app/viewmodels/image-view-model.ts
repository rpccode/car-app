import { ImageService } from "../core/services/image.service";
import { Image } from "../models/imagen.model";


export class ImageViewModel {
  selectedFile: File | null = null;
  uploadedImage: string | null = null;
  searchQuery: string = '';
  images: Image[] = [];

  constructor(private imageService: ImageService) {}

  async uploadImage() {
    if (this.selectedFile) {
      this.uploadedImage = await this.imageService.uploadImage(this.selectedFile);
    }
  }

  async searchImages() {
    this.images = await this.imageService.searchImages(this.searchQuery);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }
}
