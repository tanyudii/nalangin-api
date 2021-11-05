import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../@common/decorators/current-user.decorator';
import { Profile } from '../../@common/graphql/types/profile.type';
import { JwtAuthGuard } from '../../@common/guards/jwt-auth.guard';

@Controller('my-profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  myProfile(@CurrentUser() profile: Profile): Profile {
    return profile;
  }
}
