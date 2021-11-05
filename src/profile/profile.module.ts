import { Module } from '@nestjs/common';

import { ProfileController } from './controllers/profile.controller';
import { ProfileResolver } from './resolvers/profile.resolver';

@Module({
  providers: [ProfileResolver],
  controllers: [ProfileController],
})
export class ProfileModule {}
