import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { IUpdateUserBankInput } from '../../@interfaces/user-banks/dto/update-user-bank.input';
import { CreateUserBankInput } from './create-user-bank.input';

@InputType()
export class UpdateUserBankInput
  extends CreateUserBankInput
  implements IUpdateUserBankInput
{
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
