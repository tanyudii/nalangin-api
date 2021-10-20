import { CreateUserBankInput } from './create-user-bank.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserBankInput extends PartialType(CreateUserBankInput) {
  @Field()
  id: string;
}
