import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserRequestDTO {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RegisterUserResponseDTO {
    userName: string;
}

export class UserCredentials {
    userName: string;
    password: string;
}
