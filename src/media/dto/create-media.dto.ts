import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateMediaDto {
  @IsNumber()
  @IsNotEmpty()
  stadium_id: number;

  @IsString()
  @IsEnum(["photo", "video"])
  media_type: string;

  @IsString()
  @IsNotEmpty()
  media_url: string;

  @IsString()
  @IsOptional()
  description: string;
}
