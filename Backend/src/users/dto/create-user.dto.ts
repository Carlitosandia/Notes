import { IsUUID, IsOptional, IsString, MaxLength, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @MaxLength(100)
    password: string;
}


