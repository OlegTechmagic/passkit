import { IsDate, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class PersonDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  address1?: string;
  @IsString()
  @IsOptional()
  address2?: string;
  @IsString()
  @IsPhoneNumber()
  phone: string;
  @IsNumber()
  gender: number;
  @IsDate()
  @IsOptional()
  dob?: Date;
}
export class EnrollPersonDto extends PersonDto {
  @IsString()
  externalId: string;
}
