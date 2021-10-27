import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateShoppingInput } from './create-shopping.input';

@InputType()
export class UpdateShoppingInput extends PartialType(CreateShoppingInput) {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
