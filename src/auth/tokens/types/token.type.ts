import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field()
  accessToken: string;

  @Field(() => Int)
  expiresAt: number;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => Int, { nullable: true })
  refreshTokenExpiresAt?: number;
}
