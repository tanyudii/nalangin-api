import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

import { ICreateUserInput } from '../../@interfaces/users/dto/create-user.input';
import { IsUserEmailUnique } from '../rules/user-email-unique.rule';
import { IsUserPhoneNumberUnique } from '../rules/user-phone-number-unique.rule';

@InputType()
export class CreateUserInput implements ICreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUserPhoneNumberUnique()
  @IsPhoneNumber(undefined, {
    message: '$property number must be a valid format',
  })
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @IsUserEmailUnique()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
