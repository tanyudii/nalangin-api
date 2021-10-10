import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTokenByRefreshTokenInput {
  @Field()
  @IsNotEmpty()
  accessToken: string;

  @Field()
  @IsNotEmpty()
  refreshToken: string;
}
