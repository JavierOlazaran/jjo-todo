import { Injectable } from '@nestjs/common';
import { DataService } from '../mock.db';
import { RegisterUserRequestDTO } from './model/user.model';

// The data base handling is basic and just made as
// as example. In real life and with more time,
// I would implement some abstraction to handle the
// actual DB connection.

@Injectable()
export class UserService {

    constructor(
        private dataSvc: DataService
    ) {}

    async saveNewUser(newUser: RegisterUserRequestDTO) {
        this.dataSvc.db.push({
            ...newUser,
            todos: [],
        });

        return await this.dataSvc.db.find(user => user.userName === newUser.userName);
    }

    async findUser(userName: string) {
        return await this.dataSvc.db.find(user => user.userName === userName);
    }
}
