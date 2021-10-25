import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

import { RegisterRequestOtpInput } from './register-request-otp.input';

@InputType()
export class RegisterInput extends PartialType(RegisterRequestOtpInput) {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  otp: string;
}
