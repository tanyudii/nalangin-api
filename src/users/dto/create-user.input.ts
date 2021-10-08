import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsUrl,
  MinLength,
} from 'class-validator';
import { IsUserEmailUnique } from '../rules/user-email-unique.rule';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsUserEmailUnique()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsUrl()
  avatar?: string;
}
