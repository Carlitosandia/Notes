import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class DeleteNoteDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}