import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '../services/users.service';

export function IsUserPhoneNumberUnique(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UserPhoneNumberUnique,
    });
  };
}

@ValidatorConstraint({ name: 'userPhoneNumberUnique', async: true })
@Injectable()
export class UserPhoneNumberUnique implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    try {
      const user = await this.usersService.findOneByPhoneNumber(value);
      return !user || user.id === (args.object as any)['id'];
    } catch (e) {
      return e instanceof NotFoundException;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} has already been taken.`;
  }
}
