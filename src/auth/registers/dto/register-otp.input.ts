import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

import { IsUserPhoneNumberUnique } from '../../../users/rules/user-phone-number-unique.rule';

@InputType()
export class RegisterOtpInput {
  @Field()
  @IsNotEmpty()
  @IsUserPhoneNumberUnique()
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber: string;
}
