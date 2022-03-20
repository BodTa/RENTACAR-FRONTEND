import { Image } from './image';

export interface CarDetails {
  brandName: string;
  brandId: number;
  colorId: number;
  sellerId: number;
  colorName: string;
  carId: number;
  carName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  doorCount: number;
  images: Image[];
}
