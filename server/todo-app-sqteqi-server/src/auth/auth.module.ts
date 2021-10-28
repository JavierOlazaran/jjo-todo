import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { configs } from './../constants/config';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configs.auth.jwtSecret,
      signOptions: { expiresIn: configs.auth.jwtExpirationTime },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService]
})
export class AuthModule {}
