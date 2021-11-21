import { Resource } from './resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultObject } from './default-object.type';

@ObjectType()
export class DefaultObjectResource extends Resource<DefaultObjectResource> {
  @Field(() => DefaultObject)
  data: DefaultObject;
}
