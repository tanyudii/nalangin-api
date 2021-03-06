import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  lenderId: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  lenderBankId: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @Field(() => [CreatePaymentItemInput])
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentItemInput)
  paymentItems: CreatePaymentItemInput[];
}

@InputType()
export class CreatePaymentItemInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  shoppingId: string;
}
