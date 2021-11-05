import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTokenByRefreshTokenInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
