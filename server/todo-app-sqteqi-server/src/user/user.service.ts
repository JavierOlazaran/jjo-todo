import { Injectable } from '@nestjs/common';
import { db } from '../mock.db';
import { RegisterUserRequestDTO } from './model/user.model';

// The data base handling is basic and just made as
// as example. In real life and with more time,
// I would implement some abstraction to handle the
// actual DB connection.

@Injectable()
export class UserService {

    saveNewUser(newUser: RegisterUserRequestDTO) {
        db.push({
            ...newUser,
            todos: [],
        });

        return db.find(user => user.userName === newUser.userName);
    }

    findUser(userName: string) {
        return db.find(user => user.userName === userName);
    }
}
