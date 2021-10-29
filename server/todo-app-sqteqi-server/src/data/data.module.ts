import { Module } from '@nestjs/common';
import { DataService } from './mock.db.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DataService],
})
export class DataModule {}
