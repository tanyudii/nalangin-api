import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { GqlCurrentUser } from '../../@common/decorators/current-user.decorator';
import { Profile } from '../types/profile.type';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { ProfileResource } from '../resources/profile.resource';

@Resolver(() => Profile)
export class ProfileResolver {
  @UseGuards(JwtGqlGuard)
  @Query(() => ProfileResource)
  myProfile(@GqlCurrentUser() profile: Profile): ProfileResource {
    return new ProfileResource({ data: profile });
  }
}
