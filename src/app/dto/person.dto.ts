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
  @IsOptional()
  middleName?: string;
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
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  website?: string;
}
export class EnrollPersonDto extends PersonDto {
  @IsString()
  externalId: string;
}
