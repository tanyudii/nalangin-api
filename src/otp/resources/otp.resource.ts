import { Resource } from '../../@common/graphql/types/resource.type';
import { OtpResponse } from '../types/otp-response.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpResource extends Resource<OtpResource> {
  @Field(() => OtpResponse)
  data: OtpResponse;
}
