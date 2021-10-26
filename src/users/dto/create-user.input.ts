import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
} from 'class-validator';

import { IsUserEmailUnique } from '../rules/user-email-unique.rule';
import { IsUserPhoneNumberUnique } from '../rules/user-phone-number-unique.rule';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUserPhoneNumberUnique()
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
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
