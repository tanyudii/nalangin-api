import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
