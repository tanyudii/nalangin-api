import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  userId: string;

  @Field()
  name: string;
}
