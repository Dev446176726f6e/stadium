import { IsNotEmpty, IsString } from "class-validator";

export class CreateStadiumStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
