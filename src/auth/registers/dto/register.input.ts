import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';

import { UserEmailUnique } from '../../../users/rules/user-email-unique.rule';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @Validate(UserEmailUnique)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
