import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { RegisterOtpInput } from './register-otp.input';

@InputType()
export class RegisterInput extends PartialType(RegisterOtpInput) {
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
