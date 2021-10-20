import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ShoppingItemInput } from './shopping-item.input';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { Type } from 'class-transformer';

@InputType()
export class CreateShoppingInput {
  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Field()
  @IsNotEmpty()
  store: string;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isPpn: boolean;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  delivery: number;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @Field(() => [ShoppingItemInput])
  @IsNotEmpty()
  @IsArray()
  @Type(() => ShoppingItemInput)
  shoppingItems: ShoppingItemInput[];
}
