import { IsString, IsNotEmpty } from "class-validator";

export class UserCredentialsRequestDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginUserResponseDTO {
    access_token: string;
}

export class SaveNewUserResponseDTO {
    user: string;
}