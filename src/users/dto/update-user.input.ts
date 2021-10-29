import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

import { IUpdateUserInput } from '../../@interfaces/users/dto/update-user.input';
import { IsUserEmailUnique } from '../rules/user-email-unique.rule';
import { IsUserPhoneNumberUnique } from '../rules/user-phone-number-unique.rule';

@InputType()
export class UpdateUserInput implements IUpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUserPhoneNumberUnique()
  @IsPhoneNumber(undefined, { message: 'phone number must be a valid format' })
  phoneNumber: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @IsUserEmailUnique()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
