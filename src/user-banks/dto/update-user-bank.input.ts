import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateUserBankInput } from './create-user-bank.input';

@InputType()
export class UpdateUserBankInput extends PartialType(CreateUserBankInput) {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
