import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterRequestOtpResponseType {
  message: string;

  @Field(() => Int)
  increment: number;

  @Field(() => Date)
  availableNextAt: Date;
}
