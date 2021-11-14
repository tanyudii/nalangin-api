import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { GqlCurrentUser } from '../../@common/decorators/current-user.decorator';
import { Profile } from '../../@common/graphql/types/profile.type';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';

@Resolver(() => Profile)
export class ProfileResolver {
  @UseGuards(JwtGqlGuard)
  @Query(() => Profile)
  myProfile(@GqlCurrentUser() profile: Profile): Profile {
    return profile;
  }
}
