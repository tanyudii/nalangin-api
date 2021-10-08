import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PasswordResetAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
