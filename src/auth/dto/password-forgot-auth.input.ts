import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PasswordForgotAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
