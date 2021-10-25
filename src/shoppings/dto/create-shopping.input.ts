import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateShoppingInput {
  @Field()
  @IsNotEmpty()
  @IsDateString()
  date: string;

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

  @Field(() => [CreateShoppingItemInput])
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateShoppingItemInput)
  shoppingItems: CreateShoppingItemInput[];
}

@InputType()
export class CreateShoppingItemInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  borrowerId: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field()
  @IsNotEmpty()
  description: string;
}
