import Image from './image-model'
import Advisor from './advisor-model';

export default class Training {
  id?: number;
  title: string;
  description: string;
  target: string;
  advisor: Advisor;
  level: number;
  vacancies: number;
  price: number;
  status: number;
  banner: Image;
  brand: Image;
  createdAt: Date;
  updatedAt: Date;
}
