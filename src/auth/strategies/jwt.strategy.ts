import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtSecret } from '../../@common/constants/jwt.constant';
import { UsersService } from '../../users/services/users.service';
import { AccessTokensService } from '../tokens/services/access-tokens.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accessTokenServices: AccessTokensService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    const { jti, sub } = payload;
    const isValidAccessToken = await this.accessTokenServices.isValidExpiry(
      jti,
    );

    if (!isValidAccessToken) return null;

    try {
      return this.usersService.findOne(sub);
    } catch (e) {
      return null;
    }
  }
}
