import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateTokenOtpResponse {
  @Field()
  message: string;

  @Field(() => Int)
  increment: number;

  @Field(() => Date)
  availableNextAt: Date;
}
