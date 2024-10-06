import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
} from "class-validator";

export class CreateStadiumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsEnum(["natural_grass", "artificial_turf", "hybrid_grass"])
  surface_type: string;

  @IsEnum(["open", "closed", "retractable"])
  roof_type: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @IsNotEmpty()
  location: string[];

  @IsNumber()
  @IsNotEmpty()
  region_id: number;

  @IsNumber()
  @IsNotEmpty()
  district_id: number;

  @IsNumber()
  @IsNotEmpty()
  working_time_id: number;

  @IsOptional()
  @IsNumber()
  built_year?: number;

  @IsOptional()
  @IsString()
  contact_details?: string;
}
