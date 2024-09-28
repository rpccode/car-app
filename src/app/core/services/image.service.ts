// src/app/services/image.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpService } from './http.service';
import { Image } from 'src/app/models/imagen.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'http://localhost:5000'; // Cambia esto a tu URL de backend

  constructor(private httpService: HttpService) {}

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${this.baseUrl}/upload`, formData);
    return response.data.imagePath; // Cambia según tu respuesta
  }

  async searchImages(query: string): Promise<Image[]> {
    const response = await axios.get(`${this.baseUrl}/search/${query}`);
    return response.data.results; // Ajusta según la respuesta de la API
  }
}
