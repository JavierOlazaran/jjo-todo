import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, TodosModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
