import { Resource } from './resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultName } from './default-name.type';

@ObjectType()
export class DefaultNameResource extends Resource<DefaultNameResource> {
  @Field(() => DefaultName)
  data: DefaultName;
}
