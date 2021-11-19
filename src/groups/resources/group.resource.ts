import { Field, ObjectType } from '@nestjs/graphql';
import { Resource } from '../../@common/graphql/types/resource.type';
import { Group } from '../entities/group.entity';

@ObjectType()
export class GroupResource extends Resource<GroupResource> {
  @Field(() => Group)
  data: Group;
}
