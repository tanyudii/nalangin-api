import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../@common/constants/jwt.constant';
import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { AccessTokensModule } from '../../access-tokens/access-tokens.module';
import { RefreshTokensModule } from '../../refresh-tokens/refresh-tokens.module';
import { TokensService } from '../services/tokens.service';
import { TokensController } from './tokens.controller';

describe('TokensController', () => {
  let controller: TokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: jwtExpiresIn },
        }),
        AccessTokensModule,
        RefreshTokensModule,
        UsersModule,
      ],
      controllers: [TokensController],
      providers: [TokensService],
    }).compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
