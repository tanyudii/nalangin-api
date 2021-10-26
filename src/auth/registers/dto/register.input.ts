import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { RegisterRequestOtpInput } from './register-request-otp.input';

@InputType()
export class RegisterInput extends PartialType(RegisterRequestOtpInput) {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  otp: string;
}
