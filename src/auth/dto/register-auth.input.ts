import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
