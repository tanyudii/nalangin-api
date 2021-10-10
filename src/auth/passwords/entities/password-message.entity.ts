import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasswordMessage {
  @Field()
  message: string;
}
