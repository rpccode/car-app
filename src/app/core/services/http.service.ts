// src/app/services/http.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseURL: string = 'http://localhost:3000'; // Cambia esto a tu URL base

  constructor() {}

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(`${this.baseURL}${endpoint}`, config);
    return response.data;
  }

  async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.post<T>(`${this.baseURL}${endpoint}`, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.put<T>(`${this.baseURL}${endpoint}`, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.delete<T>(`${this.baseURL}${endpoint}`, config);
    return response.data;
  }
}
