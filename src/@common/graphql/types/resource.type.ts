import { DeepPartial } from 'typeorm';

export class Resource<T> {
  constructor(resource: DeepPartial<T>) {
    Object.entries(resource).forEach(([key, value]: any) => {
      this[key] = value;
    });
  }
}
