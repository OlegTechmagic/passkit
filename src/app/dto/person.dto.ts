import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class PersonDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsPhoneNumber()
  phone: string;
  @IsNumber()
  gender: number;
  @IsString()
  firstName: string;
  @IsString()
  middleName: string;
  @IsString()
  lastName: string;
  @IsString()
  jobTitle: string;
  @IsString()
  companyName: string;
  @IsString()
  link: string;
  @IsString()
  externalId: string;
  @IsString()
  image: string;
}
export class EnrollPersonDto extends PersonDto {
  @IsString()
  externalId: string;
}

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone: string;
  @IsOptional()
  @IsNumber()
  gender: number;
  @IsOptional()
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  middleName: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  jobTitle: string;
  @IsOptional()
  @IsString()
  companyName: string;
  @IsOptional()
  @IsString()
  link: string;
  @IsOptional()
  @IsString()
  externalId: string;
  @IsOptional()
  @IsString()
  image: string;
}
