import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

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
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber: string;
}
