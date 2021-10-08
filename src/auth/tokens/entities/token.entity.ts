import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  accessToken: string;

  @Field(() => Int)
  expiresAt: number;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
