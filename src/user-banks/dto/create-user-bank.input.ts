import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { ICreateUserBankInput } from '../../@interfaces/user-banks/dto/create-user-bank.input';

@InputType()
export class CreateUserBankInput implements ICreateUserBankInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  bankNumber: string;
}
