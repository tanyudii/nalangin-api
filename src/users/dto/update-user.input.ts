import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl } from 'class-validator';
import { IsUserEmailUnique } from '../rules/user-email-unique.rule';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsUserEmailUnique()
  email: string;

  @Field()
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber: string;

  @Field()
  @IsUrl()
  avatar: string;
}
