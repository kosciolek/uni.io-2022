import { ConsoleLogger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, ConsoleLogger, UserService],
  exports: [PassportModule, UserService],
})
export class AuthzModule {}
