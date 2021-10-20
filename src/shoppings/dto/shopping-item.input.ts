import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class ShoppingItemInput {
  @Field()
  @IsNotEmpty()
  borrowerId: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field()
  @IsNotEmpty()
  description: string;
}
