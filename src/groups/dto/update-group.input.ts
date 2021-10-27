import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateGroupInput } from './create-group.input';

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
