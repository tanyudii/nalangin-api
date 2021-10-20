import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserBankInput {
  @Field()
  bankName: string;

  @Field()
  bankNumber: string;
}
