import { CreateShoppingInput } from './create-shopping.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShoppingInput extends PartialType(CreateShoppingInput) {
  @Field()
  id: string;
}
