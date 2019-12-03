import { Photo } from './photo';

export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    photo: Photo;
}
