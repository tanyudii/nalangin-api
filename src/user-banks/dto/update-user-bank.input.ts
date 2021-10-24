import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateUserBankInput } from './create-user-bank.input';

@InputType()
export class UpdateUserBankInput extends PartialType(CreateUserBankInput) {
  @Field()
  id: string;
}
