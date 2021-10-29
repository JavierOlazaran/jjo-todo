import { User } from './model/user.model';
import { UserCredentialsRequestDTO } from './../auth/models/auth.dtos';
import { Injectable, HttpException } from '@nestjs/common';
import { DataService } from '../data/mock.db.service';


@Injectable()
export class UserService {

    constructor(
        private dataSvc: DataService
    ) {}

    async saveNewUser(newUser: UserCredentialsRequestDTO): Promise<string> {
        if (this.dataSvc.db.find(user => user.username === newUser.username)) {
            throw new HttpException('User already exists', 403);
        }
        this.dataSvc.db.push({
            ...newUser,
            todos: [],
        });

        return await this.dataSvc.db.find(user => user.username === newUser.username).username;
    }

    async findUser(userName: string): Promise<User> {
        return await this.dataSvc.db.find(user => user.username === userName);
    }
}
