import { IsString, IsNotEmpty } from "class-validator";


export class LoginUserRequestDTO {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginUserResponseDTO {
    access_token: string;
}