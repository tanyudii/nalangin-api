import { Resource } from '../../../@common/graphql/types/resource.type';
import { TokenResponse } from '../types/token.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResource extends Resource<TokenResource> {
  @Field(() => TokenResponse)
  data: TokenResponse;
}
