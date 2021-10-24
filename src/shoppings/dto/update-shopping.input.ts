import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateShoppingInput } from './create-shopping.input';

@InputType()
export class UpdateShoppingInput extends PartialType(CreateShoppingInput) {
  @Field()
  id: string;
}
