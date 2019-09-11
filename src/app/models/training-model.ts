import Image from './image-model'

export default class Training {
  title: string;
  description: string;
  target: string;
  advisor: string;
  level: number;
  vacancies: number;
  status: number;
  banner: Image;
  brand: Image;
  createdAt: Date;
  updatedAt: Date;
}
