import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

import { IsUserPhoneNumberUnique } from '../../../users/rules/user-phone-number-unique.rule';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUserPhoneNumberUnique()
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  otp: string;
}
