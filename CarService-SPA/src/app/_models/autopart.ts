import { AutoType } from './autotype';
import { Supplier } from './supplier';
import { Photo } from './photo';

export interface AutoPart {
    id: number;
    name: string;
    description: string;
    currentPrice: number;
    automotivePartType: AutoType;
    supplier: Supplier;
    photos: Photo[];
}
