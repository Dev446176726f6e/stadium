import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWorkingTimeDto {
  @IsNumber()
  @IsNotEmpty()
  stadium_id: number;

  @IsEnum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ])
  @IsNotEmpty()
  day_of_week: string;

  @IsString()
  @IsNotEmpty()
  opening_time: string;

  @IsString()
  @IsNotEmpty()
  closing_time: string;

  price_per_hour: number;
}
