import { CreateAccountInput } from './create-account.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field()
  id: string;
}
