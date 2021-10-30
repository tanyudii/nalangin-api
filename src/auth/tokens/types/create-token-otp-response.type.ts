import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateTokenOtpResponseType {
  @Field()
  message: string;

  @Field(() => Int)
  increment: number;

  @Field(() => Date)
  availableNextAt: Date;
}
