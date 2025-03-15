import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
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
    @ValidateNested({ each: true })
    @Type(() => String)
    @IsString({ each: true })
    tags: string[];
}

