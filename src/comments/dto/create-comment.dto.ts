import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  stadium_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
