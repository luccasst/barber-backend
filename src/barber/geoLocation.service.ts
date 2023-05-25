import { Injectable } from '@nestjs/common';
import * as NodeGeocoder from 'node-geocoder';

@Injectable()
export class GeolocationService {
  private geocoder: any;

  constructor() {
    const options: NodeGeocoder.Options = {
      provider: 'google',
      apiKey: 'AIzaSyARikbpJ0CBnnapfapbqO1f5f7NxFXhEg0',
    };

    // Inicialize o geocoder com as opções fornecidas
    this.geocoder = NodeGeocoder(options);
  }

  async getCoordinatesFromAddress(address: string): Promise<any> {
    const response = await this.geocoder.geocode(address);
    if (response && response.length > 0) {
      const { latitude, longitude } = response[0];
      return { latitude, longitude };
    }
    throw new Error('Endereço não encontrado.');
  }
}
