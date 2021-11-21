import { Resource } from '../../@common/graphql/types/resource.type';
import { Profile } from '../types/profile.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileResource extends Resource<ProfileResource> {
  @Field(() => Profile)
  data: Profile;
}
