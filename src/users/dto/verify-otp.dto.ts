import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOTPDto {
  @IsString()
  @IsNotEmpty()
  verification_key: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsPhoneNumber("UZ")
  phone_number: string;
}
