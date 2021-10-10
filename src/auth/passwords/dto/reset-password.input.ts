import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../../@common/rules/match.rule';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  token: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  @Match('password', {
    message: 'Password confirmation must be same with password.',
  })
  passwordConfirmation: string;
}
