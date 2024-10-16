import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

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
