import { IsUUID, IsOptional, IsArray, IsString, MaxLength, IsEmail, IsBoolean, IsDate, IsNotEmpty } from "class-validator";

export class CreateNoteDto {
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsNotEmpty()
    @IsBoolean()
    isArchived: boolean;
    @IsString()
    @IsNotEmpty()
    userId: string; // Usuario que crea la nota
    @IsOptional()
    @IsArray()
    categoryIds?: string[]; // Lista opcional de IDs de categorías
}
