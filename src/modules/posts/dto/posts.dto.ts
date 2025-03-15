import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "src/decorator/dto/isNotBlank.dto";


export class CreatePostDTO {
    @IsNotEmpty()
    @IsString()
    @IsNotBlank()
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsNotBlank()
    description: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags: string[];
}

export class GetPostsDTO {

    @IsOptional()
    @IsNumber()
    page: number;

    @IsOptional()
    @IsNumber()
    perPage: number;

    @IsOptional()
    @IsString()
    search: string;
}

