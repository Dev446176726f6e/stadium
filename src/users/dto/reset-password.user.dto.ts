import { IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  readonly current_password: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minSymbols: 2,
    minUppercase: 2,
  })
  readonly new_password: string;

  // @IsStrongPassword({})
  @IsString()
  readonly confirm_new_password: string;
}
