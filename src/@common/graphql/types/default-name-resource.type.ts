import { Resource } from './resource.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultMessage } from './default-message.type';

@ObjectType()
export class DefaultMessageResource extends Resource<DefaultMessageResource> {
  @Field(() => DefaultMessage)
  data: DefaultMessage;
}
