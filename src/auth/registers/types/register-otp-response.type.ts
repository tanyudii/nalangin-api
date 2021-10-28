import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterOtpResponse {
  @Field()
  message: string;

  @Field(() => Int)
  increment: number;

  @Field(() => Date)
  availableNextAt: Date;
}
