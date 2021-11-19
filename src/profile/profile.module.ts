import { Module } from '@nestjs/common';
import { ProfileResolver } from './resolvers/profile.resolver';

@Module({
  providers: [ProfileResolver],
})
export class ProfileModule {}
