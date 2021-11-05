import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOtpInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  subjectType: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  subjectId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
