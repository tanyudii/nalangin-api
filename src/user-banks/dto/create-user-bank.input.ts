import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserBankInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  bankNumber: string;
}
