import { IsString, IsInt, Max, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    title : string;

    @IsOptional()
    @IsInt()
    @Max(new Date().getFullYear())
    year ? : number;

    @IsString()
    description : string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    authors : string;

    @IsOptional()
    @IsString()
    fileCover ? : string;

    @IsOptional()
    @IsString()
    fileName ? : string;

    @IsOptional()
    @IsString()
    fileBook ? : string;
}
