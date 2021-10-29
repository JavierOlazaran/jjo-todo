import { DataService } from '../data/mock.db.service';
import { DataModule } from './../data/data.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [DataModule],
  controllers: [],
  providers: [UserService, DataService],
  exports: [UserService]
})
export class UserModule {}
